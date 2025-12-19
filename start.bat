@echo off
echo 🎵 Real-time Audio Transcription
echo ================================

echo Starting Spring Boot backend...
cd backend
start "Backend" cmd /c "mvnw spring-boot:run"

timeout /t 5

echo Starting frontend...
cd ../frontend
start "Frontend" cmd /c "python -m http.server 3000"

echo.
echo ✅ Application started!
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:8080
echo.
echo Press any key to exit...
pause