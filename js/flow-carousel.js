// Minimal carousel for the User Flow images
(function () {
    document.querySelectorAll('.flow-carousel').forEach(setup);
  
    function setup(root) {
      const track = root.querySelector('.flow-track');
      const slides = Array.from(root.querySelectorAll('.flow-slide'));
      const prev = root.querySelector('.flow-arrow.prev');
      const next = root.querySelector('.flow-arrow.next');
      let i = 0;
  
      function update() {
        track.style.transform = `translateX(${-i * 100}%)`;
        prev.disabled = (i === 0);
        next.disabled = (i === slides.length - 1);
      }
  
      prev.addEventListener('click', () => { if (i > 0) { i--; update(); } });
      next.addEventListener('click', () => { if (i < slides.length - 1) { i++; update(); } });
  
      // Keyboard navigation when the carousel is focused
      root.setAttribute('tabindex', '0');
      root.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prev.click();
        if (e.key === 'ArrowRight') next.click();
      });
  
      update();
    }
  })();
  