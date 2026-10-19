@echo off
cd /d "%~dp0"
echo Instalando dependencias (puede tardar unos minutos)...
call npm install
echo.
echo Listo. Ahora ejecuta iniciar.bat y escanea el QR.
pause
