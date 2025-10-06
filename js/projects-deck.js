// Minimal slider logic: full-viewport slides, smooth step, mobile-aware
(function () {
    const deck = document.querySelector('.projects-deck .deck');
    if (!deck) return;
  
    const track  = deck.querySelector('.track');
    const slides = Array.from(deck.querySelectorAll('.slide'));
    const prev   = deck.querySelector('.arrow.prev');
    const next   = deck.querySelector('.arrow.next');
  
    let index = 0;
  
    function isMobile() {
      return window.matchMedia('(max-width: 759.98px)').matches;
    }
  
    function goTo(i) {
      index = (i + slides.length) % slides.length; // wrap-around
      if (isMobile()) {
        track.style.transform = 'none';
        return;
      }
      const w = window.innerWidth; // each slide = 100vw
      track.style.transform = `translate3d(${-index * w}px, 0, 0)`;
    }
  
    // Wire arrows
    prev.addEventListener('click', () => goTo(index - 1));
    next.addEventListener('click', () => goTo(index + 1));
  
    // Recompute on resize (keeps current slide aligned)
    window.addEventListener('resize', () => goTo(index));
  
    // Init
    goTo(0);
  })();
  