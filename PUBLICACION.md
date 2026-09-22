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

## Cambio de dominio sin interrupción

Los registros actuales de Wix se han inventariado antes de cambiarlos. No hay registros MX de correo empresarial en la zona DNS actual.

Cuando la URL de prueba de GitHub Pages esté aprobada:

1. añadir `lsvz.ch` como dominio personalizado en GitHub Pages y verificarlo;
2. sustituir en Wix los tres registros A del dominio raíz por los cuatro registros A de GitHub Pages;
3. sustituir el CNAME de `www` por el host `*.github.io` del repositorio;
4. esperar la propagación y verificar `https://lsvz.ch` y `https://www.lsvz.ch`;
5. activar **Enforce HTTPS** en GitHub Pages;
6. comprobar navegación, formularios, imágenes y Analytics desde móvil y escritorio.

No se debe cancelar el plan web de Wix hasta que la nueva dirección funcione correctamente. La suscripción del dominio se mantiene activa aunque se cancele el plan del sitio.

## Suscripciones encontradas en Wix

- Plan web **Premium Core**: activo, ciclo de dos años, próxima fecha indicada el 14 de septiembre de 2028.
- Dominio **lsvz.ch**: activo, ciclo anual, próxima renovación indicada para 2027.

Cancelar el plan web evita su siguiente renovación, pero no cancela el dominio. Wix indica que el reembolso de 14 días se aplica a compras iniciales y no normalmente a renovaciones; la pantalla final de cancelación debe revisarse antes de confirmarla.

## Analítica

La propiedad de Google Analytics se configura con:

- cuenta `LSVZ`;
- propiedad `Web LSVZ`;
- país y zona horaria de Suiza;
- moneda CHF;
- sector Empleo y educación;
- objetivos de tráfico e interacción;
- opciones opcionales de intercambio de datos con Google desactivadas.

El ID de medición se inserta en la web después de crear la propiedad. Google Analytics permite revisar usuarios, sesiones, páginas, procedencia del tráfico, clics salientes y otras interacciones recogidas automáticamente. La política de privacidad y el consentimiento se deben adaptar a la configuración final antes de recopilar datos.

## Referencias oficiales

- [GitHub Pages con GitHub Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Dominios personalizados en GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Transferir un dominio fuera de Wix](https://support.wix.com/en/article/transferring-your-wix-domain-away-from-wix-2477749)
- [Cancelar un plan de Wix](https://support.wix.com/en/article/canceling-a-wix-premium-plan)
- [Reembolsos de planes Wix](https://support.wix.com/en/article/requesting-a-refund-for-a-premium-plan)
