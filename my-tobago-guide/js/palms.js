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

  var target  = 0;
  var current = 0;
  var raf     = null;

  function getMaxScroll() {
    return document.documentElement.scrollHeight - window.innerHeight;
  }

  function apply(p) {
    var dx = (1 - p) * 65;
    leftSide.style.opacity  = p;
    leftSide.style.transform  = 'translateX(' + (-dx) + 'px)';
    rightSide.style.opacity = p;
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
    var maxScroll = getMaxScroll();
    target = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: true });

  // Set initial hidden state
  apply(0);
})();
