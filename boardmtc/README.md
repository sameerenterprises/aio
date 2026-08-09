# Saint-Gobain / Gyproc — MTC Generator

Single-file web app that generates a **Material Test Certificate** PDF matching the
reference layout. No backend, no frameworks, **no network calls**. Tapping **Download PDF**
writes the A4 PDF straight to the device — no print dialog, on phone and PC.

## Files

| File | What it is |
|---|---|
| **`index.html`** | The complete app — logos, QR and the PDF libraries are all embedded, so it works fully offline. **This is the only file that needs to be deployed.** |
| `index.template.html` | Source template (same as index.html but with placeholders). Edit this, not index.html. |
| `build.js` | Inlines `assets/*` into `index.html`. Run `node build.js` after editing the template. |
| `assets/` | Source images: Saint-Gobain logo, Gyproc logo, fallback QR, and `watermark.png`. |
| `assets/vendor/` | html2canvas + jsPDF + qrcode, vendored locally so there is no CDN dependency. |

## The QR and the hosted web certificate

The QR on each certificate is generated from the SRNO and encodes:

```
https://sameerenterprises.github.io/customer/mtc/<SRNO>.html
```

**Download Web Page** saves the page that link should open — a self-contained HTML file
(watermark, logos and QR all inlined). Publish it in the site repo as:

```
customer/mtc/<SRNO>.html
```

i.e. create a folder named after the SRNO and rename the downloaded `<SRNO>.html` to
`index.html` inside it. GitHub Pages then serves it at the QR's URL.

## Use it

Open `index.html` in Chrome (double-click), or visit the GitHub Pages URL. Fill the form →
**Preview** or **Download PDF**. Form state is auto-saved in the browser (`Clear form` resets it).

**Download PDF** saves `MTC_<invoice>.pdf` directly — on Android it appears in **Downloads**
(Chrome shows it at the bottom of the screen). Each A4 page is rendered at 2× and written
into the PDF, so the output is identical on every screen size.

If the PDF libraries ever fail to load, the button falls back to the browser print dialog.

### Notes

- Pick a product by **description** — the code and all spec rows fill in automatically and
  appear on the PDF. Only description and qty are shown in the form.
- **Max 2 product tables per page**, auto-paginated (5 products → 3 pages of 2+2+1).
- Leave **SRNO** blank to hide the SRNO line.
- **Certificate date & time** drives the top print line (`6/13/22, 3:41 PM`), the header date
  (`Jun 13, 2022`), and the generated-by datetime (`Jun 13 2022 3:41PM`).
- Customer, standard, generated-by and requested-by are fixed constants near the top of the
  script in `index.template.html`.

## Push to GitHub + enable Pages

From inside this folder:

```bash
git init
git add .
git commit -m "MTC generator"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build and deployment → Deploy from a branch →
`main` / `/ (root)` → Save**.

After a minute the app is live at `https://<you>.github.io/<repo>/`. Open that URL on your
phone — Download PDF → Save as PDF saves straight to the device.

## Adding more products

Open `index.template.html`, find `PRODUCT_DB`, and add one entry per product:

```js
P('KA56Z0010010000002','SCREW 25MM 1000/BOX',[
  ['THICKNESS','3.5 X 25'],
  ['SPECIFICATION','IS : 6745-1972/277-1972/IS513:1994'],
  ...
]),
```

Then rebuild:

```bash
node build.js
```

## Swapping the logos / QR

Replace the files in `assets/` (keep the same filenames), then run `node build.js`.

## Note on `index.html` size

It is ~750 KB because the images *and* the two PDF libraries are inlined. That is
deliberate: one file, no CDN, works with no internet connection.
