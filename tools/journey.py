#!/usr/bin/env python3
"""Inserts (or replaces) the home-page 'journey' section in the three home shells."""
import os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

TXT = {
 "fa": dict(eb="مزیت نیوکپ",
   t='<span class="l">از اولین طرح،</span><span class="l"><em>تا آخرین درپوش.</em></span>',
   p="طراحی، قالب و تولید در یک مسیر — بدون اینکه پروژهٔ شما میان چند پیمانکار دست‌به‌دست شود. یک تیم، از ابتدا تا انتها پاسخ‌گوی درپوش شماست.",
   s=[("طراحی","طرح فنی درپوش، بر اساس ظرف و محصول شما"),
      ("قالب","قالبی که همان طرح را با دقت تکرار می‌کند"),
      ("تولید","تزریق و تولید یکنواخت، به رنگ برند شما"),
      ("تأمین","تأمین عمده و پیوسته برای خط تولید شما")],
   cta="مسیر کار ما", hint="اسکرول کنید"),
 "en": dict(eb="The NEWCAP advantage",
   t='<span class="l">From the first sketch</span><span class="l"><em>to the last cap.</em></span>',
   p="Design, mould and production on one path — your project is never passed between contractors. One team answers for your closure from start to finish.",
   s=[("Design","A technical drawing built around your container and product"),
      ("Mould","A mould that repeats that drawing precisely"),
      ("Production","Consistent moulding, in the colour of your brand"),
      ("Supply","Bulk, continuous supply to your line")],
   cta="How we work", hint="Scroll"),
 "tr": dict(eb="NEWCAP farkı",
   t='<span class="l">İlk çizimden</span><span class="l"><em>son kapağa.</em></span>',
   p="Tasarım, kalıp ve üretim tek bir yolda — projeniz yükleniciler arasında el değiştirmez. Kapağınızdan baştan sona tek bir ekip sorumludur.",
   s=[("Tasarım","Kabınıza ve ürününüze göre hazırlanan teknik çizim"),
      ("Kalıp","O çizimi hassasiyetle tekrarlayan bir kalıp"),
      ("Üretim","Markanızın renginde tutarlı enjeksiyon üretimi"),
      ("Tedarik","Hattınıza toplu ve sürekli tedarik")],
   cta="Çalışma şeklimiz", hint="Kaydırın"),
}

ARROW = ('<svg class="ar" viewBox="0 0 16 10" fill="none" stroke="currentColor" stroke-width="1.6">'
         '<path d="M0 5h13M9.6 1 14 5l-4.4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>')

# ---- the illustration: one cap, four states (language independent) ----
RIBS = "".join(f'<line x1="{x}" y1="176" x2="{x}" y2="290"/>' for x in range(202, 362, 10))
MINIS = "".join(
    f'<g class="mini" style="--i:{i};--c:{c}" transform="translate({x} 0)"><use href="#jyMini"/></g>'
    for i, (x, c) in enumerate(zip([-150, -90, -30, 30, 90, 150],
                                   ["#FF7A00", "#F2140E", "#FFC400", "#8FCB0A", "#08AFC2", "#1463F0"])))
SVG = f'''<svg class="jy-art" viewBox="0 0 560 440" role="img" aria-hidden="true">
  <defs>
    <pattern id="jyGrid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="currentColor" stroke-width=".5"/></pattern>
    <linearGradient id="jySteel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B9C4D3"/><stop offset="1" stop-color="#6F7F96"/></linearGradient>
    <linearGradient id="jyCap" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#B8C4D4"/><stop offset=".18" stop-color="#E8EDF4"/><stop offset=".42" stop-color="#FFFFFF"/><stop offset=".75" stop-color="#DDE4EE"/><stop offset="1" stop-color="#9AA9BD"/></linearGradient>
    <linearGradient id="jyBand" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#A7B4C6"/><stop offset=".4" stop-color="#F1F4F8"/><stop offset="1" stop-color="#8E9DB3"/></linearGradient>
    <radialGradient id="jyShadow"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
    <radialGradient id="jyFade" cx=".5" cy=".5" r=".55"><stop offset=".55" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
    <mask id="jyGridMask"><rect width="560" height="440" fill="url(#jyFade)"/></mask>
    <linearGradient id="jyMiniShade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset=".4" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
    <linearGradient id="jyHot" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FF7A00"/><stop offset="1" stop-color="#FFB347"/></linearGradient>
    <g id="jyMini"><ellipse cx="0" cy="31" rx="26" ry="4" fill="url(#jyShadow)"/>
      <path d="M-22 24V-11Q-22-17-16-17H16Q22-17 22-11V24Z" fill="var(--c)"/>
      <path d="M-22 24V-11Q-22-17-16-17H16Q22-17 22-11V24Z" fill="url(#jyMiniShade)"/>
      <path d="M-15-8V18M-9-8V18M-3-8V18M3-8V18M9-8V18M15-8V18" stroke="#000" stroke-opacity=".18" stroke-width="1.6"/>
      <rect x="-23.5" y="21" width="47" height="8" rx="1.5" fill="var(--c)"/><rect x="-23.5" y="21" width="47" height="8" rx="1.5" fill="url(#jyMiniShade)"/>
      <rect x="-4" y="-20" width="8" height="8" rx="2" fill="#fff"/></g>
  </defs>
  <rect class="grid" x="0" y="0" width="560" height="440" fill="url(#jyGrid)" mask="url(#jyGridMask)"/>
  <g class="build">
    <g class="mould">
      <g class="mh l"><path fill-rule="evenodd" d="M40 96H280V364H40ZM184 322V166Q184 144 206 144H280V322Z" fill="url(#jySteel)"/><circle cx="96" cy="160" r="9"/><circle cx="96" cy="230" r="9"/><circle cx="96" cy="300" r="9"/></g>
      <g class="mh r"><path fill-rule="evenodd" d="M280 96H520V364H280ZM280 144H354Q376 144 376 166V322H280Z" fill="url(#jySteel)"/><circle cx="464" cy="160" r="9"/><circle cx="464" cy="230" r="9"/><circle cx="464" cy="300" r="9"/></g>
      <path class="part" d="M280 96V144M280 322V364"/>
      <rect class="sprue" x="275" y="60" width="10" height="86" rx="2"/>
    </g>
    <g class="solid">
      <ellipse class="shade" cx="280" cy="332" rx="140" ry="14" fill="url(#jyShadow)"/>
      <path d="M190 312V164Q190 150 204 150H356Q370 150 370 164V312Z" fill="url(#jyCap)"/>
      <g class="ribs" stroke="#5D6F88" stroke-width="2.4" stroke-opacity=".35">{RIBS}</g>
      <rect x="186" y="300" width="188" height="20" rx="3" fill="url(#jyBand)"/>
      <path d="M200 310H360" stroke="#7D8DA3" stroke-opacity=".5" stroke-width="1" stroke-dasharray="8 6"/>
      <path d="M206 156H354" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <text x="280" y="236" text-anchor="middle" class="brand">NEWCAP</text>
      <rect x="268" y="142" width="24" height="22" rx="4" fill="#FF7A00"/>
      <rect x="271" y="145" width="18" height="5" rx="2" fill="#FFB061"/>
    </g>
    <rect class="melt" x="190" y="150" width="180" height="170" fill="url(#jyHot)"/>
    <g class="draw" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path class="ln" pathLength="1" d="M190 312V164Q190 150 204 150H356Q370 150 370 164V312Z"/>
      <path class="ln" pathLength="1" d="M186 300H374V320H186Z"/>
      <path class="ln" pathLength="1" d="M268 164V146Q268 142 272 142H288Q292 142 292 146V164"/>
      <path class="ln thin" pathLength="1" d="M210 176V290M230 176V290M250 176V290M310 176V290M330 176V290M350 176V290"/>
      <g class="dim">
        <path class="ln thin" pathLength="1" d="M280 100V350"/>
        <path class="ln thin" pathLength="1" d="M190 118H370M190 112V124M370 112V124"/>
        <path class="ln thin" pathLength="1" d="M412 150V320M406 150H418M406 320H418"/>
        <text x="280" y="108" text-anchor="middle">Ø</text>
        <text x="428" y="240">H</text>
        <circle class="ln thin" pathLength="1" cx="204" cy="164" r="14"/>
      </g>
    </g>
  </g>
  <g class="line">
    <path class="belt" d="M60 404H500"/>
    <g transform="translate(280 370)">{MINIS}</g>
  </g>
</svg>'''


def section(lang):
    t = TXT[lang]
    href = "/capabilities" if lang == "fa" else f"/{lang}/capabilities"
    steps = "".join(
        f'''
          <li class="jy-step" data-k="{i+1}"><button type="button"><span class="n">0{i+1}</span><span class="tt" data-t="jy_s{i+1}">{a}</span></button>
            <p data-t="jy_s{i+1}p">{b}</p></li>''' for i, (a, b) in enumerate(t["s"]))
    return f'''
  <!-- ======================= JOURNEY ======================= -->
  <section class="journey" id="journey" data-s="0">
    <div class="jy-pin">
      <div class="jy-wrap">
        <div class="jy-copy">
          <p class="eyebrow"><span data-t="jy_eb">{t["eb"]}</span><i></i></p>
          <h2 class="jy-title" data-t="jy_t">{t["t"]}</h2>
          <p class="jy-lede" data-t="jy_p">{t["p"]}</p>
          <ol class="jy-steps">{steps}
          </ol>
          <div class="jy-rail" aria-hidden="true"><i></i></div>
          <a class="btn-w jy-cta" href="{href}"><span data-t="jy_cta">{t["cta"]}</span>
            {ARROW}</a>
        </div>
        <div class="jy-stage">
          {SVG}
          <span class="jy-hint" aria-hidden="true" data-t="jy_hint">{t["hint"]}</span>
        </div>
      </div>
    </div>
  </section>
'''


MARK = "\n  <!-- ======================= FEATURES ======================= -->"
OLD = re.compile(r"\n  <!-- =+ JOURNEY =+ -->.*?</section>\n", re.S)
for lang, f in [("fa", "index.html"), ("en", "en.html"), ("tr", "tr.html")]:
    p = os.path.join(ROOT, f)
    s = open(p, encoding="utf-8").read()
    s = OLD.sub("", s)
    assert s.count(MARK) == 1, f
    s = s.replace(MARK, section(lang) + MARK)
    open(p, "w", encoding="utf-8").write(s)
    print("journey ->", f)

# dictionary entries for FA / TR (EN is read from en.html at runtime)
def dict_js(lang):
    t = TXT[lang]
    items = {"jy_eb": t["eb"], "jy_t": t["t"], "jy_p": t["p"], "jy_cta": t["cta"], "jy_hint": t["hint"]}
    for i, (a, b) in enumerate(t["s"]):
        items[f"jy_s{i+1}"] = a; items[f"jy_s{i+1}p"] = b
    return ", ".join(f'{k}:{repr(v)}' for k, v in items.items())

sj = os.path.join(ROOT, "site.js")
s = open(sj, encoding="utf-8").read()
s = re.sub(r"\n/\* journey copy \*/\nObject\.assign\(FA, \{.*?\}\);\nObject\.assign\(TR, \{.*?\}\);\n", "\n", s, flags=re.S)
block = f"\n/* journey copy */\nObject.assign(FA, {{{dict_js('fa')}}});\nObject.assign(TR, {{{dict_js('tr')}}});\n"
anchor = "const DICTS = { en: EN, fa: FA, tr: TR };"
assert s.count(anchor) == 1
s = s.replace(anchor, block + anchor)
open(sj, "w", encoding="utf-8").write(s)
print("dicts -> site.js")
