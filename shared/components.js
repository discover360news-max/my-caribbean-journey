// ===========================================
// MY CARIBBEAN JOURNEY - Shared Components
// Nav + Footer rendered from config
// ===========================================

var SiteComponents = (function () {
  'use strict';

  // ----------------------------------------
  // Charity data — update once, reflects everywhere
  // ----------------------------------------
  var CHARITY = {
    label:   'Giving Back',
    heading: 'A portion of proceeds from book sales is donated to',
    name:    'Charity Begins at Home',
    desc:    'Supplying book supplies to underprivileged kids of the Caribbean.',
    url:     'https://www.facebook.com/charitybeginsathomeandendsabroad/',
    cta:     'Learn About the Cause'
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

    return (
      '<header class="site-header" id="site-header">' +
        '<nav class="site-nav" id="site-nav-bar">' +
          '<div class="site-nav-inner">' +
            '<a href="/" class="site-nav-logo"><img src="/images/my-caribbean-journey-tpbg.png" alt="" class="site-nav-logo-img" aria-hidden="true">My Caribbean Journey</a>' +
            '<div class="site-nav-links">' + linksHtml + '</div>' +
            '<button class="site-nav-toggle" id="site-nav-toggle" aria-label="Toggle menu">' +
              '<span></span><span></span><span></span>' +
            '</button>' +
          '</div>' +
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
    var linksHtml = '';
    var year = new Date().getFullYear();
    var isTobago = window.location.pathname.toLowerCase().indexOf('tobago') !== -1;
    var supportLabel = isTobago ? '&#9749; Buy me some Blue Food' : '&#9749; Buy me a coffee';

    links.forEach(function (link) {
      var target = link.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      linksHtml += '<a href="' + link.href + '"' + target + '>' + link.label + '</a>';
    });
    // Privacy Policy always present in footer
    if (window.location.pathname !== '/privacy-policy/') {
      linksHtml += '<a href="/privacy-policy/">Privacy Policy</a>';
    }

    return (
      '<footer class="site-footer">' +
        '<div class="container">' +
          '<div class="site-footer-content">' +
            '<div>' +
              '<p class="site-footer-logo">My Caribbean Journey</p>' +
              '<p class="site-footer-tagline">Stories from the islands</p>' +
            '</div>' +
            '<div class="site-footer-links">' + linksHtml + '</div>' +
          '</div>' +
          '<div class="site-footer-bottom">' +
            '<p>&copy; ' + year + ' My Caribbean Journey. All rights reserved.</p>' +
            '<a href="https://buymeacoffee.com/mycaribbeanjourney" class="footer-support" target="_blank" rel="noopener noreferrer">' + supportLabel + '</a>' +
          '</div>' +
        '</div>' +
      '</footer>'
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
            '<a href="' + CHARITY.url + '" class="btn btn-primary" target="_blank" rel="noopener noreferrer">' + CHARITY.cta + '</a>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
  }

  // ----------------------------------------
  // Music Player — audio logic (HTML lives in renderHeader)
  // ----------------------------------------
  function initMusicPlayer() {
    var STORAGE_KEY = 'mcj_music_session';
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

    // Wire play/pause button
    var playBtn = document.getElementById('mcj-play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', function () {
        if (isPlaying) {
          audio.pause();
          setPlayState(false);
        } else {
          audio.muted  = isMuted;
          audio.volume = isMuted ? 0 : TARGET_VOL;
          audio.play();
          setPlayState(true);
          sessionStorage.setItem(STORAGE_KEY, 'started');
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

    // Show sound icon on load (playing unmuted after fade)
    setMuteState(false);

    // Autoplay on first session visit; pause on subsequent pages
    var hasStarted = sessionStorage.getItem(STORAGE_KEY);
    if (!hasStarted) {
      audio.play().then(function () {
        setPlayState(true);
        sessionStorage.setItem(STORAGE_KEY, 'started');
        fadeIn();
      }).catch(function () {
        // Autoplay blocked — ready to play when user presses play
        audio.muted  = false;
        audio.volume = TARGET_VOL;
        setPlayState(false);
      });
    } else {
      audio.muted  = false;
      audio.volume = TARGET_VOL;
      setPlayState(false);
    }
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
        'Our newsletter is powered by Mailchimp. No tracking or ad cookies are used. ' +
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
    // Skip blog post pages — prose content handles its own rhythm
    if (document.querySelector('.prose')) return;

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
          if (el.closest('.site-nav, .site-nav-links, .site-mobile-menu, .site-footer, .music-player')) return NodeFilter.FILTER_REJECT;
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

  return { init: init };
})();
