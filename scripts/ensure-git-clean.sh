#!/usr/bin/env bash

set -eu

if [ -z "$(git status --porcelain)" ]; then
  exit 0
fi

echo "Please ensure the repo is in a clean state by committing/ignoring changes."

git --no-pager diff

exit 1
