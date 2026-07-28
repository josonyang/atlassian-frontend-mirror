#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_DIR="$(cd "${SCRIPT_DIR}/../.." && pwd)"
MANIFEST_PATH="${PACKAGE_DIR}/manifest.toml"
readonly STATLAS_NAMESPACE="atlas-cli-plugin-ads"

if [[ -z "${VERSION:-}" ]]; then
	echo "Set VERSION to the alpha release that you want to promote." >&2
	exit 1
fi

if [[ ! "${VERSION}" =~ ^[0-9A-Za-z][0-9A-Za-z._+-]*$ ]]; then
	echo "Use only letters, numbers, dots, underscores, plus signs, and hyphens in VERSION." >&2
	exit 1
fi

ALLOW_MISSING_REMOTE_MANIFEST=false "${SCRIPT_DIR}/fetch-manifest.sh"

temporary_manifest="$(mktemp "${TMPDIR:-/tmp}/ads-atlas-promote.XXXXXX")"
temporary_dir="$(mktemp -d "${TMPDIR:-/tmp}/ads-atlas-promote-bundle.XXXXXX")"

cleanup() {
	rm -f "${temporary_manifest}" "${temporary_dir}/manifest.toml.sha256" "${temporary_dir}/manifest"
	rmdir "${temporary_dir}" 2>/dev/null || true
}
trap cleanup EXIT

if awk -v target="${VERSION}" '
	BEGIN {
		in_release = 0
		version_matches = 0
		found = 0
		changed = 0
		already_stable = 0
	}
	$0 == "[[release]]" {
		in_release = 1
		version_matches = 0
	}
	in_release && /^version = "/ {
		version = $0
		sub(/^version = "/, "", version)
		sub(/"$/, "", version)
		version_matches = version == target
		if (version_matches) {
			found = 1
		}
	}
	in_release && version_matches && /^channels = \[/ {
		if ($0 ~ /"stable"/) {
			already_stable = 1
		} else {
			sub(/\][[:space:]]*$/, ", \"stable\"]")
			changed = 1
		}
	}
	{ print }
	END {
		if (!found) {
			exit 2
		}
		if (!changed && !already_stable) {
			exit 3
		}
		if (already_stable) {
			exit 4
		}
	}
' "${MANIFEST_PATH}" >"${temporary_manifest}"; then
	:
else
	status=$?
	case "${status}" in
		2)
			echo "Release ${VERSION} isn't in the remote manifest. Upload it to alpha first." >&2
			;;
		3)
			echo "Release ${VERSION} doesn't have a channels field in the remote manifest." >&2
			;;
		4)
			echo "Release ${VERSION} is already on the stable channel."
			exit 0
			;;
		*)
			echo "Couldn't update the remote manifest for release ${VERSION}." >&2
			;;
	esac
	exit 1
fi

mv "${temporary_manifest}" "${MANIFEST_PATH}"
(
	cd "${PACKAGE_DIR}"
	shasum -a 256 manifest.toml >"${temporary_dir}/manifest.toml.sha256"
)
tar -czf "${temporary_dir}/manifest" -C "${PACKAGE_DIR}" manifest.toml \
	-C "${temporary_dir}" manifest.toml.sha256

atlas statlas post --file "${temporary_dir}/manifest" --namespace "${STATLAS_NAMESPACE}"
echo "Promoted ADS Atlas plugin release ${VERSION} to the stable channel."
