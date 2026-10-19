const assert = require('assert');
const path = require('path');
const u = require('./util');

const cfg = { carpetaDestino: path.join('C:', 'Facturas'), estructura: '{proveedor}/{anio}/{mes}',
  tiposPermitidos: ['application/pdf', 'image/jpeg'], imagenesSoloConPalabras: true,
  palabrasFactura: ['factura'], alias: { 'Don Pepe 🍞': 'Panadería Pepe' } };

assert.strictEqual(u.limpiarNombre('Prov: A/B*?'), 'Prov A B');
assert.strictEqual(u.limpiarNombre('CON'), '_CON');
assert.strictEqual(u.limpiarNombre('  '), '_sin nombre');
assert.strictEqual(u.nombreProveedor('Don Pepe 🍞', cfg), 'Panadería Pepe');
assert.strictEqual(u.nombreProveedor('Grupo X', cfg, 'Ana'), 'Ana');
const f = new Date(2026, 9, 5);
assert.strictEqual(u.carpetaDestino(cfg, 'Pepe', f), path.join('C:', 'Facturas', 'Pepe', '2026', '10'));
cfg.estructura = '{anio}/{mes}/{proveedor}';
assert.strictEqual(u.carpetaDestino(cfg, 'Pepe', f), path.join('C:', 'Facturas', '2026', '10', 'Pepe'));
assert.strictEqual(u.nombreArchivo(f, 'F001.pdf', 'application/pdf', 'x'), '2026-10-05_F001.pdf');
assert.ok(/^2026-10-05_factura_ABC123\.jpg$/.test(u.nombreArchivo(f, null, 'image/jpeg', 'zzABC123')));
assert.ok(u.aceptaArchivo(cfg, 'application/pdf', '', ''));
assert.ok(!u.aceptaArchivo(cfg, 'image/jpeg', 'jaja', ''));
assert.ok(u.aceptaArchivo(cfg, 'image/jpeg', 'Factura 123', ''));
assert.ok(!u.aceptaArchivo(cfg, 'video/mp4', 'factura', ''));
console.log('util OK');
