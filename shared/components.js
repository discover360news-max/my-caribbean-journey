// ===========================================
// MY CARIBBEAN JOURNEY - Shared Components
// Nav + Footer rendered from config
// ===========================================

var SiteComponents = (function () {
  'use strict';

  function renderNav(config) {
    var links = config.navLinks || [];
    var linksHtml = '';
    var mobileLinksHtml = '';

    links.forEach(function (link) {
      var cssClass = link.cta ? ' class="site-nav-cta"' : '';
      var target = link.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      linksHtml += '<a href="' + link.href + '"' + cssClass + target + '>' + link.label + '</a>';
      mobileLinksHtml += '<a href="' + link.href + '"' + cssClass + target + '>' + link.label + '</a>';
    });

    return (
      '<nav class="site-nav" id="site-nav-bar">' +
        '<div class="site-nav-inner">' +
          '<a href="/" class="site-nav-logo">My Caribbean Journey</a>' +
          '<div class="site-nav-links">' + linksHtml + '</div>' +
          '<button class="site-nav-toggle" id="site-nav-toggle" aria-label="Toggle menu">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
      '</nav>' +
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
    var nav = document.getElementById('site-nav-bar');
    var toggle = document.getElementById('site-nav-toggle');
    var mobileMenu = document.getElementById('site-mobile-menu');
    if (!nav) return;

    // Scroll effect
    function handleScroll() {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
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

  function init(config) {
    config = config || {};

    // Render nav
    var navSlot = document.getElementById('site-nav');
    if (navSlot) {
      navSlot.innerHTML = renderNav(config);
    }

    // Render footer
    var footerSlot = document.getElementById('site-footer');
    if (footerSlot) {
      footerSlot.innerHTML = renderFooter(config);
    }

    // Attach behavior
    attachNavBehavior();
  }

  return { init: init };
})();
