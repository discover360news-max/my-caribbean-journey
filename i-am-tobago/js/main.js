// ===========================================
// I AM TOBAGO - Landing Page Interactions
// ===========================================

(function () {
  'use strict';

  // --- Book buy config (edit url + live in shared/components.js → SITE_CTAS['i-am-tobago-buy']) ---
  var buyCTA = SiteComponents.cta('i-am-tobago-buy');

  document.querySelectorAll('.amazon-book-link').forEach(function (el) {
    el.href = buyCTA.href;
    if (!buyCTA.live) {
      el.setAttribute('aria-disabled', 'true');
      el.setAttribute('data-tooltip', SiteComponents.disabledLabel);
      el.classList.add('btn-disabled');
      el.removeAttribute('target');
      el.removeAttribute('rel');
    }
  });

  // --- Hero firefly light flares ---
  var canvas = document.getElementById('hero-fireflies');
  var ctx = canvas.getContext('2d');
  var fireflies = [];
  var fireflyCount = 18;
  var heroEl = document.getElementById('hero');
  var animating = true;

  function resizeCanvas() {
    canvas.width = heroEl.offsetWidth;
    canvas.height = heroEl.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function createFirefly() {
    // Weighted random: 60% warm gold, 25% pale green, 15% soft orange
    var roll = Math.random();
    var hue, sat, light;
    if (roll < 0.60) {
      // Warm gold / amber
      hue = 38 + Math.random() * 12;    // 38-50
      sat = 85 + Math.random() * 15;
      light = 60 + Math.random() * 15;
    } else if (roll < 0.85) {
      // Pale ghostly green
      hue = 100 + Math.random() * 30;   // 100-130
      sat = 40 + Math.random() * 20;
      light = 55 + Math.random() * 20;
    } else {
      // Soft ember orange
      hue = 15 + Math.random() * 15;    // 15-30
      sat = 80 + Math.random() * 20;
      light = 55 + Math.random() * 15;
    }

    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 1.5 + Math.random() * 2.5,
      glowRadius: 20 + Math.random() * 35,
      // Drift velocity — very slow, ethereal movement
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      // Each firefly pulses at its own rhythm
      pulseSpeed: 0.008 + Math.random() * 0.015,
      pulseOffset: Math.random() * Math.PI * 2,
      // Wander — slow directional changes
      wanderAngle: Math.random() * Math.PI * 2,
      wanderSpeed: 0.002 + Math.random() * 0.005,
      hue: hue,
      sat: sat,
      light: light
    };
  }

  for (var i = 0; i < fireflyCount; i++) {
    fireflies.push(createFirefly());
  }

  function drawFireflies(time) {
    if (!animating) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < fireflies.length; i++) {
      var f = fireflies[i];

      // Pulse opacity (smooth sine wave)
      var pulse = Math.sin(time * f.pulseSpeed + f.pulseOffset);
      // Map from [-1,1] to [0.05, 0.7] — never fully invisible, never too bright
      var opacity = 0.05 + (pulse + 1) * 0.325;

      // Wander — slowly change direction
      f.wanderAngle += (Math.random() - 0.5) * f.wanderSpeed;
      f.vx += Math.cos(f.wanderAngle) * 0.01;
      f.vy += Math.sin(f.wanderAngle) * 0.01;

      // Dampen velocity so they don't accelerate forever
      f.vx *= 0.99;
      f.vy *= 0.99;

      f.x += f.vx;
      f.y += f.vy;

      // Wrap around edges with padding
      if (f.x < -50) f.x = canvas.width + 50;
      if (f.x > canvas.width + 50) f.x = -50;
      if (f.y < -50) f.y = canvas.height + 50;
      if (f.y > canvas.height + 50) f.y = -50;

      // Outer glow
      var glow = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.glowRadius);
      glow.addColorStop(0, 'hsla(' + f.hue + ', ' + f.sat + '%, ' + f.light + '%, ' + (opacity * 0.4) + ')');
      glow.addColorStop(0.4, 'hsla(' + f.hue + ', ' + f.sat + '%, ' + f.light + '%, ' + (opacity * 0.15) + ')');
      glow.addColorStop(1, 'hsla(' + f.hue + ', ' + f.sat + '%, ' + f.light + '%, 0)');

      ctx.beginPath();
      ctx.arc(f.x, f.y, f.glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Bright core
      var core = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
      core.addColorStop(0, 'hsla(' + f.hue + ', 100%, 85%, ' + opacity + ')');
      core.addColorStop(1, 'hsla(' + f.hue + ', ' + f.sat + '%, ' + f.light + '%, 0)');

      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      ctx.fillStyle = core;
      ctx.fill();
    }

    requestAnimationFrame(drawFireflies);
  }

  requestAnimationFrame(drawFireflies);

  // Pause when hero is not visible (save battery)
  var heroObserver = new IntersectionObserver(function (entries) {
    animating = entries[0].isIntersecting;
    if (animating) requestAnimationFrame(drawFireflies);
  }, { threshold: 0 });
  heroObserver.observe(heroEl);

  // --- Navbar scroll effect (handled by shared components.js) ---
  // Legacy nav code removed — shared SiteComponents handles nav behavior

  // --- Scroll-based fade-in animations ---
  var animatedElements = document.querySelectorAll(
    '.about-card, .feature, .review-card, .about-excerpt, .author-layout, .buy-layout'
  );

  animatedElements.forEach(function (el) {
    el.classList.add('fade-in');
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  animatedElements.forEach(function (el) {
    observer.observe(el);
  });

  // --- Reviews carousel scroll ---
  var reviewsTrack = document.querySelector('.reviews-track');
  var arrowLeft = document.querySelector('.reviews-arrow-left');
  var arrowRight = document.querySelector('.reviews-arrow-right');

  if (reviewsTrack && arrowLeft && arrowRight) {
    var scrollAmount = 360;

    arrowLeft.addEventListener('click', function () {
      reviewsTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    arrowRight.addEventListener('click', function () {
      reviewsTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    function updateArrows() {
      arrowLeft.disabled = reviewsTrack.scrollLeft <= 0;
      arrowRight.disabled = reviewsTrack.scrollLeft + reviewsTrack.clientWidth >= reviewsTrack.scrollWidth - 1;
    }

    reviewsTrack.addEventListener('scroll', updateArrows, { passive: true });
    updateArrows();
  }

  // --- Read more / truncation for long reviews ---
  document.querySelectorAll('.review-text[data-expandable]').forEach(function (el) {
    var p = el.querySelector('p');
    if (!p) return;

    // Only clamp if text is long enough to need it
    if (p.textContent.length > 150) {
      el.classList.add('clamped');

      var btn = document.createElement('button');
      btn.className = 'review-read-more';
      btn.textContent = 'Read more';
      el.parentNode.insertBefore(btn, el.nextSibling);

      btn.addEventListener('click', function () {
        var isClamped = el.classList.contains('clamped');
        if (isClamped) {
          el.classList.remove('clamped');
          el.classList.add('expanded');
          btn.textContent = 'Read less';
        } else {
          el.classList.add('clamped');
          el.classList.remove('expanded');
          btn.textContent = 'Read more';
        }
      });
    }
  });

  // --- Firefly hover effect on .btn-firefly buttons ---
  function spawnBtnFirefly(btn, delay) {
    setTimeout(function () {
      var dot = document.createElement('span');
      var size = 4 + Math.random() * 4;
      var startX = Math.random() * btn.offsetWidth;
      var startY = Math.random() * btn.offsetHeight;
      var driftX = (Math.random() - 0.5) * 30;
      var driftY = -(15 + Math.random() * 25);
      var palettes = [
        'rgba(212, 160, 48, 0.9)',
        'rgba(232, 184, 74, 0.85)',
        'rgba(45, 107, 69, 0.7)'
      ];
      var color = palettes[Math.floor(Math.random() * palettes.length)];

      dot.style.cssText = [
        'position: absolute',
        'pointer-events: none',
        'border-radius: 50%',
        'width: ' + size + 'px',
        'height: ' + size + 'px',
        'left: ' + startX + 'px',
        'top: ' + startY + 'px',
        'background: ' + color,
        'box-shadow: 0 0 ' + (size * 2.5) + 'px ' + color,
        'transform: translate(-50%, -50%) scale(1)',
        'opacity: 0.9',
        'transition: transform 0.9s ease-out, opacity 0.9s ease-out'
      ].join('; ');

      btn.appendChild(dot);

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          dot.style.transform = 'translate(calc(-50% + ' + driftX + 'px), calc(-50% + ' + driftY + 'px)) scale(0.1)';
          dot.style.opacity = '0';
        });
      });

      setTimeout(function () {
        if (dot.parentNode) dot.parentNode.removeChild(dot);
      }, 1000);
    }, delay);
  }

  document.querySelectorAll('.btn-firefly').forEach(function (btn) {
    btn.addEventListener('mouseenter', function () {
      for (var i = 0; i < 6; i++) {
        spawnBtnFirefly(btn, i * 80);
      }
    });
  });

  // --- Ambient fireflies on the stores section ---
  var storesSection = document.getElementById('stores');
  var storeFireflyInterval = null;

  if (storesSection) {
    storesSection.addEventListener('mouseenter', function () {
      storeFireflyInterval = setInterval(function () {
        var dot = document.createElement('span');
        var size = 4 + Math.random() * 5;
        var startX = Math.random() * storesSection.offsetWidth;
        var startY = Math.random() * storesSection.offsetHeight;
        var driftX = (Math.random() - 0.5) * 40;
        var driftY = -(20 + Math.random() * 40);
        var palettes = [
          'rgba(212, 160, 48, 0.85)',
          'rgba(232, 184, 74, 0.8)',
          'rgba(45, 107, 69, 0.65)'
        ];
        var color = palettes[Math.floor(Math.random() * palettes.length)];

        dot.style.cssText = [
          'position: absolute',
          'pointer-events: none',
          'border-radius: 50%',
          'z-index: 5',
          'width: ' + size + 'px',
          'height: ' + size + 'px',
          'left: ' + startX + 'px',
          'top: ' + startY + 'px',
          'background: ' + color,
          'box-shadow: 0 0 ' + (size * 3) + 'px ' + color,
          'transform: translate(-50%, -50%) scale(1)',
          'opacity: 0.85',
          'transition: transform 1.2s ease-out, opacity 1.2s ease-out'
        ].join('; ');

        storesSection.appendChild(dot);

        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            dot.style.transform = 'translate(calc(-50% + ' + driftX + 'px), calc(-50% + ' + driftY + 'px)) scale(0.1)';
            dot.style.opacity = '0';
          });
        });

        setTimeout(function () {
          if (dot.parentNode) dot.parentNode.removeChild(dot);
        }, 1300);
      }, 180);
    });

    storesSection.addEventListener('mouseleave', function () {
      clearInterval(storeFireflyInterval);
      storeFireflyInterval = null;
    });
  }

  // --- Newsletter form --- replace URL with your Mailchimp form action ---
  var MAILCHIMP_URL_BOOK = 'http://eepurl.com/jzTWJk';
  var newsletterForm = document.getElementById('newsletter-form-book');
  var newsletterSuccess = document.getElementById('newsletter-success-book');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = newsletterForm.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      var fname = newsletterForm.querySelector('[name="FNAME"]').value.trim();
      var email = newsletterForm.querySelector('[name="EMAIL"]').value.trim();

      btn.disabled = true;
      btn.textContent = 'Subscribing…';

      var callbackName = 'mc_cb_' + Date.now();
      var params = 'FNAME=' + encodeURIComponent(fname) + '&EMAIL=' + encodeURIComponent(email);
      var url = MAILCHIMP_URL_BOOK.replace('/post?', '/post-json?') + '&' + params + '&c=' + callbackName;

      var script = document.createElement('script');
      window[callbackName] = function (data) {
        delete window[callbackName];
        document.head.removeChild(script);
        if (data.result === 'success') {
          newsletterForm.style.display = 'none';
          newsletterSuccess.removeAttribute('hidden');
        } else {
          btn.disabled = false;
          btn.textContent = originalText;
          var msg = (data.msg || '').replace(/<[^>]+>/g, '');
          newsletterSuccess.textContent = msg.indexOf('already subscribed') !== -1
            ? 'You\'re already on the list!'
            : 'Something went wrong. Please try again.';
          newsletterSuccess.removeAttribute('hidden');
        }
      };
      script.src = url;
      document.head.appendChild(script);
    });
  }

  // --- Auto-expand stores section when navigated to ---
  function openStoresSection() {
    var storesToggle = document.getElementById('stores-toggle');
    var storesContent = document.getElementById('stores-content');
    if (storesToggle && storesContent && storesToggle.getAttribute('aria-expanded') !== 'true') {
      storesToggle.setAttribute('aria-expanded', 'true');
      storesContent.removeAttribute('hidden');
    }
  }

  // Handle direct page load with #stores hash (e.g. shared link)
  if (window.location.hash === '#stores') {
    openStoresSection();
  }

  // --- Smooth scroll for anchor links (fallback for older browsers) ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        if (targetId === '#stores') openStoresSection();
        var offset = 70; // nav height
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
})();
