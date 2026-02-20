// ===========================================
// MY TOBAGO GUIDE - Palm frond scroll effect
// Fronds slide in from the sides as user
// scrolls down, reverse on scroll back up.
// ===========================================

(function () {
  'use strict';

  var leftSide  = document.querySelector('.palm-side--left');
  var rightSide = document.querySelector('.palm-side--right');
  if (!leftSide || !rightSide) return;

  var SCROLL_RANGE = 450; // px of scroll to reach full reveal
  var target  = 0;
  var current = 0;
  var raf     = null;

  function apply(p) {
    var opacity = Math.min(p * 1.6, 1);
    var dx = (1 - p) * 65;
    leftSide.style.opacity  = opacity;
    leftSide.style.transform  = 'translateX(' + (-dx) + 'px)';
    rightSide.style.opacity = opacity;
    rightSide.style.transform = 'translateX(' + dx + 'px)';
  }

  function tick() {
    current += (target - current) * 0.07;
    apply(current);
    if (Math.abs(target - current) > 0.001) {
      raf = requestAnimationFrame(tick);
    } else {
      apply(target);
      raf = null;
    }
  }

  window.addEventListener('scroll', function () {
    target = Math.min(window.scrollY / SCROLL_RANGE, 1);
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: true });

  // Set initial hidden state
  apply(0);
})();
