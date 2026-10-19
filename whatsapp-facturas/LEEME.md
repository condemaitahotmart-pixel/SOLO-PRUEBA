# WhatsApp → Facturas

Descarga automáticamente PDF, XML e imágenes de factura que lleguen a tus chats y grupos
de WhatsApp y los guarda en `C:\Facturas\Proveedor\AAAA\MM\`.

## Instalación (Windows)
1. Instala Node.js LTS desde https://nodejs.org
2. Copia esta carpeta a tu PC (ej. `C:\whatsapp-facturas`).
3. Doble clic en `instalar.bat`.
4. Doble clic en `iniciar.bat`. Escanea el QR con WhatsApp → Dispositivos vinculados.
   (La sesión queda guardada; no vuelve a pedir QR.)
5. Opcional: `historial.bat` descarga lo de los últimos N días.
6. Para que arranque con Windows: Win+R → `shell:startup` → pega un acceso directo a `iniciar.bat`.

## Configuración (`config.json`)
- `carpetaDestino`: dónde se guardan.
- `estructura`: `{proveedor}/{anio}/{mes}` o `{anio}/{mes}/{proveedor}`.
- `alias`: renombra un chat/grupo al nombre de proveedor que quieras.
- `soloChats` / `ignorarChats`: filtra chats (usa `listar-chats.bat` para ver los nombres exactos).
- `grupoUsaRemitente`: en grupos, usar el nombre de quien envía en vez del nombre del grupo.
- `imagenesSoloConPalabras`: las fotos solo se guardan si el texto o nombre contiene una palabra de `palabrasFactura` (evita guardar memes). PDF y XML siempre se guardan.

## Resultado
- Archivos sin duplicados (se compara el contenido).
- `indice.csv` en la carpeta destino: fecha, proveedor, chat, archivo y ruta (abre en Excel).

## Aviso
Usa una librería no oficial; va contra los términos de WhatsApp y hay un riesgo pequeño de
bloqueo del número. Se recomienda usar un número secundario vinculado a esos chats.
El PC debe estar encendido y con la ventana abierta para recibir en tiempo real.
