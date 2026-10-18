# Landing: Menopausia sin miedo (Nexo Editorial)

Página de venta del ebook **Menopausia sin miedo** + 3 bonos, para Hotmart.
HTML + CSS + JS puro, sin build: sube la carpeta tal cual a cualquier hosting (Netlify, Vercel, Hostinger, GitHub Pages).

> Debe servirse desde un hosting (o `python3 -m http.server`), no abriendo el archivo con doble clic: la escena 3D usa módulos de JavaScript.

## Antes de publicar (en `main.js`, objeto `CONFIG`)

| Campo | Qué poner |
|---|---|
| `checkoutUrl` | **Tu link de checkout de Hotmart.** Mientras tenga `XXXX`, los botones bajan a la sección de precio |
| `price` / `bumpPrice` | `US$17.97` / `US$9.97` |
| `guaranteeDays` | **Confirma los días configurados en Hotmart** (está en 7). Con `null` se ocultan todas las menciones de garantía |
| `testimonials` | Testimonios **reales y autorizados**. Mientras la lista esté vacía, la sección no aparece |

Ejemplo de testimonio:

```js
testimonials: [
  { quote: "Lo que la lectora escribió, tal cual.", name: "Nombre o iniciales", detail: "52 años, Bogotá" },
],
```

En `index.html`, pie de página: enlaza **Términos** y **Privacidad** y cambia `hola@tudominio.com`.

## Qué tiene

- **Intro de marca** al entrar (solo la primera vez por sesión).
- **Flor de loto 3D en tiempo real** (three.js + shaders propios): se abre al entrar, sus pétalos iridiscentes respiran, el centro dorado brilla y hay polen luminoso flotando. Sigue al puntero y cambia de lugar en cada sección (posiciones en `BLOOM_SPOTS`, `main.js`). Sin WebGL se ve un orbe en CSS.
- **Fondo de cielo animado** en toda la página: azul con nubes de luz blancas y toques lila y turquesa, que fluye y reacciona al mouse. La flor aparece en las secciones protagonistas y se recoge en las de contenido.
- **Estilo moderno**: tipografía Manrope con contraste de pesos, texto blanco, botones en píldora lima con flecha en círculo oscuro, tarjetas de vidrio.
- **Fila de tarjetas al pie del hero** que se desplaza sola (temas, bonos, plan de 14 días con títulos reales del Bono 1, 4 preguntas, precio).
- **Scroll suave** con inercia (Lenis) en escritorio.
- Página resumida: hero, manifiesto con zoom, 4 dolores en cuadrícula (deslizables en móvil), 10 capítulos desplegables, bonos que se desbloquean, oferta con borde de luz animado, garantía, para quién es, 5 preguntas frecuentes y cierre. Las fuentes de referencia van en el pie de página.
- Respeta `prefers-reduced-motion` (sin animaciones) y funciona aunque no carguen GSAP ni three.js.

## Lo que respeta (según tu brief)

- Sin precio tachado, sin cuenta regresiva, sin testimonios ni cifras inventadas.
- Sin promesas médicas: comprender, observar, actuar, cuidarse y saber cuándo consultar.
- Solo bajo **Nexo Editorial**; las fuentes (NIH, ACOG, The Menopause Society, HHS) se citan en el pie aclarando que no respaldan la guía.
- Aviso médico y aviso de "no afiliado a Meta" en el pie.
- No usa imágenes del ebook. `assets/og.jpg` (vista previa al compartir el link) es una captura del hero.

## Archivos

| Ruta | Qué es |
|---|---|
| `index.html` | Estructura y textos |
| `styles.css` | Diseño: temas noche/día y paleta de marca |
| `main.js` | Configuración, intro, scroll, escenas e interacciones |
| `bloom.js` | Escena 3D (three.js) |
| `assets/og.jpg` | Imagen al compartir en WhatsApp o redes (1200x630) |

## Probar en local

```bash
cd LANDING-MENOPAUSIA
python3 -m http.server 8000
# abre http://localhost:8000
```
