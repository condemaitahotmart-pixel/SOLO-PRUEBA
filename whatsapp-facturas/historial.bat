@echo off
cd /d "%~dp0"
set /p DIAS=Cuantos dias hacia atras quieres descargar (ej. 30): 
node src/index.js --historial %DIAS%
pause
