#!/bin/bash

set -euo pipefail

site_dir="landing-page"
repo_root="$(cd "$(dirname "$0")" && pwd)"

usage() {
  cat <<'EOF'
Usage:
  ./upload-site.sh FILE [FILE ...]

Copies each file into landing-page/ using its filename, commits the changes,
and publishes them to GitHub Pages on origin/main.

Examples:
  ./upload-site.sh ~/Downloads/index.html ~/Downloads/style.css
  ./upload-site.sh ~/Downloads/script.js
EOF
}

if [ "$#" -eq 0 ]; then
  usage >&2
  exit 1
fi

cd "$repo_root"

if [ -n "$(git status --short)" ]; then
  echo "Working tree is not clean. Commit or stash existing changes first." >&2
  git status --short
  exit 1
fi

uploaded_files=()

for source in "$@"; do
  if [ ! -f "$source" ]; then
    echo "File not found: $source" >&2
    exit 1
  fi

  filename="$(basename "$source")"
  case "$filename" in
    index.html|style.css|script.js|*.jpg|*.jpeg|*.png|*.gif|*.webp|*.svg|*.pdf)
      ;;
    *)
      echo "Unsupported site file: $filename" >&2
      echo "Allowed files: index.html, style.css, script.js, images, and PDFs." >&2
      exit 1
      ;;
  esac

  cp "$source" "$site_dir/$filename"
  uploaded_files+=("$site_dir/$filename")
done

git diff --check
git add -- "${uploaded_files[@]}"

if git diff --cached --quiet; then
  echo "No changes detected; nothing was uploaded."
  exit 0
fi

git commit -m "Update landing page files" \
  -m "Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>"
git push origin HEAD:main

echo
echo "Published to GitHub Pages: https://mogwaixcodes.github.io/Website/landing-page/"
