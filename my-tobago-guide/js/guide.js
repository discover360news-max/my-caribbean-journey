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
  var resultsBar        = document.getElementById('guide-results-bar');
  var resultsFooter     = document.getElementById('guide-results-footer');

  // --- Featured category IDs (big cards) ---
  var FEATURED_CATS = ['food-recipes', 'beaches-nature', 'accommodation', 'activities-tours'];

  // --- Pill category IDs ---
  var PILL_CATS = ['culture-history', 'radio', 'practical-info'];

  // --- Lucide SVG icon paths for all categories (used on category cards + listing card badges) ---
  var CAT_ICONS = {
    'food-recipes':     '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    'beaches-nature':   '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1C7 13 7 11 9.5 11c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1C7 19 7 17 9.5 17c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    'accommodation':    '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    'activities-tours': '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    'culture-history':  '<path d="m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><circle cx="10" cy="8" r="2"/>',
    'radio':            '<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>',
    'practical-info':   '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'
  };

  // --- Inline SVG icon for headings and pills (no background box) ---
  function catIconInline(catId, size) {
    var icon = CAT_ICONS[catId] || '';
    var s = size || 18;
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' + icon + '</svg>';
  }

  // --- Build the category icon badge HTML for a listing card ---
  function catIconBadge(catId) {
    var icon = CAT_ICONS[catId] || '';
    return '<div class="guide-card-cat-icon">' +
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' + icon + '</svg>' +
    '</div>';
  }

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

  // --- Count live links for a given category (unfiltered, for initial render) ---
  function countLinksForCategory(catId) {
    return GUIDE_DATA.links.filter(function (link) {
      return link.live !== false && link.category === catId;
    }).length;
  }

  // --- Build a single searchable string for a link (title + description + tags) ---
  function searchableText(link) {
    return [
      link.title,
      link.description,
      (link.tags || []).join(' ')
    ].join(' ').toLowerCase();
  }

  // --- Test a link against the active keyword (multi-word AND logic) ---
  function matchesKeyword(link, keyword) {
    if (!keyword) return true;
    var text = searchableText(link);
    var words = keyword.split(/\s+/).filter(Boolean);
    return words.every(function (word) { return text.indexOf(word) !== -1; });
  }

  // --- Count live links for a category respecting active keyword + area filters ---
  function getFilteredCountForCategory(catId) {
    return GUIDE_DATA.links.filter(function (link) {
      if (link.live === false) return false;
      if (link.category !== catId) return false;
      if (activeArea && link.area !== activeArea && link.area !== 'island-wide') return false;
      if (!matchesKeyword(link, activeKeyword)) return false;
      return true;
    }).length;
  }

  // --- Check if any filter is currently active ---
  function isAnyFilterActive() {
    return activeKeyword !== '' || activeCategory !== 'all' || activeArea !== '' || activeFavouritesOnly;
  }

  // --- Clear all filters and reset UI ---
  function clearAllFilters() {
    activeKeyword        = '';
    activeCategory       = 'all';
    activeArea           = '';
    activeFavouritesOnly = false;

    keywordInput.value    = '';
    categorySelect.value  = '';
    areaSelect.value      = '';

    // Reset floating label state on all search fields
    document.querySelectorAll('#guide-search-form .guide-search-field').forEach(function (f) {
      f.classList.remove('has-value');
    });

    updateCardActiveStates();
    updateCategoryCardCounts();
    updatePillActiveStates();
    renderCards();
  }

  // --- Update the count badges on category cards without full re-render ---
  function updateCategoryCardCounts() {
    var filtered = isAnyFilterActive();
    catCardsContainer.querySelectorAll('.guide-cat-card').forEach(function (card) {
      var catId    = card.getAttribute('data-cat');
      var count    = filtered ? getFilteredCountForCategory(catId) : countLinksForCategory(catId);
      var countEl  = card.querySelector('.guide-cat-card-count');
      if (countEl) countEl.textContent = filtered ? String(count) : (count + '+');
      card.classList.toggle('is-empty', filtered && count === 0);
    });
  }

  // --- Render the results status bar (top) and footer (bottom, centered) ---
  function renderResultsBar(count) {
    if (!isAnyFilterActive()) {
      resultsBar.innerHTML = '';
      resultsBar.classList.remove('is-active');
      resultsFooter.innerHTML = '';
      resultsFooter.classList.remove('is-active');
      return;
    }

    var chips = '';
    if (activeKeyword) {
      chips += '<span class="guide-filter-chip">"' + activeKeyword + '"</span>';
    }
    if (activeCategory !== 'all') {
      var cat = getCategoryById(activeCategory);
      if (cat) chips += '<span class="guide-filter-chip">' + cat.label + '</span>';
    }
    if (activeArea) {
      var areaLabel = areaSelect.options[areaSelect.selectedIndex] ? areaSelect.options[areaSelect.selectedIndex].text : activeArea;
      chips += '<span class="guide-filter-chip">' + areaLabel + '</span>';
    }
    if (activeFavouritesOnly) {
      chips += '<span class="guide-filter-chip">My Favourites</span>';
    }

    var countLabel = count === 1 ? '1 result' : count + ' results';

    // Top bar
    resultsBar.classList.add('is-active');
    resultsBar.innerHTML =
      '<div class="guide-results-bar-inner">' +
        '<div class="guide-results-bar-left">' +
          '<span class="guide-results-bar-count">' + countLabel + '</span>' +
          (chips ? '<span class="guide-results-bar-sep">·</span>' + chips : '') +
        '</div>' +
        '<button class="guide-clear-btn" id="guide-clear-btn" type="button">Clear filters</button>' +
      '</div>';
    document.getElementById('guide-clear-btn').addEventListener('click', clearAllFilters);

    // Bottom footer (centered, text only)
    resultsFooter.classList.add('is-active');
    resultsFooter.innerHTML =
      '<span class="guide-results-footer-count">' + countLabel + '</span>' +
      (chips ? '<span class="guide-results-bar-sep">·</span>' + chips : '') +
      '<span class="guide-results-bar-sep">·</span>' +
      '<button class="guide-clear-btn-text" id="guide-clear-btn-footer" type="button">Clear filters</button>';
    document.getElementById('guide-clear-btn-footer').addEventListener('click', clearAllFilters);
  }

  // --- Populate the category <select> in the search bar ---
  function populateCategorySelect() {
    var html = '<option value=""></option>';
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
        catIconInline(catId, 15) + ' ' + cat.label +
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
      filtered = filtered.filter(function (link) { return matchesKeyword(link, activeKeyword); });
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
        html += '<div class="guide-category-heading"><h2>' + catIconInline(cat.id, 22) + ' ' + cat.label + '</h2></div>';
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
            catIconBadge(cat.id) +
            '<div class="guide-card-body' + bodyClass + '">' +
              '<h3 class="guide-card-title">' + link.title + '</h3>' +
              '<p class="guide-card-description">' + link.description + '</p>' +
              '<button class="guide-card-more" type="button">More info</button>' +
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
            catIconBadge(cat.id) +
            '<div class="guide-card-body' + bodyClass + '">' +
              '<h3 class="guide-card-title">' + link.title + '</h3>' +
              '<p class="guide-card-description">' + link.description + '</p>' +
              '<button class="guide-card-more" type="button">More info</button>' +
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
    renderResultsBar(filtered.length);
    updateCategoryCardCounts();

    // Hide "More info" buttons on descriptions that aren't actually truncated
    grid.querySelectorAll('.guide-card-description').forEach(function (desc) {
      var more = desc.nextElementSibling;
      if (more && more.classList.contains('guide-card-more')) {
        more.style.display = desc.scrollHeight <= desc.clientHeight + 2 ? 'none' : '';
      }
    });
  }

  // --- "More info" expand/collapse delegation ---
  grid.addEventListener('click', function (e) {
    var btn = e.target.closest('.guide-card-more');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    var desc = btn.previousElementSibling;
    var expanded = desc.classList.toggle('is-expanded');
    btn.textContent = expanded ? 'Less' : 'More info';
  });

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

  // --- Floating label: has-value state (visual feedback only, not search) ---
  keywordInput.addEventListener('input', function () {
    this.closest('.guide-search-field').classList.toggle('has-value', this.value.trim() !== '');
  });
  categorySelect.addEventListener('change', function () {
    this.closest('.guide-search-field').classList.toggle('has-value', this.value !== '');
  });
  areaSelect.addEventListener('change', function () {
    this.closest('.guide-search-field').classList.toggle('has-value', this.value !== '');
  });

  // --- Wire up search events ---
  // Dropdowns do NOT auto-fire — user must press Search or Enter to apply
  searchBtn.addEventListener('click', applySearch);
  keywordInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') applySearch(); });

  // --- Initial render ---
  populateCategorySelect();
  renderCategoryCards();
  renderCategoryPills();
  renderCards();
})();
