// ===========================================
// MY TOBAGO GUIDE - Rendering & Filtering
// ===========================================

(function () {
  'use strict';

  // --- Element references ---
  var keywordInput      = document.getElementById('guide-keyword');
  var categorySelect    = document.getElementById('guide-category-select');
  var areaSelect        = document.getElementById('guide-area-select');
  var searchBtn         = document.getElementById('guide-search-btn');
  var catCardsContainer = document.getElementById('guide-cat-cards');
  var catPillsContainer = document.getElementById('guide-cat-pills');
  var grid              = document.getElementById('guide-grid');
  var emptyState        = document.getElementById('guide-empty');

  // --- Featured category IDs (big cards) ---
  var FEATURED_CATS = ['food-recipes', 'beaches-nature', 'accommodation', 'activities-tours'];

  // --- Pill category IDs ---
  var PILL_CATS = ['culture-history', 'radio', 'practical-info'];

  // --- Lucide SVG icons for featured category cards ---
  var CAT_ICONS = {
    'food-recipes':     '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    'beaches-nature':   '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1C7 13 7 11 9.5 11c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1C7 19 7 17 9.5 17c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    'accommodation':    '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    'activities-tours': '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>'
  };

  var HEART_SVG = '<svg width="15" height="15" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';

  // --- State ---
  var activeCategory      = 'all';
  var activeArea          = '';
  var activeKeyword       = '';
  var activeFavouritesOnly = false;

  // --- Favourites (localStorage) ---
  var savedFavourites = (function () {
    try { return new Set(JSON.parse(localStorage.getItem('guide-favs') || '[]')); }
    catch (e) { return new Set(); }
  })();

  function saveFavourites() {
    try { localStorage.setItem('guide-favs', JSON.stringify(Array.from(savedFavourites))); }
    catch (e) {}
  }

  // --- Find category object by id ---
  function getCategoryById(id) {
    for (var i = 0; i < GUIDE_DATA.categories.length; i++) {
      if (GUIDE_DATA.categories[i].id === id) return GUIDE_DATA.categories[i];
    }
    return null;
  }

  // --- Count live links for a given category ---
  function countLinksForCategory(catId) {
    return GUIDE_DATA.links.filter(function (link) {
      return link.live !== false && link.category === catId;
    }).length;
  }

  // --- Populate the category <select> in the search bar ---
  function populateCategorySelect() {
    var html = '<option value="">Category</option>';
    GUIDE_DATA.categories.forEach(function (cat) {
      html += '<option value="' + cat.id + '">' + cat.label + '</option>';
    });
    categorySelect.innerHTML = html;
  }

  // --- Render 4 featured category cards ---
  function renderCategoryCards() {
    var html = '';
    FEATURED_CATS.forEach(function (catId) {
      var cat   = getCategoryById(catId);
      var count = countLinksForCategory(catId);
      var icon  = CAT_ICONS[catId] || '';
      var activeClass = activeCategory === catId ? ' is-active' : '';

      html += '<div class="guide-cat-card' + activeClass + '" data-cat="' + catId + '">' +
        '<div class="guide-cat-card-icon">' +
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' + icon + '</svg>' +
        '</div>' +
        '<div class="guide-cat-card-name">' + cat.label + '</div>' +
        '<div class="guide-cat-card-count">' + count + '+</div>' +
      '</div>';
    });

    catCardsContainer.innerHTML = html;

    catCardsContainer.querySelectorAll('.guide-cat-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var catId = this.getAttribute('data-cat');
        activeCategory = (activeCategory === catId) ? 'all' : catId;
        activeFavouritesOnly = false;
        categorySelect.value = activeCategory === 'all' ? '' : activeCategory;
        updateCardActiveStates();
        updatePillActiveStates();
        renderCards();
      });
    });
  }

  // --- Render pill buttons ---
  function renderCategoryPills() {
    var favClass = activeFavouritesOnly ? ' is-active guide-cat-pill--fav-active' : '';
    var html = '<button class="guide-cat-pill guide-cat-pill--fav' + favClass + '" data-special="favourites">' +
      HEART_SVG + ' My Favourites' +
    '</button>';

    PILL_CATS.forEach(function (catId) {
      var cat = getCategoryById(catId);
      var activeClass = activeCategory === catId ? ' is-active' : '';
      html += '<button class="guide-cat-pill' + activeClass + '" data-cat="' + catId + '">' +
        cat.icon + ' ' + cat.label +
      '</button>';
    });

    catPillsContainer.innerHTML = html;

    // Favourites pill
    catPillsContainer.querySelector('[data-special="favourites"]').addEventListener('click', function () {
      activeFavouritesOnly = !activeFavouritesOnly;
      if (activeFavouritesOnly) {
        activeCategory = 'all';
        categorySelect.value = '';
      }
      updateCardActiveStates();
      updatePillActiveStates();
      renderCards();
    });

    // Category pills
    catPillsContainer.querySelectorAll('.guide-cat-pill[data-cat]').forEach(function (pill) {
      pill.addEventListener('click', function () {
        var catId = this.getAttribute('data-cat');
        activeCategory = (activeCategory === catId) ? 'all' : catId;
        activeFavouritesOnly = false;
        categorySelect.value = activeCategory === 'all' ? '' : activeCategory;
        updateCardActiveStates();
        updatePillActiveStates();
        renderCards();
      });
    });
  }

  // --- Update active class on card elements ---
  function updateCardActiveStates() {
    catCardsContainer.querySelectorAll('.guide-cat-card').forEach(function (card) {
      card.classList.toggle('is-active', card.getAttribute('data-cat') === activeCategory);
    });
  }

  // --- Update active class on pill elements ---
  function updatePillActiveStates() {
    var favPill = catPillsContainer.querySelector('[data-special="favourites"]');
    if (favPill) {
      favPill.classList.toggle('is-active', activeFavouritesOnly);
      favPill.classList.toggle('guide-cat-pill--fav-active', activeFavouritesOnly);
    }
    catPillsContainer.querySelectorAll('.guide-cat-pill[data-cat]').forEach(function (pill) {
      pill.classList.toggle('is-active', pill.getAttribute('data-cat') === activeCategory);
    });
  }

  // --- Read inputs, update state, re-render ---
  function applySearch() {
    activeKeyword  = (keywordInput.value || '').toLowerCase().trim();
    activeCategory = categorySelect.value || 'all';
    activeArea     = areaSelect.value || '';
    activeFavouritesOnly = false;

    updateCardActiveStates();
    updatePillActiveStates();
    renderCards();
  }

  // --- Build heart button HTML ---
  function heartBtn(linkId) {
    var isActive = savedFavourites.has(linkId);
    return '<button class="guide-card-heart' + (isActive ? ' is-active' : '') + '" data-id="' + linkId + '" aria-label="' + (isActive ? 'Remove from favourites' : 'Add to favourites') + '" type="button">' +
      HEART_SVG +
    '</button>';
  }

  // --- Render cards, filtered by category + area + keyword + favourites ---
  function renderCards() {
    var filtered = GUIDE_DATA.links;

    filtered = filtered.filter(function (link) { return link.live !== false; });

    if (activeFavouritesOnly) {
      filtered = filtered.filter(function (link) { return savedFavourites.has(link.url); });
    }

    if (activeCategory !== 'all') {
      filtered = filtered.filter(function (link) { return link.category === activeCategory; });
    }

    if (activeArea) {
      filtered = filtered.filter(function (link) {
        return link.area === activeArea || link.area === 'island-wide';
      });
    }

    if (activeKeyword) {
      filtered = filtered.filter(function (link) {
        return link.title.toLowerCase().indexOf(activeKeyword) !== -1 ||
               link.description.toLowerCase().indexOf(activeKeyword) !== -1;
      });
    }

    // Group by category for display
    var grouped = {};
    filtered.forEach(function (link) {
      if (!grouped[link.category]) grouped[link.category] = [];
      grouped[link.category].push(link);
    });

    var html = '';
    var arrowSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';

    GUIDE_DATA.categories.forEach(function (cat) {
      var items = grouped[cat.id];
      if (!items || items.length === 0) return;

      html += '<div class="guide-category-group">';

      if (activeCategory === 'all' && !activeFavouritesOnly) {
        html += '<div class="guide-category-heading"><h2>' + cat.icon + ' ' + cat.label + '</h2></div>';
      }

      if (cat.note) {
        html += '<div class="guide-category-note">' + cat.note + '</div>';
      }

      html += '<div class="guide-category-cards">';

      items.forEach(function (link) {
        var featuredClass = link.featured ? ' featured' : '';
        var imageHtml = link.image
          ? '<img src="/my-tobago-guide/' + link.image + '" class="guide-card-image" alt="' + link.title + '" loading="lazy">'
          : '';
        var bodyClass = link.image ? ' has-image' : '';

        if (link.embedPage) {
          html += '<div class="guide-card' + featuredClass + '">' +
            imageHtml +
            heartBtn(link.url) +
            '<div class="guide-card-body' + bodyClass + '">' +
              '<span class="guide-card-category">' + cat.label + '</span>' +
              '<h3 class="guide-card-title">' + link.title + '</h3>' +
              '<p class="guide-card-description">' + link.description + '</p>' +
              '<div class="guide-card-actions">' +
                '<a class="guide-card-action-link" href="' + (link.url || '#') + '" target="_blank" rel="noopener noreferrer">Visit ' + arrowSvg + '</a>' +
                '<a class="guide-card-action-link" href="' + (link.embedPage || link.url || '#') + '" target="_blank" rel="noopener noreferrer">Stream ' + arrowSvg + '</a>' +
              '</div>' +
            '</div>' +
          '</div>';
        } else {
          html += '<a href="' + link.url + '" class="guide-card' + featuredClass + '" target="_blank" rel="noopener noreferrer">' +
            imageHtml +
            heartBtn(link.url) +
            '<div class="guide-card-body' + bodyClass + '">' +
              '<span class="guide-card-category">' + cat.label + '</span>' +
              '<h3 class="guide-card-title">' + link.title + '</h3>' +
              '<p class="guide-card-description">' + link.description + '</p>' +
              '<span class="guide-card-link">Visit' + arrowSvg + '</span>' +
            '</div>' +
          '</a>';
        }
      });

      html += '</div>'; // .guide-category-cards
      html += '</div>'; // .guide-category-group
    });

    grid.innerHTML = html;

    emptyState.classList.toggle('visible', filtered.length === 0);
  }

  // --- Heart button delegation (works after every re-render) ---
  grid.addEventListener('click', function (e) {
    var btn = e.target.closest('.guide-card-heart');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();

    var id = btn.getAttribute('data-id');
    if (savedFavourites.has(id)) {
      savedFavourites.delete(id);
      btn.classList.remove('is-active');
      btn.setAttribute('aria-label', 'Add to favourites');
    } else {
      savedFavourites.add(id);
      btn.classList.add('is-active');
      btn.setAttribute('aria-label', 'Remove from favourites');
    }
    saveFavourites();

    // If we're in favourites-only view, re-render so the card disappears when un-hearted
    if (activeFavouritesOnly) renderCards();
  });

  // --- Wire up search events ---
  searchBtn.addEventListener('click', applySearch);
  keywordInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') applySearch(); });
  categorySelect.addEventListener('change', applySearch);
  areaSelect.addEventListener('change', applySearch);

  // --- Initial render ---
  populateCategorySelect();
  renderCategoryCards();
  renderCategoryPills();
  renderCards();
})();
