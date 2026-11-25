/* ============================================================
   data.js — داده‌های نمایشی سایت و چند تابع کمکی مشترک
   (همه خبرها، نتیجه بازی‌ها، جدول‌ها و عکس‌ها ساختگی‌اند)
   اگر خواستی خبر یا جدول را عوض کنی، فقط همین فایل را ویرایش کن.
   ============================================================ */

/* دسته‌ها: key در آدرس صفحه (?cat=football) و صفت data-sport استفاده می‌شود */
var CATS = [
  { key: 'all',        label: 'همه' },
  { key: 'football',   label: 'فوتبال' },
  { key: 'basketball', label: 'بسکتبال' },
  { key: 'volleyball', label: 'والیبال' },
  { key: 'wrestling',  label: 'کشتی' },
  { key: 'world',      label: 'جهانی' }
];

/* عکس‌ها: فایل داخل پوشه images و متن جایگزین (alt) برای دسترس‌پذیری */
var PHOTOS = {
  goal:   { src: 'images/football-goal.jpg', alt: 'بازیکنان با لباس مشکی پس از گل جشن می‌گیرند و بالای استادیوم آتش‌بازی دیده می‌شود' },
  duel:   { src: 'images/football-duel.jpg', alt: 'چند بازیکن فوتبال در یک درگیری سخت روی توپ' },
  basket: { src: 'images/basketball.jpg',    alt: 'بازیکن بسکتبال در حال دانک کردن توپ در سالن پرجمعیت' },
  volley: { src: 'images/volleyball.jpg',    alt: 'اسپک یک بازیکن والیبال و بلاک دو بازیکن حریف کنار تور' },
  wrest:  { src: 'images/wrestling.jpg',     alt: 'دو کشتی‌گیر روبه‌روی هم در آغاز درگیری روی تشک' },
  world:  { src: 'images/world.jpg',         alt: 'توپ فوتبال روی چمن یک استادیوم شبانه با پرچم کشورها' }
};

/* خبرها: views تعداد بازدید است و برای «پربازدیدترین‌ها» استفاده می‌شود */
var NEWS = [
  { id: 1,  cat: 'football',   photo: 'goal',   time: '۱۰ دقیقه پیش', views: 15200, title: 'شهاب تهران با گل دقیقه آخر صدرنشین شد' },
  { id: 2,  cat: 'basketball', photo: 'basket', time: '۳۰ دقیقه پیش', views: 9800,  title: 'پیروزی پرگل تیم ملی در بازی دوستانه' },
  { id: 3,  cat: 'volleyball', photo: 'volley', time: '۱ ساعت پیش',   views: 7400,  title: 'سرمربی تیم جوانان فهرست نهایی را اعلام کرد' },
  { id: 4,  cat: 'wrestling',  photo: 'wrest',  time: '۲ ساعت پیش',   views: 11300, title: 'دو طلا در روز نخست مسابقات قهرمانی' },
  { id: 5,  cat: 'world',      photo: 'world',  time: '۳ ساعت پیش',   views: 13900, title: 'قرعه‌کشی مرحله گروهی انجام شد' },
  { id: 6,  cat: 'football',   photo: 'duel',   time: '۴ ساعت پیش',   views: 12100, title: 'مصدومیت مهاجم ستاره؛ غیبت دو هفته‌ای' },
  { id: 7,  cat: 'basketball', photo: 'basket', time: '۵ ساعت پیش',   views: 6100,  title: 'بازگشت مربی سابق به نیمکت تیم پایتخت' },
  { id: 8,  cat: 'volleyball', photo: 'volley', time: 'دیروز',         views: 5200,  title: 'لیگ ملی: برتری در ست پنجم' },
  { id: 9,  cat: 'football',   photo: 'duel',   time: '۶ ساعت پیش',   views: 8700,  title: 'هتریک مهاجم جوان در دربی شهر' },
  { id: 10, cat: 'football',   photo: 'goal',   time: 'دیروز',         views: 6900,  title: 'سرمربی: هدف ما قهرمانی در نیم‌فصل است' },
  { id: 11, cat: 'basketball', photo: 'basket', time: '۶ ساعت پیش',   views: 8300,  title: 'پرتاب سه‌امتیازی ثانیه آخر بازی را به وقت اضافه کشاند' },
  { id: 12, cat: 'volleyball', photo: 'volley', time: 'دیروز',         views: 6600,  title: 'سرویس‌های برنده تیم میزبان را به فینال رساند' },
  { id: 13, cat: 'wrestling',  photo: 'wrest',  time: '۵ ساعت پیش',   views: 9100,  title: 'کشتی‌گیر جوان در وزن ۵۳ کیلوگرم فینالیست شد' },
  { id: 14, cat: 'wrestling',  photo: 'wrest',  time: 'دیروز',         views: 5800,  title: 'اردوی تیم ملی کشتی از هفته آینده آغاز می‌شود' },
  { id: 15, cat: 'world',      photo: 'world',  time: '۶ ساعت پیش',   views: 10400, title: 'برنامه کامل بازی‌های مرحله حذفی اعلام شد' },
  { id: 16, cat: 'world',      photo: 'world',  time: 'دیروز',         views: 7700,  title: 'ورزشگاه میزبان فینال برای پذیرش تماشاگران آماده شد' }
];

/* نتایج امروز (نوار بالای صفحه خانه). status: end | live | soon */
var MATCHES = [
  { home: 'شهاب تهران', away: 'دریای شمال', score: '۲ - ۱',  status: 'end',  label: 'پایان' },
  { home: 'ستاره جنوب', away: 'آذرگان',     score: '۰ - ۰',  status: 'live', label: 'زنده' },
  { home: 'کوهستان',    away: 'فولاد شرق',  score: '۱ - ۳',  status: 'end',  label: 'پایان' },
  { home: 'پارس',       away: 'نسیم',       score: '۱۹:۳۰', status: 'soon', label: 'به‌زودی' }
];

/* جدول ستون کناری برای هر ورزش: با تغییر دسته، عنوان، ستون‌ها و ردیف‌ها عوض می‌شود */
var TABLES = {
  all:        { title: 'جدول لیگ نمایشی', cols: ['بازی', 'امتیاز'],
                rows: [['شهاب تهران', 10, 24], ['دریای شمال', 10, 22], ['فولاد شرق', 10, 19], ['ستاره جنوب', 10, 17], ['آذرگان', 10, 15]] },
  football:   { title: 'جدول لیگ فوتبال', cols: ['بازی', 'امتیاز'],
                rows: [['شهاب تهران', 10, 24], ['دریای شمال', 10, 22], ['فولاد شرق', 10, 19], ['ستاره جنوب', 10, 17], ['آذرگان', 10, 15]] },
  basketball: { title: 'جدول لیگ بسکتبال', cols: ['برد', 'باخت'],
                rows: [['ققنوس پایتخت', 12, 3], ['پلنگ‌های شمال', 11, 4], ['آتش جنوب', 9, 6], ['سیمرغ', 7, 8], ['کوهستان', 4, 11]] },
  volleyball: { title: 'جدول لیگ والیبال', cols: ['برد', 'امتیاز'],
                rows: [['راد غرب', 11, 31], ['ستاره خزر', 10, 28], ['پیام مرکز', 8, 23], ['دلفین', 6, 18], ['ققنوس شرق', 3, 10]] },
  wrestling:  { title: 'رده‌بندی تیمی کشتی', cols: ['طلا', 'امتیاز'],
                rows: [['دماوند', 4, 142], ['زاگرس', 3, 128], ['سبلان', 2, 117], ['کارون', 2, 96], ['خزر', 1, 74]] },
  world:      { title: 'جدول گروه‌های جام نمایشی', cols: ['بازی', 'امتیاز'],
                rows: [['سرزمین شمال', 3, 7], ['دشت سبز', 3, 5], ['ساحل آبی', 3, 4], ['کوه برفی', 3, 3], ['صحرای طلایی', 3, 1]] }
};

/* ---------- توابع کمکی ---------- */
function fa(n) { return String(n).replace(/\d/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'[d]; }); }
function faBig(n) { return fa(String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '٬')); }   // ۱۵٬۲۰۰
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function validCat(k) { return CATS.some(function (c) { return c.key === k; }) ? k : 'all'; }
function catLabel(k) { return CATS.filter(function (c) { return c.key === k; })[0].label; }
function newsByCat(k) { return NEWS.filter(function (n) { return k === 'all' || n.cat === k; }); }
function newsById(id) { return NEWS.filter(function (n) { return n.id === id; })[0]; }
function newsUrl(n) { return 'news.html?id=' + n.id; }

/* کارت خبر؛ هم در صفحه خانه و هم در «خبرهای مرتبط» استفاده می‌شود */
function newsCard(n) {
  var p = PHOTOS[n.photo];
  return '<li><article>' +
    '<a href="' + newsUrl(n) + '" tabindex="-1" aria-hidden="true"><img src="' + p.src + '" alt="" loading="lazy" width="250" height="150"></a>' +
    '<div class="b"><span class="meta">' + catLabel(n.cat) + ' · ' + n.time + '</span>' +
    '<h3><a href="' + newsUrl(n) + '">' + esc(n.title) + '</a></h3></div></article></li>';
}
