# Contexto: web de LSVZ (continuación de trabajo anterior)

Llevamos varias sesiones construyendo esta web y quiero que continúes exactamente donde lo dejamos, con el mismo criterio de diseño y forma de trabajar. Antes de nada, lee este documento entero y échale un vistazo a los archivos del proyecto (todo está en la carpeta que te he pasado). No hace falta que me preguntes qué es cada cosa — está todo aquí y en el propio código.

## Qué es esto

Web para **LSVZ** (Latino Studentenverein Zürich — antes "Latin Club"), la asociación de estudiantes latinos e hispanohablantes de Zürich. Sustituye una web antigua muy genérica. Site estático, 6 páginas: Inicio, Historia, Próximos eventos, Eventos pasados, Equipo, Hazte miembro.

## Stack — importante

**HTML + CSS + JS puro. Sin frameworks, sin build tools, sin npm packages en producción.** Nada de React/Vue/etc., aunque alguna referencia visual que te pase el usuario esté en React (ReactBits) — siempre se reimplementa en vanilla JS/CSS. Se abre con `npx serve -l 5173 .` desde la raíz, o con la extensión Live Server de VS Code.

Estructura:
```
index.html, history.html, events-upcoming.html, events-past.html, staff.html, join.html
assets/css/  → base.css (tokens/reset), components.css (nav, footer, botones, tile-divider), pages.css (todo lo específico de cada página)
assets/js/   → i18n.js (diccionario EN/ES), main.js (toda la interactividad)
assets/img/patterns/ → los 6 SVG de azulejos (uno por página)
assets/img/photos/   → fotos reales, una subcarpeta por página (home/, history/, events-upcoming/, events-past/, staff/, join/) + README.md explicando la convención
PRODUCT.md → contexto de producto escrito al principio (usuarios, misión, posicionamiento) — puede estar algo desactualizado en detalles de diseño concretos, pero el contexto de fondo sigue siendo válido
.claude/skills/impeccable/ → skill de guía de diseño instalado al principio; se usó de referencia puntual pero el diseño se decidió sobre todo por diálogo directo con el usuario, no con su flujo pesado de multi-agente
```

## Sistema de diseño

- **Paleta**: hueso/crema (`--bone-050` a `--bone-300`) + rojo terracota (`--red-050` a `--red-800`, con `--accent`/`--accent-deep` como atajos) + tinta oscura (`--ink-900`/`--ink-700`). Nada de azul — el usuario fue explícito: solo rojo y blanco/hueso, "mediterráneo".
- **Tipografía**: Unbounded (titulares) + Archivo (cuerpo), vía Google Fonts.
- **Motivo de marca — azulejos**: patrón geométrico inspirado en azulejería andaluza/valenciana, con lacería/estrellas de 8 puntas. Cada página tiene su propio motivo (variable CSS `--tile-red`/`--tile-bone` sobrescrita en el `<style>` del `<head>` de cada página): estrella (inicio), cuatrifolio (historia), sunburst (próximos eventos), molinillo (equipo), festón/flor (eventos pasados), corona (hazte miembro). El logo (flor de 6 pétalos) es una simplificación de ese mismo lenguaje geométrico.
- **Separadores entre secciones**: franjas de azulejo (`.tile-divider`), todas unificadas al colorway oscuro (`tile-divider--bone`) por petición del usuario — nunca mezclar con el colorway claro. Tienen una deriva horizontal continua y lenta (`tile-drift`, 9s) vía `background-position`.
- **Sensación buscada**: "moderna, con movimiento", pero cualquier animación ha de ser sutil/lenta — el usuario ha pedido varias veces bajar la velocidad o quitar movimiento que "marea" o "usa demasiado espacio/tiempo". Ante la duda, más discreto.

## Bilingüe (EN por defecto, ES seleccionable)

`assets/js/i18n.js`: diccionario `en`/`es` con las mismas claves en ambos (verificado repetidamente que están en paridad exacta). Sistema `data-i18n`/`data-i18n-html` + botones `.lang-toggle`, persistido en `localStorage`. **Todo el contenido nuevo que añadas debe ir en ambos idiomas**, no solo en inglés — así se ha hecho con toda la historia real, por ejemplo.

## Lo que ya está construido (funcionalidad)

- Nav responsive (menú hamburguesa en móvil), botón de idioma.
- Reveals al hacer scroll (`.reveal`/`.reveal-group`, IntersectionObserver), texto que se divide en palabras y aparece con blur (`data-split-words`) — **ojo**: se ejecuta en `DOMContentLoaded` a propósito, después de que i18n.js aplique las traducciones (si no, i18n.js borra el split).
- Botones magnéticos + chispa de partículas al hacer clic (solo `.btn--primary`).
- Tarjetas con inclinación 3D + brillo al pasar el ratón (eventos, galería, equipo).
- **Portada de inicio (index.html)**: sección `.scroll-expand` — foto en un marco pequeño y redondeado que se expande a pantalla completa según el usuario hace scroll (clip-path animado vía scroll, suavizado con rAF/lerp — adaptado a mano de un componente de ReactBits, sin librería). El menú (`#siteHeader`) está oculto hasta que la expansión llega al 97%, entonces aparece. Encima del marco, centrada y **fija en su sitio durante todo el scroll** (no se mueve ni desaparece — pedido explícito), la marca LSVZ: la flor gira al aparecer, "LSVZ" + "Latino Student Verein Zürich" emergen desde el icono (truco de grid `0fr→1fr` + wrapper `max-content` para que no se expanda simétricamente desde el centro). Debajo, una flechita de scroll discreta aparece 4,2s después con un rebote suave, y esa sí se desvanece al empezar a hacer scroll. Solo `index.html` tiene esta mecánica (clase `has-scroll-expand` en el `<body>`); el resto de páginas tienen el menú siempre visible.
- **Historia**: línea de tiempo vertical con la línea roja "dibujándose" según el scroll (JS mide progreso y ajusta la altura de `.timeline-v__progress`), puntos con año + frase corta que se despliegan al hacer clic (año/título/frase completa/foto — usa el truco CSS `grid-template-rows: 0fr → 1fr` para la animación de despliegue). Contenido real de la historia (fundación 2006 como Latin Club, refundación 2007 como LSVZ, junta de 2010 con José Parra Moyano, etc.) ya escrito y traducido. Cita destacada en banda roja a mitad de la línea de tiempo.
- Formulario "Hazte miembro": iframe con placeholder `REPLACE_WITH_GOOGLE_FORM_EMBED_URL` — el usuario ya tiene un Google Form real conectado a un Excel, solo falta pegar la URL.
- Botón "Buy tickets" en cada evento próximo, con `href="REPLACE_WITH_TICKET_URL"` (marcado con comentario HTML) para que el usuario lo vincule evento a evento.

## Lo que sigue siendo placeholder (pendiente de contenido real)

- Fotos: solo `home/hero.jpg` es una foto real. El resto (historia ×6, eventos pasados ×7, equipo ×6) son cajas `.placeholder-photo` con el patrón de azulejo de fondo — buscar `placeholder-photo` en cada página para encontrarlas.
- Nombres/cargos/bios del equipo (`staff.html`) son ficticios ("Full Name", etc.).
- Enlaces reales de Instagram (ahora `#`). El email de contacto confirmado es `lsvzorganisation@gmail.com`.
- Cifras del panel de estadísticas del inicio (año de fundación "20XX", "150+" miembros, "12+" eventos/año) son inventadas — falta confirmar los números reales con el usuario.
- URL del Google Form y URLs de tickets por evento (ver arriba).

## Cómo trabaja el usuario (para que no tengas que redescubrirlo)

- Habla en español, da feedback muy concreto y en pasos pequeños — mejor confirmar/preguntar antes que asumir mucho de golpe.
- Prueba él mismo en su navegador real (VS Code + Live Server o `npx serve`) y reporta lo que ve con precisión — confía en su palabra sobre el comportamiento visual/de animación por encima de lo que puedas verificar tú mismo (ver aviso técnico abajo).
- Le gusta iterar: probamos algo, lo prueba, ajustamos. No hace falta construir de más "por si acaso".
- Cuando pide inspiración de un componente externo (React, ReactBits, etc.), quiere el **mecanismo/idea**, no el código literal — todo se reescribe a mano en vanilla JS/CSS para encajar con este stack.

## Aviso técnico importante sobre el panel de vista previa

El navegador embebido de esta herramienta (Claude Code) tiene una limitación real y comprobada: cuando el panel no está "mostrándose" activamente al usuario, `getComputedStyle`, `getBoundingClientRect`, `requestAnimationFrame`, `IntersectionObserver`, `ResizeObserver` y `window.scrollTo` **no reflejan el estado en vivo de forma fiable** — lo comprobé a fondo (incluso borrar una regla CSS vía CSSOM no cambiaba lo que `getComputedStyle` reportaba después). No es un bug del sitio, es del entorno de pruebas.

Formas fiables de verificar en este entorno:
1. Comprobar estilos **inline** que el JS pone directamente (`elemento.style.propiedad`) justo tras cargar la página — eso sí es una lectura/escritura DOM síncrona y fiable.
2. Comprobar estructura/atributos/clases del DOM (`querySelectorAll`, etc.).
3. Leer el contenido real de los archivos servidos (`fetch` con `cache:'no-store'`) para confirmar que el código es el esperado.
4. Comprobar errores de consola en una **pestaña nueva** (no reusada — el historial de consola es acumulativo por pestaña).

No te fíes de `getComputedStyle` para verificar cascada CSS o animaciones en esta herramienta concreta — si algo no cuadra, antes de asumir que es un bug real, contrástalo con estos otros métodos. Y en general, ante cualquier duda sobre cómo se ve/mueve algo, la palabra del usuario mirando su navegador real vale más que lo que puedas comprobar tú aquí.

## Qué falta / próximos pasos probables

Pregúntale directamente por dónde seguir, pero lo más obvio pendiente es:
1. Aplicar un nivel de pulido/animación similar al del inicio e historia a las otras 4 páginas (eventos próximos/pasados, equipo, hazte miembro) — de momento son más sencillas.
2. Ir sustituyendo placeholders por contenido real (fotos, equipo, cifras, enlaces) según el usuario los vaya teniendo listos.
3. Cualquier otro ajuste que pida sobre lo ya construido — sigue el mismo criterio: cambios pequeños, confirmar con captura o descripción antes de dar por bueno un efecto visual/de animación que no puedas verificar tú mismo con certeza.
