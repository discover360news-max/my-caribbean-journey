// ===========================================
// MY CARIBBEAN JOURNEY - Shared Components
// Nav + Footer rendered from config
// ===========================================

var SiteComponents = (function () {
  'use strict';

  // ----------------------------------------
  // Disabled link label — one place, used everywhere
  // ----------------------------------------
  var DISABLED_LABEL = 'Coming soon';

  // ----------------------------------------
  // Site-wide CTAs — centralized name + link registry
  // Add a CTA here once; reference it from any page with SiteComponents.cta('key')
  // Set live: false to silently kill a link site-wide
  // ----------------------------------------
  var SITE_CTAS = {
    'i-am-tobago': {
      label:    'I Am Tobago',
      href:     '/i-am-tobago/',
      live:     true,
      cta:      true
    },
    'i-am-tobago-buy': {
      label:    'Get Your Copy',
      href:     'https://www.amazon.com/I-Am-Tobago-Quincy-Yeates/dp/B0FYYVKKVT',
      live:     true,
      cta:      true,
      external: true
    },
    'tobago-guide': {
      label:    'Tobago Guide',
      href:     '/my-tobago-guide/',
      live:     true,
      cta:      false
    }
  };

  // ----------------------------------------
  // MailerLite — update IDs here, reflects everywhere
  // ----------------------------------------
  var MAILERLITE = {
    accountId:  '2164218',
    formId:     '38056270',
    internalId: '181130806283994185',
    scriptSrc:  'https://groot.mailerlite.com/js/w/webforms.min.js?v95037e5bac78f29ed026832ca21a7c7b'
  };

  // ----------------------------------------
  // Charity data — update once, reflects everywhere
  // ----------------------------------------
  var CHARITY = {
    label:   'Giving Back',
    heading: 'A portion of proceeds from book sales is donated to',
    name:    'Charity Begins at Home',
    desc:    'School Supplies for Success — Enriching Caribbean Education — One Child at a Time.',
    url:     'https://www.facebook.com/charitybeginswithus',
    cta:     'Learn More',
    live:    true
  };

  function renderHeader(config) {
    var links = config.navLinks || [];
    var linksHtml = '';
    var mobileLinksHtml = '';

    links.forEach(function (link) {
      var cssClass = link.cta ? ' class="site-nav-cta"' : '';
      var target = link.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      linksHtml += '<a href="' + link.href + '"' + cssClass + target + '>' + link.label + '</a>';
      mobileLinksHtml += '<a href="' + link.href + '"' + cssClass + target + '>' + link.label + '</a>';
    });

    var playIcon  = '<svg id="mcj-icon-play" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>';
    var pauseIcon = '<svg id="mcj-icon-pause" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style="display:none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
    var mutedIcon = '<svg id="mcj-icon-muted" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>';
    var soundIcon = '<svg id="mcj-icon-sound" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="display:none"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>';

    var crumbs = config.breadcrumbs || window._mcjCrumbs || null;
    var crumbBar = (crumbs && crumbs.length > 1)
      ? '<div class="site-nav-crumb-bar">' + renderBreadcrumb(crumbs) + '</div>'
      : '';

    return (
      '<header class="site-header" id="site-header">' +
        '<nav class="site-nav" id="site-nav-bar">' +
          '<div class="site-nav-inner">' +
            '<a href="/" class="site-nav-logo"><img src="/images/my-caribbean-journey-tpbg-sm.png" alt="" class="site-nav-logo-img" aria-hidden="true">My Caribbean Journey</a>' +
            '<div class="site-nav-links">' + linksHtml + '</div>' +
            '<button class="site-nav-toggle" id="site-nav-toggle" aria-label="Toggle menu">' +
              '<span></span><span></span><span></span>' +
            '</button>' +
          '</div>' +
        crumbBar +
        '</nav>' +
        '<div id="mcj-music-player" class="music-player">' +
          '<span class="music-player-note" id="mcj-music-note">\u266a</span>' +
          '<span class="music-player-title">Jamboul\u00e9 \u2014 Ramajay Intercoastal</span>' +
          '<div class="music-player-controls">' +
            '<button class="music-player-btn" id="mcj-play-btn" aria-label="Play">' +
              playIcon + pauseIcon +
            '</button>' +
            '<button class="music-player-btn" id="mcj-mute-btn" aria-label="Unmute">' +
              mutedIcon + soundIcon +
            '</button>' +
          '</div>' +
        '</div>' +
      '</header>' +
      '<div class="site-mobile-menu" id="site-mobile-menu">' +
        mobileLinksHtml +
      '</div>'
    );
  }

  function renderFooter(config) {
    var links = config.footerLinks || [];
    var year = new Date().getFullYear();
    var isTobago = window.location.pathname.toLowerCase().indexOf('tobago') !== -1;
    var supportLabel = isTobago ? '&#9749; Buy me some Blue Food' : '&#9749; Buy me a coffee';

    // Build the full links list (Privacy Policy always appended)
    var allLinks = links.slice();
    if (window.location.pathname !== '/privacy-policy/') {
      allLinks.push({ label: 'Privacy Policy', href: '/privacy-policy/' });
    }

    // Split evenly across two columns; odd totals give the extra link to col 2
    var mid = Math.ceil(allLinks.length / 2);
    var col2Links = allLinks.slice(0, mid);
    var col3Links = allLinks.slice(mid);

    function buildColHtml(linkList) {
      var html = '';
      linkList.forEach(function (link) {
        var target = link.external ? ' target="_blank" rel="noopener noreferrer"' : '';
        html += '<a href="' + link.href + '"' + target + '>' + link.label + '</a>';
      });
      return html;
    }

    return (
      '<footer class="site-footer">' +
        '<div class="container">' +
          '<div class="site-footer-content">' +
            '<div class="site-footer-col site-footer-col--brand">' +
              '<p class="site-footer-logo">My Caribbean Journey</p>' +
              '<p class="site-footer-tagline">Stories from the islands</p>' +
              '<p class="site-footer-copy">&copy; ' + year + ' My Caribbean Journey. All rights reserved.</p>' +
              '<a href="https://buymeacoffee.com/mycaribbeanjourney" class="footer-support" target="_blank" rel="noopener noreferrer">' + supportLabel + '</a>' +
            '</div>' +
            '<div class="site-footer-col site-footer-links">' + buildColHtml(col2Links) + '</div>' +
            '<div class="site-footer-col site-footer-links">' + buildColHtml(col3Links) + '</div>' +
          '</div>' +
        '</div>' +
      '</footer>' +
      '<div class="site-stamp-bar">' +
        '<div class="site-stamp-container">' +
          '<span class="site-stamp-tooltip">Psst &#8212; K.V., proud brother of the visionary bringing Tobago&#8217;s history and culture to the world.</span>' +
          '<img src="/images/KV-11772609696.webp" alt="KV signature" class="site-stamp" loading="lazy" width="144" height="96">' +
        '</div>' +
      '</div>'
    );
  }

  function attachNavBehavior() {
    var header = document.getElementById('site-header');
    var nav    = document.getElementById('site-nav-bar');
    var toggle = document.getElementById('site-nav-toggle');
    var mobileMenu = document.getElementById('site-mobile-menu');
    if (!header) return;

    // Scroll effect — on the header so both nav and notch transition together
    function handleScroll() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mobile toggle
    if (toggle && mobileMenu) {
      var menuOpen = false;

      toggle.addEventListener('click', function () {
        menuOpen = !menuOpen;
        if (menuOpen) {
          mobileMenu.classList.add('open');
          toggle.setAttribute('aria-expanded', 'true');
        } else {
          mobileMenu.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });

      // Close on link click
      mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          menuOpen = false;
          mobileMenu.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Smooth scroll for anchor links in nav
    nav.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var offset = 70;
          var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });

    // Same for mobile menu
    if (mobileMenu) {
      mobileMenu.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
          var targetId = this.getAttribute('href');
          if (targetId === '#') return;
          var target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            var offset = 70;
            var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
          }
        });
      });
    }
  }

  function renderCharity() {
    return (
      '<section class="site-charity">' +
        '<div class="container">' +
          '<div class="site-charity-inner">' +
            '<div class="site-charity-icon" aria-hidden="true">' +
              '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>' +
              '</svg>' +
            '</div>' +
            '<p class="section-label">' + CHARITY.label + '</p>' +
            '<h2 class="site-charity-heading">' + CHARITY.heading + '</h2>' +
            '<p class="site-charity-name">' + CHARITY.name + '</p>' +
            '<p class="site-charity-desc">' + CHARITY.desc + '</p>' +
            (CHARITY.live
              ? '<a href="' + CHARITY.url + '" class="btn btn-primary" target="_blank" rel="noopener noreferrer">' + CHARITY.cta + '</a>'
              : '<a href="#" class="btn btn-primary btn-disabled" aria-disabled="true" data-tooltip="' + DISABLED_LABEL + '">' + CHARITY.cta + '</a>') +
          '</div>' +
        '</div>' +
      '</section>'
    );
  }

  // ----------------------------------------
  // Music Player — audio logic (HTML lives in renderHeader)
  // ----------------------------------------
  function initMusicPlayer() {
    var TARGET_VOL  = 0.45;
    var FADE_MS     = 3500;

    // Start muted + silent — satisfies browser autoplay policy
    var audio = document.createElement('audio');
    audio.src = '/shared/audio/jamboule.mp3';
    audio.loop = true;
    audio.volume = 0;
    audio.muted  = true;
    audio.preload = 'auto';
    document.body.appendChild(audio);

    var isPlaying = false;
    var isMuted   = false;

    function fadeIn() {
      audio.muted = false;
      var steps    = 40;
      var stepSize = TARGET_VOL / steps;
      var stepMs   = FADE_MS / steps;
      var timer = setInterval(function () {
        audio.volume = Math.min(audio.volume + stepSize, TARGET_VOL);
        if (audio.volume >= TARGET_VOL) clearInterval(timer);
      }, stepMs);
    }

    function setPlayState(playing) {
      isPlaying = playing;
      var iconPlay  = document.getElementById('mcj-icon-play');
      var iconPause = document.getElementById('mcj-icon-pause');
      var note      = document.getElementById('mcj-music-note');
      if (iconPlay)  iconPlay.style.display  = playing ? 'none' : '';
      if (iconPause) iconPause.style.display = playing ? ''     : 'none';
      if (note) {
        if (playing) note.classList.add('playing');
        else         note.classList.remove('playing');
      }
    }

    function setMuteState(muted) {
      isMuted     = muted;
      audio.muted = muted;
      if (!muted && audio.volume === 0) audio.volume = TARGET_VOL;
      var iconMuted = document.getElementById('mcj-icon-muted');
      var iconSound = document.getElementById('mcj-icon-sound');
      var btn       = document.getElementById('mcj-mute-btn');
      if (iconMuted) iconMuted.style.display = muted ? ''     : 'none';
      if (iconSound) iconSound.style.display = muted ? 'none' : '';
      if (btn) btn.setAttribute('aria-label', muted ? 'Unmute' : 'Mute');
    }

    // Expose pause so other players (e.g. blog audio) can stop site music
    window._mcjPauseSiteMusic = function () {
      if (isPlaying) {
        audio.pause();
        setPlayState(false);
      }
    };

    // Wire play/pause button
    var playBtn = document.getElementById('mcj-play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', function () {
        if (isPlaying) {
          audio.pause();
          setPlayState(false);
        } else {
          // Pause any other audio playing on the page
          document.querySelectorAll('audio').forEach(function (a) {
            if (a !== audio) a.pause();
          });
          audio.muted  = isMuted;
          audio.volume = isMuted ? 0 : TARGET_VOL;
          audio.play();
          setPlayState(true);
        }
      });
    }

    // Wire mute button
    var muteBtn = document.getElementById('mcj-mute-btn');
    if (muteBtn) {
      muteBtn.addEventListener('click', function () {
        setMuteState(!isMuted);
      });
    }

    // Player starts paused — plays only on user click
    setMuteState(false);
    audio.muted  = false;
    audio.volume = TARGET_VOL;
    setPlayState(false);
  }

  // ----------------------------------------
  // Music Toast — first-visit nudge toward player
  // ----------------------------------------
  function initMusicToast() {
    var TOAST_KEY = 'mcj_toast_seen';
    var TOAST_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days
    var DELAY_MS  = 4000;

    var seen = localStorage.getItem(TOAST_KEY);
    if (seen && Date.now() - parseInt(seen, 10) < TOAST_TTL) return;

    // Inject toast HTML
    var el = document.createElement('div');
    el.id = 'mcj-music-toast';
    el.className = 'music-toast';
    el.setAttribute('role', 'status');
    el.innerHTML =
      '<button class="music-toast-close" aria-label="Close">&times;</button>' +
      '<div class="music-toast-body">' +
        '<span class="music-toast-icon">\u266a</span>' +
        '<p class="music-toast-text">' +
          'Set the mood \u2014 listen to <strong>Jamboul\u00e9</strong> by Ramajay Intercoastal while you browse.' +
          '<span class="music-toast-cue">\u2191 Playing now at the top of the page</span>' +
        '</p>' +
      '</div>';
    document.body.appendChild(el);

    var interacted = false;
    var playBtn = document.getElementById('mcj-play-btn');
    var muteBtn = document.getElementById('mcj-mute-btn');
    function markInteracted() { interacted = true; }
    if (playBtn) playBtn.addEventListener('click', markInteracted, { once: true });
    if (muteBtn) muteBtn.addEventListener('click', markInteracted, { once: true });

    function hideToast() { el.classList.remove('visible'); }

    function highlightPlayer() {
      var player = document.getElementById('mcj-music-player');
      if (!player) return;
      player.classList.remove('highlight');
      void player.offsetWidth; // force reflow so animation restarts cleanly
      player.classList.add('highlight');
      player.addEventListener('animationend', function () {
        player.classList.remove('highlight');
      }, { once: true });
    }

    function scheduleToast() {
      setTimeout(function () {
        if (interacted) return;
        el.classList.add('visible');
        localStorage.setItem(TOAST_KEY, String(Date.now()));

        el.querySelector('.music-toast-close').addEventListener('click', function (e) {
          e.stopPropagation();
          hideToast();
        });

        el.addEventListener('click', function () {
          highlightPlayer();
          hideToast();
        });
      }, DELAY_MS);
    }

    // If GDPR hasn't been accepted yet, wait until it is before showing toast
    if (!localStorage.getItem('mcj_gdpr_accepted')) {
      document.addEventListener('mcj:gdpr-accepted', scheduleToast, { once: true });
    } else {
      scheduleToast();
    }
  }

  // ----------------------------------------
  // GDPR Banner — one-time cookie/data notice
  // ----------------------------------------
  function initGdprBanner() {
    var GDPR_KEY = 'mcj_gdpr_accepted';
    if (localStorage.getItem(GDPR_KEY)) return;

    // Hide Buy Me a Coffee bubble while banner is active
    var supportFloat = document.querySelector('.support-float');
    if (supportFloat) supportFloat.style.visibility = 'hidden';

    var banner = document.createElement('div');
    banner.id = 'mcj-gdpr-banner';
    banner.className = 'gdpr-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie notice');
    banner.innerHTML =
      '<p class="gdpr-text">' +
        'We use local storage to remember your music preferences, and load fonts via Google Fonts. ' +
        'Our newsletter is powered by MailerLite. No tracking or ad cookies are used. ' +
        '<a href="/privacy-policy/">Privacy Policy</a>' +
      '</p>' +
      '<button id="mcj-gdpr-accept" class="gdpr-accept">Got it</button>';
    document.body.appendChild(banner);

    document.getElementById('mcj-gdpr-accept').addEventListener('click', function () {
      localStorage.setItem(GDPR_KEY, '1');
      banner.classList.add('dismissed');
      // Restore Buy Me a Coffee bubble
      if (supportFloat) supportFloat.style.visibility = '';
      // Signal toast it can now schedule itself
      document.dispatchEvent(new Event('mcj:gdpr-accepted'));
      setTimeout(function () { banner.remove(); }, 350);
    });
  }

  function highlightEmDashes() {
    var walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          if (node.nodeValue.indexOf('\u2014') === -1) return NodeFilter.FILTER_REJECT;
          var el = node.parentNode;
          if (!el || !el.tagName) return NodeFilter.FILTER_REJECT;
          var tag = el.tagName.toLowerCase();
          if (['script', 'style', 'a', 'button'].indexOf(tag) !== -1) return NodeFilter.FILTER_REJECT;
          if (el.closest('.site-nav, .site-nav-links, .site-mobile-menu, .site-footer')) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    var nodes = [];
    while (walker.nextNode()) { nodes.push(walker.currentNode); }

    nodes.forEach(function (node) {
      var parts = node.nodeValue.split('\u2014');
      if (parts.length < 2) return;
      var frag = document.createDocumentFragment();
      parts.forEach(function (part, i) {
        frag.appendChild(document.createTextNode(part));
        if (i < parts.length - 1) {
          var span = document.createElement('span');
          span.className = 'text-gold';
          span.textContent = '\u2014';
          frag.appendChild(span);
        }
      });
      node.parentNode.replaceChild(frag, node);
    });
  }

  // ----------------------------------------
  // getCTA — look up a named CTA from SITE_CTAS
  // Returns an object usable directly as a navLinks entry
  // When live: false, href becomes '#' automatically
  // ----------------------------------------
  function getCTA(key) {
    var c = SITE_CTAS[key];
    if (!c) return null;
    return {
      label:    c.label,
      href:     c.live ? c.href : '#',
      cta:      c.cta      || false,
      external: c.external || false,
      live:     c.live
    };
  }

  // ----------------------------------------
  // Breadcrumb — rendered into #site-breadcrumb inside each hero
  // Pass breadcrumbs: [{ label, href }, ..., { label }] via SiteComponents.init()
  // Last item has no href — it is the current page, shown in gold
  // ----------------------------------------
  function renderBreadcrumb(crumbs) {
    if (!crumbs || crumbs.length === 0) return '';

    var items = '';
    crumbs.forEach(function (crumb, i) {
      var isLast = i === crumbs.length - 1;
      if (isLast) {
        items += '<li class="site-bc-item site-bc-item--current" aria-current="page">' + crumb.label + '</li>';
      } else {
        items += '<li class="site-bc-item"><a href="' + crumb.href + '" class="site-bc-link">' + crumb.label + '</a></li>';
        items += '<li class="site-bc-sep" aria-hidden="true">/</li>';
      }
    });

    return (
      '<nav class="site-breadcrumb" aria-label="Breadcrumb">' +
        '<ol class="site-bc-list">' + items + '</ol>' +
      '</nav>'
    );
  }

  // ----------------------------------------
  // Newsletter — MailerLite signup form
  // Renders into #site-newsletter; config: { label, desc, buttonText, successText }
  // ----------------------------------------
  function renderNewsletter(config) {
    var checkSvg = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg>';
    return (
      '<p class="hero-newsletter-label">' + config.label + '</p>' +
      '<p class="hero-newsletter-desc">' + config.desc + '</p>' +
      '<div id="mlb2-' + MAILERLITE.formId + '" class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-' + MAILERLITE.formId + '">' +
        '<div class="row-form">' +
          '<form class="ml-block-form hero-newsletter-form"' +
            ' action="https://assets.mailerlite.com/jsonp/' + MAILERLITE.accountId + '/forms/' + MAILERLITE.internalId + '/subscribe"' +
            ' data-code="" method="post" target="_blank">' +
            '<div class="hero-newsletter-fields">' +
              '<input type="text" name="fields[name]" placeholder="Your name" autocomplete="given-name" required>' +
              '<input type="email" name="fields[email]" placeholder="Your email address" autocomplete="email" required>' +
              '<button type="submit" class="btn btn-primary">' + config.buttonText + '</button>' +
            '</div>' +
            '<input type="hidden" name="ml-submit" value="1">' +
            '<input type="hidden" name="anticsrf" value="true">' +
          '</form>' +
        '</div>' +
        '<div class="row-success hero-newsletter-success" style="display:none;">' +
          checkSvg +
          '<span>' + config.successText + '</span>' +
        '</div>' +
      '</div>'
    );
  }

  function initNewsletter(config) {
    var slot = document.getElementById('site-newsletter');
    if (!slot) return;

    slot.innerHTML = renderNewsletter(config);

    // Register MailerLite success callback
    window['ml_webform_success_' + MAILERLITE.formId] = function () {
      document.querySelectorAll('.ml-subscribe-form-' + MAILERLITE.formId + ' .row-form').forEach(function (el) { el.style.display = 'none'; });
      document.querySelectorAll('.ml-subscribe-form-' + MAILERLITE.formId + ' .row-success').forEach(function (el) { el.style.display = 'flex'; });
    };

    // Inject MailerLite script (once per page)
    if (!document.querySelector('script[src*="webforms.min.js"]')) {
      var s = document.createElement('script');
      s.src = MAILERLITE.scriptSrc;
      s.type = 'text/javascript';
      document.body.appendChild(s);
    }

    // View tracking
    fetch('https://assets.mailerlite.com/jsonp/' + MAILERLITE.accountId + '/forms/' + MAILERLITE.internalId + '/takel');
  }

  // ----------------------------------------
  // Reviews Carousel — data-driven, reusable across pages
  // renderReviews(reviews, config) — builds the full section HTML
  // initReviews(reviews, config)  — injects into #site-reviews + attaches behavior
  //
  // Config shape:
  //   label    {string}  — section label above title (default: 'What Readers Are Saying')
  //   title    {string}  — section heading (default: 'Reviews')
  //   cta      {object}  — optional CTA below carousel
  //     label    {string}  — small label above button
  //     text     {string}  — button text
  //     href     {string}  — button href (default: '#')
  //     cssClass {string}  — button classes (default: 'btn btn-primary')
  //     external {boolean} — adds target="_blank" rel="noopener noreferrer"
  //
  // Review object shape:
  //   text       {string}  — review body (HTML-safe)
  //   expandable {boolean} — adds data-expandable + Read more/less toggle
  //   reviewer   {string}  — reviewer name
  //   role       {string}  — reviewer title/location (may contain inline HTML)
  // ----------------------------------------
  function renderReviews(reviews, config) {
    var cfg     = config || {};
    var label   = cfg.label || 'What Readers Are Saying';
    var title   = cfg.title || 'Reviews';
    var cta     = cfg.cta   || null;

    var starsHtml =
      '<div class="review-stars">' +
        '<span>&#9733;</span><span>&#9733;</span><span>&#9733;</span>' +
        '<span>&#9733;</span><span>&#9733;</span>' +
      '</div>';

    var arrowLeft =
      '<button class="reviews-arrow reviews-arrow-left" aria-label="Scroll reviews left">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<polyline points="15 18 9 12 15 6"></polyline>' +
        '</svg>' +
      '</button>';

    var arrowRight =
      '<button class="reviews-arrow reviews-arrow-right" aria-label="Scroll reviews right">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<polyline points="9 18 15 12 9 6"></polyline>' +
        '</svg>' +
      '</button>';

    var cardsHtml = '';
    reviews.forEach(function (r) {
      var expandAttr  = r.expandable ? ' data-expandable' : '';
      var readMoreBtn = r.expandable ? '<button class="review-read-more" hidden>Read more</button>' : '';
      cardsHtml +=
        '<div class="review-card">' +
          starsHtml +
          '<div class="review-quote">' +
            '<div class="review-text"' + expandAttr + '>' +
              '<p>' + r.text + '</p>' +
            '</div>' +
            readMoreBtn +
          '</div>' +
          '<div class="reviewer">' +
            '<strong>' + r.reviewer + '</strong>' +
            '<span>' + r.role + '</span>' +
          '</div>' +
        '</div>';
    });

    var ctaHtml = '';
    if (cta) {
      var btnClass  = cta.cssClass || 'btn btn-primary';
      var btnTarget = cta.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      ctaHtml =
        '<div class="reviews-cta">' +
          (cta.label ? '<p class="reviews-cta-label">' + cta.label + '</p>' : '') +
          '<a href="' + (cta.href || '#') + '" class="' + btnClass + '"' + btnTarget + '>' +
            cta.text +
          '</a>' +
        '</div>';
    }

    return (
      '<section class="section reviews" id="reviews">' +
        '<div class="container">' +
          '<div class="section-header">' +
            '<p class="section-label">' + label + '</p>' +
            '<h2 class="section-title">' + title + '</h2>' +
          '</div>' +
          '<div class="reviews-carousel">' +
            arrowLeft +
            '<div class="reviews-track">' + cardsHtml + '</div>' +
            arrowRight +
          '</div>' +
          ctaHtml +
        '</div>' +
      '</section>'
    );
  }

  function initReviews(reviews, config) {
    var slot = document.getElementById('site-reviews');
    if (!slot) return;

    slot.innerHTML = renderReviews(reviews, config);

    // Carousel scroll
    var track = slot.querySelector('.reviews-track');
    var left  = slot.querySelector('.reviews-arrow-left');
    var right = slot.querySelector('.reviews-arrow-right');

    if (track && left && right) {
      var scrollAmount = 360;

      left.addEventListener('click', function () {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });

      right.addEventListener('click', function () {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });

      function updateArrows() {
        left.disabled  = track.scrollLeft <= 0;
        right.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
      }

      track.addEventListener('scroll', updateArrows, { passive: true });
      updateArrows();
    }

    // Read more / truncation for long reviews
    slot.querySelectorAll('.review-text[data-expandable]').forEach(function (el) {
      var p   = el.querySelector('p');
      var btn = el.parentNode.querySelector('.review-read-more');
      if (!p || !btn || p.textContent.length <= 150) return;

      el.classList.add('clamped');
      btn.hidden = false;

      btn.addEventListener('click', function () {
        var isClamped = el.classList.contains('clamped');
        el.classList.toggle('clamped',  !isClamped);
        el.classList.toggle('expanded',  isClamped);
        btn.textContent = isClamped ? 'Read less' : 'Read more';
      });
    });
  }

  function init(config) {
    config = config || {};

    // Render header (nav + music player notch)
    var navSlot = document.getElementById('site-nav');
    if (navSlot) {
      navSlot.innerHTML = renderHeader(config);
    }

    // Render footer
    var footerSlot = document.getElementById('site-footer');
    if (footerSlot) {
      footerSlot.innerHTML = renderFooter(config);

      // Stamp tooltip — tap to reveal on touch devices
      var stampContainer = footerSlot.querySelector('.site-stamp-container');
      if (stampContainer) {
        stampContainer.addEventListener('click', function (e) {
          var isActive = stampContainer.classList.toggle('is-active');
          if (isActive) e.stopPropagation();
        });
        document.addEventListener('click', function () {
          stampContainer.classList.remove('is-active');
        });
      }
    }

    // Render newsletter form
    if (config.newsletter) {
      initNewsletter(config.newsletter);
    }

    // Render charity callout
    if (config.showCharity) {
      var charitySlot = document.getElementById('site-charity');
      if (charitySlot) charitySlot.innerHTML = renderCharity();
    }

    // Attach behavior
    attachNavBehavior();

    // Gold em dashes on static pages
    highlightEmDashes();

    // Music player notch
    initMusicPlayer();

    // First-visit music toast
    initMusicToast();

    // GDPR notice
    initGdprBanner();
  }

  return { init: init, cta: getCTA, disabledLabel: DISABLED_LABEL, initReviews: initReviews };
})();
