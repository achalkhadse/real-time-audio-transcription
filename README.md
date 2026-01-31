## Real-Time Audio Transcription

A lightweight real-time audio visualizer with WebSocket-based audio streaming, built using Spring Boot and a minimal frontend.
The application captures microphone input and renders a circular audio visualization in real time.

## Note: Speech-to-text transcription logic is not fully integrated on the UI and is documented as a known limitation in QA reports.

## Features

Real-time microphone capture

Circular audio visualizer (~60 FPS)

WebSocket-based audio streaming

Backend-ready transcription pipeline (UI integration pending)

Minimal and lightweight implementation (~200 lines)

## Project Structure

real-time-audio-transcription/
├── frontend/
│   ├── index.html        # Main HTML page
│   ├── app.js            # Microphone capture, visualizer, WebSocket client
│   └── style.css         # Minimal styling
├── backend/
│   ├── pom.xml           # Maven dependencies
│   └── src/main/java/com/app/
│       ├── Application.java
│       └── AudioWebSocket.java
├── QA-Automation/
│   ├── Test_Plan.md
│   ├── Test_Scenarios.md
│   ├── Test_Cases.xlsx
│   ├── Bug_Report.md
│   └── Test_Summary_Report.md
└── README.md

## Quick Start
Backend (Spring Boot)
cd backend
./mvnw spring-boot:run


Server runs at:

http://localhost:8080

Frontend
cd frontend
python -m http.server 3000


Or:

npx serve .


Open in browser:

http://localhost:3000

## How It Works

Browser captures microphone audio using the Web Audio API

Audio data is streamed to the backend using WebSocket

Backend processes audio frames (transcription logic stub present)

Frontend renders a real-time circular audio visualizer

Transcription UI output is not yet displayed (tracked via QA)

## QA Documentation

Manual QA documentation including test plan, test scenarios, test cases, bug reports, and test summary is available in the QA-Automation folder.

## Requirements

Java 17+

Maven

Node.js (optional, for npx serve)

Python 3 (optional, for static server)