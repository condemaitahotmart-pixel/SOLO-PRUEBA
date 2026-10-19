const path = require('path');
const crypto = require('crypto');

const RESERVADOS = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i;
const MESES = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

// Limpia un texto para usarlo como nombre de carpeta/archivo en Windows.
function limpiarNombre(texto, max = 80) {
  let s = String(texto || '')
    .normalize('NFC')
    .replace(/[\u0000-\u001f<>:"/\\|?*]/g, ' ')
    .replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\uFE0F]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[. ]+$/, '');
  if (s.length > max) s = s.slice(0, max).trim();
  if (!s || RESERVADOS.test(s)) s = `_${s || 'sin nombre'}`;
  return s;
}

function nombreProveedor(nombreChat, cfg, remitente) {
  const base = remitente || nombreChat;
  const alias = cfg.alias || {};
  return limpiarNombre(alias[base] || alias[nombreChat] || base);
}

function carpetaDestino(cfg, proveedor, fecha) {
  const anio = String(fecha.getFullYear());
  const mes = MESES[fecha.getMonth()];
  const partes = (cfg.estructura || '{proveedor}/{anio}/{mes}')
    .split('/')
    .map((p) => p.replace('{proveedor}', proveedor).replace('{anio}', anio).replace('{mes}', mes));
  return path.join(cfg.carpetaDestino, ...partes.map((p) => limpiarNombre(p)));
}

const EXT = {
  'application/pdf': '.pdf',
  'text/xml': '.xml',
  'application/xml': '.xml',
  'image/jpeg': '.jpg',
  'image/png': '.png'
};

function nombreArchivo(fecha, original, mimetype, id) {
  const ext = path.extname(original || '') || EXT[mimetype] || '';
  const base = original ? path.basename(original, path.extname(original)) : 'factura';
  const dia = `${fecha.getFullYear()}-${MESES[fecha.getMonth()]}-${String(fecha.getDate()).padStart(2, '0')}`;
  const corto = String(id || '').slice(-6).replace(/[^A-Za-z0-9]/g, '');
  return `${dia}_${limpiarNombre(base, 60)}${original ? '' : '_' + corto}${ext}`;
}

function hashBase64(b64) {
  return crypto.createHash('sha1').update(b64).digest('hex');
}

function aceptaArchivo(cfg, mimetype, textoMensaje, nombreOriginal) {
  if (!(cfg.tiposPermitidos || []).includes(mimetype)) return false;
  if (mimetype.startsWith('image/') && cfg.imagenesSoloConPalabras) {
    const t = `${textoMensaje || ''} ${nombreOriginal || ''}`.toLowerCase();
    return (cfg.palabrasFactura || []).some((p) => t.includes(p.toLowerCase()));
  }
  return true;
}

function csvCampo(v) {
  return `"${String(v ?? '').replace(/"/g, '""')}"`;
}

module.exports = {
  limpiarNombre, nombreProveedor, carpetaDestino, nombreArchivo, hashBase64, aceptaArchivo, csvCampo
};
