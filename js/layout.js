/* ============================================================
   layout.js — هدر، منوی دسته‌ها، فوتر و تنظیم‌های ظاهر (همه صفحه‌ها)
   هر صفحه با Layout.init(...) این بخش‌ها را می‌سازد.
   ============================================================ */
var Layout = (function () {
  var root = document.documentElement;

  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  /* تم هر ورزش: فقط صفت data-sport را عوض می‌کنیم و themes.css رنگ‌ها را می‌دهد */
  function applySport(key) { root.dataset.sport = key || 'all'; }

  function headerHtml(activeCat) {
    var links = CATS.map(function (c) {
      var href = c.key === 'all' ? 'index.html' : 'index.html?cat=' + c.key;
      var cur = (c.key === activeCat) ? ' aria-current="page"' : '';
      return '<li><a href="' + href + '"' + cur + '>' + c.label + '</a></li>';
    }).join('');
    return '<header class="top"><div class="wrap bar">' +
      '<a class="logo" href="index.html" lang="en" dir="ltr">ArenaPlus</a>' +
      '<form class="search" role="search" action="index.html" method="get">' +
        '<label class="sr" for="q">جستجو در خبرها</label>' +
        '<input id="q" name="q" type="search" placeholder="جستجوی خبر…" autocomplete="off">' +
        '<button type="submit">جستجو</button></form>' +
      '<a class="hlink" href="about.html">درباره ما</a>' +
      '<button type="button" id="fplus" aria-label="بزرگ‌تر کردن متن">+A</button>' +
      '<button type="button" id="fminus" aria-label="کوچک‌تر کردن متن">−A</button>' +
      '<button type="button" id="theme" aria-pressed="false">حالت تیره</button>' +
      '</div></header>' +
      '<nav class="cats" aria-label="دسته‌بندی خبرها"><ul>' + links + '</ul></nav>';
  }

  function footerHtml() {
    return '<footer><div class="wrap">' +
      '<nav aria-label="پیوندهای پایین صفحه"><ul>' +
      '<li><a href="about.html">درباره ما</a></li>' +
      '<li><a href="contact.html">تماس</a></li>' +
      '<li><a href="rules.html">قوانین</a></li></ul></nav>' +
      '<p class="meta">پروژه درس آزمایشگاه طراحی واسط کاربری · محتوای سایت نمایشی و ساختگی است.</p>' +
      '</div></footer>';
  }

  function wireControls() {
    var size = parseInt(load('fs'), 10) || 100;
    function setSize(d) { size = Math.min(150, Math.max(80, size + d)); root.style.setProperty('--fs', size + '%'); save('fs', size); }
    root.style.setProperty('--fs', size + '%');
    document.getElementById('fplus').onclick = function () { setSize(10); };
    document.getElementById('fminus').onclick = function () { setSize(-10); };

    var btn = document.getElementById('theme');
    function setTheme(dark) {
      root.dataset.theme = dark ? 'dark' : 'light';
      btn.setAttribute('aria-pressed', String(dark));
      btn.textContent = dark ? 'حالت روشن' : 'حالت تیره';
      save('theme', dark ? 'dark' : 'light');
    }
    var saved = load('theme');
    if (saved) setTheme(saved === 'dark');
    btn.onclick = function () { setTheme(root.dataset.theme !== 'dark'); };
  }

  /* sport: تم رنگی صفحه | activeCat: دسته‌ای که در منو انتخاب‌شده (فقط صفحه خانه) */
  function init(sport, activeCat) {
    applySport(sport);
    document.getElementById('site-header').innerHTML = headerHtml(activeCat);
    document.getElementById('site-footer').innerHTML = footerHtml();
    wireControls();
  }

  return { init: init, applySport: applySport };
})();
