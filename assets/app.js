
const IMG = {"hero": "/img/hero.webp", "p1": "/img/p1.webp", "p2": "/img/p2.webp", "p3": "/img/p3.webp", "p4": "/img/p4.webp", "indphoto": "/img/indphoto.webp", "blueprint": "/img/blueprint.webp", "quality": "/img/quality.webp", "cta": "/img/cta.webp", "logo": "/img/logo.webp", "hi_navycap": "/img/hi_navycap.webp", "hi_whitecap": "/img/hi_whitecap.webp", "hi_colors": "/img/hi_colors.webp", "hi_bottles": "/img/hi_bottles.webp", "hi_mould": "/img/hi_mould.webp", "hi_capmacro": "/img/hi_capmacro.webp", "hi_capangle": "/img/hi_capangle.webp"};
for (const [id,key] of [['logoTop','logo'],['logoBot','logo'],['heroShot','hero'],
  ['p1','p1'],['p2','p2'],['p3','p3'],['p4','p4'],['indShot','indphoto'],
  ['bpShot','blueprint'],['qShot','quality'],['ctaShot','cta']]) {
  const el = document.getElementById(id); if (el) el.src = IMG[key];
}


/* ------------------------ motion ------------------------ */
document.documentElement.classList.add('js');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const io = new IntersectionObserver(es=>{
  es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, {rootMargin:'0px 0px -12% 0px', threshold:0.12});
function initMotion(root){
  root.querySelectorAll('.grid4 .pcard').forEach((el,i)=>el.style.setProperty('--d',(i*90)+'ms'));
  root.querySelectorAll('.indrow .icard').forEach((el,i)=>el.style.setProperty('--d',(i*80)+'ms'));
  root.querySelectorAll('.vals li').forEach((el,i)=>el.style.setProperty('--d',(420+i*90)+'ms'));
  root.querySelectorAll('.checks li').forEach((el,i)=>el.style.setProperty('--d',(i*110)+'ms'));
  root.querySelectorAll('.steps .stp, .tiles .tile').forEach((el,i)=>el.style.setProperty('--d',(i*70)+'ms'));
  root.querySelectorAll('[data-rv], .vals li, .checks li').forEach(el=>io.observe(el));
}
initMotion(document);

/* hero opens on load rather than on scroll */
requestAnimationFrame(()=>{
  document.querySelectorAll('.hero [data-rv], .hero .vals li, .hero .eyebrow').forEach(el=>el.classList.add('in'));
  setTimeout(()=>document.getElementById('heroShot').classList.add('in'), reduce?0:80);
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

/* ------------------------- i18n ------------------------- */
const FA = {
  skip:"رفتن به محتوا",
  nav1:"محصولات", nav2:"صنایع", nav3:"توانمندی‌ها", nav4:"کیفیت", nav5:"درباره ما",
  nav6:"منابع", nav7:"تماس", inquire:"استعلام",
  heroEyebrow:"آغازِ فردایی روشن‌تر",
  heroTitle:"جزئی کوچک،<br>تفاوتی بزرگ.",
  heroLede:"تولید پیشرفتهٔ درپوش‌های پلاستیکی، برای جهانی پاکیزه‌تر، ایمن‌تر و پایدارتر.",
  v1:"دقت", v2:"نوآوری", v3:"اطمینان", v4:"فردایی پاکیزه‌تر",
  heroCta:"محصولات ما را ببینید",
  prodLabel:"محصولات ما", prodClaim:"مهندسی‌شده برای جهانی پاکیزه‌تر و ایمن‌تر", viewAll:"همهٔ محصولات",
  pt1:"درپوش‌های پلاستیکی", ps1:"درپوش پیچی، فلیپ‌تاپ،<br>پلمب‌دار و بیشتر",
  pt2:"درپوش‌های اسپری",    ps2:"راهکارهای دقیق اسپری<br>برای هر کاربرد",
  pt3:"درپوش‌های خاص",      ps3:"طراحی سفارشی برای<br>نیازهای ویژه",
  pt4:"راهکارهای بسته‌بندی", ps4:"تخصص کامل در درپوش<br>و بسته‌بندی",
  indLabel:"صنایعی که خدمت می‌کنیم", indClaim:"مورد اعتماد بازارهای جهانی",
  it1:"شوینده‌ها", is1:"خانگی، لباسشویی<br>و نظافت",
  it2:"آئروسل‌ها", is2:"بهداشتی، خانگی<br>و صنعتی",
  it3:"مواد شیمیایی", is3:"صنعتی، تخصصی<br>و کشاورزی",
  it4:"راهکارهای بسته‌بندی", is4:"غذا، نوشیدنی،<br>دارو و بیشتر",
  indCap:"یک درپوش،<br>صدها صنعت",
  fEyebrow1:"از ایده تا تولید",
  fTitle1:"تولید سفارشی و ساخت قالب",
  fText1:"ایدهٔ شما را به درپوشی با عملکرد بالا تبدیل می‌کنیم. با طراحی داخلی، ساخت قالب و تجربهٔ تولید، راهکارهایی می‌سازیم که برای عملکرد، فرم و مقیاس ساخته شده‌اند.",
  fCta1:"توانمندی‌های ما",
  fEyebrow2:"کیفیت در هر جزء",
  fTitle2:"بنا شده بر کیفیت",
  fText2:"آزمون‌شده و پیوسته قابل اتکا. نظام کیفی ما تضمین می‌کند هر درپوش بالاترین استانداردها را برآورده کند.",
  q1:"دقت ابعادی", q2:"آزمون عملکرد", q3:"انطباق مواد", q4:"استانداردهای جهانی کیفیت",
  fCta2:"کیفیت ما",
  ctaEyebrow:"بیایید فردایی پاکیزه‌تر بسازیم",
  ctaTitle:"آمادهٔ ساخت راهکار بعدی‌تان هستید؟",
  ctaText:"برای راهکارهای نوآورانه، قابل اتکا و پایدارِ درپوش، با نیوکپ همراه شوید.",
  ctaBtn:"تماس بگیرید",
  fClaim:"مهندسی‌شده برای جهانی پاکیزه‌تر و ایمن‌تر",
  copy:"© ۲۰۲۴ نیوکپ. تمامی حقوق محفوظ است.",
  privacy:"حریم خصوصی", terms:"شرایط", sitemap:"نقشهٔ سایت",

  /* ---- محصولات ---- */
  pp_eb:"محصولات ما",
  pp_h1:"درپوشی که حول محصول شما مهندسی می‌شود",
  pp_lede:"چهار خانواده، یک استاندارد. هر درپوش نیوکپ از همان آب‌بندی‌ای شروع می‌شود که باید بسازد، و شکل و ماده و رواداری‌اش را از همان‌جا می‌گیرد.",
  pp_n1:"۰۱", pp_n2:"۰۲", pp_n3:"۰۳", pp_n4:"۰۴",
  pp_t1:"درپوش‌های پلاستیکی",
  pp_p1:"اسب‌های کاری هر روز: درپوش پیچی، فلیپ‌تاپ و پلمب‌دار، ساخته‌شده برای خطوط پرحجمی که نه نشتی برمی‌دارند نه توقف.",
  pp_b1a:"دهانهٔ ۱۸ تا ۳۸ میلی‌متر", pp_b1b:"نوار پلمب", pp_b1c:"PP، HDPE و PE", pp_b1d:"با و بدون واشر",
  pp_t2:"درپوش‌های اسپری",
  pp_p2:"جایی که مقدار پاشش به اندازهٔ آب‌بندی اهمیت دارد. سرهای مه‌پاش و سامانه‌های توزیع، تنظیم‌شده برای الگوی پاشش یکنواخت از اولین فشار تا آخرین.",
  pp_b2a:"مه ریز و جریان مستقیم", pp_b2b:"دوز خروجی یکنواخت", pp_b2c:"قطعات مقاوم به مواد شیمیایی", pp_b2d:"ماشه‌های قفل‌شونده",
  pp_t3:"درپوش‌های خاص",
  pp_p3:"برای محصولاتی که در کاتالوگ نمی‌گنجند. درپوش پیمانه‌ای، سامانه‌های ایمنِ کودک و هندسه‌های توزیع، توسعه‌یافته بر اساس خط پرکنی و محتوای شما.",
  pp_b3a:"پیمانه و دوزسنج", pp_b3b:"ایمن در برابر کودک", pp_b3c:"فلیپ‌تاپ و دیسک‌تاپ", pp_b3d:"هندسهٔ کاملاً سفارشی",
  pp_t4:"راهکارهای بسته‌بندی",
  pp_p4:"درپوش و ظرف به‌عنوان یک سامانهٔ واحد تعریف می‌شوند، تا سازگاری پیش از ساخت قالب اثبات شود، نه وسط خط تولید کشف.",
  pp_b4a:"تطبیق درپوش و دهانه", pp_b4b:"آزمون سازگاری", pp_b4c:"چاپ و برندسازی", pp_b4d:"مدیریت پروژه",
  pp_specL:"مشخصات در یک نگاه",
  pp_s1:"مواد", pp_s1v:"پلی‌پروپیلن، HDPE، LDPE و آلیاژهای مهندسی‌شده — انتخاب‌شده بر اساس محتوا، نه بر اساس قالب.",
  pp_s2:"دهانه", pp_s2v:"اندازه‌های استاندارد ۱۸، ۲۰، ۲۴، ۲۸ و ۳۸ میلی‌متر، به‌علاوهٔ رزوه‌های سفارشی متناسب با ظرف شما.",
  pp_s3:"آب‌بندی", pp_s3v:"آب‌بندی مخروطی بدون واشر، لاینر القایی و حساس به فشار، و نوار پلمب.",
  pp_s4:"تزئین", pp_s4v:"بافت درون‌قالبی، برجسته‌کاری، تطبیق رنگ سفارشی و چاپ برای برندهای اختصاصی.",
  pp_s5:"تیراژ", pp_s5v:"از تیراژ آزمایشی برای اعتبارسنجی تا تولید پیوستهٔ چندحفره‌ای.",
  pp_note:"درپوشی که می‌خواهید این‌جا نیست؟ بیشتر چیزهایی که می‌سازیم، روزی نقشه‌ای بودند که هنوز وجود نداشت.",

  /* ---- صنایع ---- */
  pi_eb:"صنایعی که خدمت می‌کنیم",
  pi_h1:"یک درپوش، صدها صنعت",
  pi_lede:"درپوش را با آنچه زیرش است می‌سنجند. هر صنعتی که به آن خدمت می‌کنیم، چیز متفاوتی از همان قطعهٔ کوچک می‌خواهد — و همین است که طراحی را شکل می‌دهد.",
  pi_n1:"شوینده‌ها", pi_t1:"خانگی، لباسشویی و نظافت",
  pi_p1:"مایعات غلیظ و پر از سورفکتانت که می‌خزند، کف می‌کنند و به مواد ضعیف حمله می‌برند. درپوش باید با دست خیس راحت باز شود و بعد از بیست بار بسته‌شدن هنوز آب‌بند بماند.",
  pi_b1a:"مقاومت به سورفکتانت", pi_b1b:"هندسهٔ ضدچکه", pi_b1c:"آج‌دار برای دست خیس", pi_b1d:"پلمب نشان‌دهنده",
  pi_n2:"آئروسل‌ها", pi_t2:"بهداشتی، خانگی و صنعتی",
  pi_p2:"محتوای تحت فشار حاشیهٔ خطا نمی‌گذارد. ماشه و کلاهک باید دقیقاً با شیر جفت شوند، الگوی پاشش را حفظ کنند و در حمل‌ونقل از تخلیهٔ ناخواسته جلوگیری کنند.",
  pi_b2a:"سازگاری با شیر", pi_b2b:"الگوی پاشش پایدار", pi_b2c:"محافظت در حمل", pi_b2d:"وضعیت قفل",
  pi_n3:"مواد شیمیایی", pi_t3:"صنعتی، تخصصی و کشاورزی",
  pi_p3:"محتوای خورنده، انبارش طولانی و مقررات سخت‌گیرانهٔ حمل. این‌جا آب‌بندی یک قطعهٔ ایمنی است و انتخاب ماده از ظاهر مهم‌تر.",
  pi_b3a:"مقاومت شیمیایی", pi_b3b:"آب‌بندی در برابر بخار", pi_b3c:"گزینهٔ ایمن برای کودک", pi_b3d:"انطباق با مقررات حمل",
  pi_n4:"بسته‌بندی", pi_t4:"غذا، نوشیدنی، دارو و بیشتر",
  pi_p4:"انطباق تماس با ماده، بهداشت و ردیابی در اولویت‌اند. هر بچ باید مستند شود و هر درپوش باید دقیقاً مثل قبلی رفتار کند.",
  pi_b4a:"مواد مجاز تماس غذایی", pi_b4b:"طراحی بهداشتی", pi_b4c:"ردیابی بچ", pi_b4d:"اعتبارسنجی مستند",
  pi_wL:"چطور با شما کار می‌کنیم",
  pi_w1:"شناخت محتوا", pi_w1p:"ترکیب شیمیایی، غلظت، ماندگاری و دمای پرکنی — پیش از آن‌که دربارهٔ هندسه حرفی زده شود.",
  pi_w2:"تطبیق با خط", pi_w2p:"گشتاور دربندی، سرعت هد و رواداری ظرف تعیین می‌کنند درپوش چه می‌تواند باشد.",
  pi_w3:"اثبات، بعد مقیاس", pi_w3p:"اول نمونه و تیراژ اعتبارسنجی؛ تولید پیوسته فقط وقتی آب‌بندی اثبات شد.",

  /* ---- توانمندی‌ها ---- */
  pc_eb:"از ایده تا تولید",
  pc_h1:"طراحی، قالب‌سازی و تزریق زیر یک سقف",
  pc_lede:"نگه‌داشتن طراحی، ساخت قالب و تزریق در یک ساختمان، فاصلهٔ میان ایده و قطعه‌ای که در دست می‌گیرید را کوتاه می‌کند — و وقتی چیزی باید تغییر کند، مسئولیت را یک‌جا نگه می‌دارد.",
  pc_sL:"یک درپوش چطور ساخته می‌شود",
  pc_s1:"طراحی و مهندسی", pc_s1p:"مدل‌سازی سه‌بعدی و شبیه‌سازی جریان، تا جمع‌شدگی، تاب و نیروی آب‌بندی پیش از بریدن فولاد روشن باشد.",
  pc_s2:"ساخت قالب", pc_s2p:"طراحی و ساخت قالب در داخل مجموعه، از نمونهٔ تک‌حفره تا قالب‌های سخت‌کاری‌شدهٔ چندحفره‌ای.",
  pc_s3:"تزریق پلاستیک", pc_s3p:"سیکل‌های کنترل‌شده و تکرارپذیر، با پایش پارامترهای فرایند روی هر شات.",
  pc_s4:"بازرسی حین خط", pc_s4p:"کنترل ابعادی و ظاهری در حین تولید، نه فقط در پایان آن.",
  pc_s5:"مونتاژ و تزئین", pc_s5p:"مونتاژ چندقطعه‌ای، جاگذاری لاینر، تطبیق رنگ، بافت و برندسازی.",
  pc_s6:"بسته‌بندی و تأمین", pc_s6p:"شناسهٔ بچ، بسته‌بندی محافظ و تحویل زمان‌بندی‌شده مطابق برنامهٔ تولید شما.",
  pc_cn:"کار سفارشی", pc_ct:"وقتی کاتالوگ تمام می‌شود",
  pc_cp:"بیشتر پروژه‌های سفارشی یک‌جور شروع می‌شوند: درپوشی که تقریباً جواب می‌دهد. ما از همان جایی شروع می‌کنیم که شکست می‌خورد — نشتی، گشتاور بیش از حد، یا شکلی که روی خط شما نمی‌چرخد — و از آن‌جا به عقب طراحی می‌کنیم.",
  pc_cb1:"مهندسی معکوس", pc_cb2:"قالب نمونه", pc_cb3:"انتخاب ماده", pc_cb4:"تست روی خط",

  /* ---- کیفیت ---- */
  pq_eb:"کیفیت در هر جزء", pq_h1:"بنا شده بر کیفیت",
  pq_lede:"درپوش یا هر بار آب‌بندی می‌کند یا اصلاً آب‌بندی نمی‌کند. نظام کیفی ما برای این وجود دارد که قطعهٔ صدهزارم دقیقاً مثل قطعهٔ اول رفتار کند.",
  pq_n:"اندازه‌گیری", pq_t:"دقت ابعادی",
  pq_p:"پروفیل رزوه، سطح آب‌بندی و ضخامت نوار پلمب در طول تیراژ با نقشه سنجیده می‌شوند. رواداری‌ها روی قطعاتی کنترل می‌شود که از تولید برداشته شده‌اند، نه از یک شات نمایشی.",
  pq_b1:"نمونه‌گیری در طول تیراژ", pq_b2:"رواداری‌های مستند", pq_b3:"ردیابی در سطح حفره", pq_b4:"نگه‌داری سوابق بچ",
  pq_tL:"چه چیزهایی آزمون می‌شوند",
  pq_x1:"یکپارچگی آب‌بندی", pq_x1p:"آزمون نشتی و خلأ روی ظرف پرشده، در همان وضعیتی که بسته واقعاً حمل می‌شود.",
  pq_x2:"رفتار گشتاور", pq_x2p:"گشتاور بستن و بازکردن، هم در حالت عادی و هم پس از کهنگی، تا بسته قابل بازکردن بماند.",
  pq_x3:"سقوط و حمل", pq_x3p:"آزمون ضربه و ارتعاش که جابه‌جایی، چیدن روی هم و حمل طولانی را بازسازی می‌کند.",
  pq_x4:"انطباق مواد", pq_x4p:"گواهی گرید مواد اولیه و انطباق تماس، مستند برای هر بچی که تحویل می‌دهیم.",
  pq_x5:"سازگاری شیمیایی", pq_x5p:"آزمون انبارش با محتوای واقعی شما، چون برگهٔ فنی تضمین نیست.",
  pq_x6:"ظاهر و رنگ", pq_x6p:"سطح، بافت و رنگ در برابر نمونهٔ مرجع تأییدشده کنترل می‌شود.",
  pq_cL:"تعهدات ما",
  pq_c1:"ردیابی", pq_c1v:"هر بچ تا لات مواد اولیه، قالب، حفره و تاریخ تولید قابل ردیابی است.",
  pq_c2:"نمونهٔ مرجع", pq_c2v:"تولید در برابر نمونهٔ مرجع امضاشده‌ای سنجیده می‌شود که نسخه‌ای از آن نزد شماست.",
  pq_c3:"کنترل تغییر", pq_c3v:"هیچ تغییری در ماده، قالب یا فرایند بدون اطلاع کتبی به خط شما نمی‌رسد.",
  pq_c4:"اقدام اصلاحی", pq_c4v:"هر مشکل تا ریشه بررسی می‌شود و یافته و راه‌حل به شما گزارش می‌شود.",

  /* ---- درباره ما ---- */
  pa_eb:"دربارهٔ نیوکپ", pa_h1:"جزئی کوچک، تفاوتی بزرگ.",
  pa_lede:"ما قطعه‌ای را می‌سازیم که هیچ‌کس از آن عکس نمی‌گیرد و همه به آن وابسته‌اند. درپوش چند گرم پلاستیک است که تصمیم می‌گیرد محصول سالم برسد یا نه — و این کار به‌قدر کافی جدی هست که شرکتی حولش ساخته شود.",
  pa_sn:"داستان ما", pa_st:"مهندسی‌شده برای جهانی پاکیزه‌تر و ایمن‌تر",
  pa_sp:"نیوکپ درپوش‌های دقیق را برای شوینده‌ها، آئروسل‌ها، مواد شیمیایی و کالاهای بسته‌بندی‌شده مهندسی می‌کند. نوآوری، اطمینان و تجربهٔ صنعتی را کنار هم می‌گذاریم تا محصولات روزمره اثر مثبت بزرگ‌تری بگذارند — با آب‌بندی بهتر، ضایعات کمتر، و موادی که با نگاه به کل چرخهٔ عمرشان انتخاب شده‌اند.",
  pa_sb1:"طراحی داخلی", pa_sb2:"ساخت قالب خودمان", pa_sb3:"تولید کنترل‌شده", pa_sb4:"تأمین جهانی",
  pa_vL:"به چه باور داریم",
  pa_v1k:"دقت", pa_v1:"رواداری، خودِ محصول است",
  pa_v1p:"درپوشی که تقریباً درست است، غلط است. طوری طراحی، قالب‌سازی و اندازه‌گیری می‌کنیم که آب‌بندی در هر حفره و هر شیفت تکرارپذیر بماند.",
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
  pr_lede:"هر چیزی که معمولاً باید با ایمیل درخواستش کنید — مشخصات فنی، مدارک انطباق، و سؤال‌هایی که خریداران بیش از همه از ما می‌پرسند.",
  pr_dL:"دریافت فایل",
  pr_d1k:"پی‌دی‌اف", pr_d1:"کاتالوگ محصولات", pr_d1p:"کل سبد درپوش‌ها با اندازهٔ دهانه، مواد و گزینه‌های تزئین.",
  pr_d2k:"پی‌دی‌اف", pr_d2:"برگه‌های فنی", pr_d2p:"نقشه‌های ابعادی، مقادیر گشتاور و پارامترهای پیشنهادی دربندی برای هر خانواده.",
  pr_d3k:"پی‌دی‌اف", pr_d3:"مدارک انطباق", pr_d3p:"اظهارنامهٔ مواد و گواهی انطباق تماس، بنا به درخواست برای هر بچ.",
  pr_fL:"پرسش‌های پرتکرار",
  pr_q1:"درپوش را با طرح خودمان می‌سازید؟",
  pr_a1:"بله. طراحی، ساخت قالب و تزریق همگی داخل مجموعه انجام می‌شود، پس یک درپوش سفارشی از نقشه تا تولید اعتبارسنجی‌شده می‌رسد بدون آن‌که وسط راه تأمین‌کننده عوض شود.",
  pr_q2:"حداقل تیراژ سفارش چقدر است؟",
  pr_a2:"بستگی به درپوش دارد و به این‌که قالبش از قبل هست یا نه. اقلام استاندارد با قالب موجود از تیراژ‌های متعادل شروع می‌شوند؛ قطعهٔ کاملاً سفارشی اول مرحلهٔ قالب‌سازی دارد. تیراژ سالانه را بگویید تا دقیق پاسخ دهیم.",
  pr_q3:"یک پروژهٔ سفارشی چقدر طول می‌کشد؟",
  pr_a3:"طراحی و شبیه‌سازی معمولاً چند هفته، ساخت قالب به‌مراتب بیشتر، و اعتبارسنجی به آزمون‌های خود شما بستگی دارد. به‌جای یک عدد، در ابتدای کار برنامهٔ زمان‌بندی‌شده می‌دهیم.",
  pr_q4:"با ظرف فعلی ما هماهنگ می‌شود؟",
  pr_a4:"بله. یک نمونه ظرف یا نقشه‌اش را بفرستید. دهانه را خودمان اندازه می‌گیریم و به اندازهٔ اسمی اکتفا نمی‌کنیم، چون بیشتر مشکلات آب‌بندی دقیقاً از همان‌جا شروع می‌شود.",
  pr_q5:"با چه موادی کار می‌کنید؟",
  pr_a5:"عمدتاً گریدهای پلی‌پروپیلن و پلی‌اتیلن، و در جایی که مقاومت شیمیایی یا سفتی لازم باشد، آلیاژهای مهندسی‌شده. ماده بر اساس محتوای شما انتخاب می‌شود، نه برعکس.",
  pr_q6:"خارج از ایران هم تأمین می‌کنید؟",
  pr_a6:"بله، به بازارهای صادراتی تأمین می‌کنیم. بسته‌بندی، مدارک و زمان‌بندی تحویل برای هر پروژه جداگانه تنظیم می‌شود — مقصد را بگویید تا جزئیاتش را روشن کنیم.",

  /* ---- تماس ---- */
  pn_eb:"بیایید فردایی پاکیزه‌تر بسازیم",
  pn_h1:"بگویید چه چیزی را می‌خواهید ببندید",
  pn_lede:"هرچه دربارهٔ محتوا، ظرف و خط پرکنی بیشتر بگویید، اولین پاسخ ما کاربردی‌تر خواهد بود.",
  pn_l1:"نام", pn_l2:"شرکت", pn_l3:"ایمیل", pn_l4:"تلفن",
  pn_l5:"موضوع درخواست", pn_l6:"چه چیزی را بسته‌بندی می‌کنید؟",
  pn_o1:"درپوش‌های استاندارد", pn_o2:"توسعهٔ سفارشی", pn_o3:"نمونه و آزمون", pn_o4:"موضوع دیگر",
  pn_send:"ارسال درخواست",
  pn_hint:"این فرم برنامهٔ ایمیل شما را با همین اطلاعات باز می‌کند؛ چیزی توسط این صفحه ارسال یا ذخیره نمی‌شود.",
  pn_iL:"تماس مستقیم",
  pn_i1:"تلفن", pn_i2:"ایمیل", pn_i3:"وب‌سایت", pn_i4:"نشانی",
  pn_i4v:"نشانی شما این‌جا<br>شهر، کشور"
};
const TR = {
  skip:"İçeriğe geç",
  nav1:"Ürünler", nav2:"Sektörler", nav3:"Yetkinlikler", nav4:"Kalite", nav5:"Hakkımızda",
  nav6:"Kaynaklar", nav7:"İletişim", inquire:"Teklif al",
  heroEyebrow:"Daha aydınlık bir yarına doğru",
  heroTitle:"Küçük detay.<br>Büyük fark.",
  heroLede:"Daha temiz, daha güvenli ve daha sürdürülebilir bir dünya için ileri plastik kapak üretimi.",
  v1:"Hassasiyet", v2:"İnovasyon", v3:"Güvenilirlik", v4:"Daha temiz bir yarın",
  heroCta:"Ürünlerimizi keşfedin",
  prodLabel:"Ürünlerimiz", prodClaim:"Daha temiz, daha güvenli bir dünya için tasarlandı", viewAll:"Tüm ürünler",
  pt1:"Plastik kapaklar", ps1:"Vidalı kapak, flip-top,<br>güvenlik bantlı ve daha fazlası",
  pt2:"Sprey kapaklar",   ps2:"Her uygulama için<br>hassas sprey çözümleri",
  pt3:"Özel kapaklar",    ps3:"Benzersiz ihtiyaçlar için<br>özel tasarımlar",
  pt4:"Ambalaj çözümleri", ps4:"Eksiksiz kapak ve<br>ambalaj uzmanlığı",
  indLabel:"Hizmet verdiğimiz sektörler", indClaim:"Küresel pazarlarda güvenilir",
  it1:"Deterjanlar", is1:"Ev, çamaşır<br>ve temizlik",
  it2:"Aerosoller", is2:"Kişisel bakım,<br>ev ve endüstri",
  it3:"Kimyasallar", is3:"Endüstriyel, özel<br>ve tarım kimyasalları",
  it4:"Ambalaj çözümleri", is4:"Gıda, içecek,<br>ilaç ve daha fazlası",
  indCap:"Tek kapak.<br>Sayısız<br>sektör.",
  fEyebrow1:"Konseptten üretime",
  fTitle1:"Özel üretim ve kalıp geliştirme",
  fText1:"Fikirlerinizi yüksek performanslı kapaklara dönüştürüyoruz. Kendi bünyemizdeki tasarım, kalıp geliştirme ve üretim deneyimiyle; işlev, biçim ve ölçek için kurgulanmış özel çözümler sunuyoruz.",
  fCta1:"Yetkinliklerimiz",
  fEyebrow2:"Her detayda kalite",
  fTitle2:"Kalite üzerine kurulu",
  fText2:"Titizlikle test edilmiş, her defasında aynı. Kalite sistemlerimiz her kapağın en yüksek standartları karşılamasını sağlar.",
  q1:"Boyutsal hassasiyet", q2:"Performans testleri", q3:"Malzeme uygunluğu", q4:"Küresel kalite standartları",
  fCta2:"Kalitemiz",
  ctaEyebrow:"Daha temiz bir yarını birlikte kuralım",
  ctaTitle:"Bir sonraki çözümünüzü yaratmaya hazır mısınız?",
  ctaText:"Yenilikçi, güvenilir ve sürdürülebilir kapak çözümleri için NEWCAP ile çalışın.",
  ctaBtn:"İletişime geçin",
  fClaim:"Daha temiz<br>ve güvenli bir dünya<br>için tasarlandı",
  copy:"© 2024 NEWCAP. Tüm hakları saklıdır.",
  privacy:"Gizlilik", terms:"Şartlar", sitemap:"Site haritası",

  /* ---- Ürünler ---- */
  pp_eb:"Ürünlerimiz",
  pp_h1:"Ürününüzün etrafında tasarlanan kapaklar",
  pp_lede:"Dört aile, tek standart. Her NEWCAP kapağı, yapması gereken sızdırmazlıktan yola çıkar; geometrisini, malzemesini ve toleransını oradan kazanır.",
  pp_n1:"01", pp_n2:"02", pp_n3:"03", pp_n4:"04",
  pp_t1:"Plastik kapaklar",
  pp_p1:"Günlük iş gücü: ne sızıntıyı ne de duruşu kaldırabilen yüksek hacimli hatlar için vidalı kapaklar, flip-top ve güvenlik bantlı kapaklar.",
  pp_b1a:"18–38 mm ağız ölçüleri", pp_b1b:"Güvenlik bandı", pp_b1c:"PP, HDPE ve PE", pp_b1d:"Contalı ve contasız",
  pp_t2:"Sprey kapaklar",
  pp_p2:"Dozun en az sızdırmazlık kadar önemli olduğu yer. İlk basıştan sonuncusuna kadar tutarlı bir sprey deseni için ayarlanmış ince sisleme başlıkları ve dozajlama sistemleri.",
  pp_b2a:"İnce sis ve düz jet", pp_b2b:"Tutarlı doz çıkışı", pp_b2c:"Kimyasala dayanıklı parçalar", pp_b2d:"Kilitlenebilir tetik",
  pp_t3:"Özel kapaklar",
  pp_p3:"Kataloğa sığmayan ürünler için. Ölçekli kapaklar, çocuk kilitli sistemler ve dolum hattınıza ve içeriğinize göre geliştirilen dozajlama geometrileri.",
  pp_b3a:"Ölçüm ve dozajlama", pp_b3b:"Çocuk kilitli sistemler", pp_b3c:"Flip-top ve disc-top", pp_b3d:"Tamamen özel geometri",
  pp_t4:"Ambalaj çözümleri",
  pp_p4:"Kapak ve kap tek bir sistem olarak tanımlanır; böylece uyum, kalıp açılmadan önce kanıtlanır, hatta üzerinde keşfedilmez.",
  pp_b4a:"Eşleşen kapak ve ağız", pp_b4b:"Uyumluluk testleri", pp_b4c:"Dekorasyon ve markalama", pp_b4d:"Program yönetimi",
  pp_specL:"Teknik özet",
  pp_s1:"Malzemeler", pp_s1v:"Polipropilen, HDPE, LDPE ve mühendislik karışımları — kalıba göre değil, içeriğe göre seçilir.",
  pp_s2:"Ağız ölçüleri", pp_s2v:"Standart 18, 20, 24, 28 ve 38 mm ölçüleri ve kabınıza özel geliştirilen dişler.",
  pp_s3:"Sızdırmazlık", pp_s3v:"Contasız konik sızdırmazlık, indüksiyon ve basınca duyarlı contalar, güvenlik bantları.",
  pp_s4:"Dekorasyon", pp_s4v:"Kalıp içi doku, kabartma, özel renk eşleştirme ve kendi markanız için baskı.",
  pp_s5:"Adetler", pp_s5v:"Doğrulama amaçlı pilot üretimden çok gözlü sürekli üretime kadar.",
  pp_note:"Aradığınız kapak listede yok mu? Ürettiklerimizin çoğu, bir zamanlar henüz var olmayan bir çizimdi.",

  /* ---- Sektörler ---- */
  pi_eb:"Hizmet verdiğimiz sektörler",
  pi_h1:"Tek kapak. Sayısız sektör.",
  pi_lede:"Bir kapak, altındaki ürüne göre değerlendirilir. Tedarik ettiğimiz her sektör aynı küçük parçadan farklı bir şey ister — tasarımı şekillendiren de budur.",
  pi_n1:"Deterjanlar", pi_t1:"Ev, çamaşır ve temizlik",
  pi_p1:"Akan, köpüren ve zayıf malzemeye saldıran yoğun, yüzey aktif madde ağırlıklı sıvılar. Kapak ıslak elle kolay açılmalı ve yirmi çevrimden sonra hâlâ sızdırmamalı.",
  pi_b1a:"Yüzey aktif madde direnci", pi_b1b:"Damlatmayan geometri", pi_b1c:"Islak tutuş için tırtıl", pi_b1d:"Güvenlik bandı",
  pi_n2:"Aerosoller", pi_t2:"Kişisel bakım, ev ve endüstri",
  pi_p2:"Basınçlı içerik hata payı bırakmaz. Tetik ve kapak valfle tam eşleşmeli, sprey desenini korumalı ve nakliyede istem dışı boşalmayı önlemeli.",
  pi_b2a:"Valf uyumluluğu", pi_b2b:"Kararlı sprey deseni", pi_b2c:"Nakliye koruması", pi_b2d:"Kilit konumları",
  pi_n3:"Kimyasallar", pi_t3:"Endüstriyel, özel ve tarım kimyasalları",
  pi_p3:"Agresif içerik, uzun depolama ve katı taşıma kuralları. Burada sızdırmazlık bir güvenlik bileşenidir; malzeme seçimi görünüşten daha ağır basar.",
  pi_b3a:"Kimyasal direnç", pi_b3b:"Buhar sızdırmazlığı", pi_b3c:"Çocuk kilidi seçeneği", pi_b3d:"Taşıma mevzuatına uygunluk",
  pi_n4:"Ambalaj", pi_t4:"Gıda, içecek, ilaç ve daha fazlası",
  pi_p4:"Önce temas uygunluğu, hijyen ve izlenebilirlik. Her parti belgelenmeli ve her kapak bir öncekiyle birebir aynı davranmalı.",
  pi_b4a:"Gıdayla temasa uygun malzeme", pi_b4b:"Hijyenik tasarım", pi_b4c:"Parti izlenebilirliği", pi_b4d:"Belgelenmiş doğrulama",
  pi_wL:"Sizinle nasıl çalışıyoruz",
  pi_w1:"İçeriği anlamak", pi_w1p:"Kimya, viskozite, raf ömrü ve dolum sıcaklığı — geometri konuşulmadan önce.",
  pi_w2:"Hatta uyum", pi_w2p:"Kapama torku, kafa hızı ve kap toleransı kapağın ne olabileceğini belirler.",
  pi_w3:"Önce kanıt, sonra ölçek", pi_w3p:"Önce numune ve doğrulama üretimi; sürekli üretim ancak sızdırmazlık kanıtlanınca.",

  /* ---- Yetkinlikler ---- */
  pc_eb:"Konseptten üretime",
  pc_h1:"Tasarım, kalıp ve enjeksiyon tek çatı altında",
  pc_lede:"Tasarımı, kalıp geliştirmeyi ve enjeksiyonu aynı binada tutmak, bir fikirle elinize alabileceğiniz parça arasındaki mesafeyi kısaltır — ve bir şeyin değişmesi gerektiğinde sorumluluğu tek yerde tutar.",
  pc_sL:"Bir kapak nasıl üretilir",
  pc_s1:"Tasarım ve mühendislik", pc_s1p:"3B modelleme ve akış simülasyonu; çelik işlenmeden önce çekme, çarpılma ve sızdırmazlık kuvveti bilinir.",
  pc_s2:"Kalıp geliştirme", pc_s2p:"Tek gözlü prototipten sertleştirilmiş çok gözlü üretim kalıplarına, kendi bünyemizde tasarım ve imalat.",
  pc_s3:"Plastik enjeksiyon", pc_s3p:"Her baskıda proses parametreleri izlenen, kontrollü ve tekrarlanabilir çevrimler.",
  pc_s4:"Hat içi kontrol", pc_s4p:"Yalnızca sonunda değil, üretim sürerken boyutsal ve görsel kontrol.",
  pc_s5:"Montaj ve dekorasyon", pc_s5p:"Çok parçalı montaj, conta yerleştirme, renk eşleştirme, doku ve markalama.",
  pc_s6:"Paketleme ve tedarik", pc_s6p:"Parti tanımı, koruyucu paketleme ve üretim planınıza göre programlı teslimat.",
  pc_cn:"Özel işler", pc_ct:"Katalog bittiğinde",
  pc_cp:"Özel projelerin çoğu aynı şekilde başlar: mevcut bir kapak neredeyse yeterlidir. Biz nerede yetmediğinden başlarız — bir sızıntı, fazla gelen bir tork, hattınızda dönmeyen bir biçim — ve oradan geriye doğru tasarlarız.",
  pc_cb1:"Tersine mühendislik", pc_cb2:"Prototip kalıp", pc_cb3:"Malzeme seçimi", pc_cb4:"Hat denemeleri",

  /* ---- Kalite ---- */
  pq_eb:"Her detayda kalite", pq_h1:"Kalite üzerine kurulu",
  pq_lede:"Bir kapak ya her seferinde sızdırmaz ya da hiç sızdırmaz. Kalite sistemimiz, yüz bininci parçanın ilkiyle birebir aynı davranması için vardır.",
  pq_n:"Ölçüm", pq_t:"Boyutsal hassasiyet",
  pq_p:"Diş profili, sızdırmazlık yüzeyi ve bant kalınlığı üretim boyunca teknik resme göre ölçülür. Toleranslar bir gösterim baskısından değil, üretimden alınan parçalardan kontrol edilir.",
  pq_b1:"Üretim boyunca numune alma", pq_b2:"Belgelenmiş toleranslar", pq_b3:"Göz bazında izleme", pq_b4:"Parti kayıtlarının saklanması",
  pq_tL:"Neler test edilir",
  pq_x1:"Sızdırmazlık", pq_x1p:"Dolu kaplarda, ambalajın gerçekte taşınacağı konumda sızıntı ve vakum testi.",
  pq_x2:"Tork davranışı", pq_x2p:"Kapama ve açma torku hem normal hem yaşlandırma sonrası ölçülür; ambalaj açılabilir kalmalıdır.",
  pq_x3:"Düşme ve nakliye", pq_x3p:"Elleçlemeyi, istiflemeyi ve uzun mesafe taşımayı yeniden üreten darbe ve titreşim testleri.",
  pq_x4:"Malzeme uygunluğu", pq_x4p:"Tedarik ettiğimiz her parti için hammadde sertifikası ve temas uygunluğu belgelenir.",
  pq_x5:"Kimyasal uyum", pq_x5p:"Kendi içeriğinizle depolama denemeleri, çünkü teknik föy bir garanti değildir.",
  pq_x6:"Görünüm ve renk", pq_x6p:"Yüzey, doku ve renk onaylı referans numuneye göre kontrol edilir.",
  pq_cL:"Taahhütlerimiz",
  pq_c1:"İzlenebilirlik", pq_c1v:"Her parti hammadde lotuna, kalıba, göze ve üretim tarihine kadar izlenebilir.",
  pq_c2:"Onaylı numune", pq_c2v:"Üretim, iki tarafın da elinde bulunan imzalı bir referans numuneye göre ölçülür.",
  pq_c3:"Değişiklik kontrolü", pq_c3v:"Malzeme, kalıp veya proseste hiçbir değişiklik yazılı bildirim olmadan hattınıza ulaşmaz.",
  pq_c4:"Düzeltici faaliyet", pq_c4v:"Sorunlar kök nedene kadar incelenir; bulgu ve çözüm size raporlanır.",

  /* ---- Hakkımızda ---- */
  pa_eb:"NEWCAP hakkında", pa_h1:"Küçük detay. Büyük fark.",
  pa_lede:"Kimsenin fotoğrafını çekmediği, herkesin bağlı olduğu parçayı üretiyoruz. Bir kapak, ürünün sağlam ulaşıp ulaşmayacağına karar veren birkaç gram plastiktir — ve bu, etrafına bir şirket kurulacak kadar ciddi bir iştir.",
  pa_sn:"Hikâyemiz", pa_st:"Daha temiz, daha güvenli bir dünya için tasarlandı",
  pa_sp:"NEWCAP; deterjan, aerosol, kimya ve paketli ürünler için yüksek hassasiyetli kapaklar geliştirir. İnovasyonu, güvenilirliği ve endüstriyel deneyimi bir araya getirerek günlük ürünlerin daha büyük bir olumlu etki bırakmasını sağlarız — daha iyi sızdırmazlık, daha az atık ve tüm yaşam döngüsü düşünülerek seçilen malzemelerle.",
  pa_sb1:"Kendi tasarımımız", pa_sb2:"Kendi kalıp geliştirmemiz", pa_sb3:"Kontrollü üretim", pa_sb4:"Küresel tedarik",
  pa_vL:"Neye inanıyoruz",
  pa_v1k:"Hassasiyet", pa_v1:"Tolerans, ürünün kendisidir",
  pa_v1p:"Neredeyse doğru olan bir kapak yanlıştır. Sızdırmazlığın her gözde ve her vardiyada tekrarlanması için tasarlar, kalıplar ve ölçeriz.",
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
  pr_lede:"Normalde e-postayla istemeniz gereken her şey — teknik özellikler, uygunluk belgeleri ve alıcıların bize en sık sorduğu sorular.",
  pr_dL:"İndirilebilir dosyalar",
  pr_d1k:"PDF", pr_d1:"Ürün kataloğu", pr_d1p:"Ağız ölçüleri, malzemeler ve dekorasyon seçenekleriyle tüm kapak ailesi.",
  pr_d2k:"PDF", pr_d2:"Teknik föyler", pr_d2p:"Her aile için boyutsal çizimler, tork değerleri ve önerilen kapama parametreleri.",
  pr_d3k:"PDF", pr_d3:"Uygunluk belgeleri", pr_d3p:"Talep üzerine parti bazında düzenlenen malzeme beyanları ve temas uygunluğu belgeleri.",
  pr_fL:"Sık sorulanlar",
  pr_q1:"Kendi tasarımımıza göre kapak üretiyor musunuz?",
  pr_a1:"Evet. Tasarım, kalıp geliştirme ve enjeksiyon tamamen bünyemizde yapılır; böylece özel bir kapak, yolun ortasında tedarikçi değiştirmeden çizimden doğrulanmış üretime geçebilir.",
  pr_q2:"Minimum sipariş adedi nedir?",
  pr_a2:"Kapağa ve kalıbın hâlihazırda var olup olmadığına bağlı. Mevcut kalıpla üretilen standart ürünler makul adetlerden başlar; tamamen özel bir parçada önce kalıp aşaması vardır. Yıllık adedi söyleyin, net konuşalım.",
  pr_q3:"Özel bir proje ne kadar sürer?",
  pr_a3:"Tasarım ve simülasyon genelde birkaç hafta, kalıp imalatı belirgin şekilde daha uzun, doğrulama ise sizin testlerinize bağlı. Tek bir rakam yerine, işin başında tarihli bir plan veriyoruz.",
  pr_q4:"Mevcut kabımıza uyar mı?",
  pr_a4:"Evet. Bir numune kap ya da teknik resmini gönderin. Ağız ölçüsünü nominal değere güvenmeden kendimiz ölçeriz, çünkü sızdırmazlık sorunlarının çoğu tam olarak orada başlar.",
  pr_q5:"Hangi malzemelerle çalışıyorsunuz?",
  pr_a5:"Ağırlıklı olarak polipropilen ve polietilen türleri; kimyasal direnç veya rijitlik gerektiğinde mühendislik karışımları. Malzeme içeriğinize göre seçilir, tersi değil.",
  pr_q6:"İran dışına da tedarik ediyor musunuz?",
  pr_a6:"Evet, ihracat pazarlarına tedarik ediyoruz. Paketleme, belgelendirme ve teslimat planı her program için ayrı kurgulanır — varış noktasını söyleyin, neler gerektiğini aktaralım.",

  /* ---- İletişim ---- */
  pn_eb:"Daha temiz bir yarını birlikte kuralım",
  pn_h1:"Neyi kapatmanız gerektiğini anlatın",
  pn_lede:"İçerik, kap ve dolum hattı hakkında ne kadar çok şey anlatırsanız, ilk yanıtımız o kadar işinize yarar.",
  pn_l1:"Ad soyad", pn_l2:"Şirket", pn_l3:"E-posta", pn_l4:"Telefon",
  pn_l5:"Talep türü", pn_l6:"Ne paketliyorsunuz?",
  pn_o1:"Standart kapaklar", pn_o2:"Özel geliştirme", pn_o3:"Numune ve test", pn_o4:"Diğer",
  pn_send:"Talebi gönder",
  pn_hint:"Bu form, bilgiler doldurulmuş hâlde e-posta uygulamanızı açar; bu sayfa hiçbir şey göndermez veya saklamaz.",
  pn_iL:"Doğrudan iletişim",
  pn_i1:"Telefon", pn_i2:"E-posta", pn_i3:"Web", pn_i4:"Adres",
  pn_i4v:"Adres satırınız<br>Şehir, Ülke"
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
const DICTS = { en: EN, fa: FA, tr: TR };
const LANG_META = {
  en: { code:'EN', dir:'ltr', title:'NEWCAP — Precision in Every Closure', search:'Search NEWCAP' },
  fa: { code:'FA', dir:'rtl', title:'نیوکپ — دقت در هر درپوش',           search:'جست‌وجو در نیوکپ' },
  tr: { code:'TR', dir:'ltr', title:'NEWCAP — Her Kapakta Hassasiyet',    search:'NEWCAP içinde ara' }
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

let lang = (window.__BOOT__ && window.__BOOT__.lang) || 'en';
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
  <h1 data-rv style="--d:90ms" data-t="pp_h1">Closures engineered around your product</h1>
  <p class="lede" data-rv style="--d:170ms" data-t="pp_lede">Four families, one standard. Every NEWCAP closure starts from the seal it has to make, then earns its geometry, material and tolerance from there.</p>
  <div class="hr"></div>
</div></section>

<section class="psec"><div class="wrap">
  <div class="split" data-rv>
    <div class="sh"><img src="${IMG.hi_navycap}" alt=""></div>
    <div>
      <div class="n" data-t="pp_n1">01</div>
      <h3 data-t="pp_t1">Plastic closures</h3>
      <p data-t="pp_p1">The everyday workhorses: screw caps, flip tops and tamper-evident closures built for high-volume lines that cannot afford a leak or a stoppage.</p>
      <ul>
        <li><span data-t="pp_b1a">Neck finishes 18–38 mm</span></li>
        <li><span data-t="pp_b1b">Tamper-evident bands</span></li>
        <li><span data-t="pp_b1c">PP, HDPE and PE</span></li>
        <li><span data-t="pp_b1d">Lined and linerless</span></li>
      </ul>
    </div>
  </div>
  <div class="split rev" data-rv>
    <div class="sh"><img src="${IMG.hi_whitecap}" alt=""></div>
    <div>
      <div class="n" data-t="pp_n2">02</div>
      <h3 data-t="pp_t2">Spray caps</h3>
      <p data-t="pp_p2">Where the dose matters as much as the seal. Fine-mist heads and dispensing systems tuned for a consistent spray pattern from the first press to the last.</p>
      <ul>
        <li><span data-t="pp_b2a">Fine mist and stream</span></li>
        <li><span data-t="pp_b2b">Consistent dose output</span></li>
        <li><span data-t="pp_b2c">Chemical-resistant parts</span></li>
        <li><span data-t="pp_b2d">Lockable actuators</span></li>
      </ul>
    </div>
  </div>
  <div class="split" data-rv>
    <div class="sh"><img src="${IMG.hi_colors}" alt=""></div>
    <div>
      <div class="n" data-t="pp_n3">03</div>
      <h3 data-t="pp_t3">Specialty closures</h3>
      <p data-t="pp_p3">For products that do not fit a catalogue. Measuring caps, child-resistant systems and dispensing geometries developed against your filling line and your contents.</p>
      <ul>
        <li><span data-t="pp_b3a">Measuring and dosing</span></li>
        <li><span data-t="pp_b3b">Child-resistant systems</span></li>
        <li><span data-t="pp_b3c">Flip-top and disc-top</span></li>
        <li><span data-t="pp_b3d">Fully custom geometry</span></li>
      </ul>
    </div>
  </div>
  <div class="split rev" data-rv>
    <div class="sh"><img src="${IMG.hi_bottles}" alt=""></div>
    <div>
      <div class="n" data-t="pp_n4">04</div>
      <h3 data-t="pp_t4">Packaging solutions</h3>
      <p data-t="pp_p4">Closure and container specified as one system, so compatibility is proven before tooling is cut rather than discovered on the line.</p>
      <ul>
        <li><span data-t="pp_b4a">Matched closure and neck</span></li>
        <li><span data-t="pp_b4b">Compatibility testing</span></li>
        <li><span data-t="pp_b4c">Decoration and branding</span></li>
        <li><span data-t="pp_b4d">Programme management</span></li>
      </ul>
    </div>
  </div>
</div></section>

<section class="psec"><div class="wrap">
  <h2 class="label" data-rv><span data-t="pp_specL">Specification at a glance</span><i></i></h2>
  <dl class="spec" data-rv>
    <div class="row"><dt data-t="pp_s1">Materials</dt><dd data-t="pp_s1v">Polypropylene, HDPE, LDPE and engineered blends, selected for the contents rather than for the mould.</dd></div>
    <div class="row"><dt data-t="pp_s2">Neck finishes</dt><dd data-t="pp_s2v">Standard 18, 20, 24, 28 and 38 mm finishes, plus custom threads developed to your container.</dd></div>
    <div class="row"><dt data-t="pp_s3">Sealing</dt><dd data-t="pp_s3v">Linerless conical seals, induction and pressure-sensitive liners, and tamper-evident bands.</dd></div>
    <div class="row"><dt data-t="pp_s4">Decoration</dt><dd data-t="pp_s4v">In-mould texture, embossing, custom colour matching and printing for own-brand programmes.</dd></div>
    <div class="row"><dt data-t="pp_s5">Volumes</dt><dd data-t="pp_s5v">From pilot runs for validation through to continuous multi-cavity production.</dd></div>
  </dl>
  <p class="t" data-rv style="--d:80ms" data-t="pp_note">Cannot find the closure you need? Most of what we make began as a drawing that did not exist yet.</p>
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
        <li><span data-t="pi_b1b">Anti-drip geometry</span></li>
        <li><span data-t="pi_b1c">Wet-grip ribbing</span></li>
        <li><span data-t="pi_b1d">Tamper evidence</span></li>
      </ul>
    </div>
  </div>
  <div class="split rev" data-rv>
    <div class="sh"><img src="${IMG.hi_capmacro}" alt=""></div>
    <div>
      <div class="n" data-t="pi_n2">Aerosols</div>
      <h3 data-t="pi_t2">Personal care, home and industrial</h3>
      <p data-t="pi_p2">Pressurised contents leave no margin. Actuator and overcap have to match the valve exactly, hold their spray pattern, and protect against accidental discharge in transit.</p>
      <ul>
        <li><span data-t="pi_b2a">Valve compatibility</span></li>
        <li><span data-t="pi_b2b">Stable spray pattern</span></li>
        <li><span data-t="pi_b2c">Transit protection</span></li>
        <li><span data-t="pi_b2d">Lock positions</span></li>
      </ul>
    </div>
  </div>
  <div class="split" data-rv>
    <div class="sh"><img src="${IMG.hi_whitecap}" alt=""></div>
    <div>
      <div class="n" data-t="pi_n3">Chemicals</div>
      <h3 data-t="pi_t3">Industrial, specialty and agrochemicals</h3>
      <p data-t="pi_p3">Aggressive contents, long storage and strict transport rules. Here the seal is a safety component, and material choice carries more weight than styling.</p>
      <ul>
        <li><span data-t="pi_b3a">Chemical resistance</span></li>
        <li><span data-t="pi_b3b">Vapour-tight sealing</span></li>
        <li><span data-t="pi_b3c">Child-resistant options</span></li>
        <li><span data-t="pi_b3d">Transport compliance</span></li>
      </ul>
    </div>
  </div>
  <div class="split rev" data-rv>
    <div class="sh"><img src="${IMG.hi_colors}" alt=""></div>
    <div>
      <div class="n" data-t="pi_n4">Packaging</div>
      <h3 data-t="pi_t4">Food, beverage, pharma and more</h3>
      <p data-t="pi_p4">Contact compliance, hygiene and traceability come first. Every batch has to be documented, and every closure has to behave identically to the one before it.</p>
      <ul>
        <li><span data-t="pi_b4a">Food-contact materials</span></li>
        <li><span data-t="pi_b4b">Hygienic design</span></li>
        <li><span data-t="pi_b4c">Batch traceability</span></li>
        <li><span data-t="pi_b4d">Documented validation</span></li>
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
  <h1 data-rv style="--d:90ms" data-t="pc_h1">Design, tooling and moulding under one roof</h1>
  <p class="lede" data-rv style="--d:170ms" data-t="pc_lede">Keeping design, mould development and moulding in the same building shortens the loop between an idea and a part you can hold — and keeps responsibility in one place when something needs to change.</p>
  <div class="hr"></div>
</div></section>

<section class="psec"><div class="wrap">
  <h2 class="label" data-rv><span data-t="pc_sL">How a closure gets made</span><i></i></h2>
  <div class="steps" data-rv>
    <div class="stp"><div class="k">01</div><h4 data-t="pc_s1">Design and engineering</h4>
      <p data-t="pc_s1p">3D modelling and flow simulation, so shrinkage, warp and sealing force are understood before steel is cut.</p></div>
    <div class="stp"><div class="k">02</div><h4 data-t="pc_s2">Mould development</h4>
      <p data-t="pc_s2p">In-house tool design and build, from single-cavity prototypes to hardened multi-cavity production moulds.</p></div>
    <div class="stp"><div class="k">03</div><h4 data-t="pc_s3">Injection moulding</h4>
      <p data-t="pc_s3p">Controlled, repeatable cycles with monitored process parameters on every shot.</p></div>
    <div class="stp"><div class="k">04</div><h4 data-t="pc_s4">In-line inspection</h4>
      <p data-t="pc_s4p">Dimensional and visual checks during the run, not only at the end of it.</p></div>
    <div class="stp"><div class="k">05</div><h4 data-t="pc_s5">Assembly and decoration</h4>
      <p data-t="pc_s5p">Multi-part assembly, liner insertion, colour matching, texture and branding.</p></div>
    <div class="stp"><div class="k">06</div><h4 data-t="pc_s6">Packing and supply</h4>
      <p data-t="pc_s6p">Batch identification, protective packing and scheduled delivery against your production plan.</p></div>
  </div>
</div></section>

<section class="psec"><div class="wrap">
  <div class="split" data-rv>
    <div class="sh"><img src="${IMG.hi_mould}" alt=""></div>
    <div>
      <div class="n" data-t="pc_cn">Custom work</div>
      <h3 data-t="pc_ct">When the catalogue runs out</h3>
      <p data-t="pc_cp">Most custom projects begin the same way: an existing closure almost works. We start from what fails — a leak, a torque that is too high, a shape that will not run on your line — and design back from there.</p>
      <ul>
        <li><span data-t="pc_cb1">Reverse engineering</span></li>
        <li><span data-t="pc_cb2">Prototype tooling</span></li>
        <li><span data-t="pc_cb3">Material selection</span></li>
        <li><span data-t="pc_cb4">Line trials</span></li>
      </ul>
    </div>
  </div>
</div></section>`,

/* -------------------------------- QUALITY -------------------------------- */
quality: () => `
<section class="psec phero"><div class="wrap">
  <p class="eyebrow" data-rv><span data-t="pq_eb">Quality in every detail</span><i></i></p>
  <h1 data-rv style="--d:90ms" data-t="pq_h1">Built on quality</h1>
  <p class="lede" data-rv style="--d:170ms" data-t="pq_lede">A closure either seals every time or it does not seal at all. Our quality system exists to make the hundred-thousandth part behave exactly like the first.</p>
  <div class="hr"></div>
</div></section>

<section class="psec"><div class="wrap">
  <div class="split rev" data-rv>
    <div class="sh"><img src="${IMG.hi_navycap}" alt=""></div>
    <div>
      <div class="n" data-t="pq_n">Measurement</div>
      <h3 data-t="pq_t">Dimensional precision</h3>
      <p data-t="pq_p">Thread profile, sealing surface and band thickness are measured against the drawing throughout the run. Tolerances are checked on parts taken from production, not from a demonstration shot.</p>
      <ul>
        <li><span data-t="pq_b1">Sampling through the run</span></li>
        <li><span data-t="pq_b2">Documented tolerances</span></li>
        <li><span data-t="pq_b3">Cavity-level tracking</span></li>
        <li><span data-t="pq_b4">Batch records retained</span></li>
      </ul>
    </div>
  </div>
</div></section>

<section class="psec"><div class="wrap">
  <h2 class="label" data-rv><span data-t="pq_tL">What gets tested</span><i></i></h2>
  <div class="steps" data-rv>
    <div class="stp"><div class="k">01</div><h4 data-t="pq_x1">Seal integrity</h4>
      <p data-t="pq_x1p">Leak and vacuum testing on filled containers, in the position the pack will actually travel in.</p></div>
    <div class="stp"><div class="k">02</div><h4 data-t="pq_x2">Torque behaviour</h4>
      <p data-t="pq_x2p">Application and removal torque measured cold and after ageing, so the pack stays openable.</p></div>
    <div class="stp"><div class="k">03</div><h4 data-t="pq_x3">Drop and transit</h4>
      <p data-t="pq_x3p">Impact and vibration testing that reproduces handling, stacking and long-distance transport.</p></div>
    <div class="stp"><div class="k">04</div><h4 data-t="pq_x4">Material compliance</h4>
      <p data-t="pq_x4p">Resin certification and contact compliance documented for every batch we supply.</p></div>
    <div class="stp"><div class="k">05</div><h4 data-t="pq_x5">Chemical compatibility</h4>
      <p data-t="pq_x5p">Storage trials with your own contents, because a data sheet is not a guarantee.</p></div>
    <div class="stp"><div class="k">06</div><h4 data-t="pq_x6">Visual and colour</h4>
      <p data-t="pq_x6p">Surface, texture and colour checked against the approved reference sample.</p></div>
  </div>
</div></section>

<section class="psec"><div class="wrap">
  <h2 class="label" data-rv><span data-t="pq_cL">Our commitments</span><i></i></h2>
  <dl class="spec" data-rv>
    <div class="row"><dt data-t="pq_c1">Traceability</dt><dd data-t="pq_c1v">Every batch is identified back to resin lot, mould, cavity and production date.</dd></div>
    <div class="row"><dt data-t="pq_c2">Approved samples</dt><dd data-t="pq_c2v">Production is measured against a signed reference sample that both sides hold.</dd></div>
    <div class="row"><dt data-t="pq_c3">Change control</dt><dd data-t="pq_c3v">No change to material, tool or process reaches your line without written notice.</dd></div>
    <div class="row"><dt data-t="pq_c4">Corrective action</dt><dd data-t="pq_c4v">Issues are investigated to root cause, with the finding and the fix reported back to you.</dd></div>
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
    <div class="sh"><img src="${IMG.hi_bottles}" alt=""></div>
    <div>
      <div class="n" data-t="pa_sn">Our story</div>
      <h3 data-t="pa_st">Engineered for a cleaner, safer world</h3>
      <p data-t="pa_sp">NEWCAP engineers high-precision closures for detergents, aerosols, chemicals and packaged goods. We combine innovation, reliability and industrial expertise to help everyday products make a bigger positive impact — through better sealing, less waste and materials chosen with their whole life in mind.</p>
      <ul>
        <li><span data-t="pa_sb1">In-house design</span></li>
        <li><span data-t="pa_sb2">Own mould development</span></li>
        <li><span data-t="pa_sb3">Controlled production</span></li>
        <li><span data-t="pa_sb4">Global supply</span></li>
      </ul>
    </div>
  </div>
</div></section>

<section class="psec"><div class="wrap">
  <h2 class="label" data-rv><span data-t="pa_vL">What we stand for</span><i></i></h2>
  <div class="tiles" data-rv>
    <div class="tile"><div class="k" data-t="pa_v1k">Precision</div><h4 data-t="pa_v1">Tolerances are the product</h4>
      <p data-t="pa_v1p">A closure that is nearly right is wrong. We design, tool and measure so that the seal is repeatable across every cavity and every shift.</p></div>
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
  <p class="lede" data-rv style="--d:170ms" data-t="pr_lede">Everything you would normally have to ask for in an email — specifications, compliance documents and the questions buyers ask us most often.</p>
  <div class="hr"></div>
</div></section>

<section class="psec"><div class="wrap">
  <h2 class="label" data-rv><span data-t="pr_dL">Downloads</span><i></i></h2>
  <div class="tiles" data-rv>
    <a class="tile" href="${HREF('contact')}"><div class="k" data-t="pr_d1k">PDF</div><h4 data-t="pr_d1">Product catalogue</h4>
      <p data-t="pr_d1p">The full closure range with neck finishes, materials and available decoration options.</p></a>
    <a class="tile" href="${HREF('contact')}"><div class="k" data-t="pr_d2k">PDF</div><h4 data-t="pr_d2">Technical data sheets</h4>
      <p data-t="pr_d2p">Dimensional drawings, torque values and recommended capping parameters per family.</p></a>
    <a class="tile" href="${HREF('contact')}"><div class="k" data-t="pr_d3k">PDF</div><h4 data-t="pr_d3">Compliance documents</h4>
      <p data-t="pr_d3p">Material declarations and contact-compliance statements, issued per batch on request.</p></a>
  </div>
</div></section>

<section class="psec"><div class="wrap">
  <h2 class="label" data-rv><span data-t="pr_fL">Frequently asked</span><i></i></h2>
  <div class="acc" data-rv>
    <details><summary data-t="pr_q1">Do you make closures to our own design?</summary>
      <div class="a" data-t="pr_a1">Yes. Design, mould development and moulding are all in-house, so a custom closure can go from drawing to validated production without changing supplier midway.</div></details>
    <details><summary data-t="pr_q2">What is the minimum order quantity?</summary>
      <div class="a" data-t="pr_a2">It depends on the closure and whether tooling already exists. Standard items run from stock tooling at modest volumes; a fully custom part carries a tooling stage first. Tell us the annual volume and we will be specific.</div></details>
    <details><summary data-t="pr_q3">How long does a custom project take?</summary>
      <div class="a" data-t="pr_a3">Design and simulation usually take a few weeks, mould manufacture considerably longer, and validation depends on your own testing. We give a dated plan at the start rather than a single number.</div></details>
    <details><summary data-t="pr_q4">Can you match our existing container?</summary>
      <div class="a" data-t="pr_a4">Yes. Send a sample container or its drawing. We measure the neck finish ourselves rather than relying on the nominal size, because that is where most sealing problems begin.</div></details>
    <details><summary data-t="pr_q5">Which materials can you work with?</summary>
      <div class="a" data-t="pr_a5">Mainly polypropylene and polyethylene grades, plus engineered blends where chemical resistance or stiffness demands it. Material is chosen against your contents, not the other way round.</div></details>
    <details><summary data-t="pr_q6">Do you supply outside Iran?</summary>
      <div class="a" data-t="pr_a6">Yes, we supply export markets. Packing, documentation and delivery scheduling are arranged per programme — tell us the destination and we will set out what is involved.</div></details>
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
      <div class="fld"><label for="f_mail" data-t="pn_l3">Email</label><input id="f_mail" type="email" required></div>
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
      <button class="btn-o" type="submit"><span data-t="pn_send">Send enquiry</span>
        <svg class="ar" viewBox="0 0 16 10" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M0 5h13M9.6 1 14 5l-4.4 4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <p class="fmsg" id="ncFormMsg" data-t="pn_hint">This form opens your email client with the details filled in — nothing is sent or stored by this page.</p>
    </form>
    <aside class="info" data-rv style="--d:120ms">
      <h4 data-t="pn_iL">Direct contact</h4>
      <div class="it"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1.8 3.2a1.4 1.4 0 0 1 1.4-1.4h1.9l1.1 2.8-1.4 1a8 8 0 0 0 3.6 3.6l1-1.4 2.8 1.1v1.9a1.4 1.4 0 0 1-1.4 1.4A10.6 10.6 0 0 1 1.8 3.2Z" stroke-linejoin="round"/></svg>
        <div><b data-t="pn_i1">Telephone</b><span dir="ltr">+98 21 0000 0000</span></div></div>
      <div class="it"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1.4" y="2.8" width="11.2" height="8.4" rx="1.2"/><path d="m1.8 3.6 5.2 3.6 5.2-3.6"/></svg>
        <div><b data-t="pn_i2">Email</b><span dir="ltr">info@newcap.ir</span></div></div>
      <div class="it"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="5.6"/><path d="M1.4 7h11.2M7 1.4a11 11 0 0 1 0 11.2A11 11 0 0 1 7 1.4Z"/></svg>
        <div><b data-t="pn_i3">Web</b><span dir="ltr">www.newcap.ir</span></div></div>
      <div class="it"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 12.6s4.4-3.9 4.4-7a4.4 4.4 0 0 0-8.8 0c0 3.1 4.4 7 4.4 7Z" stroke-linejoin="round"/><circle cx="7" cy="5.5" r="1.6"/></svg>
        <div><b data-t="pn_i4">Address</b><span data-t="pn_i4v">Your address line here<br>City, Country</span></div></div>
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
const HREF = k => (window.__BOOT__ ? ((window.__BOOT__.lang==='en'?'':'/'+window.__BOOT__.lang) + (k ? '/'+k : '/')) : '#/'+k);
const plain = h => String(h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const langPath = (l, key) => (l === 'en' ? '' : '/' + l) + (key ? '/' + key : '/');
const absUrl   = (l, key) => SITE + langPath(l, key);
const set = (id, attr, val) => { const e = document.getElementById(id); if (e) e.setAttribute(attr, val); };

function updateSEO(key, l){
  const d = DICTS[l] || EN, meta = LANG_META[l] || LANG_META.en;
  const m = ROUTE_META[key] || ROUTE_META[''];
  const isHome = !key;
  const name = plain(d[m[0]]);
  const title = isHome ? meta.title : name + ' | NEWCAP';
  const desc = plain(d[m[1]]).slice(0, 300);
  document.title = title;
  set('mDesc','content',desc);
  set('mOgT','content',title); set('mOgD','content',desc);
  set('mOgI','content', SITE ? SITE + '/og.png' : '');
  if (SITE) {
    set('mCanon','href', absUrl(l,key)); set('mOgU','content', absUrl(l,key));
    set('hrEn','href', absUrl('en',key)); set('hrFa','href', absUrl('fa',key));
    set('hrTr','href', absUrl('tr',key)); set('hrX','href', absUrl('en',key));
  }
  const org = {
    "@type":"Organization", "@id": (SITE || 'https://newcap.ir') + '/#org',
    name:"NEWCAP", url: SITE || 'https://newcap.ir',
    logo: SITE ? SITE + '/favicon-512.png' : undefined,
    description: plain(d.heroLede),
    email:"info@newcap.ir", telephone:"+98 21 0000 0000",
    industry:"Plastic closure manufacturing"
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
  document.querySelectorAll('.hdr nav a, .ftr nav a').forEach(a => {
    a.classList.toggle('on', a.getAttribute('href') === '#/' + key);
  });
}
function initForm(scope){
  const f = scope.querySelector('#ncForm');
  if (!f) return;
  f.addEventListener('submit', e => {
    e.preventDefault();
    const v = id => (scope.querySelector('#' + id) || {}).value || '';
    const msg = scope.querySelector('#ncFormMsg');
    if (!v('f_name').trim() || !v('f_mail').trim() || !v('f_msg').trim()) {
      msg.textContent = { fa:'لطفاً نام، ایمیل و توضیح کوتاهی از محصولتان را وارد کنید.',
        tr:'Lütfen adınızı, e-postanızı ve kısa bir açıklama girin.',
        en:'Please fill in your name, email and a short description.' }[lang];
      return;
    }
    const body = [
      'Name: ' + v('f_name'), 'Company: ' + v('f_co'),
      'Email: ' + v('f_mail'), 'Phone: ' + v('f_tel'),
      'Enquiry: ' + v('f_sub'), '', v('f_msg')
    ].join('\n');
    location.href = 'mailto:info@newcap.ir?subject=' +
      encodeURIComponent('NEWCAP enquiry — ' + v('f_sub')) +
      '&body=' + encodeURIComponent(body);
    msg.textContent = { fa:'ایمیل شما با همین اطلاعات آمادهٔ ارسال شد.',
      tr:'E-posta uygulamanız bilgiler doldurulmuş hâlde açılmış olmalı.',
      en:'Your email client should now be open with the details filled in.' }[lang];
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
}
if (!BOOT) addEventListener('hashchange', route);
route();

/* ------------------------ search ------------------------ */
const INDEX = [
  {k:'pt1', s:'ps1', href:'#/products'}, {k:'pt2', s:'ps2', href:'#/products'},
  {k:'pt3', s:'ps3', href:'#/products'}, {k:'pt4', s:'ps4', href:'#/products'},
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
qEl.addEventListener('input', e => render(e.target.value));
res.addEventListener('click', e => { if (e.target.closest('a')) closeSheet(); });
sheet.addEventListener('click', e => { if (e.target === sheet) closeSheet(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
