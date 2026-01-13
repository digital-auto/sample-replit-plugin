#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="$ROOT_DIR"
mkdir -p "$OUT_DIR"

if [ -f "${ROOT_DIR}/package.json" ]; then
  echo "Installing plugin dependencies..."
  cd "${ROOT_DIR}"
  npm install --silent
fi

npx esbuild "${ROOT_DIR}/index.ts" \
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
