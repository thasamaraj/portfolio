// js/scroll-spy.js
(() => {
    const linkSelector = '.nav a[href^="#"], .nav-mobile .sheet a[href^="#"]';
    const links = Array.from(document.querySelectorAll(linkSelector));
    if (!links.length) return;
  
    // Map links -> sections (unique, existing)
    const sections = [...new Set(
      links.map(a => document.querySelector(a.hash)).filter(Boolean)
    )];
  
    // Apply "active" to all matching links for the given id
    function setActive(id) {
      links.forEach(a => a.classList.toggle('active', a.hash === '#' + id));
    }
  
    // Close the mobile <details> when a link is tapped
    const mobileDetails = document.querySelector('.nav-mobile');
    links.forEach(a => a.addEventListener('click', () => {
      if (mobileDetails && mobileDetails.open) mobileDetails.open = false;
    }));
  
    // --- IntersectionObserver version (preferred) ---
    if ('IntersectionObserver' in window) {
      const ratios = new Map(sections.map(s => [s.id, 0]));
  
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        });
        // Choose the section with the highest visibility ratio
        let best = sections[0]?.id;
        let bestRatio = -1;
        for (const [id, r] of ratios) {
          if (r > bestRatio) { best = id; bestRatio = r; }
        }
        if (best) setActive(best);
      }, {
        root: null,
        rootMargin: '-45% 0px -50% 0px',  // center bias
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
      });
  
      sections.forEach(sec => io.observe(sec));
    } else {
      // --- Fallback for older browsers: scroll + rAF ---
      const midActive = () => {
        const mid = window.scrollY + window.innerHeight * 0.5;
        let current = sections[0];
        for (const sec of sections) {
          const top = sec.getBoundingClientRect().top + window.scrollY;
          if (top <= mid) current = sec;
        }
        if (current) setActive(current.id);
      };
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => { midActive(); ticking = false; });
          ticking = true;
        }
      }, { passive: true });
      window.addEventListener('resize', midActive);
      midActive();
    }
  
    // Initial state
    window.addEventListener('load', () => {
      if (location.hash && document.querySelector(location.hash)) {
        setActive(location.hash.slice(1));
      } else if (sections[0]) {
        setActive(sections[0].id);
      }
    });
  })();
  




  // Make only the panel area behave like a link, without blocking arrows/inner links
(function () {
  const panels = document.querySelectorAll('.projects-deck .panel[data-url]');
  if (!panels.length) return;

  function hasSelection() {
    const s = window.getSelection && window.getSelection().toString();
    return s && s.length > 0;
  }

  panels.forEach(panel => {
    const url = panel.getAttribute('data-url');

    panel.addEventListener('click', (e) => {
      // Don’t hijack clicks on real controls inside
      if (e.target.closest('a, button, .arrow')) return;
      if (hasSelection()) return; // don't navigate if the user selected text
      if (url) window.open(url, '_blank');
    });

    panel.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (url) window.open(url, '_blank');
      }
    });
  });
})();
