
const IMG = {"hero": "/img/hero.webp?v=693b069d", "p1": "/img/p1.webp?v=45df4578", "p4": "/img/p4.webp?v=1af7f460", "indphoto": "/img/indphoto.webp?v=e04859e0", "blueprint": "/img/blueprint.webp?v=bd57a0dd", "quality": "/img/quality.webp?v=463d55ca", "cta": "/img/cta.webp?v=13d1a323", "logo": "/img/logo.webp?v=0fc668c3", "hi_navycap": "/img/hi_navycap.webp?v=0cf93cc4", "hi_whitecap": "/img/hi_whitecap.webp?v=e76284a2", "hi_colors": "/img/hi_colors.webp?v=e4ad5f8e", "hi_bottles": "/img/hi_bottles.webp?v=7ba517e8", "hi_mould": "/img/hi_mould.webp?v=37558f6b", "hi_capmacro": "/img/hi_capmacro.webp?v=b96ab2d5", "hi_capangle": "/img/hi_capangle.webp?v=e79cf0ff"};
Object.assign(IMG, {"tg_qr": "/img/tg_qr.webp?v=9966a5ff"});
Object.assign(IMG, {"ps_9": "/img/ps_9.webp?v=3d76e96c", "ps_10": "/img/ps_10.webp?v=958a394a"});
Object.assign(IMG, {"sc_yellow": "/img/sc_yellow.webp?v=2483fb00", "sc_teal": "/img/sc_teal.webp?v=020b52e5", "sc_blue": "/img/sc_blue.webp?v=4767610f", "sc_green": "/img/sc_green.webp?v=868763f1", "sc_orange": "/img/sc_orange.webp?v=a7e116a7", "sc_red": "/img/sc_red.webp?v=65b8b595", "ps_4": "/img/ps_4.webp?v=04e00db5", "ps_5": "/img/ps_5.webp?v=062f62e8", "ps_6": "/img/ps_6.webp?v=65262a48", "ps_7": "/img/ps_7.webp?v=5c38449d", "ps_8": "/img/ps_8.webp?v=7dfc4f4b"});
Object.assign(IMG, {"cap_orange": "/img/cap_orange.webp?v=0a3834f9", "cap_red": "/img/cap_red.webp?v=8a2132c9", "cap_green": "/img/cap_green.webp?v=af22c0dd", "cap_teal": "/img/cap_teal.webp?v=555cad38", "cap_blue": "/img/cap_blue.webp?v=a1767729", "cap_yellow": "/img/cap_yellow.webp?v=4b5148b7"});
Object.assign(IMG, {"ph_line": "/img/ph_line.webp?v=7bd10cb8", "ph_macro": "/img/ph_macro.webp?v=544fffdb", "ph_studio": "/img/ph_studio.webp?v=ac1d02b0", "ph_soft": "/img/ph_soft.webp?v=caee72f4", "ps_1": "/img/ps_1.webp?v=2f1aaf47", "ps_2": "/img/ps_2.webp?v=a6e99921", "ps_3": "/img/ps_3.webp?v=46c6d608"});
for (const [id,key] of [['logoTop','logo'],['logoBot','logo'],['heroShot','hero'],
  ['p1','p1'],['p4','p4'],['indShot','indphoto'],
  ['bpShot','blueprint'],['qShot','quality'],['ctaShot','cta']]) {
  const el = document.getElementById(id); if (el) el.src = IMG[key];
}


/* ------------------------ motion ------------------------ */
document.documentElement.classList.add('js');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* once an element has landed, drop data-rv so its own hover timings apply again */
function settle(el){
  if (!el.hasAttribute('data-rv')) return;
  const d = parseFloat(getComputedStyle(el).getPropertyValue('--d')) || 0;
  const extra = el.closest('.hero') ? 150 : 0;
  setTimeout(() => el.removeAttribute('data-rv'), reduce ? 0 : d + extra + 2400);
}
const io = new IntersectionObserver(es=>{
  es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); settle(e.target); io.unobserve(e.target); } });
}, {rootMargin:'0px 0px -10% 0px', threshold:0.1});
/* elements that open with a clip-path wipe start fully clipped, and a fully clipped
   element never counts as visible, so watch their parent instead */
const CLIPPED = 'h1[data-rv],h2[data-rv],.fblock[data-rv],.indshot[data-rv],.cine[data-rv]';
const pmap = new Map();
const io2 = new IntersectionObserver(es=>{
  es.forEach(e=>{
    if (!e.isIntersecting) return;
    (pmap.get(e.target) || []).forEach(el => { el.classList.add('in'); settle(el); });
    pmap.delete(e.target); io2.unobserve(e.target);
  });
}, {rootMargin:'0px 0px -8% 0px', threshold:0});
function watch(el){
  if (el.matches(CLIPPED) && el.parentElement) {
    const par = el.parentElement;
    if (!pmap.has(par)) { pmap.set(par, []); io2.observe(par); }
    pmap.get(par).push(el);
  } else io.observe(el);
}
function initMotion(root){
  root.querySelectorAll('.grid4 .pcard').forEach((el,i)=>el.style.setProperty('--d',(i*90)+'ms'));
  root.querySelectorAll('.indrow .icard').forEach((el,i)=>el.style.setProperty('--d',(i*80)+'ms'));
  root.querySelectorAll('.vals li').forEach((el,i)=>el.style.setProperty('--d',(480+i*90)+'ms'));
  root.querySelectorAll('.checks li').forEach((el,i)=>el.style.setProperty('--d',(i*110)+'ms'));
  root.querySelectorAll('.steps .stp, .tiles .tile').forEach((el,i)=>el.style.setProperty('--d',(i*70)+'ms'));
  root.querySelectorAll('[data-rv], .vals li, .checks li').forEach(watch);
}
initMotion(document);

/* hero opens on load rather than on scroll */
requestAnimationFrame(()=>{
  document.querySelectorAll('.hero [data-rv], .hero .vals li, .hero .eyebrow').forEach(el=>{ el.classList.add('in'); settle(el); });
});

/* slow parallax on the CTA ridge line */
const mt = document.getElementById('ctaShot'), cta = document.querySelector('.cta');
if (mt && !reduce && innerWidth > 900) {
  let tick = false;
  const move = () => {
    const r = cta.getBoundingClientRect();
    if (r.bottom > 0 && r.top < innerHeight) {
      const p = (r.top + r.height/2 - innerHeight/2) / innerHeight;
      mt.style.transform = 'translate3d(0,' + (p * 14).toFixed(2) + 'px,0) scale(1.06)';
    }
    tick = false;
  };
  addEventListener('scroll', () => { if(!tick){ tick = true; requestAnimationFrame(move);} }, {passive:true});
  move();
}

/* ambient: rings turn with the scroll like a cap on a thread, the traces
   speed up with scroll velocity, the two lights lean toward the pointer */
(() => {
  const amb = document.querySelector('.ambient');
  if (!amb || reduce) return;
  const rings = [...amb.querySelectorAll('.ring')], glows = [...amb.querySelectorAll('.glow')];
  const traces = () => [...amb.querySelectorAll('.tr')].flatMap(e => e.getAnimations ? e.getAnimations() : []);
  let lastY = scrollY, vy = 0, mx = 0, my = 0, gx = 0, gy = 0, rate = 1, tr = null;
  let alive = 0;
  const kick = () => { if (alive <= 0) requestAnimationFrame(tick); alive = 120; };
  addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; kick(); }, {passive:true});
  addEventListener('scroll', kick, {passive:true});
  const tick = () => {
    const y = scrollY, v = Math.abs(y - lastY); lastY = y;
    vy += (Math.min(80, v) - vy) * .08;
    rings.forEach((r, i) => {
      const dir = i % 2 ? -1 : 1;
      r.style.setProperty('--sr', (y * (.035 + i * .02) * dir).toFixed(2) + 'deg');
      r.style.setProperty('--sy', (Math.sin(y * .0011 + i * 1.7) * (18 + i * 14)).toFixed(1) + 'px');
    });
    gx += (mx - gx) * .035; gy += (my - gy) * .035;
    if (glows[0]) { glows[0].style.setProperty('--gx', (gx * 70).toFixed(1) + 'px'); glows[0].style.setProperty('--gy', (gy * 50).toFixed(1) + 'px'); }
    if (glows[1]) { glows[1].style.setProperty('--gx', (gx * -55).toFixed(1) + 'px'); glows[1].style.setProperty('--gy', (gy * -40).toFixed(1) + 'px'); }
    const r = 1 + vy * .14;
    if (Math.abs(r - rate) > .02) { rate = r; (tr = tr && tr.length ? tr : traces()).forEach(a => a.playbackRate = rate); }
    if (--alive > 0) requestAnimationFrame(tick);
  };
  kick();
})();

/* ------------------------- i18n ------------------------- */
const FA = {
  skip:"رفتن به محتوا",
  nav0:"خانه", credit:"طراحی و اجرا: نیما سرائیان", nav1:"محصولات", nav2:"صنایع", nav3:"توانمندی‌ها", nav4:"کیفیت", nav5:"درباره ما",
  nav6:"منابع", nav7:"تماس", inquire:"استعلام",
  heroEyebrow:"آغازِ فردایی روشن‌تر",
  heroTitle:"جزئی کوچک،<br>تفاوتی بزرگ.",
  heroLede:"تولید پیشرفتهٔ درپوش‌های پلاستیکی، برای جهانی پاکیزه‌تر، ایمن‌تر و پایدارتر.",
  v1:"دقت", v2:"نوآوری", v3:"اطمینان", v4:"فردایی پاکیزه‌تر",
  heroCta:"محصولات ما را ببینید",
  prodLabel:"محصولات ما", prodClaim:"مهندسی‌شده برای جهانی پاکیزه‌تر و ایمن‌تر", viewAll:"همهٔ محصولات",
  pt1:"کپ و درپوش پیمانه‌ای", ps1:"درپوش پیمانه‌ای شوینده،<br>در هر اندازه و رنگ",
  pt2:"درپوش اسپری",    ps2:"سر اسپری و درپوش<br>برای محصولات مایع",
  pt3:"قفل کودک و سفارشی",      ps3:"درپوش ایمنی و کپ<br>مطابق مشخصات شما",
  pt4:"درب گالن و روانکار", ps4:"درب گالن پلمپ‌دار و<br>کپ روغن و روغن ترمز",
  indLabel:"صنایعی که خدمت می‌کنیم", indClaim:"مورد اعتماد بازارهای جهانی",
  it1:"شوینده‌ها", is1:"خانگی، لباسشویی<br>و نظافت",
  it2:"روغن و روانکار", is2:"روغن موتور، روغن ترمز<br>و روانکارها",
  it3:"شیمیایی و چسب", is3:"مواد شیمیایی صنعتی<br>و انواع چسب",
  it4:"غذایی و بسته‌بندی", is4:"محصولات غذایی و<br>بسته‌بندی صنعتی",
  indCap:"یک درپوش،<br>صدها صنعت",
  fEyebrow1:"از ایده تا تولید",
  fTitle1:"درپوش سفارشی، مطابق مشخصات شما",
  fText1:"محصول و ظرفش را بیاورید. مشخصات را بررسی می‌کنیم و درپوشی تولید می‌کنیم که به آن بخورد — در اندازه، جنس و رنگی که محصولتان لازم دارد، و به تیراژی که خط تولیدتان می‌خواهد.",
  fCta1:"توانمندی‌های ما",
  fEyebrow2:"کیفیت در هر جزء",
  fTitle2:"بنا شده بر کیفیت",
  fText2:"دقیق، یکنواخت و با ظاهری تمیز. هر درپوش برای کیفیتی پایدار و تکرارپذیر ساخته می‌شود که خط تولیدتان بتواند رویش حساب کند.",
  q1:"دقت ابعادی", q2:"یکنواختی بچ‌ها", q3:"آب‌بندی بدون نشتی", q4:"کیفیت ظاهری",
  fCta2:"کیفیت ما",
  ctaEyebrow:"بیایید فردایی پاکیزه‌تر بسازیم",
  ctaTitle:"آمادهٔ ساخت راهکار بعدی‌تان هستید؟",
  ctaText:"برای راهکارهای نوآورانه، قابل اتکا و پایدارِ درپوش، با نیوکپ همراه شوید.",
  ctaBtn:"تماس بگیرید",
  fClaim:"مهندسی‌شده برای جهانی پاکیزه‌تر و ایمن‌تر",
  copy:"© ۱۴۰۵ نیوکپ. تمامی حقوق محفوظ است.",
  privacy:"حریم خصوصی", terms:"شرایط", sitemap:"نقشهٔ سایت",

  /* ---- محصولات ---- */
  pp_eb:"محصولات ما",
  pp_h1:"انواع درپوش و کپ پلاستیکی",
  pp_lede:"درپوش‌های پلی‌اتیلن و پلی‌پروپیلن برای شوینده‌ها، روغن و روانکار، مواد شیمیایی، چسب و صنایع غذایی — با تأمین عمده، و تولید مطابق مشخصات شما وقتی یک قطعهٔ استاندارد جواب نمی‌دهد.",
  pp_n1:"۰۱", pp_n2:"۰۲", pp_n3:"۰۳", pp_n4:"۰۴",
  pp_t1:"کپ و درپوش پیمانه‌ای",
  pp_p1:"کپ پیمانه‌ای برای شوینده‌های مایع که هم درپوش است هم پیمانه، تا مصرف‌کننده هر بار مقدار درست را بریزد. در اندازه‌های مختلف و به رنگ برند شما تولید می‌شود.",
  pp_b1a:"کپ پیمانه شوینده", pp_b1b:"اندازه‌های مختلف", pp_b1c:"رنگ دلخواه", pp_b1d:"PE یا PP",
  pp_t2:"کپ و درپوش روغن و روانکار",
  pp_p2:"درپوش بطری‌های روغن موتور، روغن ترمز و روانکار؛ جایی که نشتی فقط کثیف‌کاری نیست، مسئلهٔ ایمنی است. کپ بطری روغن ترمز ما قطعه‌ای ۶۲ میلی‌متری و ۵ گرمی از جنس PE یا PP است که برای آب‌بندی بدون نشتی ساخته شده.",
  pp_b2a:"کپ بطری روغن ترمز", pp_b2b:"۶۲ میلی‌متر، ۵ گرم", pp_b2c:"آب‌بندی بدون نشتی", pp_b2d:"رنگ‌بندی دلخواه",
  pp_t3:"درب گالن",
  pp_p3:"درب انواع گالن، از جمله درب پلمپ‌دار گالن ۲۰ لیتری که در یک نگاه نشان می‌دهد ظرف باز شده یا نه. به رنگ دلخواه شما تولید می‌شود.",
  pp_b3a:"درب گالن ۲۰ لیتری پلمپ‌دار", pp_b3b:"نوار پلمپ", pp_b3c:"رنگ دلخواه", pp_b3d:"تأمین عمده",
  pp_t4:"اسپری، قفل کودک و سفارشی",
  pp_p4:"درپوش اسپری، درپوش قفل کودک، پایه و درپوش ظروف چسب — و درپوشی که وقتی هیچ قطعهٔ استانداردی به محصولتان نمی‌خورد، مطابق مشخصات شما تولید می‌شود.",
  pp_b4a:"درپوش اسپری", pp_b4b:"درپوش قفل کودک", pp_b4c:"پایه و درپوش ظروف چسب", pp_b4d:"درپوش سفارشی",
  pp_specL:"مشخصات در یک نگاه",
  pp_s1:"مواد", pp_s1v:"پلی‌اتیلن (PE) و پلی‌پروپیلن (PP)، متناسب با محصولی که درپوش باید آن را ببندد.",
  pp_s2:"ابعاد", pp_s2v:"ابعاد استاندارد و اختصاصی — از کپ ۶۲ میلی‌متری روغن ترمز تا درب گالن ۲۰ لیتری.",
  pp_s3:"آب‌بندی", pp_s3v:"آب‌بندی بدون نشتی، با نوار پلمپ هر جا بسته باید اولین بازشدن را نشان دهد.",
  pp_s4:"رنگ", pp_s4v:"تولید به رنگ دلخواه شما، هماهنگ با برندتان.",
  pp_s5:"سفارش", pp_s5v:"تأمین عمده و مستمر برای کارخانه‌ها و مشتریان صنعتی.",
  pp_note:"درپوشی که می‌خواهید در فهرست نیست؟ مشخصات محصولتان را بررسی می‌کنیم و مطابق نیازتان تولید می‌کنیم.",

  /* ---- صنایع ---- */
  pi_eb:"صنایعی که خدمت می‌کنیم",
  pi_h1:"یک درپوش، صدها صنعت",
  pi_lede:"درپوش را با آنچه زیرش است می‌سنجند. هر صنعتی که به آن خدمت می‌کنیم، چیز متفاوتی از همان قطعهٔ کوچک می‌خواهد — و همین است که طراحی را شکل می‌دهد.",
  pi_n1:"شوینده‌ها", pi_t1:"خانگی، لباسشویی و نظافت",
  pi_p1:"مایعات غلیظ و پر از سورفکتانت که می‌خزند، کف می‌کنند و به مواد ضعیف حمله می‌برند. درپوش باید با دست خیس راحت باز شود و بعد از بیست بار بسته‌شدن هنوز آب‌بند بماند.",
  pi_b1a:"مقاومت به سورفکتانت", pi_b1b:"کپ پیمانه‌ای", pi_b1c:"آج‌دار برای دست خیس", pi_b1d:"پلمب نشان‌دهنده",
  pi_n2:"روغن و روانکار", pi_t2:"روغن موتور، روغن ترمز و روانکار",
  pi_p2:"روغن از هر شکافی عبور می‌کند و روغن ترمز به مواد ضعیف آسیب می‌زند و رطوبت هوا را جذب می‌کند. درپوش باید محکم و یکنواخت آب‌بندی کند، چون بطری نشت‌کرده در قفسه یا تعمیرگاه هم ضرر است هم خطر.",
  pi_b2a:"آب‌بندی بدون نشتی", pi_b2b:"کپ روغن ترمز", pi_b2c:"محافظت در برابر رطوبت", pi_b2d:"رنگ دلخواه",
  pi_n3:"شیمیایی و چسب", pi_t3:"مواد شیمیایی صنعتی و انواع چسب",
  pi_p3:"محتوای خورنده و محصولاتی که در تماس با هوا سفت می‌شوند. درپوش باید در برابر ترکیب شیمیایی مقاوم باشد، هوا را بیرون نگه دارد تا چسب داخل ظرف خشک نشود، و هر جا دست کودک به آن می‌رسد ایمن بماند.",
  pi_b3a:"مقاومت شیمیایی", pi_b3b:"آب‌بندی هوابند", pi_b3c:"درپوش قفل کودک", pi_b3d:"پایه و درپوش ظروف چسب",
  pi_n4:"غذایی و بسته‌بندی", pi_t4:"محصولات غذایی و بسته‌بندی صنعتی",
  pi_p4:"از ظروف غذایی تا گالن‌های ۲۰ لیتری، درپوش باید بهداشتی باشد، از یک بچ به بچ بعد یکسان بماند و به‌روشنی نشان دهد بسته باز شده یا نه.",
  pi_b4a:"طراحی بهداشتی", pi_b4b:"درب گالن", pi_b4c:"نوار پلمپ", pi_b4d:"یکنواختی بچ‌ها",
  pi_wL:"چطور با شما کار می‌کنیم",
  pi_w1:"شناخت محتوا", pi_w1p:"ترکیب شیمیایی، غلظت، ماندگاری و دمای پرکنی — پیش از آن‌که دربارهٔ هندسه حرفی زده شود.",
  pi_w2:"تطبیق با خط", pi_w2p:"گشتاور دربندی، سرعت هد و رواداری ظرف تعیین می‌کنند درپوش چه می‌تواند باشد.",
  pi_w3:"اثبات، بعد مقیاس", pi_w3p:"اول نمونه و تیراژ اعتبارسنجی؛ تولید پیوسته فقط وقتی آب‌بندی اثبات شد.",

  /* ---- توانمندی‌ها ---- */
  pc_eb:"از ایده تا تولید",
  pc_h1:"از مشخصات شما تا تأمین پیوسته",
  pc_lede:"بیشتر کار ما با محصولی شروع می‌شود که به درپوش درست نیاز دارد. این مسیری است که یک درخواست از اولین گفت‌وگو تا درپوشی که روی خط شما کار می‌کند طی می‌کند.",
  pc_sL:"روند همکاری",
  pc_s1:"شناخت محصول شما", pc_s1p:"درپوش چه چیزی را باید ببندد، روی چه ظرفی می‌نشیند و محصول چطور مصرف می‌شود.",
  pc_s2:"بررسی مشخصات", pc_s2p:"اندازه، دهانه، جنس و کارکرد — تطبیق با یک درپوش استاندارد یا تعریف برای درپوش سفارشی.",
  pc_s3:"انتخاب جنس", pc_s3p:"پلی‌اتیلن یا پلی‌پروپیلن، بر اساس ترکیب و کاربرد محصول.",
  pc_s4:"تطبیق رنگ", pc_s4p:"تولید به رنگ برند شما، نه هر رنگی که در انبار هست.",
  pc_s5:"تولید", pc_s5p:"تولید با تمرکز بر دقت، یکنواختی و کیفیت ظاهری.",
  pc_s6:"تأمین عمده", pc_s6p:"تأمین پیوسته، برنامه‌ریزی‌شده بر اساس حجم سفارش شما.",
  pc_cn:"کار سفارشی", pc_ct:"وقتی هیچ قطعهٔ استانداردی جواب نمی‌دهد",
  pc_cp:"پروژه‌های سفارشی معمولاً یک‌جور شروع می‌شوند: درپوشی که تقریباً جواب می‌دهد. درپوشی که نشت می‌دهد، سخت باز می‌شود، یا روی ظرف شما درست نمی‌نشیند. ما از همان‌جا که مشکل دارد شروع می‌کنیم و به درپوشی می‌رسیم که برای محصول شما ساخته شده.",
  pc_cb1:"رفع نشتی", pc_cb2:"ابعاد سفارشی", pc_cb3:"انتخاب ماده", pc_cb4:"رنگ برند",

  /* ---- کیفیت ---- */
  pq_eb:"کیفیت در هر جزء", pq_h1:"بنا شده بر کیفیت",
  pq_lede:"درپوش یا هر بار آب‌بندی می‌کند یا اصلاً آب‌بندی نمی‌کند. کیفیت پایدار — دقیق، یکنواخت و با ظاهری تمیز — چیزی است که هر درپوش را حولش می‌سازیم.",
  pq_n:"دقت", pq_t:"دقت ابعادی",
  pq_p:"درپوشی که کمی از اندازه فاصله بگیرد نشت می‌دهد، گیر می‌کند یا روی ظرف نمی‌نشیند. تولید روی این متمرکز است که هر درپوش به مشخصاتش وفادار بماند، تا قطعهٔ صدم مثل اولی جا بیفتد.",
  pq_b1:"وفاداری به مشخصات", pq_b2:"یکنواختی بچ‌ها", pq_b3:"کیفیت ظاهری", pq_b4:"یکنواختی رنگ",
  pq_tL:"روی چه چیزهایی تمرکز داریم",
  pq_x1:"آب‌بندی بدون نشتی", pq_x1p:"آب‌بندی دلیل وجود درپوش است؛ بقیهٔ چیزها از آن پیروی می‌کنند.",
  pq_x2:"دقت ابعادی", pq_x2p:"ابعاد مطابق مشخصات، تا درپوش همان‌طور که طراحی شده روی ظرف بنشیند.",
  pq_x3:"یکنواختی", pq_x3p:"درپوش‌هایی که از یک بچ به بچ بعد یکسان رفتار می‌کنند.",
  pq_x4:"پلمپ", pq_x4p:"هر جا بسته لازم دارد، نواری که به‌روشنی نشان دهد باز شده یا نه.",
  pq_x5:"جنس", pq_x5p:"پلی‌اتیلن یا پلی‌پروپیلن، متناسب با چیزی که درپوش باید نگه دارد.",
  pq_x6:"کیفیت ظاهری", pq_x6p:"سطح و رنگی که برند شما را در قفسه نمایندگی می‌کند.",
  pq_cL:"تعهدات ما",
  pq_c1:"کیفیت پایدار", pq_c1v:"دقت، یکنواختی و کیفیت ظاهری به‌عنوان استاندارد هر سفارش، نه فقط سفارش اول.",
  pq_c2:"مطابق نیاز شما", pq_c2v:"مشخصات محصولتان پیش از تولید بررسی می‌شود، نه بعد از بروز مشکل.",
  pq_c3:"تأمین مطمئن", pq_c3v:"تأمین پیوسته برای کارخانه‌هایی که نمی‌توانند منتظر درپوش بمانند.",
  pq_c4:"پاسخ روشن", pq_c4v:"اگر چیزی در سفارش شما تغییر کند، اول از ما می‌شنوید.",

  /* ---- درباره ما ---- */
  pa_eb:"دربارهٔ نیوکپ", pa_h1:"جزئی کوچک، تفاوتی بزرگ.",
  pa_lede:"ما قطعه‌ای را می‌سازیم که هیچ‌کس از آن عکس نمی‌گیرد و همه به آن وابسته‌اند. درپوش چند گرم پلاستیک است که تصمیم می‌گیرد محصول سالم برسد یا نه — و این کار به‌قدر کافی جدی هست که شرکتی حولش ساخته شود.",
  pa_sn:"داستان ما", pa_st:"مهندسی‌شده برای جهانی پاکیزه‌تر و ایمن‌تر",
  pa_sp:"نیوکپ تولیدکنندهٔ تخصصی درپوش و کپ پلاستیکی در شهرک صنعتی اشتهارد است. کارخانه‌های صنایع شوینده، روغن و روانکار، شیمیایی، چسب و غذایی را با درپوش‌هایی تأمین می‌کنیم که برای کیفیت پایدار ساخته شده‌اند — دقیق، یکنواخت و با ظاهری تمیز — به‌صورت عمده، و مطابق مشخصات وقتی محصولی چیزی مخصوص خودش می‌خواهد.",
  pa_sb1:"تولید تخصصی", pa_sb2:"تولید سفارشی", pa_sb3:"تولید کنترل‌شده", pa_sb4:"تأمین عمده",
  pa_vL:"به چه باور داریم",
  pa_v1k:"دقت", pa_v1:"رواداری، خودِ محصول است",
  pa_v1p:"درپوشی که تقریباً درست است، غلط است. برای آب‌بندی‌ای کار می‌کنیم که از یک درپوش به درپوش بعد، و از یک بچ به بچ بعد، تکرار شود.",
  pa_v2k:"نوآوری", pa_v2:"مسئله را سر نقشه حل کن",
  pa_v2p:"بیشتر خرابی‌های خط پرکنی، ماه‌ها پیش‌تر در یک مدل سه‌بعدی تصمیم‌گیری شده‌اند. ترجیح می‌دهیم وقت را همان‌جا بگذاریم.",
  pa_v3k:"اطمینان", pa_v3:"بگو، بعد انجام بده",
  pa_v3p:"تیراژ، تاریخ و مشخصات، تعهدند. وقتی چیزی تغییر می‌کند، اول از ما می‌شنوید.",
  pa_v4k:"پایداری", pa_v4:"ماده کمتر، عمر بیشتر",
  pa_v4p:"قطعات سبک‌تر، طراحی تک‌ماده و قابل بازیافت، و درپوشی که محصول را تا آخرین دوز قابل استفاده نگه می‌دارد.",
  pa_v5k:"آدم‌ها", pa_v5:"دقت در آدم‌ها",
  pa_v5p:"قالب و دستگاه کمتر از دست‌هایی اهمیت دارند که تنظیمشان می‌کنند. روی تیمی که آن‌ها را می‌گرداند سرمایه‌گذاری می‌کنیم.",
  pa_v6k:"همکاری", pa_v6:"شراکت‌های محکم‌تر",
  pa_v6p:"بهترین پروژه‌ها پیش از نهایی‌شدن مشخصات شروع می‌شوند، وقتی هنوز جا برای عوض‌کردن پاسخ هست.",

  /* ---- منابع ---- */
  pr_eb:"منابع", pr_h1:"مدارک و پاسخ‌ها",
  pr_lede:"هر چیزی که معمولاً باید درخواستش کنید — جزئیات محصول، مدارک بنا به درخواست، و سؤال‌هایی که خریداران بیش از همه از ما می‌پرسند.",
  pr_dL:"مدارک و مشاوره",
  pr_d1k:"بنا به درخواست", pr_d1:"کاتالوگ محصولات", pr_d1p:"کل سبد درپوش‌ها و کپ‌ها. نسخه‌ای از آن را از طریق واتساپ یا صفحهٔ تماس درخواست کنید.",
  pr_d2k:"بنا به درخواست", pr_d2:"مشخصات محصولات", pr_d2p:"جنس، ابعاد، وزن و رنگ هر محصول، بنا به درخواست.",
  pr_d3k:"مشاوره", pr_d3:"انتخاب درپوش", pr_d3p:"از محصولتان بگویید تا درپوش مناسبش را پیشنهاد کنیم.",
  pr_fL:"پرسش‌های پرتکرار",
  pr_q1:"درپوش را با طرح خودمان می‌سازید؟",
  pr_a1:"بله. مشخصات محصولتان را بررسی می‌کنیم و درپوش را مطابق نیازتان تولید می‌کنیم — برای وقتی که قطعهٔ استاندارد با ظرف یا محتوای شما جور نیست.",
  pr_q2:"حداقل تیراژ سفارش چقدر است؟",
  pr_a2:"بستگی به درپوش دارد و به این‌که قالبش از قبل هست یا نه. اقلام استاندارد با قالب موجود از تیراژ‌های متعادل شروع می‌شوند؛ قطعهٔ کاملاً سفارشی اول مرحلهٔ قالب‌سازی دارد. تیراژ سالانه را بگویید تا دقیق پاسخ دهیم.",
  pr_q3:"یک پروژهٔ سفارشی چقدر طول می‌کشد؟",
  pr_a3:"بستگی دارد که قالب مناسب از قبل موجود باشد یا نه. اقلام استاندارد سریع پیش می‌روند؛ طرح جدید اول یک مرحلهٔ توسعه لازم دارد. به‌جای یک عدد، در ابتدای کار برنامهٔ زمان‌بندی‌شده می‌دهیم.",
  pr_q4:"با ظرف فعلی ما هماهنگ می‌شود؟",
  pr_a4:"بله. یک نمونه ظرف یا نقشه‌اش را بفرستید. دهانه را خودمان اندازه می‌گیریم و به اندازهٔ اسمی اکتفا نمی‌کنیم، چون بیشتر مشکلات آب‌بندی دقیقاً از همان‌جا شروع می‌شود.",
  pr_q5:"با چه موادی کار می‌کنید؟",
  pr_a5:"پلی‌اتیلن (PE) و پلی‌پروپیلن (PP). انتخاب به محصول شما بستگی دارد — ترکیب شیمیایی‌اش، نحوهٔ نگه‌داری و شیوهٔ مصرف بسته.",
  pr_q6:"امکان تأمین عمده و مستمر دارید؟",
  pr_a6:"بله. با کارخانه‌هایی کار می‌کنیم که به تأمین پیوستهٔ درپوش نیاز دارند و تولید را بر اساس حجم سفارش شما برنامه‌ریزی می‌کنیم. تیراژ ماهانه یا سالانه‌تان را بگویید.",

  /* ---- تماس ---- */
  pn_eb:"بیایید فردایی پاکیزه‌تر بسازیم",
  pn_h1:"بگویید چه چیزی را می‌خواهید ببندید",
  pn_lede:"هرچه دربارهٔ محتوا، ظرف و خط پرکنی بیشتر بگویید، اولین پاسخ ما کاربردی‌تر خواهد بود.",
  pn_l1:"نام", pn_l2:"شرکت", pn_l3:"ایمیل", pn_l4:"تلفن",
  pn_l5:"موضوع درخواست", pn_l6:"چه چیزی را بسته‌بندی می‌کنید؟",
  pn_o1:"درپوش‌های استاندارد", pn_o2:"توسعهٔ سفارشی", pn_o3:"نمونه و آزمون", pn_o4:"موضوع دیگر",
  pn_send:"ارسال از طریق واتساپ",
  pn_hint:"با ارسال، واتساپ با اطلاعات شما باز می‌شود و آمادهٔ ارسال به واحد فروش است. این صفحه چیزی ذخیره نمی‌کند.",
  pn_iL:"تماس مستقیم",
  pn_i1:"تلفن", pn_i2:"ایمیل", pn_i3:"وب‌سایت", pn_i4:"نشانی",
  pn_i4v:"اشتهارد، شهرک صنعتی اشتهارد، ابن‌سینا شرقی،<br>قانون اول، قانون دوم، نبش قانون پنجم، قطعهٔ ۷۹",
  pn_tel:"۰۹۰۳ ۲۶۲ ۰۳۴۴",
  pn_i5:"واتساپ",
  pn_wa:"پیام در واتساپ"
};
const TR = {
  skip:"İçeriğe geç",
  nav0:"Ana sayfa", credit:"Tasarım ve geliştirme: Nima Saraeian", nav1:"Ürünler", nav2:"Sektörler", nav3:"Yetkinlikler", nav4:"Kalite", nav5:"Hakkımızda",
  nav6:"Kaynaklar", nav7:"İletişim", inquire:"Teklif al",
  heroEyebrow:"Daha aydınlık bir yarına doğru",
  heroTitle:"Küçük detay.<br>Büyük fark.",
  heroLede:"Daha temiz, daha güvenli ve daha sürdürülebilir bir dünya için ileri plastik kapak üretimi.",
  v1:"Hassasiyet", v2:"İnovasyon", v3:"Güvenilirlik", v4:"Daha temiz bir yarın",
  heroCta:"Ürünlerimizi keşfedin",
  prodLabel:"Ürünlerimiz", prodClaim:"Daha temiz, daha güvenli bir dünya için tasarlandı", viewAll:"Tüm ürünler",
  pt1:"Ölçekli kapaklar", ps1:"Deterjanlar için dozaj kapakları,<br>her ölçü ve renkte",
  pt2:"Sprey kapaklar",   ps2:"Sıvı ürünler için<br>sprey başlık ve kapaklar",
  pt3:"Çocuk kilitli ve özel",    ps3:"Güvenlik kapakları ve<br>şartnamenize göre kapaklar",
  pt4:"Bidon ve yağ kapakları", ps4:"Güvenlik bantlı bidon kapakları,<br>yağ ve fren hidroliği kapakları",
  indLabel:"Hizmet verdiğimiz sektörler", indClaim:"Küresel pazarlarda güvenilir",
  it1:"Deterjanlar", is1:"Ev, çamaşır<br>ve temizlik",
  it2:"Madeni yağlar", is2:"Motor yağı, fren hidroliği<br>ve yağlayıcılar",
  it3:"Kimya ve yapıştırıcı", is3:"Endüstriyel kimyasallar,<br>tutkal ve yapıştırıcılar",
  it4:"Gıda ve ambalaj", is4:"Gıda ürünleri ve<br>endüstriyel ambalaj",
  indCap:"Tek kapak.<br>Sayısız<br>sektör.",
  fEyebrow1:"Konseptten üretime",
  fTitle1:"Şartnamenize göre özel kapaklar",
  fText1:"Ürününüzü ve kabını bize getirin. Özellikleri inceler, ona uyan bir kapak üretiriz — ürününüzün gerektirdiği ölçü, malzeme ve renkte, hattınızın çalıştığı adette.",
  fCta1:"Yetkinliklerimiz",
  fEyebrow2:"Her detayda kalite",
  fTitle2:"Kalite üzerine kurulu",
  fText2:"Hassas, tutarlı ve temiz yüzeyli. Her kapak, üretiminizin güvenebileceği istikrarlı ve tekrarlanabilir bir kalite için üretilir.",
  q1:"Boyutsal hassasiyet", q2:"Tutarlı partiler", q3:"Sızdırmaz kapanış", q4:"Temiz yüzey kalitesi",
  fCta2:"Kalitemiz",
  ctaEyebrow:"Daha temiz bir yarını birlikte kuralım",
  ctaTitle:"Bir sonraki çözümünüzü yaratmaya hazır mısınız?",
  ctaText:"Yenilikçi, güvenilir ve sürdürülebilir kapak çözümleri için NEWCAP ile çalışın.",
  ctaBtn:"İletişime geçin",
  fClaim:"Daha temiz<br>ve güvenli bir dünya<br>için tasarlandı",
  copy:"© 2026 NEWCAP. Tüm hakları saklıdır.",
  privacy:"Gizlilik", terms:"Şartlar", sitemap:"Site haritası",

  /* ---- Ürünler ---- */
  pp_eb:"Ürünlerimiz",
  pp_h1:"Plastik kapak çeşitleri",
  pp_lede:"Deterjan, madeni yağ, kimya, yapıştırıcı ve gıda sektörleri için polietilen ve polipropilen kapaklar — toplu tedarik edilir, standart bir parça yetmediğinde şartnamenize göre üretilir.",
  pp_n1:"01", pp_n2:"02", pp_n3:"03", pp_n4:"04",
  pp_t1:"Ölçekli kapaklar",
  pp_p1:"Sıvı deterjanlar için aynı zamanda ölçü kabı olan dozaj kapakları; tüketici her seferinde doğru miktarı döker. Farklı ölçülerde ve markanızın renginde üretilir.",
  pp_b1a:"Deterjan ölçek kapağı", pp_b1b:"Farklı ölçüler", pp_b1c:"İstenen renk", pp_b1d:"PE veya PP",
  pp_t2:"Yağ ve madeni yağ kapakları",
  pp_p2:"Motor yağı, fren hidroliği ve madeni yağ şişeleri için kapaklar; burada sızıntı yalnızca kirlilik değil, bir güvenlik sorunudur. Fren hidroliği kapağımız PE veya PP'den, 62 mm çapında, 5 gramlık ve sızdırmaz kapanış için tasarlanmış bir parçadır.",
  pp_b2a:"Fren hidroliği şişe kapağı", pp_b2b:"62 mm, 5 g", pp_b2c:"Sızdırmaz kapanış", pp_b2d:"İstenen renkler",
  pp_t3:"Bidon kapakları",
  pp_p3:"Bidon ve jerrikenler için kapaklar; bir bakışta kabın açılıp açılmadığını gösteren 20 litrelik bidon için güvenlik bantlı kapak dahil. Belirttiğiniz renkte üretilir.",
  pp_b3a:"20 L güvenlik bantlı kapak", pp_b3b:"Güvenlik bandı", pp_b3c:"İstenen renk", pp_b3d:"Toplu tedarik",
  pp_t4:"Sprey, çocuk kilitli ve özel",
  pp_p4:"Sprey kapaklar, çocuk kilitli kapaklar, yapıştırıcı kapları için taban ve kapaklar — hiçbir standart parça ürününüze uymadığında şartnamenize göre geliştirilen kapaklar.",
  pp_b4a:"Sprey kapaklar", pp_b4b:"Çocuk kilitli kapaklar", pp_b4c:"Yapıştırıcı kabı tabanları", pp_b4d:"Özel kapaklar",
  pp_specL:"Teknik özet",
  pp_s1:"Malzemeler", pp_s1v:"Kapağın kapatacağı ürüne uygun olarak seçilen polietilen (PE) ve polipropilen (PP).",
  pp_s2:"Ölçüler", pp_s2v:"Standart ve ürüne özel ölçüler — 62 mm fren hidroliği kapağından 20 litrelik bidon kapağına kadar.",
  pp_s3:"Sızdırmazlık", pp_s3v:"Sızdırmaz kapanış; ambalajın ilk açılışı göstermesi gereken yerlerde güvenlik bandı.",
  pp_s4:"Renk", pp_s4v:"Markanıza uygun, istediğiniz renkte üretim.",
  pp_s5:"Sipariş", pp_s5v:"Fabrikalar ve endüstriyel müşteriler için toplu ve sürekli tedarik.",
  pp_note:"Aradığınız kapak listede yok mu? Ürününüzün özelliklerini inceler, ihtiyacınıza göre üretiriz.",

  /* ---- Sektörler ---- */
  pi_eb:"Hizmet verdiğimiz sektörler",
  pi_h1:"Tek kapak. Sayısız sektör.",
  pi_lede:"Bir kapak, altındaki ürüne göre değerlendirilir. Tedarik ettiğimiz her sektör aynı küçük parçadan farklı bir şey ister — tasarımı şekillendiren de budur.",
  pi_n1:"Deterjanlar", pi_t1:"Ev, çamaşır ve temizlik",
  pi_p1:"Akan, köpüren ve zayıf malzemeye saldıran yoğun, yüzey aktif madde ağırlıklı sıvılar. Kapak ıslak elle kolay açılmalı ve yirmi çevrimden sonra hâlâ sızdırmamalı.",
  pi_b1a:"Yüzey aktif madde direnci", pi_b1b:"Ölçekli kapaklar", pi_b1c:"Islak tutuş için tırtıl", pi_b1d:"Güvenlik bandı",
  pi_n2:"Madeni yağlar", pi_t2:"Motor yağı, fren hidroliği ve yağlayıcılar",
  pi_p2:"Yağlar her boşluktan sızar; fren hidroliği zayıf malzemelere zarar verir ve havadaki nemi emer. Kapak sıkı ve tutarlı biçimde kapatmalıdır, çünkü rafta ya da atölyede sızdıran bir şişe hem kayıp hem de tehlikedir.",
  pi_b2a:"Sızdırmaz kapanış", pi_b2b:"Fren hidroliği kapakları", pi_b2c:"Neme karşı koruma", pi_b2d:"İstenen renkler",
  pi_n3:"Kimya ve yapıştırıcı", pi_t3:"Endüstriyel kimyasallar ve yapıştırıcılar",
  pi_p3:"Agresif içerikler ve havayla temas edince kürlenen ürünler. Kapak kimyaya dayanmalı, yapıştırıcının kabında sertleşmemesi için havayı dışarıda tutmalı ve çocukların ulaşabileceği her yerde güvenli kalmalıdır.",
  pi_b3a:"Kimyasal direnç", pi_b3b:"Hava geçirmez kapanış", pi_b3c:"Çocuk kilitli kapaklar", pi_b3d:"Yapıştırıcı kabı tabanları",
  pi_n4:"Gıda ve ambalaj", pi_t4:"Gıda ürünleri ve endüstriyel ambalaj",
  pi_p4:"Gıda kaplarından 20 litrelik bidonlara kadar kapak hijyenik olmalı, bir partiden diğerine tutarlı kalmalı ve ambalajın açılıp açılmadığını açıkça göstermelidir.",
  pi_b4a:"Hijyenik tasarım", pi_b4b:"Bidon kapakları", pi_b4c:"Güvenlik bantları", pi_b4d:"Parti tutarlılığı",
  pi_wL:"Sizinle nasıl çalışıyoruz",
  pi_w1:"İçeriği anlamak", pi_w1p:"Kimya, viskozite, raf ömrü ve dolum sıcaklığı — geometri konuşulmadan önce.",
  pi_w2:"Hatta uyum", pi_w2p:"Kapama torku, kafa hızı ve kap toleransı kapağın ne olabileceğini belirler.",
  pi_w3:"Önce kanıt, sonra ölçek", pi_w3p:"Önce numune ve doğrulama üretimi; sürekli üretim ancak sızdırmazlık kanıtlanınca.",

  /* ---- Yetkinlikler ---- */
  pc_eb:"Konseptten üretime",
  pc_h1:"Şartnamenizden sürekli tedarike",
  pc_lede:"İşimizin çoğu doğru kapağa ihtiyaç duyan bir ürünle başlar. Bir talep ilk görüşmeden hattınızda çalışan bir kapağa şöyle ilerler.",
  pc_sL:"Nasıl çalışıyoruz",
  pc_s1:"Ürününüzü anlamak", pc_s1p:"Kapağın neyi kapatacağı, hangi kaba oturacağı ve ürünün nasıl kullanıldığı.",
  pc_s2:"Şartnameyi incelemek", pc_s2p:"Ölçü, ağız, malzeme ve işlev — standart bir kapakla eşleştirilir ya da özel kapak için tanımlanır.",
  pc_s3:"Malzeme seçimi", pc_s3p:"Ürünün kimyasına ve kullanımına göre polietilen ya da polipropilen.",
  pc_s4:"Renk eşleştirme", pc_s4p:"Stokta ne varsa değil, markanızın renginde üretim.",
  pc_s5:"Üretim", pc_s5p:"Hassasiyet, tutarlılık ve yüzey kalitesine odaklanarak üretim.",
  pc_s6:"Toplu tedarik", pc_s6p:"Sipariş hacminize göre planlanan sürekli tedarik.",
  pc_cn:"Özel işler", pc_ct:"Hiçbir standart parça uymadığında",
  pc_cp:"Özel projeler genellikle aynı şekilde başlar: neredeyse işe yarayan bir kapak. Sızdıran, zor açılan ya da kabınıza düzgün oturmayan bir kapak. Sorunun olduğu yerden başlar, ürününüz için yapılmış bir kapağa doğru ilerleriz.",
  pc_cb1:"Sızıntı sorunları", pc_cb2:"Özel ölçüler", pc_cb3:"Malzeme seçimi", pc_cb4:"Marka renkleri",

  /* ---- Kalite ---- */
  pq_eb:"Her detayda kalite", pq_h1:"Kalite üzerine kurulu",
  pq_lede:"Bir kapak ya her seferinde sızdırmaz ya da hiç sızdırmaz. İstikrarlı kalite — hassas, tutarlı ve temiz yüzeyli — her kapağı etrafında kurduğumuz şeydir.",
  pq_n:"Hassasiyet", pq_t:"Boyutsal hassasiyet",
  pq_p:"Biraz sapmış bir kapak sızdırır, sıkışır ya da kaba oturmaz. Üretim, her kapağın şartnamesine sadık kalmasına odaklanır; böylece yüzüncü parça da ilki gibi oturur.",
  pq_b1:"Şartnameye uygunluk", pq_b2:"Tutarlı partiler", pq_b3:"Temiz yüzey", pq_b4:"Tutarlı renk",
  pq_tL:"Neye odaklanıyoruz",
  pq_x1:"Sızdırmaz kapanış", pq_x1p:"Sızdırmazlık kapağın var olma nedenidir; geri kalan her şey ondan gelir.",
  pq_x2:"Boyutsal hassasiyet", pq_x2p:"Ölçüler şartnamede tutulur; kapak kaba tasarlandığı gibi oturur.",
  pq_x3:"Tutarlılık", pq_x3p:"Bir partiden diğerine aynı davranan kapaklar.",
  pq_x4:"Güvenlik bandı", pq_x4p:"Ambalajın ihtiyaç duyduğu yerde, açılıp açılmadığını açıkça gösteren bir bant.",
  pq_x5:"Malzeme", pq_x5p:"Kapağın tutması gerekene uygun polietilen ya da polipropilen.",
  pq_x6:"Görsel kalite", pq_x6p:"Rafta markanızı temsil eden yüzey ve renk.",
  pq_cL:"Taahhütlerimiz",
  pq_c1:"İstikrarlı kalite", pq_c1v:"Hassasiyet, tutarlılık ve yüzey kalitesi yalnızca ilk siparişte değil, her siparişte standart.",
  pq_c2:"İhtiyacınıza göre", pq_c2v:"Ürününüzün şartnamesi bir sorun çıktıktan sonra değil, üretimden önce incelenir.",
  pq_c3:"Güvenilir tedarik", pq_c3v:"Kapak beklemeyi göze alamayan fabrikalar için sürekli tedarik.",
  pq_c4:"Açık yanıtlar", pq_c4v:"Siparişinizle ilgili bir şey değişirse, bunu ilk bizden duyarsınız.",

  /* ---- Hakkımızda ---- */
  pa_eb:"NEWCAP hakkında", pa_h1:"Küçük detay. Büyük fark.",
  pa_lede:"Kimsenin fotoğrafını çekmediği, herkesin bağlı olduğu parçayı üretiyoruz. Bir kapak, ürünün sağlam ulaşıp ulaşmayacağına karar veren birkaç gram plastiktir — ve bu, etrafına bir şirket kurulacak kadar ciddi bir iştir.",
  pa_sn:"Hikâyemiz", pa_st:"Daha temiz, daha güvenli bir dünya için tasarlandı",
  pa_sp:"NEWCAP, Eştehard Organize Sanayi Bölgesi'nde faaliyet gösteren uzman bir plastik kapak üreticisidir. Deterjan, madeni yağ, kimya, yapıştırıcı ve gıda sektörlerindeki fabrikalara istikrarlı kalite için üretilmiş kapaklar tedarik ederiz — hassas, tutarlı ve temiz yüzeyli — toplu olarak, bir ürün kendine özgü bir şey gerektirdiğinde ise şartnameye göre.",
  pa_sb1:"Uzman üretim", pa_sb2:"Özel üretim", pa_sb3:"Kontrollü üretim", pa_sb4:"Toplu tedarik",
  pa_vL:"Neye inanıyoruz",
  pa_v1k:"Hassasiyet", pa_v1:"Tolerans, ürünün kendisidir",
  pa_v1p:"Neredeyse doğru olan bir kapak yanlıştır. Bir kapaktan diğerine, bir partiden diğerine tekrarlanan bir sızdırmazlık için çalışırız.",
  pa_v2k:"İnovasyon", pa_v2:"Sorunu çizimde çöz",
  pa_v2p:"Dolum hattındaki arızaların çoğu, aylar önce bir 3B modelde kararlaştırılmıştır. Zamanı orada harcamayı tercih ederiz.",
  pa_v3k:"Güvenilirlik", pa_v3:"Söyle, sonra yap",
  pa_v3p:"Adetler, tarihler ve spesifikasyonlar birer taahhüttür. Bir şey değiştiğinde ilk bizden duyarsınız.",
  pa_v4k:"Sürdürülebilirlik", pa_v4:"Daha az malzeme, daha uzun ömür",
  pa_v4p:"Daha hafif parçalar, geri dönüştürülebilir tek malzemeli tasarımlar ve ürünü son doza kadar kullanılabilir tutan kapaklar.",
  pa_v5k:"İnsan", pa_v5:"İnsanda da hassasiyet",
  pa_v5p:"Kalıp ve makineden çok, onları ayarlayan eller önemlidir. Onları çalıştıran ekibe yatırım yaparız.",
  pa_v6k:"İş birliği", pa_v6:"Daha güçlü ortaklıklar",
  pa_v6p:"En iyi projeler, spesifikasyon kesinleşmeden, cevabı değiştirecek alan hâlâ varken başlar.",

  /* ---- Kaynaklar ---- */
  pr_eb:"Kaynaklar", pr_h1:"Belgeler ve yanıtlar",
  pr_lede:"Normalde istemeniz gereken her şey — ürün ayrıntıları, talep üzerine belgeler ve alıcıların bize en sık sorduğu sorular.",
  pr_dL:"Belgeler ve danışmanlık",
  pr_d1k:"Talep üzerine", pr_d1:"Ürün kataloğu", pr_d1p:"Tüm kapak yelpazesi. Bir kopyasını WhatsApp veya iletişim sayfası üzerinden isteyin.",
  pr_d2k:"Talep üzerine", pr_d2:"Ürün özellikleri", pr_d2p:"Her ürünün malzemesi, ölçüsü, ağırlığı ve rengi; talep üzerine iletilir.",
  pr_d3k:"Danışmanlık", pr_d3:"Kapak seçimi", pr_d3p:"Ürününüzü anlatın, ona uygun kapağı önerelim.",
  pr_fL:"Sık sorulanlar",
  pr_q1:"Kendi tasarımımıza göre kapak üretiyor musunuz?",
  pr_a1:"Evet. Ürününüzün özelliklerini inceler ve kapağı ihtiyacınıza göre üretiriz — standart bir parça kabınıza ya da içeriğinize uymadığında.",
  pr_q2:"Minimum sipariş adedi nedir?",
  pr_a2:"Kapağa ve kalıbın hâlihazırda var olup olmadığına bağlı. Mevcut kalıpla üretilen standart ürünler makul adetlerden başlar; tamamen özel bir parçada önce kalıp aşaması vardır. Yıllık adedi söyleyin, net konuşalım.",
  pr_q3:"Özel bir proje ne kadar sürer?",
  pr_a3:"Uygun bir kalıbın zaten var olup olmadığına bağlı. Standart ürünler hızlı ilerler; yeni bir tasarım önce bir geliştirme aşaması gerektirir. Tek bir rakam yerine işin başında tarihli bir plan veririz.",
  pr_q4:"Mevcut kabımıza uyar mı?",
  pr_a4:"Evet. Bir numune kap ya da teknik resmini gönderin. Ağız ölçüsünü nominal değere güvenmeden kendimiz ölçeriz, çünkü sızdırmazlık sorunlarının çoğu tam olarak orada başlar.",
  pr_q5:"Hangi malzemelerle çalışıyorsunuz?",
  pr_a5:"Polietilen (PE) ve polipropilen (PP). Seçim ürününüze bağlıdır — kimyasına, nasıl depolandığına ve ambalajın nasıl kullanılacağına.",
  pr_q6:"Toplu ve sürekli tedarik edebilir misiniz?",
  pr_a6:"Evet. Düzenli kapak tedarikine ihtiyaç duyan fabrikalarla çalışır, üretimi sipariş hacminize göre planlarız. Aylık ya da yıllık adedinizi bize iletin.",

  /* ---- İletişim ---- */
  pn_eb:"Daha temiz bir yarını birlikte kuralım",
  pn_h1:"Neyi kapatmanız gerektiğini anlatın",
  pn_lede:"İçerik, kap ve dolum hattı hakkında ne kadar çok şey anlatırsanız, ilk yanıtımız o kadar işinize yarar.",
  pn_l1:"Ad soyad", pn_l2:"Şirket", pn_l3:"E-posta", pn_l4:"Telefon",
  pn_l5:"Talep türü", pn_l6:"Ne paketliyorsunuz?",
  pn_o1:"Standart kapaklar", pn_o2:"Özel geliştirme", pn_o3:"Numune ve test", pn_o4:"Diğer",
  pn_send:"WhatsApp ile gönder",
  pn_hint:"Gönderdiğinizde WhatsApp bilgileriniz doldurulmuş hâlde, satış ekibimize gitmeye hazır açılır. Bu sayfa hiçbir şey saklamaz.",
  pn_iL:"Doğrudan iletişim",
  pn_i1:"Telefon", pn_i2:"E-posta", pn_i3:"Web", pn_i4:"Adres",
  pn_i4v:"Parsel 79, Qanun 5 köşesi, Qanun 2, Qanun 1,<br>Doğu İbn-i Sina Cd., Eştehard Organize Sanayi Bölgesi,<br>Eştehard, İran",
  pn_tel:"+98 903 262 0344",
  pn_i5:"WhatsApp",
  pn_wa:"WhatsApp'tan yazın"
};

/* ---------------- long-form content, three languages ---------------- */
const EN_ART = {
  pr_iL:"Insights",
  pr_iT:"Notes from the workshop floor on the things that decide whether a closure works — written for the people who specify them.",
  ar_back:"All insights", ar_cta:"Talk to us",

  a1_cat:"Engineering", a1_cat2:"Engineering", a1_rt:"5 min read",
  a1_h1:"Why closures fail on the filling line",
  a1_lede:"Most closure failures are not manufacturing defects. They are mismatches between three things that were specified separately.",
  a1_p0:"A closure rarely fails on its own. It fails in combination — with a neck finish that drifts, a capping head that applies more torque than the design assumed, or a product that behaves differently at forty degrees than it did in the laboratory.",
  a1_s1:"The neck finish is the usual suspect",
  a1_p1:"Nominal sizes hide real variation. Two 28 mm finishes from different suppliers can differ in thread height, root diameter and the flatness of the sealing land. A closure designed against a drawing rather than a measured sample inherits that variation as a leak path.",
  a1_s2:"Torque is a window, not a number",
  a1_p2:"Every closure has a torque range where it seals and still opens by hand. Set the capper below it and the pack leaks; above it and the liner distorts or the band shears. That window narrows as the closure ages, so it should be measured after conditioning, not only on fresh parts.",
  a1_s3:"The product is part of the seal",
  a1_p3:"Surfactants creep along surfaces. Solvents swell polymers. Hot filling leaves a vacuum that pulls the panel inward as the contents cool. None of this shows up in a room-temperature water test, which is why compatibility trials have to run with the real formulation.",
  a1_s4:"What to specify instead",
  a1_p4:"Give your supplier the measured neck finish, the capper settings, the fill temperature and the actual product. A closure specified against those four will survive the line. One specified against a catalogue number is a gamble that usually gets settled during a production run.",

  a2_cat:"Materials", a2_cat2:"Materials", a2_rt:"4 min read",
  a2_h1:"Linerless or lined: choosing a sealing system",
  a2_lede:"The liner is not automatically the safer choice. Which system seals better depends on the neck, the product and how the pack will be handled.",
  a2_p0:"A lined closure seals by compressing a separate disc against the neck land. A linerless closure seals with a moulded feature — a cone, a plug or an olive — that contacts the neck directly. Both work. They fail differently, which is what makes the choice worth thinking about.",
  a2_s1:"Where linerless wins",
  a2_p1:"One material, one part, no assembly step. Recycling is simpler, unit cost is lower, and there is no liner to fall out or be left out. Linerless designs also handle repeated opening well, because the sealing feature is moulded into the part and returns to shape.",
  a2_s2:"Where a liner is still necessary",
  a2_p2:"Aggressive solvents, long storage, hot filling and barrier requirements usually point to a liner. Induction liners add something a moulded feature cannot replicate: a visible, sealed membrane that shows whether the pack has been entered.",
  a2_s3:"The decision usually turns on the neck",
  a2_p3:"Linerless sealing demands tighter control of the neck land, because the closure has nothing soft to compensate with. If the container comes from a supplier whose tolerances are loose, a liner absorbs that variation. If the neck is well controlled, linerless is the cleaner engineering answer.",
  a2_s4:"Test both, briefly",
  a2_p4:"The reliable way to choose is a short parallel trial: same product, same capper, both systems, then leak and torque testing after conditioning. It costs a few days and settles an argument that otherwise runs for months.",

  a3_cat:"Compliance", a3_cat2:"Compliance", a3_rt:"3 min read",
  a3_h1:"What tamper evidence actually proves",
  a3_lede:"A tamper-evident band shows that a pack has been opened. It does not show that the contents are unaltered — and the difference matters more than it sounds.",
  a3_p0:"Tamper evidence is a communication device. Its job is to make first opening visible and irreversible, so that a consumer at a shelf or an inspector at a border can judge a pack at a glance without opening it.",
  a3_s1:"The bridges do the work",
  a3_p1:"The band is joined to the closure by thin bridges designed to break at a defined torque. Too strong and the pack becomes hard to open for the people least able to force it. Too weak and the bridges break in transit, which destroys the signal. Bridge geometry, not band thickness, sets that balance.",
  a3_s2:"What it does not cover",
  a3_p2:"A band says nothing about whether the product was substituted before capping, or whether a pack was refilled through the base. Where that risk is real, tamper evidence is one layer among several — alongside induction sealing, batch coding and a supply chain you can audit.",
  a3_s3:"Design and handling are one problem",
  a3_p3:"Most band failures in the field trace back to handling rather than moulding: drops onto the shoulder, over-tight stacking, or a capper that spins the closure down too quickly. Reviewing the line is usually more productive than strengthening the bridges.",

  a4_cat:"Sustainability", a4_cat2:"Sustainability", a4_rt:"5 min read",
  a4_h1:"Designing closures for recyclability",
  a4_lede:"A closure is a few grams of the pack and a disproportionate share of its recycling problems. Most of those problems are decided at the drawing stage.",
  a4_p0:"Recyclers sort by material and by density. A closure that mixes polymers, carries a metal liner, or floats when the bottle sinks stops being a resource and becomes a contaminant — often for the whole bale, not just for itself.",
  a4_s1:"One material, wherever you can",
  a4_p1:"A polypropylene closure on a polypropylene bottle is the simplest case. Where the bottle is PET, a PP or PE closure still separates cleanly in a float-sink step, because it floats while PET sinks. Metal liners and mixed inserts break that separation and are worth designing out early.",
  a4_s2:"Lightweighting has a floor",
  a4_p2:"Removing material lowers impact, but only until sealing force or drop performance suffers. The useful target is the lightest part that still passes the same leak and transit tests as the part it replaces — not the lightest part that can be moulded.",
  a4_s3:"Keep the closure on the bottle",
  a4_p3:"Tethered designs keep the closure with the pack through collection, which raises recovery rates and reduces litter. They also change the opening motion, so they need testing with real users rather than only an engineering sign-off.",
  a4_s4:"Colour is a sorting decision",
  a4_p4:"Dark pigments can defeat near-infrared sorting, which means a technically recyclable closure gets rejected at the plant. If a closure has to be dark, specify a detectable pigment system and confirm it with a recycler rather than assuming it will pass."
};

const FA_ART = {
  pr_iL:"یادداشت‌های فنی",
  pr_iT:"یادداشت‌هایی از کف کارگاه دربارهٔ چیزهایی که تعیین می‌کنند یک درپوش کار می‌کند یا نه — نوشته‌شده برای کسانی که آن را تعریف می‌کنند.",
  ar_back:"همهٔ یادداشت‌ها", ar_cta:"با ما حرف بزنید",

  a1_cat:"مهندسی", a1_cat2:"مهندسی", a1_rt:"۵ دقیقه مطالعه",
  a1_h1:"چرا درپوش‌ها روی خط پرکنی شکست می‌خورند",
  a1_lede:"بیشتر شکست‌های درپوش عیب تولید نیستند. ناهماهنگی میان سه چیزی هستند که جداگانه تعریف شده‌اند.",
  a1_p0:"درپوش به‌ندرت به‌تنهایی شکست می‌خورد. در ترکیب شکست می‌خورد — با دهانه‌ای که رواداری‌اش جابه‌جا شده، با هد دربندی که گشتاوری بیش از فرض طراحی وارد می‌کند، یا با محصولی که در چهل درجه جور دیگری رفتار می‌کند تا در آزمایشگاه.",
  a1_s1:"مظنون همیشگی، دهانهٔ ظرف است",
  a1_p1:"اندازه‌های اسمی تفاوت‌های واقعی را پنهان می‌کنند. دو دهانهٔ ۲۸ میلی‌متری از دو تأمین‌کننده می‌توانند در ارتفاع رزوه، قطر ریشه و تخت بودن سطح آب‌بندی فرق داشته باشند. درپوشی که بر اساس نقشه طراحی شود نه بر اساس نمونهٔ اندازه‌گیری‌شده، همان تفاوت را به‌شکل مسیر نشتی به ارث می‌برد.",
  a1_s2:"گشتاور یک بازه است، نه یک عدد",
  a1_p2:"هر درپوش بازه‌ای از گشتاور دارد که در آن هم آب‌بندی می‌کند و هم با دست باز می‌شود. دستگاه را پایین‌تر تنظیم کنی نشت می‌دهد؛ بالاتر ببری واشر تغییر شکل می‌دهد یا نوار پلمب پاره می‌شود. این بازه با کهنه‌شدن درپوش تنگ‌تر می‌شود، پس باید بعد از شرایط‌گذاری اندازه‌گیری شود، نه فقط روی قطعهٔ تازه.",
  a1_s3:"خودِ محصول بخشی از آب‌بندی است",
  a1_p3:"سورفکتانت‌ها روی سطح می‌خزند. حلال‌ها پلیمر را متورم می‌کنند. پرکنی گرم خلأیی باقی می‌گذارد که هنگام سردشدن بدنه را به داخل می‌کشد. هیچ‌کدام در آزمون آب با دمای اتاق دیده نمی‌شوند؛ به همین دلیل آزمون سازگاری باید با فرمولاسیون واقعی انجام شود.",
  a1_s4:"به‌جای آن، چه چیزی را تعریف کنیم",
  a1_p4:"دهانهٔ اندازه‌گیری‌شده، تنظیمات دستگاه دربندی، دمای پرکنی و خودِ محصول را به تأمین‌کننده بدهید. درپوشی که بر اساس این چهار تعریف شود از خط جان سالم به در می‌برد. آن‌که بر اساس یک شمارهٔ کاتالوگ تعریف شود یک قمار است که معمولاً وسط تولید تسویه می‌شود.",

  a2_cat:"مواد", a2_cat2:"مواد", a2_rt:"۴ دقیقه مطالعه",
  a2_h1:"با واشر یا بدون واشر: انتخاب سامانهٔ آب‌بندی",
  a2_lede:"واشر به‌طور خودکار گزینهٔ امن‌تر نیست. این‌که کدام سامانه بهتر آب‌بندی می‌کند به دهانه، به محصول و به نحوهٔ جابه‌جایی بسته بستگی دارد.",
  a2_p0:"درپوش واشردار با فشردن یک دیسک جدا روی لبهٔ دهانه آب‌بندی می‌کند. درپوش بدون واشر با یک المان قالب‌گیری‌شده — مخروط، پلاگ یا زیتونی — که مستقیم با دهانه تماس می‌گیرد. هر دو کار می‌کنند. تفاوتشان در نحوهٔ شکست‌خوردن است، و همین انتخاب را ارزشمند می‌کند.",
  a2_s1:"کجا بدون واشر برنده است",
  a2_p1:"یک ماده، یک قطعه، بدون مرحلهٔ مونتاژ. بازیافت ساده‌تر است، هزینهٔ واحد کمتر، و واشری وجود ندارد که بیفتد یا فراموش شود. طرح‌های بدون واشر باز و بسته شدن مکرر را هم بهتر تحمل می‌کنند، چون المان آب‌بندی بخشی از خود قطعه است و به شکل اولش برمی‌گردد.",
  a2_s2:"کجا واشر هنوز لازم است",
  a2_p2:"حلال‌های خورنده، انبارش طولانی، پرکنی گرم و نیاز به خاصیت سدکنندگی معمولاً به واشر ختم می‌شوند. واشر القایی چیزی اضافه می‌کند که المان قالبی نمی‌تواند: یک غشای دیده‌شدنی و مهروموم‌شده که نشان می‌دهد بسته باز شده یا نه.",
  a2_s3:"تصمیم معمولاً به دهانه برمی‌گردد",
  a2_p3:"آب‌بندی بدون واشر کنترل دقیق‌تری روی لبهٔ دهانه می‌خواهد، چون درپوش چیز نرمی برای جبران ندارد. اگر ظرف از تأمین‌کننده‌ای بیاید که رواداری‌هایش باز است، واشر آن تفاوت را جذب می‌کند. اگر دهانه خوب کنترل شود، بدون واشر پاسخ مهندسیِ تمیزتری است.",
  a2_s4:"هر دو را کوتاه آزمایش کنید",
  a2_p4:"راه مطمئن انتخاب، یک آزمون موازی کوتاه است: همان محصول، همان دستگاه، هر دو سامانه، و بعد آزمون نشتی و گشتاور پس از شرایط‌گذاری. چند روز وقت می‌برد و بحثی را تمام می‌کند که وگرنه ماه‌ها ادامه پیدا می‌کند.",

  a3_cat:"انطباق", a3_cat2:"انطباق", a3_rt:"۳ دقیقه مطالعه",
  a3_h1:"پلمب واقعاً چه چیزی را ثابت می‌کند",
  a3_lede:"نوار پلمب نشان می‌دهد بسته باز شده است. نشان نمی‌دهد محتوا دست‌نخورده مانده — و این تفاوت مهم‌تر از آن است که به نظر می‌رسد.",
  a3_p0:"پلمب یک ابزار ارتباطی است. کارش این است که اولین بازشدن را دیدنی و برگشت‌ناپذیر کند، تا مصرف‌کننده پای قفسه یا بازرس پشت مرز بتواند بسته را در یک نگاه و بدون بازکردن قضاوت کند.",
  a3_s1:"کار را پل‌ها انجام می‌دهند",
  a3_p1:"نوار با پل‌های نازکی به درپوش وصل است که طوری طراحی شده‌اند در گشتاور مشخصی بشکنند. زیادی محکم باشند، بسته برای کسانی که کمترین توان را دارند سخت باز می‌شود. زیادی ضعیف باشند، در حمل می‌شکنند و کل سیگنال از بین می‌رود. این تعادل را هندسهٔ پل تعیین می‌کند، نه ضخامت نوار.",
  a3_s2:"چه چیزی را پوشش نمی‌دهد",
  a3_p2:"نوار پلمب چیزی دربارهٔ این نمی‌گوید که آیا محصول پیش از دربندی تعویض شده، یا بسته از کف دوباره پر شده است. جایی که این ریسک واقعی باشد، پلمب یکی از چند لایه است — کنار آب‌بندی القایی، کدگذاری بچ و زنجیرهٔ تأمینی که بتوان ممیزی‌اش کرد.",
  a3_s3:"طراحی و جابه‌جایی یک مسئله‌اند",
  a3_p3:"بیشتر شکست‌های نوار در بازار به جابه‌جایی برمی‌گردد نه به قالب: افتادن روی شانهٔ بطری، چیدن بیش از حد فشرده، یا دستگاهی که درپوش را خیلی سریع می‌چرخاند. بازبینی خط معمولاً نتیجه‌بخش‌تر از محکم‌کردن پل‌هاست.",

  a4_cat:"پایداری", a4_cat2:"پایداری", a4_rt:"۵ دقیقه مطالعه",
  a4_h1:"طراحی درپوش برای بازیافت‌پذیری",
  a4_lede:"درپوش چند گرم از بسته است و سهمی نامتناسب از مشکلات بازیافت آن. بیشتر این مشکلات سر میز طراحی تصمیم‌گیری می‌شوند.",
  a4_p0:"بازیافت‌کننده‌ها بر اساس جنس و چگالی تفکیک می‌کنند. درپوشی که چند پلیمر را قاطی کند، واشر فلزی داشته باشد، یا وقتی بطری ته‌نشین می‌شود شناور بماند، دیگر منبع نیست و آلاینده می‌شود — اغلب برای کل بِیل، نه فقط برای خودش.",
  a4_s1:"یک ماده، تا هر جا که ممکن است",
  a4_p1:"درپوش پلی‌پروپیلن روی بطری پلی‌پروپیلن ساده‌ترین حالت است. جایی که بطری PET باشد، درپوش PP یا PE باز هم در مرحلهٔ شناورسازی تمیز جدا می‌شود، چون شناور می‌ماند و PET ته‌نشین می‌شود. واشر فلزی و قطعات ترکیبی این جداسازی را به‌هم می‌زنند و بهتر است زود از طراحی حذف شوند.",
  a4_s2:"سبک‌سازی یک کف دارد",
  a4_p2:"کم‌کردن ماده اثر محیطی را پایین می‌آورد، ولی فقط تا جایی که نیروی آب‌بندی یا مقاومت در برابر سقوط آسیب نبیند. هدف مفید، سبک‌ترین قطعه‌ای است که همان آزمون‌های نشتی و حمل را مثل قطعهٔ قبلی پاس کند — نه سبک‌ترین قطعه‌ای که بشود قالب‌گیری کرد.",
  a4_s3:"درپوش را روی بطری نگه دارید",
  a4_p3:"طرح‌های متصل، درپوش را تا مرحلهٔ جمع‌آوری همراه بسته نگه می‌دارند؛ این نرخ بازیافت را بالا می‌برد و زباله‌پراکنی را کم می‌کند. حرکت بازکردن را هم عوض می‌کنند، پس باید با کاربر واقعی آزمون شوند نه فقط با تأیید مهندسی.",
  a4_s4:"رنگ یک تصمیم تفکیکی است",
  a4_p4:"رنگدانه‌های تیره می‌توانند تفکیک مادون‌قرمز را ناکام بگذارند؛ یعنی درپوشی که از نظر فنی بازیافت‌پذیر است در کارخانه رد می‌شود. اگر درپوش حتماً باید تیره باشد، سامانهٔ رنگدانهٔ قابل تشخیص تعریف کنید و به‌جای فرض‌کردن، با بازیافت‌کننده تأییدش کنید."
};

const TR_ART = {
  pr_iL:"Teknik notlar",
  pr_iT:"Bir kapağın işe yarayıp yaramayacağını belirleyen şeyler üzerine atölyeden notlar — kapağı tanımlayan kişiler için yazıldı.",
  ar_back:"Tüm notlar", ar_cta:"Bizimle konuşun",

  a1_cat:"Mühendislik", a1_cat2:"Mühendislik", a1_rt:"5 dakikalık okuma",
  a1_h1:"Kapaklar dolum hattında neden başarısız olur",
  a1_lede:"Kapak arızalarının çoğu üretim hatası değildir. Ayrı ayrı tanımlanmış üç şeyin birbirini tutmamasıdır.",
  a1_p0:"Bir kapak nadiren tek başına başarısız olur. Kombinasyon hâlinde başarısız olur — kayan bir ağız ölçüsüyle, tasarımın varsaydığından fazla tork uygulayan bir kapama kafasıyla ya da kırk derecede laboratuvardakinden farklı davranan bir ürünle.",
  a1_s1:"Her zamanki şüpheli: kabın ağzı",
  a1_p1:"Nominal ölçüler gerçek sapmayı gizler. Farklı tedarikçilerden gelen iki 28 mm ağız; diş yüksekliği, diş dibi çapı ve sızdırmazlık yüzeyinin düzlüğü bakımından farklı olabilir. Ölçülmüş bir numune yerine teknik resme göre tasarlanan kapak, bu sapmayı bir sızıntı yolu olarak devralır.",
  a1_s2:"Tork bir aralıktır, tek bir sayı değil",
  a1_p2:"Her kapağın hem sızdırmadığı hem de elle açılabildiği bir tork aralığı vardır. Makineyi altına ayarlarsanız ambalaj sızdırır; üstüne çıkarsanız conta deforme olur ya da güvenlik bandı kopar. Bu aralık kapak yaşlandıkça daralır; bu yüzden yalnızca taze parçada değil, şartlandırma sonrasında da ölçülmelidir.",
  a1_s3:"Ürünün kendisi sızdırmazlığın parçasıdır",
  a1_p3:"Yüzey aktif maddeler yüzeyde ilerler. Çözücüler polimeri şişirir. Sıcak dolum, içerik soğurken gövdeyi içeri çeken bir vakum bırakır. Bunların hiçbiri oda sıcaklığındaki su testinde görünmez; uyum denemelerinin gerçek formülasyonla yapılmasının nedeni budur.",
  a1_s4:"Bunun yerine ne tanımlanmalı",
  a1_p4:"Tedarikçinize ölçülmüş ağız ölçüsünü, kapama makinesi ayarlarını, dolum sıcaklığını ve gerçek ürünü verin. Bu dördüne göre tanımlanan bir kapak hattan sağ çıkar. Katalog numarasına göre tanımlanan kapak ise genellikle üretimin ortasında sonuçlanan bir kumardır.",

  a2_cat:"Malzeme", a2_cat2:"Malzeme", a2_rt:"4 dakikalık okuma",
  a2_h1:"Contalı mı contasız mı: sızdırmazlık sistemi seçimi",
  a2_lede:"Conta otomatik olarak daha güvenli seçenek değildir. Hangi sistemin daha iyi sızdırmazlık sağladığı ağza, ürüne ve ambalajın nasıl elleçleneceğine bağlıdır.",
  a2_p0:"Contalı kapak, ayrı bir diski ağız yüzeyine bastırarak sızdırmazlık sağlar. Contasız kapak ise kalıpla üretilmiş bir eleman — koni, tapa veya zeytin — ile doğrudan ağza temas eder. İkisi de çalışır. Farklı biçimlerde başarısız olurlar; seçimi düşünmeye değer kılan da budur.",
  a2_s1:"Contasız nerede kazanır",
  a2_p1:"Tek malzeme, tek parça, montaj adımı yok. Geri dönüşüm daha basit, birim maliyet daha düşük ve düşecek ya da unutulacak bir conta yok. Contasız tasarımlar tekrarlı açmayı da iyi kaldırır, çünkü sızdırmazlık elemanı parçanın kendisine kalıplanmıştır ve şekline geri döner.",
  a2_s2:"Conta nerede hâlâ gerekli",
  a2_p2:"Agresif çözücüler, uzun depolama, sıcak dolum ve bariyer ihtiyacı genellikle contaya işaret eder. İndüksiyon contası, kalıplı bir elemanın kopyalayamayacağı bir şey ekler: ambalajın açılıp açılmadığını gösteren, görünür ve mühürlü bir membran.",
  a2_s3:"Karar genellikle ağızda düğümlenir",
  a2_p3:"Contasız sızdırmazlık, ağız yüzeyinde daha sıkı kontrol ister; çünkü kapağın telafi edecek yumuşak bir parçası yoktur. Kap, toleransları geniş bir tedarikçiden geliyorsa bu sapmayı conta emer. Ağız iyi kontrol ediliyorsa contasız, mühendislik açısından daha temiz cevaptır.",
  a2_s4:"İkisini de kısaca test edin",
  a2_p4:"Seçimin güvenilir yolu kısa bir paralel denemedir: aynı ürün, aynı makine, iki sistem ve ardından şartlandırma sonrası sızıntı ve tork testi. Birkaç gün sürer ve aksi hâlde aylarca süren bir tartışmayı bitirir.",

  a3_cat:"Uygunluk", a3_cat2:"Uygunluk", a3_rt:"3 dakikalık okuma",
  a3_h1:"Güvenlik bandı aslında neyi kanıtlar",
  a3_lede:"Güvenlik bandı, ambalajın açıldığını gösterir. İçeriğin değişmediğini göstermez — ve bu fark kulağa geldiğinden daha önemlidir.",
  a3_p0:"Güvenlik bandı bir iletişim aracıdır. Görevi ilk açılışı görünür ve geri döndürülemez kılmaktır; böylece raftaki tüketici ya da sınırdaki denetçi ambalajı açmadan, tek bakışta değerlendirebilir.",
  a3_s1:"İşi köprüler yapar",
  a3_p1:"Bant, kapağa belirli bir torkta kopacak şekilde tasarlanmış ince köprülerle bağlıdır. Fazla güçlü olursa ambalaj, onu zorlamaya en az gücü yeten kişiler için zor açılır. Fazla zayıf olursa köprüler nakliyede kopar ve sinyalin tamamı yok olur. Bu dengeyi bandın kalınlığı değil, köprü geometrisi belirler.",
  a3_s2:"Neyi kapsamaz",
  a3_p2:"Bant, ürünün kapama öncesinde değiştirilip değiştirilmediği ya da ambalajın tabandan yeniden doldurulup doldurulmadığı hakkında hiçbir şey söylemez. Bu risk gerçekse güvenlik bandı katmanlardan yalnızca biridir — indüksiyon contası, parti kodlaması ve denetlenebilir bir tedarik zinciriyle birlikte.",
  a3_s3:"Tasarım ve elleçleme tek bir sorundur",
  a3_p3:"Sahadaki bant arızalarının çoğu kalıptan değil elleçlemeden gelir: omuz üstüne düşmeler, aşırı sıkı istifleme ya da kapağı çok hızlı çeviren bir makine. Hattı gözden geçirmek, köprüleri güçlendirmekten genellikle daha verimlidir.",

  a4_cat:"Sürdürülebilirlik", a4_cat2:"Sürdürülebilirlik", a4_rt:"5 dakikalık okuma",
  a4_h1:"Geri dönüşüm için kapak tasarlamak",
  a4_lede:"Kapak, ambalajın birkaç gramıdır ama geri dönüşüm sorunlarının orantısız bir bölümünü taşır. Bu sorunların çoğu çizim aşamasında kararlaştırılır.",
  a4_p0:"Geri dönüşümcüler malzemeye ve yoğunluğa göre ayırır. Polimerleri karıştıran, metal conta taşıyan ya da şişe batarken yüzen bir kapak kaynak olmaktan çıkıp kirletici hâline gelir — çoğu zaman yalnızca kendisi için değil, tüm balya için.",
  a4_s1:"Mümkün olan her yerde tek malzeme",
  a4_p1:"Polipropilen şişe üzerinde polipropilen kapak en basit durumdur. Şişe PET ise, PP veya PE kapak yüzdürme adımında yine temiz ayrışır; çünkü PET batarken kapak yüzer. Metal contalar ve karışık iç parçalar bu ayrımı bozar ve erkenden tasarımdan çıkarılmalıdır.",
  a4_s2:"Hafifletmenin bir tabanı vardır",
  a4_p2:"Malzeme azaltmak etkiyi düşürür, ama yalnızca sızdırmazlık kuvveti veya düşme dayanımı zarar görmediği sürece. İşe yarar hedef, yerini aldığı parçayla aynı sızıntı ve nakliye testlerini geçen en hafif parçadır — kalıplanabilen en hafif parça değil.",
  a4_s3:"Kapağı şişenin üzerinde tutun",
  a4_p3:"Bağlı tasarımlar kapağı toplama aşamasına kadar ambalajla birlikte tutar; bu geri kazanım oranını yükseltir ve çöpü azaltır. Açma hareketini de değiştirirler, bu yüzden yalnızca mühendislik onayıyla değil, gerçek kullanıcılarla test edilmeleri gerekir.",
  a4_s4:"Renk bir ayrıştırma kararıdır",
  a4_p4:"Koyu pigmentler yakın kızılötesi ayrıştırmayı boşa çıkarabilir; yani teknik olarak geri dönüştürülebilir bir kapak tesiste reddedilir. Kapak mutlaka koyu olacaksa, algılanabilir bir pigment sistemi tanımlayın ve geçeceğini varsaymak yerine bir geri dönüşümcüyle doğrulayın."
};

const EN = {};
document.querySelectorAll('[data-t]').forEach(el => EN[el.dataset.t] = el.innerHTML);
Object.assign(EN, EN_ART); Object.assign(FA, FA_ART); Object.assign(TR, TR_ART);

Object.assign(FA, {
  pc_vn:"در مقیاس تولید", pc_vt:"هر درپوش، درست مثل قبلی",
  pc_vp:"تولید پیوسته برای کارخانه‌هایی که هر روز کار می‌کنند — به رنگی که هر خط محصول می‌خواهد.",
  pq_zn:"از نزدیک", pq_zt:"جزئیات، تفاوت را می‌سازند",
  pq_zp:"سطح، لبه و پرداخت بخشی از مشخصات فنی‌اند، نه چیزی که بعداً به آن فکر شود. این‌ها اولین چیزی‌اند که دست مشتری شما لمس می‌کند.",
  pr_gL:"کمپین برند", pr_gT:"تصاویر کمپین نیوکپ. برای دیدن هر تصویر در اندازهٔ کامل، روی آن بزنید."
});
Object.assign(TR, {
  pc_vn:"Ölçekli üretim", pc_vt:"Her kapak, bir öncekinin aynısı",
  pc_vp:"Her gün çalışan fabrikalar için sürekli üretim — her ürün hattının istediği renkte.",
  pq_zn:"Daha yakından", pq_zt:"Farkı ayrıntılar yaratır",
  pq_zp:"Yüzey, kenar ve bitiş sonradan düşünülen şeyler değil, şartnamenin parçasıdır. Müşterinizin elinin ilk dokunduğu yer onlardır.",
  pr_gL:"Marka kampanyası", pr_gT:"NEWCAP kampanya görselleri. Tam boyutta görmek için bir görsele dokunun."
});

Object.assign(FA, {
  palEb:"رنگ، مطابق سفارش شما", palT:"یک درپوش.<br>رنگ شما.",
  palP:"هر درپوش به رنگی تولید می‌شود که محصول شما می‌خواهد — هم‌رنگ برندتان، یا برای اینکه خطوط محصول در یک نگاه از هم تشخیص داده شوند.",
  palCta:"رنگ خود را استعلام کنید", palNote:"شش رنگ از بی‌شمار — هر رنگی به سفارش شما."
});
Object.assign(TR, {
  palEb:"Siparişe göre renk", palT:"Tek kapak.<br>Sizin renginiz.",
  palP:"Her kapak, ürününüzün gerektirdiği renkte üretilir — markanıza uyması ya da ürün hatlarınızın bir bakışta ayırt edilmesi için.",
  palCta:"Renginizi sorun", palNote:"Pek çok renkten altısı — her renk siparişe göre."
});
const DICTS = { en: EN, fa: FA, tr: TR };
const LANG_META = {
  en: { code:'EN', dir:'ltr', title:'NEWCAP Closures — Plastic Closures & Caps Manufacturer', search:'Search NEWCAP' },
  fa: { code:'FA', dir:'rtl', title:'نیوکپ | تولیدکننده درپوش و کپ پلاستیکی',           search:'جست‌وجو در نیوکپ' },
  tr: { code:'TR', dir:'ltr', title:'NEWCAP — Plastik Kapak Üreticisi',    search:'NEWCAP içinde ara' }
};

function setLang(l){
  const d = DICTS[l] || EN, meta = LANG_META[l] || LANG_META.en;
  document.querySelectorAll('[data-t]').forEach(el => { if (d[el.dataset.t]) el.innerHTML = d[el.dataset.t]; });
  const h = document.documentElement;
  h.lang = l; h.dir = meta.dir;                 /* lang also gives Turkish its dotted İ in uppercase */
  document.getElementById('langBtn').textContent = meta.code;
  const q = document.getElementById('q'); if (q) q.placeholder = meta.search;
  document.title = meta.title;
  document.querySelectorAll('#langMenu button').forEach(b =>
    b.setAttribute('aria-current', String(b.dataset.lang === l)));
  try { localStorage.setItem('nc_lang', l); } catch(e){}
}

let lang = (window.__BOOT__ && window.__BOOT__.lang) || 'fa';
if (!window.__BOOT__) { try { const st = localStorage.getItem('nc_lang'); if (DICTS[st]) lang = st; } catch(e){} }
setLang(lang);

const langBtn = document.getElementById('langBtn'), langMenu = document.getElementById('langMenu');
function closeLang(){ langMenu.hidden = true; langBtn.setAttribute('aria-expanded','false'); }
langBtn.addEventListener('click', e => {
  e.stopPropagation();
  const open = langMenu.hidden;
  langMenu.hidden = !open; langBtn.setAttribute('aria-expanded', String(open));
});
langMenu.addEventListener('click', e => {
  const b = e.target.closest('button[data-lang]'); if (!b) return;
  if (BOOT) { location.href = langPath(b.dataset.lang, BOOT.route) || '/'; return; }
  lang = b.dataset.lang; setLang(lang); closeLang();
  updateSEO(location.hash.replace(/^#\/?/, '').split('?')[0], lang);
});
document.addEventListener('click', closeLang);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLang(); });

/* ------------------------ theme ------------------------ */
const root = document.documentElement;
function setTheme(t){
  root.setAttribute('data-theme', t);
  try { localStorage.setItem('nc_theme', t); } catch(e){}
}
let stored = null;
try { stored = localStorage.getItem('nc_theme'); } catch(e){}
/* a shared link can choose the theme: ?theme=dark or ?theme=light */
try {
  const qt = new URLSearchParams(location.search).get('theme');
  if (qt === 'dark' || qt === 'light') { stored = qt; localStorage.setItem('nc_theme', qt); }
} catch(e){}
root.setAttribute('data-theme',
  (stored === 'dark' || stored === 'light') ? stored
  : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
document.getElementById('themeBtn').addEventListener('click', () => {
  setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ---------------------- mobile menu ---------------------- */
const nav = document.getElementById('mainnav');
document.getElementById('burger').addEventListener('click', () => nav.classList.toggle('open'));
nav.addEventListener('click', e => { if (e.target.tagName === 'A') nav.classList.remove('open'); });


/* ======================= INNER PAGES ======================= */
const ic = (d) => '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4">' +
  '<circle cx="7" cy="7" r="6"/><path d="m4.4 7.2 1.8 1.8L9.8 5.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const PAGES = {

/* ------------------------------- PRODUCTS ------------------------------- */
products: () => `
<section class="psec phero"><div class="wrap">
  <p class="eyebrow" data-rv><span data-t="pp_eb">Our products</span><i></i></p>
  <h1 data-rv style="--d:90ms" data-t="pp_h1">Plastic closures and caps</h1>
  <p class="lede" data-rv style="--d:170ms" data-t="pp_lede">Polyethylene and polypropylene closures for detergents, oils and lubricants, chemicals, adhesives and food — supplied in bulk, and produced to your specification when a standard part will not do.</p>
  <div class="hr"></div>
</div></section>

<section class="psec"><div class="wrap">
  <div class="split" data-rv>
    <div class="sh"><img src="${IMG.hi_navycap}" alt=""></div>
    <div>
      <div class="n" data-t="pp_n1">01</div>
      <h3 data-t="pp_t1">Measuring caps</h3>
      <p data-t="pp_p1">Dosing caps for liquid detergents that double as a measure, so the consumer pours the right amount every time. Produced in a range of sizes and in the colour of your brand.</p>
      <ul>
        <li><span data-t="pp_b1a">Detergent measuring caps</span></li>
        <li><span data-t="pp_b1b">Multiple sizes</span></li>
        <li><span data-t="pp_b1c">Any colour</span></li>
        <li><span data-t="pp_b1d">PE or PP</span></li>
      </ul>
    </div>
  </div>
  <div class="split rev" data-rv>
    <div class="sh"><img src="${IMG.hi_whitecap}" alt=""></div>
    <div>
      <div class="n" data-t="pp_n2">02</div>
      <h3 data-t="pp_t2">Oil &amp; lubricant caps</h3>
      <p data-t="pp_p2">Closures for engine oil, brake fluid and lubricant bottles, where a leak is not just a mess but a safety problem. Our brake-fluid cap is a 62 mm, 5-gram part in PE or PP, built for a leak-free seal.</p>
      <ul>
        <li><span data-t="pp_b2a">Brake-fluid bottle cap</span></li>
        <li><span data-t="pp_b2b">62 mm, 5 g</span></li>
        <li><span data-t="pp_b2c">Leak-free sealing</span></li>
        <li><span data-t="pp_b2d">Custom colours</span></li>
      </ul>
    </div>
  </div>
  <div class="split" data-rv>
    <div class="sh"><img src="${IMG.hi_colors}" alt=""></div>
    <div>
      <div class="n" data-t="pp_n3">03</div>
      <h3 data-t="pp_t3">Gallon caps</h3>
      <p data-t="pp_p3">Caps for gallons and jerrycans, including a tamper-evident cap for 20-litre gallons that shows at a glance whether a container has been opened. Produced in the colour you specify.</p>
      <ul>
        <li><span data-t="pp_b3a">20 L tamper-evident cap</span></li>
        <li><span data-t="pp_b3b">Tamper band</span></li>
        <li><span data-t="pp_b3c">Any colour</span></li>
        <li><span data-t="pp_b3d">Bulk supply</span></li>
      </ul>
    </div>
  </div>
  <div class="split rev" data-rv>
    <div class="sh"><img src="${IMG.hi_bottles}" alt=""></div>
    <div>
      <div class="n" data-t="pp_n4">04</div>
      <h3 data-t="pp_t4">Spray, child-resistant &amp; custom</h3>
      <p data-t="pp_p4">Spray closures, child-resistant caps, bases and caps for adhesive containers — and closures developed to your specification when nothing standard fits your product.</p>
      <ul>
        <li><span data-t="pp_b4a">Spray closures</span></li>
        <li><span data-t="pp_b4b">Child-resistant caps</span></li>
        <li><span data-t="pp_b4c">Adhesive container bases</span></li>
        <li><span data-t="pp_b4d">Custom closures</span></li>
      </ul>
    </div>
  </div>
</div></section>

<section class="psec"><div class="wrap">
  <h2 class="label" data-rv><span data-t="pp_specL">Specification at a glance</span><i></i></h2>
  <dl class="spec" data-rv>
    <div class="row"><dt data-t="pp_s1">Materials</dt><dd data-t="pp_s1v">Polyethylene (PE) and polypropylene (PP), chosen to suit the product the closure will seal.</dd></div>
    <div class="row"><dt data-t="pp_s2">Sizes</dt><dd data-t="pp_s2v">Standard and product-specific sizes — from 62 mm brake-fluid caps to caps for 20-litre gallons.</dd></div>
    <div class="row"><dt data-t="pp_s3">Sealing</dt><dd data-t="pp_s3v">Leak-free sealing, with tamper-evident bands where the pack needs to show first opening.</dd></div>
    <div class="row"><dt data-t="pp_s4">Colour</dt><dd data-t="pp_s4v">Produced in the colour of your choice, to match your brand.</dd></div>
    <div class="row"><dt data-t="pp_s5">Orders</dt><dd data-t="pp_s5v">Bulk and continuous supply for factories and industrial customers.</dd></div>
  </dl>
  <p class="t" data-rv style="--d:80ms" data-t="pp_note">Need a closure that is not listed? We review your product’s specifications and produce to your requirement.</p>
</div></section>`,

/* ------------------------------ INDUSTRIES ------------------------------ */
industries: () => `
<section class="psec phero"><div class="wrap">
  <p class="eyebrow" data-rv><span data-t="pi_eb">Industries we serve</span><i></i></p>
  <h1 data-rv style="--d:90ms" data-t="pi_h1">One cap. Many industries.</h1>
  <p class="lede" data-rv style="--d:170ms" data-t="pi_lede">A closure is judged by what sits underneath it. Each sector we supply asks something different of the same small part — and that is what shapes the design.</p>
  <div class="hr"></div>
</div></section>

<section class="psec"><div class="wrap">
  <div class="split" data-rv>
    <div class="sh"><img src="${IMG.hi_bottles}" alt=""></div>
    <div>
      <div class="n" data-t="pi_n1">Detergents</div>
      <h3 data-t="pi_t1">Household, laundry and cleaning</h3>
      <p data-t="pi_p1">Thick, surfactant-heavy liquids that creep, foam and attack weak materials. The closure has to open easily in a wet hand and still seal after twenty cycles.</p>
      <ul>
        <li><span data-t="pi_b1a">Surfactant resistance</span></li>
        <li><span data-t="pi_b1b">Measuring caps</span></li>
        <li><span data-t="pi_b1c">Wet-grip ribbing</span></li>
        <li><span data-t="pi_b1d">Tamper evidence</span></li>
      </ul>
    </div>
  </div>
  <div class="split rev" data-rv>
    <div class="sh"><img src="${IMG.hi_capmacro}" alt=""></div>
    <div>
      <div class="n" data-t="pi_n2">Oil &amp; lubricants</div>
      <h3 data-t="pi_t2">Engine oil, brake fluid and lubricants</h3>
      <p data-t="pi_p2">Oils creep through any gap, and brake fluid attacks weak materials and draws moisture from the air. The closure has to seal tightly and consistently, because a leaking bottle on a shelf or in a workshop is both a loss and a hazard.</p>
      <ul>
        <li><span data-t="pi_b2a">Leak-free sealing</span></li>
        <li><span data-t="pi_b2b">Brake-fluid caps</span></li>
        <li><span data-t="pi_b2c">Moisture protection</span></li>
        <li><span data-t="pi_b2d">Custom colours</span></li>
      </ul>
    </div>
  </div>
  <div class="split" data-rv>
    <div class="sh"><img src="${IMG.hi_whitecap}" alt=""></div>
    <div>
      <div class="n" data-t="pi_n3">Chemicals &amp; adhesives</div>
      <h3 data-t="pi_t3">Industrial chemicals, glues and adhesives</h3>
      <p data-t="pi_p3">Aggressive contents, and products that cure on contact with air. The closure has to resist the chemistry, keep air out so an adhesive does not harden in its container, and stay safe wherever children could reach it.</p>
      <ul>
        <li><span data-t="pi_b3a">Chemical resistance</span></li>
        <li><span data-t="pi_b3b">Airtight sealing</span></li>
        <li><span data-t="pi_b3c">Child-resistant caps</span></li>
        <li><span data-t="pi_b3d">Adhesive container bases</span></li>
      </ul>
    </div>
  </div>
  <div class="split rev" data-rv>
    <div class="sh"><img src="${IMG.hi_colors}" alt=""></div>
    <div>
      <div class="n" data-t="pi_n4">Food &amp; packaging</div>
      <h3 data-t="pi_t4">Food products and industrial packaging</h3>
      <p data-t="pi_p4">From food containers to 20-litre gallons, the closure has to be hygienic, consistent from one batch to the next, and show clearly whether the pack has been opened.</p>
      <ul>
        <li><span data-t="pi_b4a">Hygienic design</span></li>
        <li><span data-t="pi_b4b">Gallon caps</span></li>
        <li><span data-t="pi_b4c">Tamper-evident bands</span></li>
        <li><span data-t="pi_b4d">Batch consistency</span></li>
      </ul>
    </div>
  </div>
</div></section>

<section class="psec"><div class="wrap">
  <h2 class="label" data-rv><span data-t="pi_wL">How we work with you</span><i></i></h2>
  <div class="steps" data-rv>
    <div class="stp"><div class="k">01</div><h4 data-t="pi_w1">Understand the contents</h4>
      <p data-t="pi_w1p">Chemistry, viscosity, storage life and filling temperature — before any geometry is discussed.</p></div>
    <div class="stp"><div class="k">02</div><h4 data-t="pi_w2">Match the line</h4>
      <p data-t="pi_w2p">Capping torque, head speed and container tolerance decide what the closure can be.</p></div>
    <div class="stp"><div class="k">03</div><h4 data-t="pi_w3">Prove it, then scale</h4>
      <p data-t="pi_w3p">Samples and validation runs first; continuous production only once the seal is proven.</p></div>
  </div>
</div></section>`,

/* ----------------------------- CAPABILITIES ----------------------------- */
capabilities: () => `
<section class="psec phero"><div class="wrap">
  <p class="eyebrow" data-rv><span data-t="pc_eb">From concept to production</span><i></i></p>
  <h1 data-rv style="--d:90ms" data-t="pc_h1">From your specification to steady supply</h1>
  <p class="lede" data-rv style="--d:170ms" data-t="pc_lede">Most of our work starts with a product that needs the right closure. This is how a request moves from the first conversation to a closure running on your line.</p>
  <div class="hr"></div>
</div></section>

<section class="psec"><div class="wrap">
  <h2 class="label" data-rv><span data-t="pc_sL">How we work</span><i></i></h2>
  <div class="steps" data-rv>
    <div class="stp"><div class="k">01</div><h4 data-t="pc_s1">Understand your product</h4>
      <p data-t="pc_s1p">What the closure has to seal, the container it sits on, and how the product is used.</p></div>
    <div class="stp"><div class="k">02</div><h4 data-t="pc_s2">Review the specification</h4>
      <p data-t="pc_s2p">Size, neck, material and function — matched to a standard closure or defined for a custom one.</p></div>
    <div class="stp"><div class="k">03</div><h4 data-t="pc_s3">Choose the material</h4>
      <p data-t="pc_s3p">Polyethylene or polypropylene, chosen for the product’s chemistry and use.</p></div>
    <div class="stp"><div class="k">04</div><h4 data-t="pc_s4">Match the colour</h4>
      <p data-t="pc_s4p">Produced in the colour of your brand, not whatever happens to be in stock.</p></div>
    <div class="stp"><div class="k">05</div><h4 data-t="pc_s5">Produce</h4>
      <p data-t="pc_s5p">Manufactured with attention to precision, uniformity and finish.</p></div>
    <div class="stp"><div class="k">06</div><h4 data-t="pc_s6">Supply in bulk</h4>
      <p data-t="pc_s6p">Continuous supply, planned around your order volumes.</p></div>
  </div>
</div></section>


<section class="psec"><div class="wrap">
  <figure class="cine light" data-rv>
    <img src="${IMG.ph_line}" alt="White NEWCAP closures with coloured tabs moving along a stainless-steel production line">
    <figcaption>
      <div class="n" data-t="pc_vn">At scale</div>
      <h3 data-t="pc_vt">Every closure, the same as the last</h3>
      <p data-t="pc_vp">Continuous production for factories that run every day — in the colour each product line calls for.</p>
    </figcaption>
  </figure>
</div></section>
<section class="psec"><div class="wrap">
  <div class="split" data-rv>
    <div class="sh"><img src="${IMG.hi_mould}" alt=""></div>
    <div>
      <div class="n" data-t="pc_cn">Custom work</div>
      <h3 data-t="pc_ct">When nothing standard fits</h3>
      <p data-t="pc_cp">Custom projects usually start the same way: a closure that almost works. A cap that leaks, one that is hard to open, or one that does not sit right on your container. We start from what is failing and work toward a closure made for your product.</p>
      <ul>
        <li><span data-t="pc_cb1">Fixing leaks</span></li>
        <li><span data-t="pc_cb2">Custom sizes</span></li>
        <li><span data-t="pc_cb3">Material selection</span></li>
        <li><span data-t="pc_cb4">Brand colours</span></li>
      </ul>
    </div>
  </div>
</div></section>`,

/* -------------------------------- QUALITY -------------------------------- */
quality: () => `
<section class="psec phero"><div class="wrap">
  <p class="eyebrow" data-rv><span data-t="pq_eb">Quality in every detail</span><i></i></p>
  <h1 data-rv style="--d:90ms" data-t="pq_h1">Built on quality</h1>
  <p class="lede" data-rv style="--d:170ms" data-t="pq_lede">A closure either seals every time or it does not seal at all. Stable quality — precise, uniform and clean in finish — is what we build every closure around.</p>
  <div class="hr"></div>
</div></section>

<section class="psec"><div class="wrap">
  <div class="split rev" data-rv>
    <div class="sh tall"><img src="${IMG.ph_studio}" alt="A white NEWCAP closure with an orange tab, photographed in the studio"></div>
    <div>
      <div class="n" data-t="pq_n">Precision</div>
      <h3 data-t="pq_t">Dimensional precision</h3>
      <p data-t="pq_p">A closure that is a fraction off will leak, bind or refuse to sit on the container. Production is focused on keeping every closure true to its specification, so the hundredth part fits like the first.</p>
      <ul>
        <li><span data-t="pq_b1">True to specification</span></li>
        <li><span data-t="pq_b2">Uniform batches</span></li>
        <li><span data-t="pq_b3">Clean visual finish</span></li>
        <li><span data-t="pq_b4">Consistent colour</span></li>
      </ul>
    </div>
  </div>
</div></section>

<section class="psec"><div class="wrap">
  <figure class="cine dark" data-rv>
    <img src="${IMG.ph_macro}" alt="Close-up of the textured top of a white NEWCAP closure with its debossed wordmark and red tab">
    <figcaption>
      <div class="n" data-t="pq_zn">A closer look</div>
      <h3 data-t="pq_zt">Details make the difference</h3>
      <p data-t="pq_zp">Surface, edge and finish are part of the specification, not an afterthought. They are the first thing your customer’s hand meets.</p>
    </figcaption>
  </figure>
</div></section>

<section class="psec"><div class="wrap">
  <h2 class="label" data-rv><span data-t="pq_tL">What we focus on</span><i></i></h2>
  <div class="steps" data-rv>
    <div class="stp"><div class="k">01</div><h4 data-t="pq_x1">Leak-free sealing</h4>
      <p data-t="pq_x1p">The seal is the reason the closure exists; everything else follows from it.</p></div>
    <div class="stp"><div class="k">02</div><h4 data-t="pq_x2">Dimensional precision</h4>
      <p data-t="pq_x2p">Sizes held to specification, so the closure sits on the container as designed.</p></div>
    <div class="stp"><div class="k">03</div><h4 data-t="pq_x3">Uniformity</h4>
      <p data-t="pq_x3p">Closures that behave the same from one batch to the next.</p></div>
    <div class="stp"><div class="k">04</div><h4 data-t="pq_x4">Tamper evidence</h4>
      <p data-t="pq_x4p">Where the pack needs it, a band that shows clearly whether it has been opened.</p></div>
    <div class="stp"><div class="k">05</div><h4 data-t="pq_x5">Material</h4>
      <p data-t="pq_x5p">Polyethylene or polypropylene, matched to what the closure has to hold.</p></div>
    <div class="stp"><div class="k">06</div><h4 data-t="pq_x6">Visual quality</h4>
      <p data-t="pq_x6p">A surface and colour that represent your brand on the shelf.</p></div>
  </div>
</div></section>

<section class="psec"><div class="wrap">
  <h2 class="label" data-rv><span data-t="pq_cL">Our commitments</span><i></i></h2>
  <dl class="spec" data-rv>
    <div class="row"><dt data-t="pq_c1">Stable quality</dt><dd data-t="pq_c1v">Precision, uniformity and finish as the standard for every order, not only the first.</dd></div>
    <div class="row"><dt data-t="pq_c2">Made to your need</dt><dd data-t="pq_c2v">Your product’s specification is reviewed before production, not after a problem.</dd></div>
    <div class="row"><dt data-t="pq_c3">Reliable supply</dt><dd data-t="pq_c3v">Continuous supply for factories that cannot afford to wait for closures.</dd></div>
    <div class="row"><dt data-t="pq_c4">Straight answers</dt><dd data-t="pq_c4v">If something about your order changes, you hear it from us first.</dd></div>
  </dl>
</div></section>`,

/* --------------------------------- ABOUT --------------------------------- */
about: () => `
<section class="psec phero"><div class="wrap">
  <p class="eyebrow" data-rv><span data-t="pa_eb">About NEWCAP</span><i></i></p>
  <h1 data-rv style="--d:90ms" data-t="pa_h1">Small detail. Big difference.</h1>
  <p class="lede" data-rv style="--d:170ms" data-t="pa_lede">We make the part nobody photographs and everybody depends on. A closure is a few grams of plastic that decides whether a product arrives intact — and that is a serious enough job to build a company around.</p>
  <div class="hr"></div>
</div></section>

<section class="psec"><div class="wrap">
  <div class="split" data-rv>
    <div class="sh tall"><img src="${IMG.ph_soft}" alt="A white NEWCAP closure in soft daylight"></div>
    <div>
      <div class="n" data-t="pa_sn">Our story</div>
      <h3 data-t="pa_st">Engineered for a cleaner, safer world</h3>
      <p data-t="pa_sp">NEWCAP is a specialised manufacturer of plastic closures and caps, based in the Eshtehard Industrial Estate. We supply factories in detergents, oils and lubricants, chemicals, adhesives and food with closures made for stable quality — precise, consistent and clean in finish — in bulk, and to specification when a product needs something of its own.</p>
      <ul>
        <li><span data-t="pa_sb1">Specialised manufacturing</span></li>
        <li><span data-t="pa_sb2">Custom production</span></li>
        <li><span data-t="pa_sb3">Controlled production</span></li>
        <li><span data-t="pa_sb4">Bulk supply</span></li>
      </ul>
    </div>
  </div>
</div></section>

<section class="psec"><div class="wrap">
  <h2 class="label" data-rv><span data-t="pa_vL">What we stand for</span><i></i></h2>
  <div class="tiles" data-rv>
    <div class="tile"><div class="k" data-t="pa_v1k">Precision</div><h4 data-t="pa_v1">Tolerances are the product</h4>
      <p data-t="pa_v1p">A closure that is nearly right is wrong. We work for a seal that repeats from one closure, and one batch, to the next.</p></div>
    <div class="tile"><div class="k" data-t="pa_v2k">Innovation</div><h4 data-t="pa_v2">Solve it at the drawing</h4>
      <p data-t="pa_v2p">Most failures on a filling line were decided months earlier in a 3D model. We would rather spend the time there.</p></div>
    <div class="tile"><div class="k" data-t="pa_v3k">Reliability</div><h4 data-t="pa_v3">Say it, then do it</h4>
      <p data-t="pa_v3p">Quantities, dates and specifications are commitments. When something changes, you hear it from us first.</p></div>
    <div class="tile"><div class="k" data-t="pa_v4k">Sustainability</div><h4 data-t="pa_v4">Less material, longer life</h4>
      <p data-t="pa_v4p">Lighter parts, recyclable single-material designs and closures that keep a product usable to the last dose.</p></div>
    <div class="tile"><div class="k" data-t="pa_v5k">People</div><h4 data-t="pa_v5">Precision in people</h4>
      <p data-t="pa_v5p">Tooling and machines matter less than the hands that set them. We invest in the team that runs them.</p></div>
    <div class="tile"><div class="k" data-t="pa_v6k">Partnership</div><h4 data-t="pa_v6">Stronger partnerships</h4>
      <p data-t="pa_v6p">The best projects start before the specification is finished, when there is still room to change the answer.</p></div>
  </div>
</div></section>`,

/* ------------------------------- RESOURCES ------------------------------- */
resources: () => `
<section class="psec phero"><div class="wrap">
  <p class="eyebrow" data-rv><span data-t="pr_eb">Resources</span><i></i></p>
  <h1 data-rv style="--d:90ms" data-t="pr_h1">Documents and answers</h1>
  <p class="lede" data-rv style="--d:170ms" data-t="pr_lede">Everything you would normally have to ask for — product details, documents on request, and the questions buyers ask us most often.</p>
  <div class="hr"></div>
</div></section>

<section class="psec"><div class="wrap">
  <h2 class="label" data-rv><span data-t="pr_dL">Documents &amp; advice</span><i></i></h2>
  <div class="tiles" data-rv>
    <a class="tile" href="${HREF('contact')}"><div class="k" data-t="pr_d1k">On request</div><h4 data-t="pr_d1">Product catalogue</h4>
      <p data-t="pr_d1p">The full range of closures and caps. Ask us for a copy on WhatsApp or through the contact page.</p></a>
    <a class="tile" href="${HREF('contact')}"><div class="k" data-t="pr_d2k">On request</div><h4 data-t="pr_d2">Product specifications</h4>
      <p data-t="pr_d2p">Material, size, weight and colour for each product, supplied on request.</p></a>
    <a class="tile" href="${HREF('contact')}"><div class="k" data-t="pr_d3k">Consultation</div><h4 data-t="pr_d3">Choosing a closure</h4>
      <p data-t="pr_d3p">Tell us about your product and we will recommend the closure that suits it.</p></a>
  </div>
</div></section>

<section class="psec"><div class="wrap">
  <h2 class="label" data-rv><span data-t="pr_fL">Frequently asked</span><i></i></h2>
  <div class="acc" data-rv>
    <details><summary data-t="pr_q1">Do you make closures to our own design?</summary>
      <div class="a" data-t="pr_a1">Yes. We review your product’s specifications and produce closures to your requirement — for when a standard part does not fit your container or your contents.</div></details>
    <details><summary data-t="pr_q2">What is the minimum order quantity?</summary>
      <div class="a" data-t="pr_a2">It depends on the closure and whether tooling already exists. Standard items run from stock tooling at modest volumes; a fully custom part carries a tooling stage first. Tell us the annual volume and we will be specific.</div></details>
    <details><summary data-t="pr_q3">How long does a custom project take?</summary>
      <div class="a" data-t="pr_a3">It depends on whether a suitable mould already exists. Standard items move quickly; a new design needs a development stage first. We give you a dated plan at the start rather than a single number.</div></details>
    <details><summary data-t="pr_q4">Can you match our existing container?</summary>
      <div class="a" data-t="pr_a4">Yes. Send a sample container or its drawing. We measure the neck finish ourselves rather than relying on the nominal size, because that is where most sealing problems begin.</div></details>
    <details><summary data-t="pr_q5">Which materials can you work with?</summary>
      <div class="a" data-t="pr_a5">Polyethylene (PE) and polypropylene (PP). The choice depends on your product — its chemistry, how it is stored and how the pack will be used.</div></details>
    <details><summary data-t="pr_q6">Can you supply continuously, in bulk?</summary>
      <div class="a" data-t="pr_a6">Yes. We work with factories that need a steady supply of closures, and plan production around your order volumes. Tell us your monthly or annual quantity.</div></details>
  </div>
</div></section>

<section class="psec"><div class="wrap">
  <h2 class="label" data-rv><span data-t="pr_gL">Brand campaign</span><i></i></h2>
  <p class="t" data-rv style="--d:60ms" data-t="pr_gT">Campaign visuals for NEWCAP. Select an image to see it full size.</p>
  <div class="posters" data-rv style="--d:120ms">
    <button type="button" data-zoom="ps_2" aria-label="Details make the difference"><img src="${IMG.ps_2}" alt="NEWCAP campaign poster: Details make the difference"></button>
    <button type="button" data-zoom="ps_3" aria-label="Small detail. Big difference."><img src="${IMG.ps_3}" alt="NEWCAP campaign poster: Small detail. Big difference."></button>
    <button type="button" data-zoom="ps_1" aria-label="Consistent quality at scale"><img src="${IMG.ps_1}" alt="NEWCAP campaign poster: Consistent quality at scale"></button>
    <button type="button" data-zoom="ps_8" aria-label="Precision in every closure"><img src="${IMG.ps_8}" alt="NEWCAP campaign poster: Precision in every closure" loading="lazy"></button>
    <button type="button" data-zoom="ps_4" aria-label="Small detail. Big difference."><img src="${IMG.ps_4}" alt="NEWCAP campaign poster in yellow: Small detail. Big difference." loading="lazy"></button>
    <button type="button" data-zoom="ps_7" aria-label="Designed for accuracy"><img src="${IMG.ps_7}" alt="NEWCAP campaign poster: Designed for accuracy" loading="lazy"></button>
    <button type="button" data-zoom="ps_5" aria-label="Reliable materials"><img src="${IMG.ps_5}" alt="NEWCAP campaign poster: Reliable materials" loading="lazy"></button>
    <button type="button" data-zoom="ps_9" aria-label="From concept to reality"><img src="${IMG.ps_9}" alt="NEWCAP poster: half technical sketch, half finished navy closure" loading="lazy"></button>
    <button type="button" data-zoom="ps_10" aria-label="From concept to reality, cream"><img src="${IMG.ps_10}" alt="NEWCAP poster: half technical sketch, half finished cream closure" loading="lazy"></button>
    <button type="button" data-zoom="ps_6" aria-label="Engineered for modern packaging"><img src="${IMG.ps_6}" alt="NEWCAP campaign poster: Engineered for modern packaging" loading="lazy"></button>
  </div>
</div></section>

<section class="psec" id="insights"><div class="wrap">
  <h2 class="label" data-rv><span data-t="pr_iL">Insights</span><i></i></h2>
  <p class="t" data-rv style="--d:60ms" data-t="pr_iT">Notes from the workshop floor on the things that decide whether a closure works — written for the people who specify them.</p>
  <div class="arts" data-rv style="--d:120ms">${insightsCards()}</div>
</div></section>`,

/* -------------------------------- CONTACT -------------------------------- */
contact: () => `
<section class="psec phero"><div class="wrap">
  <p class="eyebrow" data-rv><span data-t="pn_eb">Let us build a cleaner tomorrow</span><i></i></p>
  <h1 data-rv style="--d:90ms" data-t="pn_h1">Tell us what you need to seal</h1>
  <p class="lede" data-rv style="--d:170ms" data-t="pn_lede">The more you can tell us about the contents, the container and the filling line, the more useful our first reply will be.</p>
  <div class="hr"></div>
</div></section>

<section class="psec"><div class="wrap">
  <div class="cwrap">
    <form class="frm" id="ncForm" novalidate data-rv>
      <div class="fld"><label for="f_name" data-t="pn_l1">Name</label><input id="f_name" required></div>
      <div class="fld"><label for="f_co" data-t="pn_l2">Company</label><input id="f_co"></div>
      <div class="fld"><label for="f_mail" data-t="pn_l3">Email</label><input id="f_mail" type="email"></div>
      <div class="fld"><label for="f_tel" data-t="pn_l4">Phone</label><input id="f_tel"></div>
      <div class="fld full"><label for="f_sub" data-t="pn_l5">Enquiry type</label>
        <select id="f_sub">
          <option data-t="pn_o1">Standard closures</option>
          <option data-t="pn_o2">Custom development</option>
          <option data-t="pn_o3">Samples and testing</option>
          <option data-t="pn_o4">Something else</option>
        </select></div>
      <div class="fld full"><label for="f_msg" data-t="pn_l6">What are you packing?</label>
        <textarea id="f_msg" required></textarea></div>
      <button class="btn-o" type="submit"><span data-t="pn_send">Send via WhatsApp</span>
        <svg class="ar" viewBox="0 0 16 10" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M0 5h13M9.6 1 14 5l-4.4 4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <p class="fmsg" id="ncFormMsg" data-t="pn_hint">Sending opens WhatsApp with your details filled in, ready to go to our sales team. Nothing is stored by this page.</p>
    </form>
    <aside class="info" data-rv style="--d:120ms">
      <h4 data-t="pn_iL">Direct contact</h4>
      <div class="it"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1.8 3.2a1.4 1.4 0 0 1 1.4-1.4h1.9l1.1 2.8-1.4 1a8 8 0 0 0 3.6 3.6l1-1.4 2.8 1.1v1.9a1.4 1.4 0 0 1-1.4 1.4A10.6 10.6 0 0 1 1.8 3.2Z" stroke-linejoin="round"/></svg>
        <div><b data-t="pn_i1">Telephone</b><a dir="ltr" href="tel:+989032620344"><span data-t="pn_tel">+98 903 262 0344</span></a></div></div>
      <div class="it"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2.1 12.2 2.9 9.6A5.6 5.6 0 1 1 5 11.5Z" stroke-linejoin="round"/><path d="M5 4.9c0 2 1.9 4 4 4.1l.8-1-1.3-.7-.6.6c-.8-.3-1.5-1-1.8-1.8l.6-.6-.7-1.3Z" fill="currentColor" stroke="none"/></svg>
        <div><b data-t="pn_i5">WhatsApp</b><a href="https://wa.me/989032620344" target="_blank" rel="noopener"><span data-t="pn_wa">Message us on WhatsApp</span></a></div></div>
      <div class="it"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5.6"/><path d="M1.4 7h11.2M7 1.4a11 11 0 0 1 0 11.2A11 11 0 0 1 7 1.4Z"/></svg>
        <div><b data-t="pn_i3">Web</b><span dir="ltr">www.newcap.ir</span></div></div>
      <div class="it"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 12.6s4.4-3.9 4.4-7a4.4 4.4 0 0 0-8.8 0c0 3.1 4.4 7 4.4 7Z" stroke-linejoin="round"/><circle cx="7" cy="5.5" r="1.6"/></svg>
        <div><b data-t="pn_i4">Address</b><span data-t="pn_i4v">Plot 79, corner of Qanun 5, Qanun 2, Qanun 1,<br>East Ibn Sina St., Eshtehard Industrial Estate,<br>Eshtehard, Iran</span></div></div>
    </aside>
  </div>
</div></section>`
};


/* ------------------------------- ARTICLES ------------------------------- */
const artShell = (id, cat, body) => `
<section class="psec phero"><div class="wrap">
  <p class="eyebrow" data-rv><span data-t="${id}_cat">${cat}</span><i></i></p>
  <h1 data-rv style="--d:90ms" data-t="${id}_h1"></h1>
  <p class="lede" data-rv style="--d:170ms" data-t="${id}_lede"></p>
  <div class="hr"></div>
</div></section>
<section class="psec"><div class="wrap">
  <article class="art" data-rv>
    <p class="kicker"><b data-t="${id}_cat2">${cat}</b><span data-t="${id}_rt"></span></p>
    ${body}
    <div class="end">
      <a class="back" href="${HREF('resources')}">
        <svg viewBox="0 0 16 10" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M0 5h13M9.6 1 14 5l-4.4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span data-t="ar_back">All insights</span></a>
      <a class="btn-o" href="${HREF('contact')}" style="width:170rem;height:34rem">
        <span data-t="ar_cta">Talk to us</span></a>
    </div>
  </article>
</div></section>`;

const artBody = (id, n) => Array.from({length:n}, (_, i) =>
  `<h2 data-t="${id}_s${i+1}"></h2><p data-t="${id}_p${i+1}"></p>`).join('');

const ARTICLES = {
  'filling-line':   () => artShell('a1','Engineering',   `<p data-t="a1_p0"></p>` + artBody('a1',4)),
  'sealing-systems':() => artShell('a2','Materials',     `<p data-t="a2_p0"></p>` + artBody('a2',4)),
  'tamper-evidence':() => artShell('a3','Compliance',    `<p data-t="a3_p0"></p>` + artBody('a3',3)),
  'recyclability':  () => artShell('a4','Sustainability',`<p data-t="a4_p0"></p>` + artBody('a4',4))
};

const ART_LIST = [
  ['filling-line','a1'], ['sealing-systems','a2'], ['tamper-evidence','a3'], ['recyclability','a4']
];
const insightsCards = () => ART_LIST.map(([slug,id]) => `
  <a class="acard" href="${HREF('insights/'+slug)}">
    <div class="k" data-t="${id}_cat"></div>
    <h4 data-t="${id}_h1"></h4>
    <p data-t="${id}_lede"></p>
    <div class="rt" data-t="${id}_rt"></div>
  </a>`).join('');

/* --------------------------------- SEO ---------------------------------
   titles and descriptions are derived from the page content itself, so a
   copy change never leaves a stale meta tag behind                        */
const BOOT   = window.__BOOT__ || null;          /* set by the static build */
const SITE   = window.__SITE__ || '';            /* absolute origin, e.g. https://newcap.ir */
const ROUTE_META = {
  '':             ['heroTitle','heroLede'],
  'products':     ['pp_h1','pp_lede'],
  'industries':   ['pi_h1','pi_lede'],
  'capabilities': ['pc_h1','pc_lede'],
  'quality':      ['pq_h1','pq_lede'],
  'about':        ['pa_h1','pa_lede'],
  'resources':    ['pr_h1','pr_lede'],
  'contact':      ['pn_h1','pn_lede'],
  'insights/filling-line':    ['a1_h1','a1_lede'],
  'insights/sealing-systems': ['a2_h1','a2_lede'],
  'insights/tamper-evidence': ['a3_h1','a3_lede'],
  'insights/recyclability':   ['a4_h1','a4_lede']
};
const HREF = k => (window.__BOOT__ ? ((window.__BOOT__.lang==='fa'?'':'/'+window.__BOOT__.lang) + (k ? '/'+k : '/')) : '#/'+k);
const plain = h => String(h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

/* static build: turn hash links into real page URLs, and keep the nav highlight working */
function fixLinks(root){
  if (!BOOT) return;
  root.querySelectorAll('a[href^="#/"]').forEach(a => {
    const k = a.getAttribute('href').slice(2); a.dataset.k = k; a.setAttribute('href', langPath(lang, k));
  });
}

const langPath = (l, key) => (l === 'fa' ? '' : '/' + l) + (key ? '/' + key : '/');
const absUrl   = (l, key) => SITE + langPath(l, key);
const set = (id, attr, val) => { const e = document.getElementById(id); if (e) e.setAttribute(attr, val); };

function updateSEO(key, l){
  const d = DICTS[l] || EN, meta = LANG_META[l] || LANG_META.en;
  const m = ROUTE_META[key] || ROUTE_META[''];
  const isHome = !key;
  const name = plain(d[m[0]]);
  const title = isHome ? meta.title : name + (l === 'fa' ? ' | نیوکپ' : ' | NEWCAP Closures');
  const desc = plain(d[m[1]]).slice(0, 300);
  document.title = title;
  set('mDesc','content',desc);
  set('mOgT','content',title); set('mOgD','content',desc);
  set('mOgI','content', SITE ? SITE + '/og.png' : '');
  if (SITE) {
    set('mCanon','href', absUrl(l,key)); set('mOgU','content', absUrl(l,key));
    set('hrEn','href', absUrl('en',key)); set('hrFa','href', absUrl('fa',key));
    set('hrTr','href', absUrl('tr',key)); set('hrX','href', absUrl('fa',key));
  }
  const org = {
    "@type":"Organization", "@id": (SITE || 'https://newcap.ir') + '/#org',
    name:"NEWCAP", url: SITE || 'https://newcap.ir',
    logo: SITE ? SITE + '/favicon-512.png' : undefined,
    description: plain(d.heroLede),
    telephone:"+98 903 262 0344",
    address:{ "@type":"PostalAddress",
      streetAddress:"Plot 79, corner of Qanun 5, Qanun 2, Qanun 1, East Ibn Sina St., Eshtehard Industrial Estate",
      addressLocality:"Eshtehard", addressRegion:"Alborz", addressCountry:"IR" },
    contactPoint:{ "@type":"ContactPoint", telephone:"+98 903 262 0344", contactType:"sales",
      availableLanguage:["fa","en","tr"] },
    knowsAbout:["plastic closures","measuring caps","gallon caps","brake-fluid caps","child-resistant closures","spray closures"]
  };
  const graph = [org, {
    "@type":"WebPage", url: absUrl(l,key), name: title, description: desc,
    inLanguage: l, isPartOf:{ "@type":"WebSite", url: SITE || 'https://newcap.ir', name:"NEWCAP" },
    publisher:{ "@id": (SITE || 'https://newcap.ir') + '/#org' }
  }];
  if (key.startsWith('insights/')) {
    graph.push({ "@type":"Article", headline: name, description: desc,
      inLanguage: l, mainEntityOfPage: absUrl(l,key),
      author:{ "@id": (SITE || 'https://newcap.ir') + '/#org' },
      publisher:{ "@id": (SITE || 'https://newcap.ir') + '/#org' } });
  }
  if (key) {
    graph.push({ "@type":"BreadcrumbList", itemListElement:[
      { "@type":"ListItem", position:1, name:"NEWCAP", item: absUrl(l,'') },
      { "@type":"ListItem", position:2, name: name, item: absUrl(l,key) }
    ]});
  }
  const ld = document.getElementById('ld');
  if (ld) ld.textContent = JSON.stringify({ "@context":"https://schema.org", "@graph": graph });
}

/* ------------------------------- router ------------------------------- */
const home = document.getElementById('home'), sub = document.getElementById('sub');
function markNav(key){
  fixLinks(document);
  document.querySelectorAll('.hdr nav a, .ftr nav a').forEach(a => {
    a.classList.toggle('on', (a.dataset.k !== undefined ? a.dataset.k : (a.getAttribute('href') || '').replace(/^#\//,'')) === key);
  });
}
function initForm(scope){
  const f = scope.querySelector('#ncForm');
  if (!f) return;
  f.addEventListener('submit', e => {
    e.preventDefault();
    const v = id => ((scope.querySelector('#' + id) || {}).value || '').trim();
    const msg = scope.querySelector('#ncFormMsg');
    if (!v('f_name') || !v('f_msg')) {
      msg.textContent = { fa:'لطفاً نام و توضیح کوتاهی از محصولتان را وارد کنید.',
        tr:'Lütfen adınızı ve ürününüz hakkında kısa bir açıklama girin.',
        en:'Please add your name and a short description of your product.' }[lang];
      return;
    }
    const L = { fa:['نام','شرکت','ایمیل','تلفن','موضوع'], tr:['Ad','Şirket','E-posta','Telefon','Konu'],
                en:['Name','Company','Email','Phone','Enquiry'] }[lang];
    const lines = [['f_name',0],['f_co',1],['f_mail',2],['f_tel',3],['f_sub',4]]
      .filter(([id]) => v(id)).map(([id,n]) => L[n] + ': ' + v(id));
    const text = 'NEWCAP\n' + lines.join('\n') + '\n\n' + v('f_msg');
    window.open('https://wa.me/989032620344?text=' + encodeURIComponent(text), '_blank', 'noopener');
    msg.textContent = { fa:'واتساپ با اطلاعات شما باز شد — برای ارسال، دکمهٔ ارسال را بزنید.',
      tr:"WhatsApp bilgilerinizle açılmış olmalı — bize ulaşmak için gönder'e basın.",
      en:'WhatsApp should now be open with your details — press send to reach us.' }[lang];
  });
}
function route(){
  const key = BOOT ? BOOT.route : location.hash.replace(/^#\/?/, '').split('?')[0];
  const art = key.startsWith('insights/') ? key.slice(9) : null;
  if (PAGES[key] || (art && ARTICLES[art])) {
    sub.innerHTML = art ? ARTICLES[art]() : PAGES[key]();
    sub.querySelectorAll('[data-t]').forEach(el => {
      if (!(el.dataset.t in EN)) EN[el.dataset.t] = el.innerHTML;
    });
    sub.hidden = false; home.hidden = true;
    setLang(lang);
    initMotion(sub);
    initForm(sub);
  } else {
    sub.hidden = true; sub.innerHTML = ''; home.hidden = false;
  }
  markNav(art ? 'resources' : key);
  nav.classList.remove('open');
  updateSEO(key, lang);
  if (!BOOT) window.scrollTo(0, 0);
  if (!home.hidden) initHero3D();
}

/* ---------------- colour range (home) ---------------- */
(document.getElementById('tgQr')||{}).src = IMG.tg_qr;
document.querySelectorAll('img[data-cap]').forEach(el => { el.src = IMG['cap_' + el.dataset.cap]; });
document.querySelectorAll('img[data-scene]').forEach(el => { el.src = IMG['sc_' + el.dataset.scene]; });
(() => {
  const sec = document.getElementById('colours'); if (!sec) return;
  const PAL = [
    { c:'#FF7B02', n:{ en:'Orange', fa:'نارنجی', tr:'Turuncu' },
      s:{ en:'Precision in every closure', fa:'دقت در هر درپوش', tr:'Her kapakta hassasiyet' } },
    { c:'#F2140E', n:{ en:'Red', fa:'قرمز', tr:'Kırmızı' },
      s:{ en:'Details make the difference', fa:'جزئیات، تفاوت را می‌سازند', tr:'Farkı ayrıntılar yaratır' } },
    { c:'#FFC400', n:{ en:'Yellow', fa:'زرد', tr:'Sarı' },
      s:{ en:'Small detail. Big difference.', fa:'جزئی کوچک، تفاوتی بزرگ.', tr:'Küçük detay. Büyük fark.' } },
    { c:'#8FCB0A', n:{ en:'Green', fa:'سبز', tr:'Yeşil' },
      s:{ en:'Designed for accuracy', fa:'طراحی‌شده برای دقت', tr:'Doğruluk için tasarlandı' } },
    { c:'#08AFC2', n:{ en:'Teal', fa:'فیروزه‌ای', tr:'Turkuaz' },
      s:{ en:'Reliable materials', fa:'مواد قابل اعتماد', tr:'Güvenilir malzemeler' } },
    { c:'#1463F0', n:{ en:'Blue', fa:'آبی', tr:'Mavi' },
      s:{ en:'Engineered for modern packaging', fa:'مهندسی‌شده برای بسته‌بندی مدرن', tr:'Modern ambalaj için tasarlandı' } }
  ];
  const btns = [...sec.querySelectorAll('.pal-sw button')], scenes = [...sec.querySelectorAll('.pal-scene')];
  const nameEl = document.getElementById('palName'), chip = sec.querySelector('.pal-chip');
  const chipName = document.getElementById('palChipName'), chipLine = document.getElementById('palChipLine');
  const bar = sec.querySelector('.pal-prog i'), stage = sec.querySelector('.pal-stage');
  const T = 4200; let cur = 0, timer = null, hold = false, visible = false;
  sec.style.setProperty('--pal-t', T + 'ms');
  const L = o => o[lang] || o.en;
  const label = () => { nameEl.textContent = L(PAL[cur].n); chipName.textContent = L(PAL[cur].n); chipLine.textContent = L(PAL[cur].s); };
  function show(i){
    if (i === cur) return;
    scenes[cur].classList.remove('on'); cur = i; scenes[cur].classList.add('on');
    btns.forEach((b, k) => b.setAttribute('aria-selected', String(k === cur)));
    sec.style.setProperty('--pc', PAL[cur].c);
    chip.classList.remove('swap'); void chip.offsetWidth; chip.classList.add('swap');
    label();
  }
  function restartBar(){ bar.classList.remove('run'); void bar.offsetWidth; if (!reduce && !hold && visible) bar.classList.add('run'); }
  function schedule(){
    clearTimeout(timer); restartBar();
    if (reduce || hold || !visible) return;
    timer = setTimeout(() => { show((cur + 1) % PAL.length); schedule(); }, T);
  }
  btns.forEach((b, k) => b.addEventListener('click', () => {
    show(k); hold = true; clearTimeout(timer); restartBar();
    clearTimeout(sec._r); sec._r = setTimeout(() => { hold = false; schedule(); }, 8000);
  }));
  sec.addEventListener('keydown', e => {
    if (!e.target.closest('.pal-sw')) return;
    const d = (e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0) * (document.documentElement.dir === 'rtl' ? -1 : 1);
    if (d) { const n = (cur + d + PAL.length) % PAL.length; btns[n].focus(); btns[n].click(); }
  });
  stage.addEventListener('pointerenter', () => { hold = true; clearTimeout(timer); bar.classList.remove('run'); });
  stage.addEventListener('pointerleave', () => { hold = false; schedule(); stage.style.setProperty('--mx','0px'); stage.style.setProperty('--my','0px'); });
  if (!reduce) stage.addEventListener('pointermove', e => {
    const r = stage.getBoundingClientRect();
    stage.style.setProperty('--mx', (((e.clientX - r.left) / r.width - .5) * -16).toFixed(1) + 'px');
    stage.style.setProperty('--my', (((e.clientY - r.top) / r.height - .5) * -12).toFixed(1) + 'px');
  });
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) schedule(); else { clearTimeout(timer); bar.classList.remove('run'); } },
    { threshold:.35 }).observe(stage);
  langMenu.addEventListener('click', () => setTimeout(label, 0));
  label();
})();

/* poster lightbox */
const lbx = document.createElement('div'); lbx.className = 'lbx'; lbx.setAttribute('role','dialog'); lbx.setAttribute('aria-modal','true');
lbx.innerHTML = '<img alt=""><button type="button" aria-label="Close">×</button>';
document.body.appendChild(lbx);
const lbxImg = lbx.querySelector('img');
function closeLbx(){ lbx.classList.remove('open'); }
document.addEventListener('click', e => {
  const b = e.target.closest('[data-zoom]');
  if (b) { lbxImg.src = IMG[b.dataset.zoom]; lbxImg.alt = b.querySelector('img').alt; lbx.classList.add('open'); lbx.querySelector('button').focus(); return; }
  if (lbx.classList.contains('open') && (e.target === lbx || e.target.closest('.lbx button'))) closeLbx();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLbx(); });

/* photo bands drift slightly against the scroll */
if (!reduce) {
  let bt = false;
  const drift = () => {
    bt = false;
    if (innerWidth <= 900) return;
    document.querySelectorAll('.cine > img').forEach(im => {
      const r = im.parentNode.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      im.style.setProperty('--py', (p * -26).toFixed(1) + 'px');
    });
  };
  addEventListener('scroll', () => { if (!bt) { bt = true; requestAnimationFrame(drift); } }, { passive:true });
}

if (!BOOT) addEventListener('hashchange', route);
route();


/* ============================ HERO 3D ============================ */
function initHero3D(){
  if (initHero3D.done) return;
  const hero = document.querySelector('.hero'), stage = document.getElementById('stage');
  if (!hero || !stage) return;
  const shot = document.getElementById('heroShot');
  const showShot = () => { if (!hero.classList.contains('has3d')) shot.classList.add('in'); };
  let probe; try { probe = document.createElement('canvas').getContext('webgl'); } catch(e){}
  if (!probe) { showShot(); return; }                   /* no WebGL: the photo is shown instead */
  initHero3D.done = true;
  setTimeout(showShot, 6000);                           /* very slow connection: photo, then the cap replaces it */
  const load = (src, next) => {
    const s = document.createElement('script'); s.src = src;
    s.onload = () => { try { build(); } catch(e) { console.warn('hero 3D disabled:', e); showShot(); } };
    s.onerror = next;
    document.head.appendChild(s);
  };
  /* served from our own domain first (proxied and cached by the host), then the public CDN */
  load('/vendor/three.min.js', () => load('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', showShot));

  function build(){
    const T = THREE;
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    /* r128 reads hex colours as linear; brand colours are sRGB, so convert them —
       skipping this is what made the navy look pale blue and the orange look yellow */
    const lin = hex => new T.Color(hex).convertSRGBToLinear();

    const renderer = new T.WebGLRenderer({ antialias:true, alpha:true, powerPreference:'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0;                    /* the intro brings the lights up */
    renderer.physicallyCorrectLights = true;
    stage.appendChild(renderer.domElement);

    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(22, 1, .1, 80);
    const EL = 27 * Math.PI / 180, DIST = 8.9;

    /* ---- a dark studio with hard-edged strip boxes: deep body, crisp highlights ---- */
    const pmrem = new T.PMREMGenerator(renderer);
    const studio = new T.Scene();
    const gc = document.createElement('canvas'); gc.width = 8; gc.height = 256;
    const gx = gc.getContext('2d'), gg = gx.createLinearGradient(0,0,0,256);
    gg.addColorStop(0,'#46566f'); gg.addColorStop(.5,'#18233a'); gg.addColorStop(1,'#060b16');
    gx.fillStyle = gg; gx.fillRect(0,0,8,256);
    const gt = new T.CanvasTexture(gc); gt.encoding = T.sRGBEncoding;
    studio.add(new T.Mesh(new T.SphereGeometry(14,32,16), new T.MeshBasicMaterial({ map:gt, side:T.BackSide })));
    const softbox = (w,h,x,y,z,col) => {
      const m = new T.Mesh(new T.PlaneGeometry(w,h), new T.MeshBasicMaterial({ color:col, side:T.DoubleSide }));
      m.position.set(x,y,z); m.lookAt(0,0,0); studio.add(m);
    };
    softbox(9,3.2,-6,6.2,5,   new T.Color(4.6,4.6,4.5));    /* key, high front-left: larger and softer */
    softbox(1.4,8.5,7.2,1.8,-4, new T.Color(5.2,6.4,8));     /* cool rim strip, right-back */
    softbox(1.1,7,-7.2,1.2,-4,  new T.Color(5,4.1,3.1));     /* warm rim strip, left-back */
    softbox(10,.9,0,-1.7,8.5,   new T.Color(1.6,1.6,1.7));   /* low front fill */
    softbox(3,3,0,9.5,0,        new T.Color(2.4,2.5,2.7));   /* top kicker */
    scene.environment = pmrem.fromScene(studio, .02).texture;

    const key     = new T.DirectionalLight(lin(0xfff1e2), 4.4);   key.position.set(-3.5, 6, 4.5);  scene.add(key);
    const rimCool = new T.DirectionalLight(lin(0x9cc6ff), 7);   rimCool.position.set(5, 2.2, -4.2); scene.add(rimCool);
    const rimWarm = new T.DirectionalLight(lin(0xffc89a), 2); rimWarm.position.set(-5, 1.6, -3.6); scene.add(rimWarm);
    scene.add(new T.HemisphereLight(lin(0xc9d6e8), lin(0x0a1120), .5));
    const topSoft = new T.DirectionalLight(lin(0xe6eefa), .9); topSoft.position.set(.6, 9, 3.2); scene.add(topSoft);

    /* ---- the fine stipple on the moulded surface ---- */
    const noise = (size, amp) => {
      const c = document.createElement('canvas'); c.width = c.height = size;
      const x = c.getContext('2d'), im = x.createImageData(size, size);
      for (let i = 0; i < im.data.length; i += 4) {
        const v = 128 + (Math.random() - .5) * amp; im.data[i] = im.data[i+1] = im.data[i+2] = v; im.data[i+3] = 255;
      }
      x.putImageData(im, 0, 0);
      /* a softer, larger stipple over the fine grain: the matte "orange peel" of a moulded part */
      const sm = document.createElement('canvas'); sm.width = sm.height = size / 8;
      const sx2 = sm.getContext('2d'), si = sx2.createImageData(sm.width, sm.height);
      for (let i = 0; i < si.data.length; i += 4) {
        const v = 128 + (Math.random() - .5) * 150; si.data[i] = si.data[i+1] = si.data[i+2] = v; si.data[i+3] = 255;
      }
      sx2.putImageData(si, 0, 0);
      x.globalAlpha = .45; x.imageSmoothingEnabled = true; x.drawImage(sm, 0, 0, size, size); x.globalAlpha = 1;
      const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping;
      t.anisotropy = renderer.capabilities.getMaxAnisotropy(); return t;
    };
    const grain = noise(512, 90); grain.repeat.set(7, 4);

    const NAVY = lin(0x14284a);
    const shell = new T.MeshPhysicalMaterial({ color:NAVY, roughness:1.2, roughnessMap:grain, metalness:0, side:T.DoubleSide,
      clearcoat:.14, clearcoatRoughness:.45, bumpMap:grain, bumpScale:.0065, envMapIntensity:.85 });
    /* the ribbed skirt carries a little baked occlusion: groove floors sit in shadow */
    const ribMat = shell.clone(); ribMat.vertexColors = true;

    const cap = new T.Group();
    const R = 1, Y0 = .11, Y1 = 1.30, RIBS = 64, DEPTH = .055, H = 1.56;

    const skirt = new T.CylinderGeometry(R, R, Y1 - Y0, RIBS * 8, 1, true);
    const P = skirt.attributes.position;
    for (let i = 0; i < P.count; i++) {
      const a = Math.atan2(P.getZ(i), P.getX(i));
      const g = Math.pow(.5 - .5 * Math.cos(a * RIBS), 2.2);
      const r = R - DEPTH * g;
      P.setX(i, Math.cos(a) * r); P.setZ(i, Math.sin(a) * r);
    }
    const col = new Float32Array(P.count * 3);
    for (let i = 0; i < P.count; i++) {
      const a = Math.atan2(P.getZ(i), P.getX(i));
      const g = Math.pow(.5 - .5 * Math.cos(a * RIBS), 2.2), v = 1 - .55 * g;
      col[i*3] = col[i*3+1] = col[i*3+2] = v;
    }
    skirt.setAttribute('color', new T.BufferAttribute(col, 3));
    skirt.computeVertexNormals(); skirt.translate(0, (Y0 + Y1) / 2, 0);
    cap.add(new T.Mesh(skirt, ribMat));

    const lathe = (pts, seg) => new T.LatheGeometry(pts.map(p => new T.Vector2(p[0], p[1])), seg);
    cap.add(new T.Mesh(lathe([[.94,0],[.975,.006],[.994,.022],[1,.05],[1,Y0]], 180), shell));
    cap.add(new T.Mesh(lathe([[1,1.3],[1,1.44],[0.9982,1.4608],[0.9928,1.481],[0.9839,1.5],[0.9719,1.5171],[0.9571,1.5319],[0.94,1.5439],[0.921,1.5528],[0.9008,1.5582],[0.88,1.56],[0.8400,1.5600],[0.8300,1.5594],[0.8200,1.5578],[0.8100,1.5551],[0.8000,1.5513],[0.7900,1.5466],[0.7800,1.5410],[0.7700,1.5346],[0.7600,1.5275],[0.7500,1.5199],[0.7400,1.5118],[0.7300,1.5035],[0.7200,1.4950],[0.7100,1.4865],[0.7000,1.4782],[0.6900,1.4701],[0.6800,1.4625],[0.6700,1.4554],[0.6600,1.4490],[0.6500,1.4434],[0.6400,1.4387],[0.6300,1.4349],[0.6200,1.4322],[0.6100,1.4306],[0.6000,1.4300],[0.598,1.43]], 220), shell));
    const base = new T.Mesh(new T.CircleGeometry(.94, 96), shell);
    base.rotation.x = Math.PI / 2; cap.add(base);

    /* the NEWCAP mark, debossed into the dish */
    const tc = document.createElement('canvas'); tc.width = tc.height = 1024;
    const bc = document.createElement('canvas'); bc.width = bc.height = 1024;
    const colorTex = new T.CanvasTexture(tc); colorTex.encoding = T.sRGBEncoding;
    const bumpTex  = new T.CanvasTexture(bc);
    colorTex.anisotropy = bumpTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const paintMark = () => {
      const cx = tc.getContext('2d'), bx = bc.getContext('2d');
      cx.fillStyle = '#ffffff'; cx.fillRect(0,0,1024,1024);
      bx.fillStyle = '#9a9a9a'; bx.fillRect(0,0,1024,1024);
      /* the moulded top: a soft pebble grain, like a textured (VDI) mould finish. Instead of
         per-pixel noise, thousands of small rounded bumps overlap into a leathery surface. */
      if (!paintMark.grain) {
        const g = document.createElement('canvas'); g.width = g.height = 1024;
        const gx2 = g.getContext('2d'); gx2.fillStyle = '#8c8c8c'; gx2.fillRect(0, 0, 1024, 1024);
        const dot = document.createElement('canvas'); dot.width = dot.height = 32;
        const dx = dot.getContext('2d'), dg = dx.createRadialGradient(16,16,0,16,16,16);
        dg.addColorStop(0,'rgba(255,255,255,1)'); dg.addColorStop(.55,'rgba(255,255,255,.45)'); dg.addColorStop(1,'rgba(255,255,255,0)');
        dx.fillStyle = dg; dx.fillRect(0, 0, 32, 32);
        let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
        for (let i = 0; i < 26000; i++) {
          const r = 4 + rnd() * 5, x = rnd() * 1024, y = rnd() * 1024;
          gx2.globalAlpha = .16 + rnd() * .16; gx2.drawImage(dot, x - r, y - r, r * 2, r * 2);
        }
        gx2.globalAlpha = 1;
        const out = document.createElement('canvas'); out.width = out.height = 1024;
        const ox = out.getContext('2d'); ox.filter = 'blur(.8px)'; ox.drawImage(g, 0, 0);
        paintMark.grain = out;
      }
      bx.drawImage(paintMark.grain, 0, 0);
      /* the wordmark is cut from the brand logo itself (NEWCAP only, no tagline, no TM),
         so the lettering on the cap is exactly the brand's; the font is only a fallback */
      const W = 850, ok = logoImg.complete && logoImg.naturalWidth;
      let mark = null;
      if (ok) {
        const nw = logoImg.naturalWidth, nh = logoImg.naturalHeight;
        const sw = nw * 870 / 900, sh = nh * 109 / 167, h = W * sh / sw;
        mark = document.createElement('canvas'); mark.width = W; mark.height = Math.ceil(h);
        mark.getContext('2d').drawImage(logoImg, 0, 0, sw, sh, 0, 0, W, h);
      }
      [[cx,'#66748c'],[bx,'#2e2e2e']].forEach(([x, fill]) => {
        x.save(); x.translate(512, 468); x.transform(1, 0, -.2, 1, 0, 0);   /* forward italic, as moulded */
        if (mark) {
          const m = document.createElement('canvas'); m.width = mark.width; m.height = mark.height;
          const mx = m.getContext('2d'); mx.drawImage(mark, 0, 0);
          mx.globalCompositeOperation = 'source-in'; mx.fillStyle = fill; mx.fillRect(0, 0, m.width, m.height);
          x.drawImage(m, -m.width / 2, -m.height / 2);
        } else {
          x.font = '800 140px Manrope, "Segoe UI", Arial, sans-serif';
          x.textAlign = 'center'; x.textBaseline = 'middle';
          if ('letterSpacing' in x) x.letterSpacing = '8px';
          x.fillStyle = fill; x.fillText('NEWCAP', 0, 0);
        }
        x.restore();
      });
      colorTex.needsUpdate = true; bumpTex.needsUpdate = true;
    };
    const logoImg = new Image(); logoImg.onload = paintMark; logoImg.src = IMG.logo;
    paintMark();
    if (document.fonts && document.fonts.load) document.fonts.load('800 96px Manrope').then(paintMark).catch(() => {});
    const dish = new T.Mesh(new T.CircleGeometry(.605, 128), new T.MeshPhysicalMaterial({
      color:NAVY, map:colorTex, roughness:.74, clearcoat:.08, clearcoatRoughness:.5,
      bumpMap:bumpTex, bumpScale:.022, envMapIntensity:.8 }));
    dish.rotation.x = -Math.PI / 2; dish.position.y = 1.4302; cap.add(dish);

    /* ---- the orange tab: one continuous strip swept along the crown profile ---- */
    const sweepTab = (path, th, halfArc, thick, inset) => {
      const n = path.length, nrm = path.map((p, i) => {
        const a = path[Math.max(0, i-1)], b = path[Math.min(n-1, i+1)];
        let dr = b[0] - a[0], dy = b[1] - a[1]; const L = Math.hypot(dr, dy) || 1;
        return [dy / L, -dr / L];                          /* outward normal in the (r, y) plane */
      });
      const at = (i, side, layer) => {
        const off = layer ? thick : -inset;
        const r = path[i][0] + nrm[i][0] * off, y = path[i][1] + nrm[i][1] * off;
        const ang = th + side * halfArc / path[i][0];
        return [r * Math.cos(ang), y, r * Math.sin(ang)];
      };
      const pos = [], idx = [];
      const sheet = (fa, fb) => {                          /* a strip joining two edge lines along the path */
        const base = pos.length / 3;
        for (let i = 0; i < n; i++) { pos.push(...fa(i), ...fb(i)); }
        for (let i = 0; i < n - 1; i++) {
          const a = base + i*2, b = a + 1, c = a + 2, d = a + 3;
          idx.push(a, c, b, b, c, d);
        }
      };
      const quad = (p0, p1, p2, p3) => {
        const base = pos.length / 3; pos.push(...p0, ...p1, ...p2, ...p3);
        idx.push(base, base+1, base+2, base, base+2, base+3);
      };
      sheet(i => at(i,-1,1), i => at(i, 1,1));            /* outer face */
      sheet(i => at(i,-1,0), i => at(i,-1,1));            /* left wall  */
      sheet(i => at(i, 1,1), i => at(i, 1,0));            /* right wall */
      quad(at(0,-1,0), at(0,1,0), at(0,1,1), at(0,-1,1)); /* lower end  */
      quad(at(n-1,-1,1), at(n-1,1,1), at(n-1,1,0), at(n-1,-1,0)); /* upper end */
      const g = new T.BufferGeometry();
      g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
      g.setIndex(idx); g.computeVertexNormals(); return g;
    };
    const orange = new T.MeshPhysicalMaterial({ color:lin(0xf05a0c), roughness:.36, side:T.DoubleSide,
      clearcoat:.6, clearcoatRoughness:.2, emissive:lin(0x5a1a00), emissiveIntensity:.22, envMapIntensity:.9 });
    cap.add(new T.Mesh(sweepTab([[1,1.325],[1,1.36],[1,1.4],[1,1.44],[0.9994,1.4518],[0.9977,1.4634],[0.9948,1.4748],[0.9909,1.4859],[0.9858,1.4966],[0.9798,1.5067],[0.9728,1.5161],[0.9649,1.5249],[0.9561,1.5328],[0.9467,1.5398],[0.9366,1.5458],[0.9259,1.5509],[0.9148,1.5548],[0.9034,1.5577],[0.8918,1.5594],[0.88,1.56],[0.865,1.56],[0.842,1.56]], -.55, .042, .024, .004), orange));

    cap.position.y = -H / 2;
    scene.add(cap);

    const sc = document.createElement('canvas'); sc.width = sc.height = 256;
    const sx = sc.getContext('2d'), sr = sx.createRadialGradient(128,128,4,128,128,128);
    sr.addColorStop(0,'rgba(4,10,24,.78)'); sr.addColorStop(.36,'rgba(4,10,24,.3)'); sr.addColorStop(1,'rgba(4,10,24,0)');
    sx.fillStyle = sr; sx.fillRect(0,0,256,256);
    const shadow = new T.Mesh(new T.PlaneGeometry(3.2, 3.2),
      new T.MeshBasicMaterial({ map:new T.CanvasTexture(sc), transparent:true, depthWrite:false }));
    shadow.rotation.x = -Math.PI / 2; shadow.position.y = -H / 2 - .006; scene.add(shadow);
    const cc = document.createElement('canvas'); cc.width = cc.height = 256;
    const cx2 = cc.getContext('2d'), cr = cx2.createRadialGradient(128,128,70,128,128,128);
    cr.addColorStop(0,'rgba(2,6,16,.9)'); cr.addColorStop(.55,'rgba(2,6,16,.35)'); cr.addColorStop(1,'rgba(2,6,16,0)');
    cx2.fillStyle = cr; cx2.fillRect(0,0,256,256);
    const contact = new T.Mesh(new T.PlaneGeometry(2.35, 2.35),
      new T.MeshBasicMaterial({ map:new T.CanvasTexture(cc), transparent:true, depthWrite:false }));
    contact.rotation.x = -Math.PI / 2; contact.position.y = -H / 2 - .004; scene.add(contact);

    let EXPO = 1.02, SHO = .85;
    const applyTheme = () => {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      EXPO = dark ? 1.08 : 1.02;
      rimCool.intensity = dark ? 6 : 4.5;
      SHO = dark ? 1 : .85; shadow.material.opacity = SHO;
    };
    applyTheme();
    new MutationObserver(applyTheme).observe(document.documentElement, { attributes:true, attributeFilter:['data-theme'] });

    const fit = () => {
      const w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return;
      renderer.setSize(w, h, false); camera.aspect = w / h;
      camera.fov = w / h < 1.15 ? 26 : 22;
      camera.updateProjectionMatrix();
    };
    fit(); new ResizeObserver(fit).observe(stage);

    /* ---- extra actors for the opening: a light that sweeps across the ribs,
            and a ring of light that runs out across the floor on landing ---- */
    const sweep = new T.DirectionalLight(lin(0xffffff), 0); scene.add(sweep);
    const waveMat = new T.MeshBasicMaterial({ color:lin(0xff7a1a), transparent:true, opacity:0, depthWrite:false, side:T.DoubleSide });
    const wave = new T.Mesh(new T.RingGeometry(.97, 1.03, 160), waveMat);
    wave.rotation.x = -Math.PI / 2; wave.position.y = -H / 2 - .003; scene.add(wave);
    const wave2Mat = waveMat.clone(); wave2Mat.color = lin(0xbcd4f0);
    const wave2 = new T.Mesh(new T.RingGeometry(.985, 1.015, 160), wave2Mat);
    wave2.rotation.x = -Math.PI / 2; wave2.position.y = -H / 2 - .004; scene.add(wave2);

    /* ---- motion: the cap falls into frame, lands, and the camera pulls back
            to its resting shot; then a slow turn under a drifting camera ---- */
    const AUTO = still ? 0 : .26, FALL = .95, INTRO = 3.6;
    const ease3 = x => 1 - Math.pow(1 - x, 3);
    const easeIO = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    let rot = .2, vel = still ? 0 : AUTO, dragging = false, lastX = 0, lastT = 0, running = true, first = true;
    let tilt = 0, tiltV = 0, lastY = 0, relT = -99, tt = 0, landT = 0, px = 0, py = 0, tx = 0, ty = 0, sp = 0, spS = 0;
    const cv = renderer.domElement;
    cv.addEventListener('pointerdown', e => { dragging = true; lastX = e.clientX; lastY = e.clientY; lastT = performance.now(); cv.setPointerCapture(e.pointerId); });
    cv.addEventListener('pointermove', e => {
      if (!dragging) return;
      const now = performance.now(), dx = (e.clientX - lastX) / cv.clientWidth * 4.2;
      rot += dx; vel = dx / Math.max(.016, (now - lastT) / 1000); lastX = e.clientX; lastT = now;
      if (e.pointerType !== 'touch') {                   /* on touch, vertical swipes stay with the page */
        tilt = Math.max(-.72, Math.min(1.08, tilt + (e.clientY - lastY) / cv.clientHeight * 2.6));
        lastY = e.clientY;
      }
    });
    const release = () => { if (dragging) relT = tt; dragging = false; };
    cv.addEventListener('wheel', e => {                  /* two-finger sideways swipe on a touchpad */
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault(); rot -= e.deltaX * .006; vel = -e.deltaX * .35; relT = tt;
    }, { passive:false });
    cv.addEventListener('pointerup', release); cv.addEventListener('pointercancel', release);
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - .5; ty = (e.clientY - r.top) / r.height - .5;
    });
    hero.addEventListener('pointerleave', () => { tx = ty = 0; });
    const onScroll = () => { const r = hero.getBoundingClientRect(); sp = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height))); };
    addEventListener('scroll', onScroll, { passive:true }); onScroll();
    new IntersectionObserver(es => { running = es[0].isIntersecting; if (running) loop(); }).observe(stage);
    document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) loop(); });

    const clock = new T.Clock();
    let ticking = false;
    function loop(){ if (ticking) return; ticking = true; requestAnimationFrame(frame); }
    function frame(){
      ticking = false;
      if (!running) return;
      const dt = Math.min(clock.getDelta(), .05); tt += dt;
      const t = still ? 99 : tt + 30;   /* opening sequence skipped: start in the resting shot */

      /* the fall: accelerating, so the landing has weight */
      const fk = Math.min(1, t / FALL), drop = 1.9 * (1 - fk * fk);
      if (!still && landT < 0 && fk >= 1) {
        landT = t; stage.classList.add('land');
      }
      const since = landT < 0 ? -1 : t - landT;
      const impact = since < 0 ? 0 : Math.exp(-5.5 * since);

      /* squash on impact, springing back */
      const squash = since < 0 ? 0 : .05 * Math.exp(-6 * since) * Math.cos(since * 19);
      cap.scale.set(1 + squash * .5, 1 - squash, 1 + squash * .5);

      /* exposure: rise with the fall, a flash on landing, dim as the hero scrolls away */
      spS += (sp - spS) * Math.min(1, dt * 6);
      const rise = ease3(Math.min(1, t / 1.3));
      renderer.toneMappingExposure = EXPO * rise * (1 + .28 * impact) * (1 - spS * .35);

      /* spin: fast on entry, easing into the idle turn; the scroll winds it on */
      /* idle turn lingers as the wordmark faces the viewer; scrolling (or tilting over the
         top) brings the lettering round to read straight */
      const face = Math.min(1, spS * 4 + Math.max(0, tilt) * 1.3);
      if (!dragging) {
        const slow = .35 + .65 * (1 - Math.cos(rot)) / 2;
        vel += (AUTO * slow * (1 - face) - vel) * Math.min(1, dt * .95); rot += vel * dt;
        if (face > .01) { const tgt = Math.round(rot / (2 * Math.PI)) * 2 * Math.PI; rot += (tgt - rot) * Math.min(1, dt * 2.4 * face); }
        if (tt - relT > 3.2) tilt += (0 - tilt) * Math.min(1, dt * 1.2);   /* the view settles back after a while */
      }
      cap.rotation.y = rot;

      /* pointer lean */
      px += (tx - px) * Math.min(1, dt * 2.6); py += (ty - py) * Math.min(1, dt * 2.6);
      const lift = still ? 0 : Math.sin(t * 1.05) * .018 * Math.min(1, Math.max(0, since) / 1.2);
      cap.position.y = -H / 2 + lift + drop;
      cap.rotation.z = (still ? 0 : Math.sin(t * .6) * .016) - px * .14;
      cap.rotation.x = py * .16;

      /* shadow grows and darkens as the cap comes down */
      const hgt = drop + lift;
      shadow.scale.setScalar(Math.max(.4, 1 - hgt * .32));
      shadow.material.opacity = SHO * Math.max(0, 1 - hgt * .5);
      contact.material.opacity = SHO * .7 * Math.max(0, 1 - hgt * 3);   /* only when it is down */

      /* landing waves */
      if (since >= 0 && since < 2.2) {
        wave.scale.setScalar(1 + since * 2.4); waveMat.opacity = .85 * Math.exp(-2.6 * since);
        const s2 = Math.max(0, since - .16);
        wave2.scale.setScalar(1 + s2 * 1.7); wave2Mat.opacity = since < .16 ? 0 : .6 * Math.exp(-2.4 * s2);
      } else { waveMat.opacity = 0; wave2Mat.opacity = 0; }

      /* the orange tab catches the landing */
      orange.emissiveIntensity = .22 + 1.8 * impact;

      /* a highlight sweeps across the ribs */
      const sw = (t - .7) / 1.8;
      if (sw > 0 && sw < 1) { sweep.intensity = 9 * Math.sin(Math.PI * sw); sweep.position.set(-7 + 14 * sw, 3.2, 5); }
      else sweep.intensity = 0;

      /* camera: starts low and close, pulls back and rises to the resting shot */
      const ck = easeIO(Math.min(1, t / INTRO));
      const az0 = -.62 * (1 - ck), el0 = EL - .2 * (1 - ck), d0 = DIST - 2.1 * (1 - ck);
      const az = az0 + (still ? 0 : Math.sin(t * .17) * .11 * ck) + px * .1;
      /* elevation: user tilt plus the scroll, which carries the camera up over the top */
      const el = Math.max(-.62, Math.min(1.42, el0 + (still ? 0 : Math.sin(t * .13) * .025 * ck) - py * .03 + tilt + spS * .95));
      const d = d0 + (still ? 0 : Math.sin(t * .09) * .18 * ck) + spS * .6;
      const shake = still ? 0 : .025 * impact * Math.sin(since * 46);
      camera.position.set(Math.sin(az) * d * Math.cos(el), d * Math.sin(el) + shake, Math.cos(az) * d * Math.cos(el));
      camera.lookAt(0, .12 + .25 * (1 - ck), 0);

      rimCool.position.x = 5 + (still ? 0 : Math.sin(t * .3) * 1.6);   /* a rim highlight that travels */
      renderer.render(scene, camera);
      if (first) { first = false; stage.classList.add('on'); hero.classList.add('has3d'); }
      loop();
    }
    loop();
  }
}

/* ------------------------ search ------------------------ */
const INDEX = [
  {k:'pt1', s:'ps1', href:'#/products'},
  {k:'pt4', s:'ps4', href:'#/products'},
  {k:'it1', s:'is1', href:'#/industries'}, {k:'it2', s:'is2', href:'#/industries'},
  {k:'it3', s:'is3', href:'#/industries'}, {k:'it4', s:'is4', href:'#/industries'},
  {k:'fTitle1', s:'fText1', href:'#/capabilities'}, {k:'fTitle2', s:'fText2', href:'#/quality'},
  {k:'ctaTitle', s:'ctaText', href:'#/contact'},
  {k:'pa_h1', s:'pa_lede', href:'#/about'}, {k:'pr_h1', s:'pr_lede', href:'#/resources'},
  {k:'pc_h1', s:'pc_lede', href:'#/capabilities'}, {k:'pn_h1', s:'pn_lede', href:'#/contact'}
];
const sheet = document.getElementById('sheet'), qEl = document.getElementById('q'), res = document.getElementById('res');
const strip = s => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
function openSheet(){ sheet.setAttribute('open',''); qEl.value=''; render(''); qEl.focus(); }
function closeSheet(){ sheet.removeAttribute('open'); }
function render(v){
  const d = DICTS[lang] || EN;
  const q = v.trim().toLowerCase();
  const hits = INDEX.filter(i => !q || strip(d[i.k]||'').toLowerCase().includes(q) || strip(d[i.s]||'').toLowerCase().includes(q));
  res.innerHTML = hits.length
    ? hits.map(i => `<li><a href="${i.href}">${strip(d[i.k]||'')}<small>${strip(d[i.s]||'')}</small></a></li>`).join('')
    : `<div class="empty">${ {fa:'نتیجه‌ای یافت نشد. عبارت دیگری را امتحان کنید.',
        tr:'Sonuç bulunamadı. Başka bir terim deneyin.',
        en:'No matches. Try another term.'}[lang] }</div>`;
}
document.getElementById('searchBtn').addEventListener('click', openSheet);
qEl.addEventListener('input', e => { render(e.target.value); fixLinks(res); });
document.getElementById('searchBtn').addEventListener('click', () => fixLinks(res));
res.addEventListener('click', e => { if (e.target.closest('a')) closeSheet(); });
sheet.addEventListener('click', e => { if (e.target === sheet) closeSheet(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
