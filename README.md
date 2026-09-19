# NEWCAP — kurumsal web sitesi / وب‌سایت شرکتی / corporate website

Static, pre-rendered, trilingual (EN / FA / TR).

## Why it is built this way

Every language and every page is a **real URL with a real HTML file**, so
search engines index them without executing JavaScript first:

```
/                     /fa/                  /tr/
/products             /fa/products          /tr/products
/industries           /insights/filling-line            ... 36 pages total
```

Each file carries its own `<title>`, meta description, canonical URL,
`hreflang` alternates for all three languages, Open Graph tags and
schema.org JSON-LD (Organization, WebPage, BreadcrumbList and Article on
the insight pages). `sitemap.xml` lists all 36 URLs with their language
alternates; `robots.txt` points at it.

CSS and JavaScript are shared files under `/assets`, so a visitor downloads
them once and every later page is about 21 KB.

## Structure

```
index.html + 35 more    one folder per route, per language
assets/app.css          shared stylesheet
assets/app.js           shared application
img/*.webp              product imagery
og.png                  social preview card
favicon-*.png, apple-touch-icon.png
sitemap.xml, robots.txt, vercel.json
```

## Deploy

**Drag and drop** — open `vercel.com/new` and drop this folder in. Vercel
detects a static site; no build step, no framework.

**Git** — push the folder, then import the repository in Vercel. Leave all
build settings empty.

**CLI** — `npm i -g vercel` then `vercel --prod`.

## Before going live

1. Set the real domain: change `SITE` at the top of the build script and
   regenerate, or find-and-replace `https://newcap.ir` across the HTML,
   `sitemap.xml` and `robots.txt`. Canonicals and hreflang depend on it.
2. Replace the product imagery with the original high-resolution renders.
3. Replace the placeholder phone number, email and address on the contact page.
4. Add the real social profile URLs — the three footer icons currently link to `#`.
5. Review the technical copy on Products, Quality and Capabilities against
   real NEWCAP data, especially anything implying a certification.
6. Have a native Turkish speaker in the packaging trade review the TR copy.
7. Connect the contact form to a form service; it currently opens the
   visitor's email client.
8. Add publication dates to the insight articles and extend the Article
   JSON-LD with `datePublished`.
