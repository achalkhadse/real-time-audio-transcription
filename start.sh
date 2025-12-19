#!/bin/bash

echo "🎵 Real-time Audio Transcription"
echo "================================"

# Start backend
echo "Starting Spring Boot backend..."
cd backend
./mvnw spring-boot:run &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

# Start frontend
echo "Starting frontend..."
cd ../frontend
python3 -m http.server 3000 &
FRONTEND_PID=$!

echo ""
echo "✅ Application started!"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for interrupt
trap "kill $BACKEND_PID $FRONTEND_PID" INT
wait