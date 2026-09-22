# LSVZ — mantenimiento

Web estática: HTML, CSS y JavaScript. Los visitantes no descargan las herramientas de desarrollo.

## Trabajar y comprobar

- `npm ci`: instala las versiones fijadas de las herramientas.
- `npm run dev`: abre un servidor local en http://127.0.0.1:5173.
- `npm run images`: genera WebP de las fotos sin borrar originales.
- `npm run lint:js`, `npm run lint:css`, `npm run lint:html`: comprueban el código.
- `npm test`: prueba navegación, idiomas, galerías y páginas. Requiere Chrome instalado y servidor local iniciado.
- `npm run build`: copia exclusivamente la web a `dist/`, para publicarla en un alojamiento estático.

Las nuevas imágenes requieren añadir `width`, `height`, `srcset` y `sizes` al HTML después de generar sus versiones. Los enlaces del visor apuntan a los originales.

## Dónde editar

- `index.html`: inicio.
- `events-upcoming.html`: próximos eventos (actualmente sin eventos anunciados).
- `events-past.html`: archivo; `events-past/*.html`: 19 galerías.
- `history.html`, `staff.html`, `join.html`: historia, equipo e inscripción.
- `assets/js/i18n.js`: textos ES/EN/DE. Mantener las tres traducciones al añadir contenido.
- `assets/css/base.css`: paletas y escala; `components.css`: elementos compartidos; `pages.css`: páginas.
- `assets/js/home-event-strip.js` y `drift-wall.js`: selección de eventos de los muros fotográficos.

Se han conservado las paletas por idioma, tipografías, azulejos y estructura. No se han inventado nombres del equipo, fotos históricas ni eventos próximos. Esos contenidos pendientes necesitan información de la asociación.

## Herramientas

Instaladas como dependencias de desarrollo: Playwright, axe-core, Lighthouse, Sharp, HTML Validate, ESLint, Stylelint y Chrome DevTools MCP. Impeccable instalado en `.agents/skills/impeccable`. El servidor MCP está configurado en `.codex/config.toml`; una sesión nueva puede ser necesaria para que aparezca conectado en Codex. La configuración utiliza la ruta local de este ordenador; al mover la carpeta habrá que actualizarla.

La copia anterior al repaso está en `.local/before-polish.zip`. Los informes y capturas se guardan en `.local/` y `playwright-report/`; no se publican. No ejecutar nuevamente los scripts `finish-polish.cjs` o `finish-interactions.cjs`: eran migraciones de una sola ejecución.

El resumen de cambios y resultados está en `REVISION.md`; la migración del dominio, el alojamiento y las visitas se explican en `PUBLICACION.md`. Los scripts de migración de una sola ejecución se archivaron en `.local/migrations/`.
