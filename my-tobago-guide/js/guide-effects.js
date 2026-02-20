// ===========================================
// MY TOBAGO GUIDE - Card firefly hover effect
// Fireflies spawn from guide cards on hover
// and drift outward beyond the card edges.
// ===========================================

(function () {
  'use strict';

  var grid = document.getElementById('guide-grid');
  if (!grid) return;

  var palettes = [
    'rgba(212, 160, 48, 0.9)',
    'rgba(232, 184, 74, 0.85)',
    'rgba(45, 107, 69, 0.75)',
    'rgba(212, 160, 48, 0.7)'
  ];

  function spawnFirefly(card) {
    var dot = document.createElement('span');
    var size = 3 + Math.random() * 5;
    var startX = 10 + Math.random() * (card.offsetWidth - 20);
    var startY = 10 + Math.random() * (card.offsetHeight - 20);
    // Drift freely in any direction, venturing past card edges
    var driftX = (Math.random() - 0.5) * 70;
    var driftY = -(20 + Math.random() * 50);
    var color = palettes[Math.floor(Math.random() * palettes.length)];

    dot.style.cssText = [
      'position: absolute',
      'pointer-events: none',
      'border-radius: 50%',
      'z-index: 10',
      'width: ' + size + 'px',
      'height: ' + size + 'px',
      'left: ' + startX + 'px',
      'top: ' + startY + 'px',
      'background: ' + color,
      'box-shadow: 0 0 ' + (size * 3) + 'px ' + color,
      'transform: translate(-50%, -50%) scale(1)',
      'opacity: 0.9',
      'transition: transform 1.1s ease-out, opacity 1.1s ease-out'
    ].join('; ');

    card.appendChild(dot);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        dot.style.transform = 'translate(calc(-50% + ' + driftX + 'px), calc(-50% + ' + driftY + 'px)) scale(0.1)';
        dot.style.opacity = '0';
      });
    });

    setTimeout(function () {
      if (dot.parentNode) dot.parentNode.removeChild(dot);
    }, 1200);
  }

  // Event delegation — works even after cards are re-rendered by search/filter
  grid.addEventListener('mouseover', function (e) {
    var card = e.target.closest('.guide-card');
    if (!card || card._fireflyInterval) return;
    card._fireflyInterval = setInterval(function () {
      spawnFirefly(card);
    }, 160);
  });

  grid.addEventListener('mouseout', function (e) {
    var card = e.target.closest('.guide-card');
    if (!card) return;
    // Only stop if the mouse has actually left the card
    if (!card.contains(e.relatedTarget)) {
      clearInterval(card._fireflyInterval);
      card._fireflyInterval = null;
    }
  });

})();
