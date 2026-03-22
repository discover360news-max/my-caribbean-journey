/* =============================================================
   I Am Tobago — Historical Map
   Pan/zoom via SVG viewBox manipulation (no libraries).
   Filter chips per category. Bottom-panel popup on pin click.
   ============================================================= */

(function () {
  'use strict';

  /* ── Config ──────────────────────────────────────────────── */
  const VIEWBOX = { x: 0, y: 0, w: 900, h: 520 };
  const MIN_W = 250;   // most zoomed in
  const MAX_W = 1200;  // most zoomed out

  /* Category display config */
  const CATEGORIES = {
    history:   { label: 'History',   colour: '#d4a030' },
    folklore:  { label: 'Folklore',  colour: '#e8652a' },
    nature:    { label: 'Nature',    colour: '#2d6b45' },
    village:   { label: 'Village',   colour: '#f5f0e8' },
    religious: { label: 'Religious', colour: '#9a8a7a' }
  };

  /* Category SVG icons (inline, 16×16 viewBox for pin use) */
  const CAT_ICONS = {
    history: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-width="1.5"/>`,
    folklore: `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="1.5"/><circle cx="12" cy="12" r="3" stroke-width="1.5"/>`,
    nature: `<path d="M17 8C8 10 5.9 16.17 3.82 19.34A2 2 0 1 0 7 21C12 14 18 15 21 9" stroke-width="1.5"/><path d="M10.34 13.94c.21.28.42.56.62.84" stroke-width="1.5"/>`,
    village: `<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke-width="1.5"/><polyline points="9 22 9 12 15 12 15 22" stroke-width="1.5"/>`,
    religious: `<line x1="12" y1="2" x2="12" y2="22" stroke-width="1.5"/><line x1="2" y1="12" x2="22" y2="12" stroke-width="1.5"/>`
  };

  /* ── State ───────────────────────────────────────────────── */
  let vb = { ...VIEWBOX };
  let activeFilter = 'all';
  let activePin = null;
  let isDragging = false;
  let dragStart = { x: 0, y: 0, vbX: 0, vbY: 0 };
  let lastPinchDist = 0;

  /* ── DOM refs (set in init) ──────────────────────────────── */
  let svg, popup, popupClose;

  /* ── ViewBox helpers ─────────────────────────────────────── */
  function applyViewBox() {
    svg.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
  }

  /* Convert screen coords → SVG viewBox coords */
  function toSVG(screenX, screenY) {
    const rect = svg.getBoundingClientRect();
    return {
      x: vb.x + (screenX - rect.left) / rect.width  * vb.w,
      y: vb.y + (screenY - rect.top)  / rect.height * vb.h
    };
  }

  function zoomAt(factor, svgX, svgY) {
    const newW = Math.min(MAX_W, Math.max(MIN_W, vb.w * factor));
    const scale = newW / vb.w;
    vb.x = svgX - (svgX - vb.x) * scale;
    vb.y = svgY - (svgY - vb.y) * scale;
    vb.w = newW;
    vb.h = newW * (VIEWBOX.h / VIEWBOX.w);
    applyViewBox();
  }

  function resetView() {
    vb = { ...VIEWBOX };
    applyViewBox();
  }

  /* ── Pins ────────────────────────────────────────────────── */
  function renderPins() {
    /* Remove existing pins */
    svg.querySelectorAll('.map-pin-group').forEach(el => el.remove());

    const filtered = activeFilter === 'all'
      ? MAP_LOCATIONS
      : MAP_LOCATIONS.filter(d => d.category === activeFilter);

    filtered.forEach(loc => {
      const cx = (loc.x / 100) * VIEWBOX.w;
      const cy = (loc.y / 100) * VIEWBOX.h;
      const cat = CATEGORIES[loc.category];

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.classList.add('map-pin-group');
      g.setAttribute('data-id', loc.id);
      g.setAttribute('tabindex', '0');
      g.setAttribute('role', 'button');
      g.setAttribute('aria-label', loc.name);

      /* Outer pulse ring */
      const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      pulse.setAttribute('cx', cx);
      pulse.setAttribute('cy', cy);
      pulse.setAttribute('r', 14);
      pulse.setAttribute('fill', cat.colour);
      pulse.setAttribute('fill-opacity', '0.18');
      pulse.classList.add('map-pin-pulse');

      /* Pin body */
      const pin = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      pin.setAttribute('cx', cx);
      pin.setAttribute('cy', cy);
      pin.setAttribute('r', 7);
      pin.setAttribute('fill', cat.colour);
      pin.setAttribute('stroke', '#0d1f12');
      pin.setAttribute('stroke-width', '1.5');
      pin.classList.add('map-pin');

      g.appendChild(pulse);
      g.appendChild(pin);

      /* Click / keyboard */
      const openPopup = (e) => {
        e.stopPropagation();
        showPopup(loc);
      };
      g.addEventListener('click', openPopup);
      g.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPopup(e); }
      });

      svg.appendChild(g);
    });
  }

  /* ── Popup ───────────────────────────────────────────────── */
  function showPopup(loc) {
    const cat = CATEGORIES[loc.category];

    popup.querySelector('.map-popup-category-dot').style.background = cat.colour;
    popup.querySelector('.map-popup-cat-label').textContent = cat.label;
    popup.querySelector('.map-popup-title').textContent = loc.name;
    popup.querySelector('.map-popup-desc').textContent = loc.description;

    activePin = loc.id;

    /* Double rAF: ensures the browser actually paints one frame with the
       element in its reset (translateY 100%) state before the transition
       fires. void offsetHeight forces a reflow but not a paint, so the
       first-click flip can still occur. Two animation frames guarantees it. */
    popup.classList.remove('active');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        popup.classList.add('active');
        popup.setAttribute('aria-hidden', 'false');
        popupClose.focus({ preventScroll: true });
      });
    });
  }

  function hidePopup() {
    popup.classList.remove('active');
    popup.setAttribute('aria-hidden', 'true');
    activePin = null;
    /* Return focus to the active pin */
    if (activePin) {
      svg.querySelector(`[data-id="${activePin}"]`)?.focus();
    }
  }

  /* ── Filter chips ────────────────────────────────────────── */
  function initFilters() {
    const bar = document.getElementById('mapFilters');
    if (!bar) return;

    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('.map-chip');
      if (!btn) return;
      activeFilter = btn.dataset.filter;
      bar.querySelectorAll('.map-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      hidePopup();
      renderPins();
    });
  }

  /* ── Pan/Zoom events ─────────────────────────────────────── */
  function initPanZoom() {
    const wrapper = svg.parentElement;

    /* Scroll wheel zoom */
    wrapper.addEventListener('wheel', (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 0.85 : 1.18;
      const pt = toSVG(e.clientX, e.clientY);
      zoomAt(factor, pt.x, pt.y);
    }, { passive: false });

    /* Mouse drag */
    svg.addEventListener('mousedown', (e) => {
      if (e.target.closest('.map-pin-group')) return;
      isDragging = true;
      svg.style.cursor = 'grabbing';
      dragStart = { x: e.clientX, y: e.clientY, vbX: vb.x, vbY: vb.y };
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const rect = svg.getBoundingClientRect();
      const scaleX = vb.w / rect.width;
      const scaleY = vb.h / rect.height;
      vb.x = dragStart.vbX - (e.clientX - dragStart.x) * scaleX;
      vb.y = dragStart.vbY - (e.clientY - dragStart.y) * scaleY;
      applyViewBox();
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      svg.style.cursor = 'grab';
    });

    /* Touch: drag + pinch zoom */
    svg.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        lastPinchDist = Math.hypot(
          e.touches[1].clientX - e.touches[0].clientX,
          e.touches[1].clientY - e.touches[0].clientY
        );
      } else if (e.touches.length === 1 && !e.target.closest('.map-pin-group')) {
        isDragging = true;
        dragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY, vbX: vb.x, vbY: vb.y };
      }
    }, { passive: true });

    svg.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[1].clientX - e.touches[0].clientX,
          e.touches[1].clientY - e.touches[0].clientY
        );
        const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        const pt = toSVG(cx, cy);
        zoomAt(lastPinchDist / dist, pt.x, pt.y);
        lastPinchDist = dist;
      } else if (e.touches.length === 1 && isDragging) {
        const rect = svg.getBoundingClientRect();
        const scaleX = vb.w / rect.width;
        const scaleY = vb.h / rect.height;
        vb.x = dragStart.vbX - (e.touches[0].clientX - dragStart.x) * scaleX;
        vb.y = dragStart.vbY - (e.touches[0].clientY - dragStart.y) * scaleY;
        applyViewBox();
      }
    }, { passive: false });

    svg.addEventListener('touchend', () => { isDragging = false; });

    /* Keyboard zoom controls */
    document.getElementById('mapZoomIn')?.addEventListener('click',  () => zoomAt(0.75, vb.x + vb.w / 2, vb.y + vb.h / 2));
    document.getElementById('mapZoomOut')?.addEventListener('click', () => zoomAt(1.33, vb.x + vb.w / 2, vb.y + vb.h / 2));
    document.getElementById('mapReset')?.addEventListener('click',   () => { resetView(); hidePopup(); });

    /* Click on map bg closes popup */
    svg.addEventListener('click', (e) => {
      if (!e.target.closest('.map-pin-group')) hidePopup();
    });
  }

  /* ── Init ────────────────────────────────────────────────── */
  function init() {
    svg = document.getElementById('tobago-map');
    popup = document.getElementById('mapPopup');
    popupClose = document.getElementById('mapPopupClose');

    if (!svg || !popup || typeof MAP_LOCATIONS === 'undefined') return;

    svg.style.cursor = 'grab';
    applyViewBox();
    renderPins();
    initFilters();
    initPanZoom();

    popupClose.addEventListener('click', hidePopup);

    /* Escape key closes popup */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popup.classList.contains('active')) hidePopup();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
