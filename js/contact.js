/* ============================================================
   contact.js — صفحه تماس (contact.html)
   پیام به‌صورت واقعی با سرویس رایگان FormSubmit به ایمیل ارسال می‌شود.
   اولین بار که پیامی بفرستی، FormSubmit یک ایمیل «فعال‌سازی» به
   همین آدرس می‌فرستد؛ روی لینک آن کلیک کن (پوشه Spam را هم ببین).
   ترتیب ارسال: ۱) روش AJAX (بدون ترک صفحه)  ۲) اگر نشد، ارسال معمولی فرم
   ۳) اگر اینترنت نبود، باز شدن برنامه ایمیل کاربر.
   ============================================================ */
Layout.init('all', '');

var MAIL_TO = 'smmmahdavi9@gmail.com';

(function () {
  var form = document.getElementById('cform'), status = document.getElementById('cstat');
  var nameEl = document.getElementById('cname'), emailEl = document.getElementById('cemail'), msgEl = document.getElementById('cmsg'), btn = document.getElementById('csend');

  /* آدرس بازگشت بعد از ارسال معمولی فرم (فقط روی http/https کار می‌کند) */
  if (/^https?:/.test(location.protocol)) document.getElementById('cnext').value = location.origin + location.pathname + '?sent=1';
  if (location.search.indexOf('sent=1') > -1) status.textContent = 'پیام شما ارسال شد. ممنون!';

  function mailtoFallback(n, m) {   // اگر ارسال مستقیم نشد، برنامه ایمیل کاربر باز می‌شود
    location.href = 'mailto:' + MAIL_TO + '?subject=' + encodeURIComponent('پیام از ArenaPlus - ' + n) + '&body=' + encodeURIComponent(m);
  }

  form.onsubmit = function (e) {
    e.preventDefault();
    var n = nameEl.value.trim(), em = emailEl.value.trim(), m = msgEl.value.trim();
    if (!n || !m) { status.textContent = 'نام و پیام را بنویسید.'; return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) {
      emailEl.setAttribute('aria-invalid', 'true');
      status.textContent = 'ایمیل خود را درست بنویسید تا بتوانیم جواب بدهیم.';
      emailEl.focus(); return;
    }
    emailEl.removeAttribute('aria-invalid');
    btn.disabled = true; status.textContent = 'در حال ارسال پیام…';

    fetch('https://formsubmit.co/ajax/' + MAIL_TO, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name: n, email: em, message: m, _subject: 'پیام جدید از سایت ArenaPlus', _template: 'table', _captcha: 'false' })
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        btn.disabled = false;
        if (d && (d.success === true || d.success === 'true')) { status.textContent = 'پیام شما ارسال شد. ممنون!'; form.reset(); }
        else { throw new Error('send failed'); }
      })
      .catch(function () {
        btn.disabled = false;
        if (navigator.onLine && /^https?:/.test(location.protocol)) {
          status.textContent = 'در حال ارسال با روش دوم…';
          form.submit();                      // ارسال معمولی فرم به FormSubmit
        } else {
          status.textContent = 'ارسال مستقیم ممکن نشد؛ برنامه ایمیل شما باز می‌شود. اگر باز نشد، مستقیم به ' + MAIL_TO + ' بنویسید.';
          mailtoFallback(n, m);
        }
      });
  };
})();