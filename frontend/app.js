class AudioVisualizer {
    constructor() {
        this.canvas = document.getElementById('visualizer');
        this.ctx = this.canvas.getContext('2d');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.status = document.getElementById('status');
        this.transcription = document.getElementById('transcription');
        
        this.socket = null;
        this.audioContext = null;
        this.analyser = null;
        this.microphone = null;
        this.isRecording = false;
        
        this.setupCanvas();
        this.setupEventListeners();
        this.connectWebSocket();
    }
    
    setupCanvas() {
        this.canvas.width = 600;
        this.canvas.height = 400;
    }
    
    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
    }
    
    connectWebSocket() {
        this.socket = new WebSocket('ws://localhost:8080/audio');
        
        this.socket.onopen = () => {
            this.updateStatus('Connected', true);
        };
        
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.text) {
                this.addTranscription(data.text);
            }
        };
        
        this.socket.onclose = () => {
            this.updateStatus('Disconnected', false);
        };
        
        this.socket.onerror = () => {
            this.updateStatus('Error', false);
        };
    }
    
    updateStatus(text, connected) {
        this.status.textContent = text;
        this.status.className = connected ? 'status connected' : 'status disconnected';
    }
    
    async start() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            
            this.microphone = this.audioContext.createMediaStreamSource(stream);
            this.microphone.connect(this.analyser);
            
            // Send audio to backend
            this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);
            this.processor.onaudioprocess = (event) => {
                const input = event.inputBuffer.getChannelData(0);
                this.socket.send(JSON.stringify({ audio: Array.from(input) }));
            };
            this.microphone.connect(this.processor);
            this.processor.connect(this.audioContext.destination);
            
            this.isRecording = true;
            this.startBtn.disabled = true;
            this.stopBtn.disabled = false;
            
            this.visualize();
            
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Please allow microphone access');
        }
    }
    
    stop() {
        if (this.microphone) {
            this.microphone.disconnect();
            this.microphone = null;
        }
        
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        
        this.isRecording = false;
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    visualize() {
        if (!this.isRecording) return;
        
        requestAnimationFrame(() => this.visualize());
        
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteFrequencyData(dataArray);
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = 100;
        const bars = 64;
        
        for (let i = 0; i < bars; i++) {
            const angle = (i / bars) * Math.PI * 2;
            const barHeight = (dataArray[i] / 255) * 150;
            
            const x1 = centerX + Math.cos(angle) * radius;
            const y1 = centerY + Math.sin(angle) * radius;
            const x2 = centerX + Math.cos(angle) * (radius + barHeight);
            const y2 = centerY + Math.sin(angle) * (radius + barHeight);
            
            this.ctx.strokeStyle = `hsl(${(i / bars) * 360}, 100%, 50%)`;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        }
    }
    
    addTranscription(text) {
        const div = document.createElement('div');
        div.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
        this.transcription.insertBefore(div, this.transcription.firstChild);
        
        // Keep only last 10 transcriptions
        while (this.transcription.children.length > 10) {
            this.transcription.removeChild(this.transcription.lastChild);
        }
    }
}

// Initialize when page loads
window.addEventListener('load', () => {
    new AudioVisualizer();
});