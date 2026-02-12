(function () {
  var images = document.querySelectorAll('.hero-reel-img');
  var flash = document.getElementById('hero-flash');
  if (!images.length || !flash) return;

  var current = 0;
  var total = images.length;

  // Random duration between min and max (in ms)
  function randomDelay(min, max) {
    return min + Math.random() * (max - min);
  }

  function advance() {
    // Trigger white flash
    flash.classList.add('flash');

    setTimeout(function () {
      // Swap image during flash
      images[current].classList.remove('active');
      current = (current + 1) % total;
      images[current].classList.add('active');

      // Clear flash
      setTimeout(function () {
        flash.classList.remove('flash');
      }, 80);
    }, 80);

    // Schedule next with random timing:
    // Mix of quick flashes (300-800ms) and longer holds (1.5-3.5s)
    var next;
    if (Math.random() < 0.4) {
      // 40% chance: quick flash
      next = randomDelay(300, 800);
    } else {
      // 60% chance: longer hold
      next = randomDelay(1500, 3500);
    }

    setTimeout(advance, next);
  }

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Start after a brief initial hold on first image
  setTimeout(advance, 2000);
})();
