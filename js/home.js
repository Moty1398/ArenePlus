/* ============================================================
   home.js — صفحه خانه (index.html)
   آدرس‌ها: index.html | index.html?cat=football | index.html?q=گل
   ============================================================ */
(function () {
  var params = new URLSearchParams(location.search);
  var cat = validCat(params.get('cat'));      // دسته انتخاب‌شده
  var term = (params.get('q') || '').trim();  // عبارت جستجو

  Layout.init(cat, cat);                      // تم رنگی + هدر و فوتر
  if (term) document.getElementById('q').value = term;
  document.title = 'ArenaPlus | ' + (cat === 'all' ? 'اخبار و نتایج زنده ورزشی' : 'اخبار ' + catLabel(cat));

  /* ۱. نوار نتایج امروز */
  document.getElementById('scores').innerHTML = MATCHES.map(function (m) {
    var badge = '<span class="badge' + (m.status === 'end' ? ' end' : '') + '">' + (m.status === 'live' ? '● ' : '') + m.label + '</span>';
    return '<li class="match"><a href="live.html"><b><span>' + m.home + '</span><span>' + m.score + '</span></b>' +
           '<b><span>' + m.away + '</span>' + badge + '</b></a></li>';
  }).join('');

  /* ۲. خبر ویژه: اولین خبر همان دسته */
  var hero = newsByCat(cat)[0] || NEWS[0], hp = PHOTOS[hero.photo];
  document.getElementById('hero').innerHTML =
    '<img src="' + hp.src + '" alt="' + hp.alt + '">' +
    '<div class="t"><h2><a href="' + newsUrl(hero) + '">' + esc(hero.title) + '</a></h2><p>' + catLabel(hero.cat) + ' · ' + hero.time + '</p></div>';

  /* ۳. فهرست خبرها با فیلتر دسته و جستجو */
  var list = newsByCat(cat).filter(function (n) { return !term || n.title.indexOf(term) > -1; });
  document.getElementById('count').textContent = list.length ? fa(list.length) + ' خبر' + (term ? ' برای «' + term + '»' : '') : '';
  document.getElementById('news').innerHTML = list.length ? list.map(newsCard).join('') :
    '<li class="empty">خبری برای «' + esc(term || catLabel(cat)) + '» پیدا نشد. عبارت کوتاه‌تری بنویسید یا دسته «همه» را انتخاب کنید.</li>';

  /* ۴. جدول لیگ: با هر ورزش عنوان، ستون‌ها و ردیف‌ها فرق می‌کند */
  var t = TABLES[cat];
  document.getElementById('lt').textContent = t.title;
  document.getElementById('thead').innerHTML =
    '<tr><th scope="col">#</th><th scope="col">تیم</th><th scope="col">' + t.cols[0] + '</th><th scope="col">' + t.cols[1] + '</th></tr>';
  document.getElementById('table').innerHTML = t.rows.map(function (r, i) {
    return '<tr><td>' + fa(i + 1) + '</td><th scope="row" style="font-weight:400">' + r[0] + '</th><td>' + fa(r[1]) + '</td><td>' + fa(r[2]) + '</td></tr>';
  }).join('');

  /* ۵. پربازدیدترین‌ها: فقط خبرهای همان دسته، مرتب‌شده بر اساس بازدید */
  document.getElementById('rt').textContent = cat === 'all' ? 'پربازدیدترین‌ها' : 'پربازدیدترین‌های ' + catLabel(cat);
  document.getElementById('read').innerHTML = newsByCat(cat).slice().sort(function (a, b) { return b.views - a.views; }).slice(0, 5)
    .map(function (n) { return '<li><a href="' + newsUrl(n) + '">' + esc(n.title) + '</a><br><span class="meta">' + faBig(n.views) + ' بازدید</span></li>'; }).join('');
})();
