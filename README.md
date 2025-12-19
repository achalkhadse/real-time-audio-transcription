Real-time Audio Transcription
A lightweight real-time audio visualizer with live transcription using Spring Boot WebSocket.

Quick Start
Backend (Spring Boot)
bash

Line Wrapping

Collapse
Copy
1
2
cd backend
./mvnw spring-boot:run
Server runs on http://localhost:8080

Frontend
bash

Line Wrapping

Collapse
Copy
1
2
3
4
5
cd frontend
# Serve with any static server
python -m http.server 3000
# or
npx serve .
Open http://localhost:3000

Features
Circular audio visualizer with 60 FPS
Real-time microphone capture
WebSocket audio streaming
Live speech transcription
Minimal code (~200 lines total)

Structure
real-time-audio-transcription/
├── frontend/
│   ├── index.html    # Main HTML page
│   ├── app.js        # Mic + equalizer + websocket
│   └── style.css     # Minimal styling
├── backend/
│   ├── pom.xml       # Maven dependencies
│   └── src/main/java/com/app/
│       ├── Application.java
│       └── AudioWebSocket.java
└── README.md