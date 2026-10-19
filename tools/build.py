#!/usr/bin/env python3
"""
NEWCAP static build.

site.js is the single source of truth for every page's content. This script
loads each (language, route) in headless Chromium, lets site.js render it, and
writes a static HTML file that search engines can read without running JS:

  * only the page's own content is in the HTML (the home sections are not
    repeated on every inner page, so each page has exactly one <h1>)
  * every internal link is a real URL (/products, /en/products ...), never #/
  * title, description, canonical, hreflang, Open Graph and JSON-LD come from
    the rendered page, so they always match the copy

It also regenerates vercel.json routes and sitemap.xml from the same route list.

Usage:  python3 tools/build.py            (from the repo root)
Needs:  pip install playwright  (+ a Chromium build)
"""
import datetime, functools, http.server, json, os, re, sys, threading
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://newcapgroup.com"
LANGS = ["fa", "en", "tr"]

# Every route of the site. Add a route here and in site.js (PAGES / ARTICLES /
# PRODUCTS and ROUTE_META), then run the build.
KEYS = [
    "",
    "products",
    "products/measuring-caps",
    "products/oil-lubricant-caps",
    "products/gallon-caps",
    "products/spray-child-resistant-caps",
    "industries", "capabilities", "quality", "about", "resources", "contact",
    "insights/filling-line",
    "insights/sealing-systems",
    "insights/tamper-evidence",
    "insights/recyclability",
    "insights/oil-brake-fluid-caps",
    "insights/detergent-measuring-caps",
]

SHELL = {"fa": "index.html", "en": "en.html", "tr": "tr.html"}


def url_path(lang, key):
    p = ("" if lang == "fa" else "/" + lang) + ("/" + key if key else "")
    return p or "/"


def out_file(lang, key):
    if not key:
        return SHELL[lang]
    name = key.replace("/", "-") + ".html"
    return name if lang == "fa" else f"{lang}-{name}"


# ---------------------------------------------------------------- server
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def serve():
    h = functools.partial(Quiet, directory=ROOT)
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), h)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


# ---------------------------------------------------------------- render
HOME_RE = re.compile(r'<div id="home"( hidden)?>.*?</div><!-- /home -->', re.S)
SUB_RE = re.compile(r'<div id="sub"[^>]*>.*?</div>(?=\s*<!-- =+ CTA)', re.S)
BOOT_RE = re.compile(r'window\.__BOOT__=\{[^}]*\};')


def set_attr(html, el_id, attr, value):
    v = value.replace("&", "&amp;").replace('"', "&quot;")
    pat = re.compile(r'(<[^>]*\bid="%s"[^>]*\b%s=")[^"]*(")' % (el_id, attr))
    pat2 = re.compile(r'(<[^>]*\b%s=")[^"]*("[^>]*\bid="%s")' % (attr, el_id))
    new, n = pat.subn(lambda m: m.group(1) + v + m.group(2), html, count=1)
    if not n:
        new, n = pat2.subn(lambda m: m.group(1) + v + m.group(2), html, count=1)
    if not n:
        raise SystemExit(f"tag #{el_id}[{attr}] not found")
    return new


def fix_hash_links(html, lang):
    return re.sub(r'href="#/([^"]*)"',
                  lambda m: f'href="{url_path(lang, m.group(1))}"', html)


def render(page, base, lang, key, shell):
    src = BOOT_RE.sub('window.__BOOT__=' + json.dumps({"lang": lang, "route": key}) + ';', shell, count=1)
    target = base + "/__render.html"

    def fulfil(route):
        route.fulfill(status=200, content_type="text/html; charset=utf-8", body=src)

    page.unroute("**/__render.html")
    page.route("**/__render.html", fulfil)
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto(target, wait_until="load")
    page.wait_for_timeout(150)
    data = page.evaluate("""() => {
      const g = id => document.getElementById(id);
      return { title: document.title,
        desc: g('mDesc').content, canon: g('mCanon').href,
        ogt: g('mOgT').content, ogd: g('mOgD').content, ogu: g('mOgU').content,
        en: g('hrEn').href, fa: g('hrFa').href, tr: g('hrTr').href, x: g('hrX').href,
        ld: g('ld').textContent,
        sub: g('sub').hidden ? null : g('sub').innerHTML,
        h1: document.querySelectorAll('#sub h1').length };
    }""")
    if errors:
        raise SystemExit(f"JS error rendering {lang}:{key or 'home'}: {errors}")
    if key and data["sub"] is None:
        raise SystemExit(f"route {lang}:{key} has no page in site.js")
    return data


def build_page(lang, key, shell, d):
    html = BOOT_RE.sub('window.__BOOT__=' + json.dumps({"lang": lang, "route": key}) + ';', shell, count=1)
    title = d["title"].replace("&", "&amp;").replace("<", "&lt;")
    html = re.sub(r"<title>.*?</title>", lambda m: f"<title>{title}</title>", html, count=1, flags=re.S)
    for el, attr, k in [("mDesc", "content", "desc"), ("mCanon", "href", "canon"),
                        ("mOgT", "content", "ogt"), ("mOgD", "content", "ogd"),
                        ("mOgU", "content", "ogu"), ("hrEn", "href", "en"), ("hrFa", "href", "fa"),
                        ("hrTr", "href", "tr"), ("hrX", "href", "x")]:
        html = set_attr(html, el, attr, d[k])
    ld = d["ld"].replace("</", "<\\/")
    html = re.sub(r'(<script type="application/ld\+json" id="ld">).*?(</script>)',
                  lambda m: m.group(1) + ld + m.group(2), html, count=1, flags=re.S)
    if key:
        html = HOME_RE.sub('<div id="home" hidden></div><!-- /home -->', html, count=1)
        html = html.replace('<link rel="preload" as="script" href="/vendor/three.min.js">\n', "")
        sub = re.sub(r'\sdata-k="[^"]*"', "", d["sub"])
        html, n = SUB_RE.subn(lambda m: '<div id="sub">' + sub + '</div>', html, count=1)
        if not n:
            raise SystemExit("sub block not found in shell")
    html = fix_hash_links(html, lang)
    return html


# ---------------------------------------------------------------- vercel + sitemap
def vercel_routes():
    path = os.path.join(ROOT, "vercel.json")
    cfg = json.load(open(path, encoding="utf-8"))
    old = cfg["routes"]
    # head: the /fa redirects and the three.js proxy; tail: everything from the
    # first header rule on (cache headers, /brand, filesystem, 404).
    head = [r for r in old if r.get("src", "").startswith(("/fa", "/vendor/"))]
    first_tail = next(i for i, r in enumerate(old) if r.get("continue"))
    tail = old[first_tail:]
    pages = []
    for l in LANGS:
        for k in KEYS:
            p = url_path(l, k)
            pages.append({"src": p, "dest": "/" + out_file(l, k)})
            if p != "/":
                pages.append({"src": p + "/", "status": 308, "headers": {"Location": p}})
    cfg["routes"] = head + pages + tail
    with open(path, "w", encoding="utf-8") as f:
        json.dump(cfg, f, indent=1, ensure_ascii=False)


def sitemap():
    today = datetime.date.today().isoformat()
    rows = []
    for l in LANGS:
        for k in KEYS:
            alts = "".join(f'<xhtml:link rel="alternate" hreflang="{a}" href="{SITE}{url_path(a, k)}"/>' for a in LANGS)
            alts += f'<xhtml:link rel="alternate" hreflang="x-default" href="{SITE}{url_path("fa", k)}"/>'
            rows.append(f"  <url><loc>{SITE}{url_path(l, k)}</loc><lastmod>{today}</lastmod>{alts}</url>")
    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
           + "\n".join(rows) + "\n</urlset>\n")
    open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8").write(xml)


# ---------------------------------------------------------------- main
def main():
    srv = serve()
    base = f"http://127.0.0.1:{srv.server_address[1]}"
    shells = {l: open(os.path.join(ROOT, SHELL[l]), encoding="utf-8").read() for l in LANGS}
    exe = os.environ.get("CHROME") or next((p for p in [
        "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"] if os.path.exists(p)), None)
    out = {}
    with sync_playwright() as pw:
        br = pw.chromium.launch(executable_path=exe) if exe else pw.chromium.launch()
        for l in LANGS:
            ctx = br.new_context(viewport={"width": 1366, "height": 900})
            ctx.route(re.compile(r"^https?://(?!127\.0\.0\.1).*"), lambda r: r.abort())
            for k in KEYS:
                page = ctx.new_page()
                d = render(page, base, l, k, shells[l])
                page.close()
                if k and d["h1"] != 1:
                    raise SystemExit(f"{l}:{k} renders {d['h1']} <h1> elements")
                out[(l, k)] = build_page(l, k, shells[l], d)
                print(f"  {l:2} {url_path(l, k):45} {d['title']}")
            ctx.close()
        br.close()
    srv.shutdown()
    for (l, k), html in out.items():
        open(os.path.join(ROOT, out_file(l, k)), "w", encoding="utf-8").write(html)
    vercel_routes()
    sitemap()
    print(f"built {len(out)} pages")


if __name__ == "__main__":
    sys.exit(main())
