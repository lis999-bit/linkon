#!/bin/sh
# 시험 버전(test/)을 실제 버전(루트)으로 반영해요.
set -e
cd "$(dirname "$0")"
cp test/index.html test/app.js test/firebase-config.js test/version.json .
echo "test/ → 실제 버전으로 반영했어요. 커밋하고 올리면 적용돼요."
