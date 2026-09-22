const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.avif':'image/avif','.webp':'image/webp','.woff2':'font/woff2'};
http.createServer((req,res)=>{
  let pathname;
  try { pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400).end(); return; }
  if(pathname === '/') pathname='/index.html';
  const file=path.resolve(root, '.'+pathname);
  const relative=path.relative(root,file);
  if(relative.startsWith('..') || path.isAbsolute(relative) || !(/^(assets[\\/]|events-past[\\/]|[^\\/]+\.html$)/.test(relative))) {res.writeHead(404).end(); return;}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end();return;} res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);});
}).listen(Number(process.env.PORT)||5173,'127.0.0.1',()=>console.log('LSVZ preview: http://127.0.0.1:'+(process.env.PORT||5173)));
