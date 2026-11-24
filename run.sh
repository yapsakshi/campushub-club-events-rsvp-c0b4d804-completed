#!/usr/bin/env bash
set -e
BASE_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$BASE_DIR"
echo "Installing API dependencies..."
npm --prefix server install --no-audit --no-fund
echo "Installing web dependencies..."
npm --prefix client install --no-audit --no-fund
echo "Starting the app..."
nohup npm --prefix server start > "$BASE_DIR/server.log" 2>&1 &
nohup npm --prefix client run dev > "$BASE_DIR/client.log" 2>&1 &
for i in $(seq 1 30); do
  if curl -sf http://127.0.0.1:4000/api/events > /dev/null && curl -sf http://127.0.0.1:5173 > /dev/null; then
    echo "The app is live: the API is running on port 4000 and the web page on port 5173."
    echo "Run npm test to check your work."
    exit 0
  fi
  sleep 2
done
echo "The app did not start in time."; tail -n 50 "$BASE_DIR/server.log" "$BASE_DIR/client.log"; exit 1
