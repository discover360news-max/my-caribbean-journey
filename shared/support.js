// ===========================================
// MY CARIBBEAN JOURNEY - Support Float
// Buy me a coffee floating button
// Island-aware: "tobago" in URL → Blue Food
// Included only on blog post pages
// ===========================================

(function () {
  'use strict';

  var BMC_URL = 'https://buymeacoffee.com/mycaribbeanjourney';

  function isTobagoPage() {
    return window.location.pathname.toLowerCase().indexOf('tobago') !== -1;
  }

  function init() {
    var isTobago = isTobagoPage();

    var btn = document.createElement('a');
    btn.href = BMC_URL;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.className = 'support-float';
    btn.setAttribute('aria-label', isTobago
      ? 'Support My Caribbean Journey — Buy me some Blue Food'
      : 'Support My Caribbean Journey — Buy me a coffee'
    );

    if (isTobago) {
      btn.innerHTML =
        '<span class="support-float-icon">&#9749;</span>' +
        '<span class="support-float-text">' +
          '<span class="support-float-main">Buy me some Blue Food</span>' +
          '<span class="support-float-sub">via Buy me a coffee</span>' +
        '</span>';
    } else {
      btn.innerHTML =
        '<span class="support-float-icon">&#9749;</span>' +
        '<span class="support-float-main">Buy me a coffee</span>';
    }

    document.body.appendChild(btn);

    setTimeout(function () {
      btn.classList.add('support-float--visible');
    }, 4000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
