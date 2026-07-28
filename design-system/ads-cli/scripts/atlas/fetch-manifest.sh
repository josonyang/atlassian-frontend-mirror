#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_DIR="$(cd "${SCRIPT_DIR}/../.." && pwd)"
MANIFEST_PATH="${PACKAGE_DIR}/manifest.toml"
readonly STATLAS_NAMESPACE="atlas-cli-plugin-ads"

temporary_manifest="$(mktemp "${TMPDIR:-/tmp}/ads-atlas-manifest.XXXXXX")"
temporary_error="$(mktemp "${TMPDIR:-/tmp}/ads-atlas-manifest-error.XXXXXX")"

cleanup() {
	rm -f "${temporary_manifest}" "${temporary_error}"
}
trap cleanup EXIT

if atlas statlas get --namespace "${STATLAS_NAMESPACE}" --subdirectory manifest.toml \
	>"${temporary_manifest}" 2>"${temporary_error}"; then
	if ! grep -q '^name = "ads"$' "${temporary_manifest}"; then
		echo "The remote manifest doesn't describe the ads plugin." >&2
		exit 1
	fi

	mv "${temporary_manifest}" "${MANIFEST_PATH}"
	echo "Fetched the ADS Atlas plugin manifest from ${STATLAS_NAMESPACE}."
	exit 0
fi

cat "${temporary_error}" >&2
echo "Couldn't fetch the ADS Atlas plugin manifest from ${STATLAS_NAMESPACE}. Check Statlas access and try again." >&2
exit 1
