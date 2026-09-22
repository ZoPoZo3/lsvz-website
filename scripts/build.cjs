const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve('.');
const dest = path.resolve('dist');
if (path.dirname(dest) !== root || path.basename(dest) !== 'dist') throw new Error('Invalid build path');

const csp = [
  "default-src 'self'",
  "script-src 'self' https://www.googletagmanager.com",
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https://*.google-analytics.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://docs.google.com",
  "frame-src 'none'",
  "upgrade-insecure-requests"
].join('; ');

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(filePath) : [filePath];
  });
}

function hardenHtml(filePath) {
  const nested = path.dirname(filePath) !== dest;
  const prefix = nested ? '../' : '';
  let html = fs.readFileSync(filePath, 'utf8');
  html = html.replace(
    '<meta charset="utf-8" />',
    `<meta charset="utf-8" />\n  <meta http-equiv="Content-Security-Policy" content="${csp}" />\n  <meta name="referrer" content="strict-origin-when-cross-origin" />`
  );
  html = html.replace(/\s*<script>document\.getElementById\("year"\)\.textContent = new Date\(\)\.getFullYear\(\);<\/script>/g, '');
  html = html.replace(
    '<span data-i18n="footer.credit">',
    `<a class="footer-privacy" href="${prefix}privacy.html">Privacidad</a>\n      <span data-i18n="footer.credit">`
  );
  html = html.replace(
    '</body>',
    `  <script src="${prefix}assets/js/analytics-consent.js" defer></script>\n</body>`
  );
  fs.writeFileSync(filePath, html);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });
for (const file of fs.readdirSync(root).filter((name) => name.endsWith('.html'))) {
  fs.copyFileSync(file, path.join(dest, file));
}
for (const dir of ['assets', 'events-past']) {
  fs.cpSync(dir, path.join(dest, dir), { recursive: true, filter: (filePath) => !filePath.endsWith('.md') });
}
for (const filePath of walk(dest).filter((file) => file.endsWith('.html'))) hardenHtml(filePath);

console.log('Static website ready in dist/. CSP, privacy controls and analytics consent are enabled.');
