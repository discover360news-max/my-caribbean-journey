// ===========================================
// I AM TOBAGO - Store Locator
// ===========================================

(function () {
  'use strict';

  var toggle          = document.getElementById('stores-toggle');
  var content         = document.getElementById('stores-content');
  var filtersEl       = document.getElementById('stores-filters');
  var gridEl          = document.getElementById('stores-grid');
  var activeNation    = 'all';

  if (!toggle || !content || !filtersEl || !gridEl) return;

  // --- Toggle expand / collapse ---
  toggle.addEventListener('click', function () {
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    if (expanded) {
      content.setAttribute('hidden', '');
    } else {
      content.removeAttribute('hidden');
    }
  });

  // --- Helper: get nation object by id ---
  function getNation(id) {
    for (var i = 0; i < STORE_DATA.nations.length; i++) {
      if (STORE_DATA.nations[i].id === id) return STORE_DATA.nations[i];
    }
    return null;
  }

  // --- Build SVG icons ---
  var ICONS = {
    phone:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    globe:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20A14.5 14.5 0 0 0 12 2"/><path d="M2 12h20"/></svg>',
    clock:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>',
    facebook:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>'
  };

  // --- Render nation filter buttons ---
  function renderFilters() {
    var html = '<button class="store-nation-btn active" data-nation="all">All</button>';
    STORE_DATA.nations.forEach(function (nation) {
      var hasStores = STORE_DATA.stores.some(function (s) { return s.nation === nation.id; });
      if (hasStores) {
        html += '<button class="store-nation-btn" data-nation="' + nation.id + '">' +
          nation.flag + ' ' + nation.label +
          '</button>';
      }
    });
    filtersEl.innerHTML = html;

    filtersEl.querySelectorAll('.store-nation-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeNation = this.getAttribute('data-nation');
        filtersEl.querySelectorAll('.store-nation-btn').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        renderStores();
      });
    });
  }

  // --- Render store cards ---
  function renderStores() {
    var filtered = activeNation === 'all'
      ? STORE_DATA.stores
      : STORE_DATA.stores.filter(function (s) { return s.nation === activeNation; });

    if (filtered.length === 0) {
      gridEl.innerHTML = '<p class="stores-empty">No locations listed yet.</p>';
      return;
    }

    var html = '';
    filtered.forEach(function (store) {
      var nation = getNation(store.nation);
      html += '<div class="store-card">';

      // Nation badge
      if (nation) {
        html += '<span class="store-card-nation">' + nation.flag + ' ' + nation.label + '</span>';
      }

      // Name
      html += '<h3 class="store-card-name">' + store.name + '</h3>';

      // Address
      if (store.address || store.city) {
        html += '<p class="store-card-address">';
        if (store.address) html += store.address;
        if (store.address && store.city) html += '<br>';
        if (store.city) html += store.city;
        html += '</p>';
      }

      // Phone
      if (store.phone) {
        html += '<a class="store-card-detail" href="tel:' + store.phone + '">' +
          ICONS.phone + store.phone + '</a>';
      }

      // Website
      if (store.website) {
        var displayUrl = store.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
        html += '<a class="store-card-detail" href="' + store.website + '" target="_blank" rel="noopener noreferrer">' +
          ICONS.globe + displayUrl + '</a>';
      }

      // Hours
      if (store.hours) {
        html += '<p class="store-card-detail store-card-detail--plain">' +
          ICONS.clock + store.hours + '</p>';
      }

      // Socials
      if (store.instagram || store.facebook) {
        html += '<div class="store-card-socials">';
        if (store.instagram) {
          html += '<a class="store-card-social" href="' + store.instagram + '" target="_blank" rel="noopener noreferrer" aria-label="Instagram">' + ICONS.instagram + '</a>';
        }
        if (store.facebook) {
          html += '<a class="store-card-social" href="' + store.facebook + '" target="_blank" rel="noopener noreferrer" aria-label="Facebook">' + ICONS.facebook + '</a>';
        }
        html += '</div>';
      }

      html += '</div>';
    });

    gridEl.innerHTML = html;
  }

  renderFilters();
  renderStores();
})();
