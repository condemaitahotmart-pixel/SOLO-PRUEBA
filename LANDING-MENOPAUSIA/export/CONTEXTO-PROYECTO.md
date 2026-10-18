# Contexto: landing "Menopausia sin miedo" (Nexo Editorial)

Pega este documento en el nuevo chat junto con el archivo `landing-menopausia.html`. Resume el producto, las reglas del copy, las decisiones de diseño ya tomadas y lo que falta.

---

## 1. El producto

- **Producto principal:** *Menopausia sin miedo · Guía práctica para mujeres +40*. Ebook en PDF: 10 capítulos y 8 herramientas prácticas.
- **Bonos incluidos** (se liberan de forma progresiva para no saturar):
  - Bono 1 · *Tus primeros 14 días* · se desbloquea el día 3. Una acción por día, de 5 a 15 minutos. Títulos reales de los días: "¿Qué necesita más atención hoy?", "Detecta cuándo aparece", "¿Qué parece ayudarte?", "Crea una transición hacia la noche"…
  - Bono 2 · *7 noches para cuidar tu descanso* · día 6.
  - Bono 3 · *Mi consulta sobre menopausia* · día 8.
- **Order bump (opcional en el checkout):** *Plan Menopausia +40 · 30 días para volver a cuidarte* · US$9.97.
- **Precio:** US$17.97, pago único. **No hay precio anterior real**: no usar precio tachado.
- **Venta:** Hotmart. **Tráfico previsto:** Meta Ads (Facebook e Instagram), por eso el diseño es mobile first.
- **Marca:** Nexo Editorial, "Conocimiento práctico para la vida real". Se presenta **solo como marca**: sin autora, sin foto y sin credenciales.

### Los 10 capítulos
1. La etapa de la que casi nadie nos habló
2. Cuando tu cuerpo cambia (Mapa personal de cambios)
3. Energía y sueño (Plan de recuperación de energía, 7 días)
4. Alimentación en esta nueva etapa (Mapa de alimentación consciente, 7 días)
5. Movimiento después de los 40 (Plan de movimiento sostenible, 30 días)
6. Emociones, estrés y mente (Plan de equilibrio emocional)
7. Feminidad, autoestima e intimidad (Reconexión contigo)
8. Tu salud en tus manos (Mi preparación para la consulta)
9. Tu propio plan de bienestar (Mi plan personal de bienestar)
10. Una nueva versión de ti (Una carta para esta nueva etapa)

Fuentes que cita el ebook: NIH (National Institute on Aging), ACOG, The Menopause Society y U.S. Department of Health and Human Services. **Siempre** aclarar que no están afiliadas a la guía ni la respaldan.

## 2. Cliente ideal

- Mujeres hispanohablantes de unos 40 a 58 años, en la perimenopausia o la menopausia.
- **Dolores:** (1) sueño y falta de energía; (2) cambios físicos y desconexión con su cuerpo; (3) cambios emocionales: "no me reconozco"; (4) **confusión sobre qué hacer** (el dolor transversal): consejos contradictorios.
- **Transformación:** de "Mi cuerpo cambió y no sé qué hacer" a "Entiendo mejor lo que estoy viviendo, sé qué observar y tengo herramientas para empezar a cuidarme".
- **Idea central:** no busca que vuelvas a ser la mujer que eras antes; busca ayudarte a comprender y cuidar mejor a la mujer que eres hoy.
- Las objeciones son hipótesis aún sin validar: "¿me va a servir?", "hay mucha info gratis", "no tengo tiempo", "no fui constante", "¿será la menopausia?", "¿es teórica?", "¿tengo que cambiar toda mi vida?".

## 3. Reglas del copy (obligatorias)

- **No** hacer promesas médicas ni garantizar resultados. Frases prohibidas: "elimina los síntomas", "equilibra tus hormonas", "pierde X kilos", "recupera tu cuerpo de antes", "cura el insomnio".
- El lenguaje va por comprender, observar, actuar, cuidarse mejor y saber cuándo consultar.
- **No** inventar testimonios, cifras de ventas, valoraciones, autora ni urgencia (no hay cuenta regresiva ni fecha límite real).
- Mantener el aviso médico y el aviso de "no afiliado a Meta" en el pie de página.

## 4. Diseño actual (decidido con la dueña tras varias iteraciones)

- **Estilo "cielo"**, inspirado en una plantilla de referencia ("Aeline"): fondo azul animado con nubes de luz, texto blanco, tipografía **Manrope** con contraste de pesos (frase en grueso más continuación en fino), **botones en píldora lima** (`#e3f27c`) con flecha en círculo azul marino (`#10243d`) y tarjetas de vidrio azulado.
- **Flor de loto 3D en tiempo real** (three.js con shaders propios): se abre al entrar, sus pétalos rosados respiran, el centro es dorado y hay polen flotando. Sigue al mouse y cambia de posición según la sección (`BLOOM_SPOTS` en el JS). En las secciones de contenido se recoge.
- **Intro de marca** (una vez por sesión), scroll suave (Lenis), animaciones con GSAP + ScrollTrigger, títulos que suben por máscara y botones magnéticos.
- **Sin menú superior** (la dueña pidió quitarlo).
- **Hero:** "Tu cuerpo cambió. / Tú también puedes entenderlo." + botón "QUIERO MI GUÍA" + línea "10 capítulos · 3 bonos · US$17.97 pago único" + **fila de tarjetas que se desplaza sola** (temas, bonos, plan de 14 días, 4 preguntas, precio).
- **Orden de las secciones (versión resumida):** hero → manifiesto con zoom → 4 dolores (cuadrícula 2×2 en escritorio, deslizables en móvil) → 10 capítulos desplegables → bonos que se desbloquean (línea de tiempo) → oferta con borde de luz y order bump → garantía (sello que gira) → ¿es para ti? → 5 preguntas frecuentes → cierre ("Tu historia todavía la estás escribiendo.") → pie con avisos y fuentes. En móvil hay una barra fija con el precio y el botón.

**Lo que la dueña rechazó (no volver a proponer):** usar las portadas o páginas del ebook en la landing; la versión ilustrada clara al estilo "Claude Design" (mujer en arco); la forma 3D tipo "blob" (parecía un embrión); el fondo oscuro ciruela; una página demasiado larga; el menú superior.

## 5. Datos que faltan (en `CONFIG`, al principio del último `<script>` del HTML)

| Campo | Estado |
|---|---|
| `checkoutUrl` | **Falta** el link real de checkout de Hotmart (hoy `https://pay.hotmart.com/XXXXXXXXXX`; mientras tenga XXXX, los botones bajan a la sección de precio) |
| `guaranteeDays` | Está en `7` (mínimo de Hotmart); **confirmar**. Con `null` se ocultan las menciones a la garantía |
| `testimonials` | Vacío. Aquí van testimonios **reales y autorizados**; la sección aparece sola cuando hay al menos uno |
| Pie de página | Faltan los enlaces de Términos y Privacidad y el correo real (hoy `hola@tudominio.com`) |

## 6. Notas técnicas del archivo

- `landing-menopausia.html` es un **único archivo**: CSS, JS y los iconos (Phosphor) van incluidos. Por CDN carga GSAP 3.12.5, ScrollTrigger, Lenis 1.1.13 y three.js 0.160 (como módulo), más Manrope desde Google Fonts.
- Hay que **servirlo desde un hosting** (Netlify, Vercel, Hostinger…), no con doble clic, porque el 3D usa módulos de JavaScript. Para probarlo en local: `python3 -m http.server`.
- La imagen para compartir en redes es `og.jpg` (1200x630) y debe ir al lado del HTML, en `assets/og.jpg`.
- Respeta "reducir movimiento" del sistema y sigue funcionando si no cargan GSAP o three.js (en ese caso queda un orbe en CSS).
- Código fuente original separado en archivos (index.html, styles.css, main.js, bloom.js): repo `condemaitahotmart-pixel/SOLO-SKILLS`, carpeta `LANDING-MENOPAUSIA/`, rama `claude/intelligent-gates-u7nmrd`.

## 7. Estado

Página ya resumida (unos 11.400 px de alto en escritorio). Lo único pendiente son los datos de la sección 5, que debe aportar la dueña.
