#!/bin/bash

echo "🚀 Starting both personas servers..."

# Function to kill background processes on exit
cleanup() {
    echo "🛑 Stopping servers..."
    kill $INFO_PID $PASTEUR_PID 2>/dev/null
    exit
}
trap cleanup SIGINT SIGTERM

# Start Info server (port 3001)
echo "📰 Starting Info server on port 3001..."
cd apps/app-info
npm run dev &
INFO_PID=$!

# Wait a moment for the first server to start
sleep 3

# Start Darwin server (port 3002)
echo "🌱 Starting Darwin server on port 3002..."
cd ../app-darwin
npm run dev &
PASTEUR_PID=$!

echo ""
echo "✅ Both servers are running!"
echo "📰 Info theme:    http://localhost:3001"
echo "🌱 Darwin theme:  http://localhost:3002"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $INFO_PID $DARWIN_PID

