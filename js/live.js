/* ============================================================
   live.js — پخش زنده شبیه‌سازی‌شده (live.html)
   هر ۷۰۰ میلی‌ثانیه یک دقیقه از بازی جلو می‌رود.
   ============================================================ */
(function () {
  Layout.init('football', '');
  var $ = function (i) { return document.getElementById(i); };

  var TEAMS = { h: 'ستاره جنوب', a: 'آذرگان' };
  /* رویدادها: [دقیقه، نوع، توضیح، تیم (h/a/خالی)] */
  var EV = [
    [12, 'گل', 'ضربه سر پس از کرنر؛ ستاره جنوب پیش افتاد', 'h'],
    [23, 'کارت زرد', 'هافبک آذرگان اخطار گرفت', 'a'],
    [38, 'گل', 'ضربه ایستگاهی؛ آذرگان به تساوی رسید', 'a'],
    [45, 'پایان نیمه اول', 'دو تیم برای استراحت به رختکن رفتند', ''],
    [58, 'تعویض', 'ستاره جنوب مهاجم خود را عوض کرد', 'h'],
    [71, 'گل', 'ضربه پنالتی؛ ستاره جنوب دوباره پیش افتاد', 'h'],
    [84, 'کارت قرمز', 'بازیکن آذرگان از زمین اخراج شد', 'a'],
    [90, 'پایان بازی', 'ستاره جنوب با نتیجه ۲ - ۱ برنده شد', '']
  ];

  var S, timer = null;
  function reset() { S = { min: 0, hs: 0, as: 0, ev: [], hold: 0, done: false, paused: false }; }
  reset();

  function row(label, h, a, pct) {
    return '<li><div class="r"><b>' + fa(h) + '</b><span>' + label + '</span><b>' + fa(a) + '</b></div>' +
           '<div class="track"><div class="fill" style="width:' + pct + '%"></div></div></li>';
  }

  function render(announce) {
    $('hs').textContent = fa(S.hs); $('as').textContent = fa(S.as);
    var b = $('lstat');
    b.textContent = S.done ? 'پایان بازی' : (S.hold ? 'پایان نیمه اول' : '● زنده');
    b.className = 'badge' + (S.done ? ' end' : '');
    $('lmin').textContent = 'دقیقه ' + fa(S.done ? 90 : S.min);

    $('tl').innerHTML = S.ev.length ? S.ev.map(function (e) {
      return '<li><span class="m">' + fa(e[0]) + '′</span><span><b>' + e[1] + '</b>' + (e[3] ? ' · ' + TEAMS[e[3]] : '') +
             '<br><span class="meta">' + e[2] + '</span></span></li>';
    }).join('') : '<li class="empty">هنوز رویدادی ثبت نشده است.</li>';

    var m = S.min, ph = 50 + Math.round(6 * Math.sin(m / 9));
    var sh = Math.floor(m / 9) + S.hs, sa = Math.floor(m / 12) + S.as, ch = Math.floor(m / 15), ca = Math.floor(m / 18);
    $('stl').innerHTML = row('مالکیت توپ ٪', ph, 100 - ph, ph) +
      row('شوت', sh, sa, sh + sa ? sh / (sh + sa) * 100 : 50) +
      row('کرنر', ch, ca, ch + ca ? ch / (ch + ca) * 100 : 50);
    if (announce) $('lannounce').textContent = announce;
  }

  function tick() {
    if (S.paused || S.done) return;
    if (S.hold > 0) { S.hold--; render(); return; }
    S.min++;
    var ann = '';
    EV.forEach(function (e) {
      if (e[0] === S.min) {
        S.ev.unshift(e);
        if (e[1] === 'گل') { if (e[3] === 'h') S.hs++; else S.as++; ann = 'گل! ' + TEAMS[e[3]] + '، نتیجه ' + fa(S.hs) + ' بر ' + fa(S.as); }
      }
    });
    if (S.min === 45) S.hold = 4;
    if (S.min >= 90) { S.done = true; stop(); }
    render(ann);
  }
  function start() { if (!timer && !S.done) timer = setInterval(tick, 700); render(); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  $('lpause').onclick = function () {
    S.paused = !S.paused;
    this.setAttribute('aria-pressed', String(S.paused));
    this.textContent = S.paused ? 'ادامه به‌روزرسانی' : 'توقف به‌روزرسانی';
  };
  $('lrestart').onclick = function () {
    stop(); reset();
    $('lpause').setAttribute('aria-pressed', 'false'); $('lpause').textContent = 'توقف به‌روزرسانی';
    $('lannounce').textContent = ''; start();
  };
  start();
})();
