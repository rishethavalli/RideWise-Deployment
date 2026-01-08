# Start RideWise Backend and Frontend

# Backend
Write-Host "Starting Backend on port 8000..." -ForegroundColor Green
$backendProcess = Start-Process -FilePath 'C:\Users\HP\Desktop\ridewise\.venv\Scripts\uvicorn.exe' `
  -ArgumentList 'main:app', '--host', '127.0.0.1', '--port', '8000' `
  -WorkingDirectory 'C:\Users\HP\Desktop\ridewise\ridewise-backend' `
  -PassThru `
  -NoNewWindow

Start-Sleep -Seconds 3

# Frontend
Write-Host "Starting Frontend on port 3000..." -ForegroundColor Green
$frontendProcess = Start-Process -FilePath 'cmd.exe' `
  -ArgumentList '/C', 'cd C:\Users\HP\Desktop\ridewise\ridewise-frontend && npm run dev' `
  -PassThru

Write-Host "Backend PID: $($backendProcess.Id)" -ForegroundColor Cyan
Write-Host "Frontend PID: $($frontendProcess.Id)" -ForegroundColor Cyan
Write-Host "`nServers running:" -ForegroundColor Yellow
Write-Host "- Backend: http://127.0.0.1:8000" -ForegroundColor Yellow
Write-Host "- Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "`nPress Ctrl+C to stop all servers" -ForegroundColor Yellow

# Wait for any key
$host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") | Out-Null

# Kill processes
Write-Host "Stopping servers..." -ForegroundColor Red
Stop-Process -Id $backendProcess.Id -ErrorAction SilentlyContinue
Stop-Process -Id $frontendProcess.Id -ErrorAction SilentlyContinue
Write-Host "Servers stopped." -ForegroundColor Green
