/* ============================================================
   news.js — صفحه جزئیات خبر (news.html?id=3)
   ============================================================ */
(function () {
  var id = parseInt(new URLSearchParams(location.search).get('id'), 10);
  var n = newsById(id);
  var main = document.getElementById('main');

  if (!n) {                                   // شماره خبر نامعتبر
    Layout.init('all', '');
    document.title = 'خبر پیدا نشد | ArenaPlus';
    main.innerHTML = '<a class="back" href="index.html">بازگشت به خانه</a><h1>خبر پیدا نشد</h1>' +
      '<p class="t">آدرس خبر درست نیست. از صفحه خانه یکی از خبرها را انتخاب کنید.</p>';
    return;
  }

  Layout.init(n.cat, '');                     // تم رنگی همان ورزش
  document.title = n.title + ' | ArenaPlus';
  var p = PHOTOS[n.photo];

  document.getElementById('am').textContent = catLabel(n.cat) + ' · ' + n.time;
  document.getElementById('at').textContent = n.title;
  document.getElementById('aimg').src = p.src;
  document.getElementById('aimg').alt = p.alt;
  document.getElementById('acap').textContent = catLabel(n.cat);
  document.getElementById('abody').innerHTML = [
    'به گزارش ArenaPlus، «' + esc(n.title) + '». جزئیات این رویداد در ساعات گذشته منتشر شده است.',
    'کارشناسان می‌گویند نتیجه این رویداد در ادامه فصل اثر مستقیم خواهد داشت و هواداران منتظر اعلام برنامه‌های بعدی هستند.',
    'این متن فقط برای نمایش ساختار صفحه جزئیات خبر نوشته شده و واقعی نیست.'
  ].map(function (t) { return '<p class="t">' + t + '</p>'; }).join('');

  /* خبرهای مرتبط: اول هم‌دسته‌ها، بعد بقیه (حداکثر ۳ خبر) */
  var rel = NEWS.filter(function (x) { return x.id !== n.id && x.cat === n.cat; });
  NEWS.forEach(function (x) { if (x.id !== n.id && rel.indexOf(x) < 0) rel.push(x); });
  document.getElementById('rel').innerHTML = rel.slice(0, 3).map(newsCard).join('');

  /* دکمه کپی پیوند */
  document.getElementById('share').onclick = function () {
    var msg = document.getElementById('smsg');
    function ok() { msg.textContent = 'پیوند کپی شد.'; }
    function no() { msg.textContent = 'کپی نشد؛ پیوند را از نوار آدرس بردارید.'; }
    try { navigator.clipboard.writeText(location.href).then(ok, no); } catch (e) { no(); }
  };
})();
