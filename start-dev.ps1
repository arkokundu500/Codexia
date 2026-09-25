# Start Redis container
Write-Host "Starting Redis via Docker..." -ForegroundColor Cyan
docker compose -f backend/docker-compose.yaml up -d

# Start backend microservices in separate windows
Write-Host "Launching Microservices & Frontend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$host.ui.RawUI.WindowTitle='Gateway (8000)'; cd backend/gateway; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$host.ui.RawUI.WindowTitle='Auth Service (8001)'; cd backend/services/auth; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$host.ui.RawUI.WindowTitle='Project Service (8002)'; cd backend/services/project; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$host.ui.RawUI.WindowTitle='File Service (8003)'; cd backend/services/file; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$host.ui.RawUI.WindowTitle='AI Service (8004)'; cd backend/services/ai; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$host.ui.RawUI.WindowTitle='Terminal Service (8005)'; cd backend/services/terminal; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$host.ui.RawUI.WindowTitle='Payment Service (8006)'; cd backend/services/payment; npm run dev"

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$host.ui.RawUI.WindowTitle='Frontend (5173)'; cd frontend; npm run dev"

Write-Host "All services started!" -ForegroundColor Yellow
