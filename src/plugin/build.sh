#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
OUT_DIR="$ROOT_DIR/dist"
mkdir -p "$OUT_DIR"

if [ -f "${SCRIPT_DIR}/package.json" ]; then
  echo "Installing plugin dependencies..."
  cd "${SCRIPT_DIR}"
  npm install --silent
fi

npx esbuild "${SCRIPT_DIR}/index.ts" \
  --bundle \
  --format=iife \
  --platform=browser \
  --jsx=automatic \
  --external:react \
  --external:react-dom/client \
  --external:react/jsx-runtime \
  --sourcemap \
  --outfile="${OUT_DIR}/index.js"

echo "Built plugin to ${OUT_DIR}/index.js"
