package com.app;

import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/audio")
public class AudioWebSocket {
    
    private static final ConcurrentHashMap<Session, AudioProcessor> processors = new ConcurrentHashMap<>();
    
    @OnOpen
    public void onOpen(Session session) {
        System.out.println("Client connected: " + session.getId());
        processors.put(session, new AudioProcessor(session));
    }
    
    @OnMessage
    public void onMessage(String message, Session session) {
        AudioProcessor processor = processors.get(session);
        if (processor != null) {
            processor.processMessage(message);
        }
    }
    
    @OnClose
    public void onClose(Session session) {
        System.out.println("Client disconnected: " + session.getId());
        processors.remove(session);
    }
    
    @OnError
    public void onError(Session session, Throwable error) {
        System.err.println("Error on session " + session.getId() + ": " + error.getMessage());
        processors.remove(session);
    }
    
    private static class AudioProcessor {
        private final Session session;
        private final StringBuilder audioBuffer;
        private long lastProcessTime;
        
        public AudioProcessor(Session session) {
            this.session = session;
            this.audioBuffer = new StringBuilder();
            this.lastProcessTime = System.currentTimeMillis();
        }
        
        public void processMessage(String message) {
            try {
                // Parse JSON message
                if (message.contains("\"audio\"")) {
                    // Simple JSON parsing to extract audio data
                    String audioData = message.substring(message.indexOf("[") + 1, message.indexOf("]"));
                    
                    // Accumulate audio data
                    audioBuffer.append(audioData).append(",");
                    
                    // Process every 2 seconds
                    long currentTime = System.currentTimeMillis();
                    if (currentTime - lastProcessTime > 2000) {
                        processAudio();
                        lastProcessTime = currentTime;
                    }
                }
            } catch (Exception e) {
                System.err.println("Error processing message: " + e.getMessage());
            }
        }
        
        private void processAudio() {
            try {
                // Simulate transcription
                String transcription = simulateTranscription();
                
                if (!transcription.isEmpty()) {
                    String response = String.format("{\"text\":\"%s\",\"confidence\":0.85}", transcription);
                    session.getBasicRemote().sendText(response);
                    System.out.println("Transcription: " + transcription);
                }
                
                // Clear buffer
                audioBuffer.setLength(0);
                
            } catch (IOException e) {
                System.err.println("Error sending transcription: " + e.getMessage());
            }
        }
        
        private String simulateTranscription() {
            String[] samples = {
                "Hello, how are you?",
                "This is a test",
                "Audio processing working",
                "Speech recognition active",
                "Microphone is capturing",
                "Real-time transcription",
                "Voice detection successful",
                "Audio quality good",
                "Processing complete",
                "Transmission received"
            };
            
            // Return random sample 70% of the time
            return Math.random() > 0.3 ? samples[(int)(Math.random() * samples.length)] : "";
        }
    }
}