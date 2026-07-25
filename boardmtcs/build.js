// Inlines the images in ./assets as base64 data URIs into index.html.
// Run after changing index.template.html or swapping an image:  node build.js
const fs=require('fs'), path=require('path');
const A=path.join(__dirname,'assets');
const b64=(f,mime)=>`data:${mime};base64,`+fs.readFileSync(path.join(A,f)).toString('base64');
let html=fs.readFileSync(path.join(__dirname,'index.template.html'),'utf8');
html=html
  .replace('{{SG_LOGO}}', b64('saint-gobain.jpg','image/jpeg'))
  .replace('{{GYPROC}}',  b64('gyproc.png','image/png'))
  .replace('{{QR}}',      b64('qr.png','image/png'));
fs.writeFileSync(path.join(__dirname,'index.html'),html);
console.log('index.html written,',html.length,'bytes');
