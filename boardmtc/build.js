// Inlines the images in ./assets as base64 data URIs into index.html.
// Run after changing index.template.html or swapping an image:  node build.js
const fs=require('fs'), path=require('path');
const A=path.join(__dirname,'assets');
const b64=(f,mime)=>`data:${mime};base64,`+fs.readFileSync(path.join(A,f)).toString('base64');
const lib=f=>fs.readFileSync(path.join(A,'vendor',f),'utf8');
// html2canvas renders each page, jsPDF writes the file, qrcode builds the per-certificate
// QR — all inlined so there are no network calls
const vendor=lib('html2canvas.min.js')+'\n;\n'+lib('jspdf.umd.min.js')+'\n;\n'+lib('qrcode.min.js');
if(/<\/script/i.test(vendor)) throw new Error('vendor JS contains </script — cannot inline');
let html=fs.readFileSync(path.join(__dirname,'index.template.html'),'utf8');
html=html
  .replace('{{SG_LOGO}}', b64('saint-gobain.jpg','image/jpeg'))
  .replace('{{GYPROC}}',  b64('gyproc.png','image/png'))
  .replace('{{QR}}',      b64('qr.png','image/png'))
  .replace('{{WATERMARK}}', ()=>b64('watermark.png','image/png'))
  .replace('{{VENDOR_JS}}', ()=>vendor);
fs.writeFileSync(path.join(__dirname,'index.html'),html);
console.log('index.html written,',html.length,'bytes');
