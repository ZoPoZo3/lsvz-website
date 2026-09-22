# Repaso de LSVZ — 14 septiembre 2026

## Resultado

Repaso funcional y visual terminado sobre las 25 páginas, preservando paletas por idioma, tipografías, azulejos, logotipo y estructura. No se ha publicado ni modificado el dominio.

## Cambios principales

- Menú adaptado también a tabletas: cerrado no captura el teclado, abierto mantiene el foco dentro y se cierra con Escape. Botones táctiles de al menos 44 px.
- Idiomas y etiquetas de accesibilidad coordinados, cambio de idioma sin perder los textos animados, funcionamiento aunque el almacenamiento esté bloqueado. Texto estático principal en español.
- Visor con nombres accesibles, foco recuperable, teclado, gestos y transiciones cancelables, aviso y reintento de carga.
- Franja de eventos con desplazamiento nativo en teléfonos; pausa manual en escritorio. Muro decorativo sin paradas de teclado invisibles y suspendido cuando no se ve.
- Acceso directo al archivo y acciones útiles en próximos eventos cuando no hay anuncios.
- 302 imágenes con variantes WebP y dimensiones. Galerías sin deformaciones; originales conservados para ampliación. El conjunto de variantes pequeñas ocupa 9,11 MiB frente a 61,28 MiB de originales: esto compara archivos, no el peso de una visita.
- Fechas del archivo y galerías localizadas, jerarquía de títulos corregida sin cambiar su tamaño, cita de Historia legible y navegación disponible sin JavaScript.
- Introducción más breve en teléfonos y cabecera visible desde el inicio.

## Comprobaciones

- ESLint, Stylelint y HTML Validate: sin errores en la comprobación final.
- 12 pruebas funcionales distintas superadas en dos tandas: navegación y tres idiomas en 320/390/768/1024/1440 px; visor y foco; las 25 páginas y referencias locales; navegación sin JavaScript; almacenamiento bloqueado; franja táctil; cierre rápido y proporciones de imagen. La prueba conjunta de páginas necesitó un tiempo máximo mayor; pasó después de ampliarlo.
- Auditoría inicial tras cambios: siete páginas representativas en móvil y escritorio, sin errores de JavaScript ni respuestas HTTP de error. Se detectó y corrigió el contraste de Historia.
- Verificación final de accesibilidad en seis combinaciones de página, tamaño e idioma: cero incidencias detectadas por axe (WCAG A/AA y buenas prácticas). Esto es una comprobación automática, no una certificación.
- Capturas revisadas de portada, próximos eventos, franja móvil y galería. Pruebas realizadas en Chrome con emulación móvil; falta validar en teléfonos físicos, especialmente Safari/iPhone.
- Lighthouse móvil local de portada: rendimiento 86/100; accesibilidad, buenas prácticas y SEO 100/100. FCP 2,9 s; LCP 3,3 s; TBT 0 ms; CLS 0,01. Es una medición de laboratorio local, no de usuarios reales; las fuentes externas y el alojamiento afectarán los resultados. El margen de carga restante se debe revisar en el alojamiento final. No se promete rendimiento perfecto.

Informes: `.local/final-accessibility.json`, `.local/lighthouse-final.report.html`, `.local/lighthouse-final.report.json`. Capturas: `.local/gallery-mobile-final.png`, `.local/strip-mobile-final.png`. Las herramientas y los informes no se incluyen en `dist/`.

## Pendiente de información de la asociación

Completar las fichas y foto del equipo; confirmar correo de contacto, formulario y contenido provisional; aportar eventos próximos cuando estén anunciados. Confirmar registrador, titular y renovación de lsvz.ch antes de migrar. El procedimiento está explicado en PUBLICACION.md.
