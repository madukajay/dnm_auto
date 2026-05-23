# DNM AUTO — Vehicle Import Cost Calculator

A web-based calculator for estimating total vehicle import costs from **Japan to Sri Lanka**. Built for DNM AUTO to quote auction bids, shipping, clearing, and Sri Lankan customs taxes in one place.

## Features

- **Input parameters** — vehicle model, grade, tax category, bid, exchange rate, exporter, SSCL rate, and more
- **Cost breakdown** — winning bid, handling, shipping, CIF, LC, bank charges, clearing, and total payable (LKR)
- **Tax breakdown** — CIF, excise duty, CID, surcharge (toggleable), SSCL, VAT, VEL, COM, luxury tax, and total tax
- **Surcharge toggle** — apply surcharge at 50% of CID or set it to zero
- **PDF export** — download a styled quotation matching the site theme
- **Responsive layout** — optimized for full-HD (1920×1080) single-screen use

## Project structure

| File        | Description                                      |
|-------------|--------------------------------------------------|
| `index.html` | Page structure and form controls                |
| `style.css`  | UI styling (dark theme)                         |
| `script.js`  | Business logic, tax rules, and PDF generation   |
| `logo.png`   | Company logo (used in PDF when present)         |

## How to run

No build step required. Open the app in a browser:

1. Clone or copy this folder to your machine.
2. Open `index.html` in a modern browser (Chrome, Firefox, Edge).

For local development with a simple server (optional):

```bash
cd /path/to/page
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Usage

1. Select **vehicle model** and **grade** (defaults load from built-in data).
2. Set **tax category**, **bid**, **JPY rate**, and other fields as needed.
3. Click **Calculate Import Cost** — results update in the center and right columns.
4. Use **Surcharge (50% of CID)** in the tax column to include or exclude surcharge.
5. Click **Download as PDF** to save a quotation (you will be prompted for year, grade, auction grade, and mileage).

## Dependencies (CDN)

- [Font Awesome](https://fontawesome.com/) — icons  
- [Google Fonts](https://fonts.google.com/) — DM Sans, Syne, Bungee  
- [jsPDF](https://github.com/parallax/jsPDF) — PDF generation  
- [html2canvas](https://html2canvas.hertzen.com/) — included for potential export use  

## Disclaimer

Calculations are for **reference and quotation purposes only**. Actual costs may differ due to exchange rate changes, auction outcomes, insurer fees, and updates to government policy.

---

**Tax basis:** All customs tax calculations in this tool are based on **Sri Lanka government regulations as of 16 May 2026**.
