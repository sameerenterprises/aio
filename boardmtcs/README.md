# Saint-Gobain / Gyproc — MTC Generator

Single-file web app that generates a **Material Test Certificate** PDF matching the
reference layout. No backend, no frameworks, **no network calls** — the PDF is produced by
the browser's built-in **Print → Save as PDF** (vector output, crisp text), which is exactly
how the original reference certificates were made.

## Files

| File | What it is |
|---|---|
| **`index.html`** | The complete app — logos and QR embedded as base64, works fully offline. **This is the only file that needs to be deployed.** |
| `index.template.html` | Source template (same as index.html but with image placeholders). Edit this, not index.html. |
| `build.js` | Inlines `assets/*` into `index.html`. Run `node build.js` after editing the template. |
| `assets/` | The three source images (Saint-Gobain logo, Gyproc logo, QR). |

## Use it

Open `index.html` in Chrome (double-click), or visit the GitHub Pages URL. Fill the form →
**Preview** or **Download PDF**. Form state is auto-saved in the browser (`Clear form` resets it).

**Download PDF opens the print dialog.** For output matching the reference, set:

- **Destination:** Save as PDF
- **Margins:** None
- **Headers and footers:** OFF  *(the page already draws the date/title and url/page-number lines)*
- **Paper size:** A4

The filename defaults to `MTC_<invoice>`. Same flow works on Android Chrome.

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
