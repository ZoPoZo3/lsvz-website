# Publicación y mantenimiento de LSVZ

## Arquitectura elegida

- **Código y versiones:** repositorio de GitHub de la asociación.
- **Alojamiento:** GitHub Pages, con publicación automática desde la rama `main`.
- **Dominio:** `lsvz.ch` sigue registrado y renovándose en Wix por ahora; solo cambiaremos sus registros DNS para que abra la nueva web.
- **Estadísticas:** Google Analytics 4, configurado para medir visitas, páginas, fuentes de tráfico e interacciones.

El dominio, el alojamiento y el plan web de Wix son productos distintos. No hace falta transferir el dominio a otro registrador para sustituir la web de Wix. Mantenerlo temporalmente en Wix reduce el riesgo de interrupción; el traslado del registro se puede hacer después, con la nueva web ya comprobada.

## Publicación automática

El archivo `.github/workflows/deploy-pages.yml` ejecuta estas tareas cada vez que se guarda un cambio en `main`:

1. instala las versiones fijadas en `package-lock.json`;
2. valida JavaScript, CSS y HTML;
3. construye exclusivamente los archivos públicos en `dist/`;
4. publica `dist/` en GitHub Pages;
5. conserva `lsvz.ch` como dominio principal.

Si una validación falla, la versión pública anterior permanece activa. En GitHub se puede ver el resultado en **Actions → Publicar web** y recuperar cualquier versión anterior desde el historial.

## Cómo actualizar la web

1. Editar los HTML, CSS, JavaScript o imágenes de esta carpeta.
2. Ejecutar `npm run dev` y revisar la web en `http://127.0.0.1:5173`.
3. Ejecutar `npm run lint:js`, `npm run lint:css`, `npm run lint:html` y `npm run build`.
4. Guardar y subir los cambios a la rama `main`.
5. Comprobar en GitHub Actions que la publicación ha terminado correctamente.

## Dominio publicado

La nueva web está publicada en `https://lsvz.ch` y `https://www.lsvz.ch` redirige al dominio principal. GitHub Pages sirve el sitio y fuerza HTTPS. El dominio continúa registrado en Wix; no hay registros MX de correo empresarial en la zona DNS actual.

La configuración activa es:

1. `lsvz.ch` está configurado como dominio personalizado en GitHub Pages;
2. el dominio raíz utiliza los cuatro registros A oficiales de GitHub Pages;
3. `www.lsvz.ch` usa un CNAME hacia `zopozo3.github.io`;
4. GitHub confirma la comprobación DNS;
5. **Enforce HTTPS** está activo y el certificado cubre ambos nombres;
6. la web responde correctamente desde el dominio público.

La suscripción del dominio se mantiene activa aunque se haya cancelado la renovación del plan del sitio.

## Suscripciones encontradas en Wix

- Plan web **Premium Core**: renovación automática desactivada; Wix confirma que sus funciones permanecen activas hasta el 3 de octubre de 2028.
- Dominio **lsvz.ch**: activo y separado del plan web, con ciclo anual y próximo cobro indicado el 3 de septiembre de 2027.

Cancelar el plan web evita su siguiente renovación y no cancela el dominio. Wix informó durante la cancelación de que el siguiente ciclo del plan ya estaba cobrado y comienza el 3 de octubre de 2026; la cuenta muestra una opción separada para solicitar un reembolso antes de esa fecha.

## Analítica

La propiedad de Google Analytics se configura con:

- cuenta `LSVZ`;
- propiedad `Web LSVZ`;
- país y zona horaria de Suiza;
- moneda CHF;
- sector Empleo y educación;
- objetivos de tráfico e interacción;
- opciones opcionales de intercambio de datos con Google desactivadas.

El ID de medición `G-NPHL6ZSTTR` está integrado. Google Analytics permite revisar usuarios, sesiones, páginas, procedencia del tráfico, clics salientes y otras interacciones recogidas automáticamente. La medición se carga únicamente después del consentimiento explícito y la web incluye su política de privacidad.

## Referencias oficiales

- [GitHub Pages con GitHub Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Dominios personalizados en GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Transferir un dominio fuera de Wix](https://support.wix.com/en/article/transferring-your-wix-domain-away-from-wix-2477749)
- [Cancelar un plan de Wix](https://support.wix.com/en/article/canceling-a-wix-premium-plan)
- [Reembolsos de planes Wix](https://support.wix.com/en/article/requesting-a-refund-for-a-premium-plan)
