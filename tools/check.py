#!/usr/bin/env python3
"""
Post-build check: serves the repo with the page routes from vercel.json and
opens every page in headless Chromium. Fails on JS errors, on a page without
exactly one <h1>, on any #/ link, and on internal links that lead nowhere.

Usage:  python3 tools/check.py [--shots DIR]
"""
import functools, http.server, json, os, re, sys, threading
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cfg = json.load(open(os.path.join(ROOT, "vercel.json"), encoding="utf-8"))
ROUTES = {r["src"]: r["dest"] for r in cfg["routes"] if r.get("dest", "").endswith(".html")}
REDIRECTS = {r["src"]: r["headers"]["Location"] for r in cfg["routes"] if r.get("status") == 308 and "(" not in r["src"]}


class H(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def do_GET(self):
        path = urlparse(self.path).path
        if path in REDIRECTS:
            self.send_response(308); self.send_header("Location", REDIRECTS[path]); self.end_headers(); return
        if path in ROUTES:
            self.path = ROUTES[path]
        return super().do_GET()


def main():
    shots = sys.argv[sys.argv.index("--shots") + 1] if "--shots" in sys.argv else None
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(H, directory=ROOT))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{srv.server_address[1]}"
    problems, seen_links = [], set()
    exe = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
    with sync_playwright() as pw:
        br = pw.chromium.launch(executable_path=exe if os.path.exists(exe) else None)
        ctx = br.new_context(viewport={"width": 1366, "height": 900})
        ctx.route(re.compile(r"^https?://(?!127\.0\.0\.1).*"), lambda r: r.abort())
        for path, dest in ROUTES.items():
            if path.startswith("/brand") or "(" in path:
                continue
            raw = open(os.path.join(ROOT, dest.lstrip("/")), encoding="utf-8").read()
            n_h1 = len(re.findall(r"<h1[\s>]", raw))
            if n_h1 != 1:
                problems.append(f"{path}: {n_h1} <h1> in static HTML")
            if 'href="#/' in raw:
                problems.append(f"{path}: hash link in static HTML")
            for h in re.findall(r'href="(/[^"#?]*)"', raw):
                if not h.startswith(("/favicon", "/apple")) and not h.endswith((".png", ".webp", ".css", ".js")):
                    seen_links.add(h)
            page = ctx.new_page()
            errs = []
            page.on("pageerror", lambda e: errs.append(str(e)))
            page.goto(base + path, wait_until="load")
            page.wait_for_timeout(300)
            vis_h1 = page.evaluate("() => [...document.querySelectorAll('h1')].filter(e => e.offsetParent).length")
            if vis_h1 != 1:
                problems.append(f"{path}: {vis_h1} visible <h1> after JS")
            if errs:
                problems.append(f"{path}: JS errors {errs}")
            if shots:
                page.evaluate("() => document.querySelectorAll('[data-rv]').forEach(e => e.classList.add('in'))")
                page.wait_for_timeout(900)
                os.makedirs(shots, exist_ok=True)
                page.screenshot(path=os.path.join(shots, (path.strip("/").replace("/", "_") or "home") + ".png"), full_page=True)
            page.close()
        br.close()
    srv.shutdown()
    for h in sorted(seen_links):
        if h not in ROUTES and h not in REDIRECTS and not os.path.exists(os.path.join(ROOT, h.lstrip("/"))):
            problems.append(f"broken internal link: {h}")
    print(f"checked {len(ROUTES)} routes, {len(seen_links)} distinct internal links")
    for p in problems:
        print("  PROBLEM", p)
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
