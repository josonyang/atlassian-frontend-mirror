#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_DIR="$(cd "${SCRIPT_DIR}/../.." && pwd)"
readonly STATLAS_NAMESPACE="atlas-cli-plugin-ads"

if [[ -z "${VERSION:-}" ]]; then
	echo "Set VERSION before uploading an Atlas plugin release." >&2
	exit 1
fi

"${SCRIPT_DIR}/fetch-manifest.sh"
"${SCRIPT_DIR}/prepare-release.sh"

RELEASE_ROOT="${PACKAGE_DIR}/build/releases/${VERSION}"
variants=(
	"darwin-amd64"
	"darwin-arm64"
	"linux-amd64"
	"linux-arm64"
	"windows-amd64"
)

for variant in "${variants[@]}"; do
	variant_dir="${RELEASE_ROOT}/${variant}"

	(
		cd "${variant_dir}"
		atlas statlas put --file "${variant}.tar.gz" --namespace "${STATLAS_NAMESPACE}" \
			--subdirectory "releases/${VERSION}/"
		atlas statlas put --file "${variant}.tar.gz.sha256" --namespace "${STATLAS_NAMESPACE}" \
			--subdirectory "releases/${VERSION}/"
	)
	echo "Uploaded ${variant} artifacts for release ${VERSION}."
done

manifest_bundle="${RELEASE_ROOT}/manifest"
manifest_checksum="${RELEASE_ROOT}/manifest.toml.sha256"
(
	cd "${PACKAGE_DIR}"
	shasum -a 256 manifest.toml >"${manifest_checksum}"
)
tar -czf "${manifest_bundle}" -C "${PACKAGE_DIR}" manifest.toml \
	-C "${RELEASE_ROOT}" manifest.toml.sha256

# Publishing the manifest last makes the successfully uploaded artifacts installable.
atlas statlas post --file "${manifest_bundle}" --namespace "${STATLAS_NAMESPACE}"
echo "Published ADS Atlas plugin release ${VERSION} to the alpha channel."
