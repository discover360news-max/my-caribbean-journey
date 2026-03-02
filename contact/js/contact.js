/* ===========================================
   Contact Form — GAS submission
   Replace GAS_URL with your deployed Web App URL
   =========================================== */

var GAS_URL = 'PASTE_YOUR_GAS_URL_HERE';

(function () {
  var form    = document.getElementById('contact-form');
  var success = document.getElementById('contact-success');
  var submit  = document.getElementById('contact-submit');

  var fields = {
    name:    { el: document.getElementById('contact-name'),    err: document.getElementById('error-name') },
    email:   { el: document.getElementById('contact-email'),   err: document.getElementById('error-email') },
    message: { el: document.getElementById('contact-message'), err: document.getElementById('error-message') }
  };

  var formErr = document.getElementById('error-form');

  function clearErrors() {
    Object.values(fields).forEach(function (f) { f.err.textContent = ''; });
    formErr.textContent = '';
  }

  function validate() {
    var ok = true;

    if (!fields.name.el.value.trim()) {
      fields.name.err.textContent = 'Please enter your name.';
      ok = false;
    }

    var email = fields.email.el.value.trim();
    if (!email) {
      fields.email.err.textContent = 'Please enter your email address.';
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fields.email.err.textContent = 'Please enter a valid email address.';
      ok = false;
    }

    if (!fields.message.el.value.trim()) {
      fields.message.err.textContent = 'Please enter a message.';
      ok = false;
    }

    return ok;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    if (!validate()) return;

    // Block double-submit
    submit.disabled = true;
    submit.textContent = 'Sending…';

    var payload = JSON.stringify({
      name:    fields.name.el.value.trim(),
      email:   fields.email.el.value.trim(),
      message: fields.message.el.value.trim()
    });

    // GAS Web Apps require no-cors — we can't read the response body,
    // but the POST goes through and the email is sent.
    fetch(GAS_URL, {
      method:  'POST',
      mode:    'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body:    payload
    })
    .then(function () {
      // no-cors means response.type === 'opaque' — treat arrival as success
      showSuccess();
    })
    .catch(function () {
      submit.disabled = false;
      submit.textContent = 'Send Message';
      formErr.textContent = 'Something went wrong. Please try emailing directly at booksbyquincy@gmail.com';
    });
  });

  function showSuccess() {
    document.getElementById('contact-form-wrap').querySelector('.contact-form').hidden = true;
    success.hidden = false;
  }
})();
