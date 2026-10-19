@echo off
cd /d "%~dp0"
:loop
node src/index.js
echo Reiniciando en 10 segundos... (cierra la ventana para detener)
timeout /t 10 /nobreak >nul
goto loop
