#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_DIR="$(cd "${SCRIPT_DIR}/../.." && pwd)"
MANIFEST_PATH="${PACKAGE_DIR}/manifest.toml"

if [[ -z "${VERSION:-}" ]]; then
	echo "Set VERSION before preparing a release, for example VERSION=123-abcdef12." >&2
	exit 1
fi

if [[ ! "${VERSION}" =~ ^[0-9A-Za-z][0-9A-Za-z._+-]*$ ]]; then
	echo "Use only letters, numbers, dots, underscores, plus signs, and hyphens in VERSION." >&2
	exit 1
fi

if grep -Fq "version = \"${VERSION}\"" "${MANIFEST_PATH}"; then
	echo "Release ${VERSION} already exists in manifest.toml. Choose a new VERSION." >&2
	exit 1
fi

RELEASE_ROOT="${PACKAGE_DIR}/build/releases/${VERSION}"
mkdir -p "${PACKAGE_DIR}/build/releases"
if ! mkdir "${RELEASE_ROOT}" 2>/dev/null; then
	echo "Release output already exists at ${RELEASE_ROOT}. Choose a new VERSION or remove that output." >&2
	exit 1
fi

cd "${PACKAGE_DIR}"
export PKG_CACHE_PATH="${PKG_CACHE_PATH:-${PACKAGE_DIR}/build/pkg-cache}"
afm run package:atlas

variants=(
	"darwin-amd64"
	"darwin-arm64"
	"linux-amd64"
	"linux-arm64"
	"windows-amd64"
)

for variant in "${variants[@]}"; do
	variant_dir="${RELEASE_ROOT}/${variant}"
	mkdir -p "${variant_dir}"

	if [[ "${variant}" == "windows-amd64" ]]; then
		binary_name="ads.exe"
		source_binary="${PACKAGE_DIR}/build/atlas/ads-${variant}.exe"
	else
		binary_name="ads"
		source_binary="${PACKAGE_DIR}/build/atlas/ads-${variant}"
	fi

	if [[ ! -f "${source_binary}" ]]; then
		echo "The packaged binary ${source_binary} wasn't created." >&2
		exit 1
	fi

	cp "${source_binary}" "${variant_dir}/${binary_name}"
	if [[ "${variant}" != "windows-amd64" ]]; then
		chmod +x "${variant_dir}/${binary_name}"
	fi

	(
		cd "${variant_dir}"
		tar -czf "${variant}.tar.gz" "${binary_name}"
		shasum -a 256 "${variant}.tar.gz" >"${variant}.tar.gz.sha256"
	)
done

if [[ "$(uname -s)" == "Linux" && "$(uname -m)" == "x86_64" ]]; then
	"${RELEASE_ROOT}/linux-amd64/ads" search avatar --type component --limit 1 >/dev/null
	echo "Smoke-tested the Linux AMD64 Atlas plugin binary."
fi

release_timestamp="${RELEASE_TIMESTAMP:-$(date -u +"%Y-%m-%dT%H:%M:%SZ")}"
if grep -Fq "version = \"${VERSION}\"" "${MANIFEST_PATH}"; then
	echo "Release ${VERSION} was added to manifest.toml while its artifacts were being built. Try again with a new VERSION." >&2
	exit 1
fi

{
	printf '\n[[release]]\n'
	printf 'version = "%s"\n' "${VERSION}"
	printf 'timestamp = "%s"\n' "${release_timestamp}"
	printf 'variants = ["darwin-amd64", "darwin-arm64", "linux-amd64", "linux-arm64", "windows-amd64"]\n'
	printf 'channels = ["alpha"]\n'
} >>"${MANIFEST_PATH}"

echo "Prepared ADS Atlas plugin release ${VERSION} in ${RELEASE_ROOT}."
