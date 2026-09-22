const fs=require('node:fs'),path=require('node:path'),sharp=require('sharp');
const source=path.resolve('assets/img/photos'),dest=path.resolve('assets/img/optimized');
const manifest={};
async function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,e.name);if(e.isDirectory()){await walk(file);continue;}if(!/\.(jpg|avif)$/i.test(file))continue;
 const meta=await sharp(file).metadata(),relative=path.relative(source,file),base=path.join(dest,relative.replace(/\.[^.]+$/,''));fs.mkdirSync(path.dirname(base),{recursive:true});
 const widths=relative.startsWith('home')?[960,1920]:[480,960];const versions=[];
 for(const width of widths){const output=base+'-'+width+'.webp';if(!fs.existsSync(output)||fs.statSync(output).mtimeMs<fs.statSync(file).mtimeMs)await sharp(file).rotate().resize({width,withoutEnlargement:true}).webp({quality:82,effort:4}).toFile(output);const info=await sharp(output).metadata();versions.push({src:path.relative(process.cwd(),output).replaceAll('\\','/'),width:info.width,bytes:fs.statSync(output).size});}
 manifest[path.relative(process.cwd(),file).replaceAll('\\','/')]={width:meta.width,height:meta.height,bytes:fs.statSync(file).size,versions};
}}
(async()=>{await walk(source);fs.mkdirSync('.local',{recursive:true});fs.writeFileSync('.local/image-manifest.json',JSON.stringify(manifest,null,2));console.log('Optimized '+Object.keys(manifest).length+' photos. Originals preserved.');})().catch(e=>{console.error(e);process.exitCode=1;});
