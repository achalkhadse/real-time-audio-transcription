# Real-time Audio Transcription

A lightweight real-time audio visualizer with live speech transcription using
Spring Boot WebSocket and a minimal frontend.

---

## Features
- Real-time microphone capture
- Circular audio visualizer (~60 FPS)
- WebSocket-based audio streaming
- Live speech transcription
- Minimal and lightweight implementation (~200 lines)

---

## Project Structure
```

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
└── README.md
---

## Quick Start

### Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
````

Server runs at:

```
http://localhost:8080
```

---

### Frontend

```bash
cd frontend
python -m http.server 3000
```

Or:

```bash
npx serve .
```

Open in browser:

```
http://localhost:3000
```

---

## How It Works

* The browser captures microphone audio using Web Audio API
* Audio data is streamed to the backend using WebSocket
* The backend processes audio frames and performs transcription
* Transcription results and audio data are streamed back in real time
* The frontend renders a circular audio visualizer

---

## Requirements

* Java 17+
* Maven
* Node.js (optional, for `npx serve`)
* Python 3 (optional, for static server)
