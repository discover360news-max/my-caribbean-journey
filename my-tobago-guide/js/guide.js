// ===========================================
// MY TOBAGO GUIDE - Rendering & Filtering
// ===========================================

(function () {
  'use strict';

  var searchInput = document.getElementById('guide-search');
  var filtersContainer = document.getElementById('guide-filters');
  var grid = document.getElementById('guide-grid');
  var emptyState = document.getElementById('guide-empty');
  var activeCategory = 'all';
  var debounceTimer = null;

  // --- Build filter buttons from categories ---
  function renderFilters() {
    var html = '<button class="filter-btn active" data-category="all">All</button>';

    GUIDE_DATA.categories.forEach(function (cat) {
      html += '<button class="filter-btn" data-category="' + cat.id + '">' +
        cat.icon + ' ' + cat.label +
        '</button>';
    });

    filtersContainer.innerHTML = html;

    // Attach click handlers
    filtersContainer.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeCategory = this.getAttribute('data-category');

        // Update active state
        filtersContainer.querySelectorAll('.filter-btn').forEach(function (b) {
          b.classList.remove('active');
        });
        this.classList.add('active');

        renderCards();
      });
    });
  }

  // --- Find category object by id ---
  function getCategoryById(id) {
    for (var i = 0; i < GUIDE_DATA.categories.length; i++) {
      if (GUIDE_DATA.categories[i].id === id) return GUIDE_DATA.categories[i];
    }
    return null;
  }

  // --- Render cards, filtered by category + search ---
  function renderCards() {
    var query = (searchInput.value || '').toLowerCase().trim();
    var filtered = GUIDE_DATA.links;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(function (link) {
        return link.category === activeCategory;
      });
    }

    // Filter by search
    if (query) {
      filtered = filtered.filter(function (link) {
        return link.title.toLowerCase().indexOf(query) !== -1 ||
               link.description.toLowerCase().indexOf(query) !== -1;
      });
    }

    // Group by category for display
    var grouped = {};
    filtered.forEach(function (link) {
      if (!grouped[link.category]) grouped[link.category] = [];
      grouped[link.category].push(link);
    });

    var html = '';

    // Render in category order
    GUIDE_DATA.categories.forEach(function (cat) {
      var items = grouped[cat.id];
      if (!items || items.length === 0) return;

      // Category heading (only when showing "All")
      if (activeCategory === 'all') {
        html += '<div class="guide-category-heading">' +
          '<h2>' + cat.icon + ' ' + cat.label + '</h2>' +
          '</div>';
      }

      // Category note
      if (cat.note) {
        html += '<div class="guide-category-note">' + cat.note + '</div>';
      }

      // Cards
      items.forEach(function (link) {
        var featuredClass = link.featured ? ' featured' : '';

        if (link.embedPage) {
          // render a non-anchor card so we can include separate "Visit" and "Stream" links
          html += '<div class="guide-card' + featuredClass + '">' +
            '<span class="guide-card-category">' + cat.label + '</span>' +
            '<h3 class="guide-card-title">' + link.title + '</h3>' +
            '<p class="guide-card-description">' + link.description + '</p>' +
            '<div class="guide-card-actions">' +
              '<a class="btn btn-primary" href="' + (link.url || '#') + '" target="_blank" rel="noopener noreferrer">Visit</a> ' +
              '<a class="btn btn-outline" href="' + (link.embedPage || link.url || '#') + '" target="_blank" rel="noopener noreferrer">Stream</a>' +
            '</div>' +
          '</div>';
        } else {
          // existing anchor card for normal links
          html += '<a href="' + link.url + '" class="guide-card' + featuredClass + '" target="_blank" rel="noopener noreferrer">' +
            '<span class="guide-card-category">' + cat.label + '</span>' +
            '<h3 class="guide-card-title">' + link.title + '</h3>' +
            '<p class="guide-card-description">' + link.description + '</p>' +
            '<span class="guide-card-link">' +
              'Visit' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>' +
                '<polyline points="15 3 21 3 21 9"/>' +
                '<line x1="10" y1="14" x2="21" y2="3"/>' +
              '</svg>' +
            '</span>' +
          '</a>';
        }
      });
    });

    grid.innerHTML = html;

    // Empty state
    if (filtered.length === 0) {
      emptyState.classList.add('visible');
    } else {
      emptyState.classList.remove('visible');
    }
  }

  // --- Search with debounce ---
  searchInput.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(renderCards, 300);
  });

  // Clear on Escape
  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      searchInput.value = '';
      renderCards();
    }
  });

  // --- Initial render ---
  renderFilters();
  renderCards();
})();
