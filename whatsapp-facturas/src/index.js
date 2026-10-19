const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const u = require('./util');

const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config.json'), 'utf8'));
const args = process.argv.slice(2);
const modoHistorial = args.includes('--historial');
const modoListar = args.includes('--listar-chats');
const dias = Number(args.find((a) => /^\d+$/.test(a))) || cfg.diasHistorialPorDefecto;

fs.mkdirSync(cfg.carpetaDestino, { recursive: true });
const estadoPath = path.join(cfg.carpetaDestino, '.estado.json');
const indicePath = path.join(cfg.carpetaDestino, 'indice.csv');
const estado = fs.existsSync(estadoPath)
  ? JSON.parse(fs.readFileSync(estadoPath, 'utf8'))
  : { hashes: [] };
const vistos = new Set(estado.hashes);

function guardarEstado() {
  fs.writeFileSync(estadoPath, JSON.stringify({ hashes: [...vistos] }));
}

function log(...a) {
  console.log(`[${new Date().toLocaleString()}]`, ...a);
}

function chatPermitido(nombre) {
  const norm = (s) => s.toLowerCase();
  if ((cfg.ignorarChats || []).some((c) => norm(c) === norm(nombre))) return false;
  if ((cfg.soloChats || []).length === 0) return true;
  return cfg.soloChats.some((c) => norm(c) === norm(nombre));
}

async function procesarMensaje(msg, chat) {
  if (!msg.hasMedia) return false;
  const nombreChat = chat.name || chat.id.user;
  if (!chatPermitido(nombreChat)) return false;

  let media;
  try {
    media = await msg.downloadMedia();
  } catch (e) {
    log('No se pudo descargar un archivo de', nombreChat, '-', e.message);
    return false;
  }
  if (!media) return false;
  if (!u.aceptaArchivo(cfg, media.mimetype, msg.body, media.filename)) return false;

  const hash = u.hashBase64(media.data);
  if (vistos.has(hash)) return false;

  let remitente = null;
  if (chat.isGroup && cfg.grupoUsaRemitente) {
    try {
      const c = await msg.getContact();
      remitente = c.name || c.pushname || c.number;
    } catch (_) { /* usa el nombre del grupo */ }
  }

  const fecha = new Date(msg.timestamp * 1000);
  const proveedor = u.nombreProveedor(nombreChat, cfg, remitente);
  const carpeta = u.carpetaDestino(cfg, proveedor, fecha);
  fs.mkdirSync(carpeta, { recursive: true });

  let archivo = u.nombreArchivo(fecha, media.filename, media.mimetype, msg.id.id);
  let destino = path.join(carpeta, archivo);
  for (let n = 2; fs.existsSync(destino); n++) {
    const ext = path.extname(archivo);
    destino = path.join(carpeta, `${path.basename(archivo, ext)} (${n})${ext}`);
  }
  fs.writeFileSync(destino, Buffer.from(media.data, 'base64'));

  vistos.add(hash);
  guardarEstado();
  if (!fs.existsSync(indicePath)) {
    fs.writeFileSync(indicePath, '﻿fecha,proveedor,chat,archivo,ruta\n');
  }
  fs.appendFileSync(indicePath, [
    fecha.toISOString(), proveedor, nombreChat, path.basename(destino), destino
  ].map(u.csvCampo).join(',') + '\n');

  log('Guardado:', destino);
  return true;
}

async function historial(client) {
  const desde = Date.now() / 1000 - dias * 86400;
  const chats = await client.getChats();
  log(`Revisando ${chats.length} chats de los últimos ${dias} días...`);
  let total = 0;
  for (const chat of chats) {
    if (!chatPermitido(chat.name || chat.id.user)) continue;
    let mensajes = [];
    try {
      mensajes = await chat.fetchMessages({ limit: cfg.mensajesPorChatHistorial });
    } catch (e) {
      log('Error leyendo', chat.name, e.message);
      continue;
    }
    for (const m of mensajes) {
      if (m.timestamp < desde) continue;
      if (await procesarMensaje(m, chat)) total++;
    }
  }
  log(`Historial listo: ${total} archivos nuevos.`);
}

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: path.join(__dirname, '..', '.sesion') }),
  puppeteer: { headless: true, args: ['--no-sandbox'] }
});

client.on('qr', (qr) => {
  log('Escanea este QR con WhatsApp > Dispositivos vinculados > Vincular un dispositivo:');
  qrcode.generate(qr, { small: true });
});
client.on('authenticated', () => log('Sesión autenticada.'));
client.on('auth_failure', (m) => log('Fallo de autenticación:', m));
client.on('disconnected', (r) => {
  log('Desconectado:', r, '- reiniciando en 10s');
  setTimeout(() => process.exit(1), 10000); // run.bat lo vuelve a lanzar
});

client.on('ready', async () => {
  log('WhatsApp conectado.');
  if (modoListar) {
    const chats = await client.getChats();
    chats.forEach((c) => console.log(`${c.isGroup ? '[grupo]' : '[chat] '} ${c.name}`));
    await client.destroy();
    process.exit(0);
  }
  if (modoHistorial) {
    await historial(client);
    await client.destroy();
    process.exit(0);
  }
  log('Escuchando facturas nuevas. Deja esta ventana abierta.');
});

client.on('message', async (msg) => {
  try {
    if (!msg.hasMedia) return;
    const chat = await msg.getChat();
    await procesarMensaje(msg, chat);
  } catch (e) {
    log('Error procesando mensaje:', e.message);
  }
});

client.initialize();
