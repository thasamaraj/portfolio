// Concept Sketches: horizontal strip + lightbox carousel
(function () {
    const gallery = document.querySelector('.sketch-strip[data-gallery="sketches"]');
    const lightbox = document.getElementById('lightbox-sketches');
    if (!gallery || !lightbox) return;
  
    const thumbs = Array.from(gallery.querySelectorAll('.sketch'));
    const imgEl = lightbox.querySelector('.lb-img');
    const capEl = lightbox.querySelector('.lb-caption');
    const closeBtn = lightbox.querySelector('.lb-close');
    const bgBtn = lightbox.querySelector('.lb-bg');
    const prevBtn = lightbox.querySelector('.lb-arrow.prev');
    const nextBtn = lightbox.querySelector('.lb-arrow.next');
  
    // Build items array
    const items = thumbs.map(btn => ({
      full: btn.getAttribute('data-full') || btn.querySelector('img')?.src || '',
      alt:  btn.querySelector('img')?.alt || ''
    }));
    let i = 0;
  
    function render() {
      const it = items[i];
      imgEl.src = it.full;
      imgEl.alt = it.alt;
      capEl.textContent = it.alt || '';
      prevBtn.disabled = (i === 0);
      nextBtn.disabled = (i === items.length - 1);
    }
  
    function openAt(idx) {
      i = Math.max(0, Math.min(items.length - 1, idx));
      document.body.classList.add('modal-open');
      lightbox.setAttribute('aria-hidden', 'false');
      render();
      // focus for keyboard nav
      nextBtn.focus();
    }
  
    function close() {
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      imgEl.src = '';
    }
  
    // Click a thumbnail to open
    thumbs.forEach((btn, idx) => btn.addEventListener('click', () => openAt(idx)));
  
    // Controls
    prevBtn.addEventListener('click', () => { if (i > 0) { i--; render(); } });
    nextBtn.addEventListener('click', () => { if (i < items.length - 1) { i++; render(); } });
    closeBtn.addEventListener('click', close);
    bgBtn.addEventListener('click', close);
  
    // Keyboard support
    window.addEventListener('keydown', (e) => {
      if (lightbox.getAttribute('aria-hidden') === 'true') return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn.click();
    });
  
    // Basic swipe support on the image
    let startX = null;
    imgEl.addEventListener('pointerdown', (e) => { startX = e.clientX; imgEl.setPointerCapture(e.pointerId); });
    imgEl.addEventListener('pointerup', (e) => {
      if (startX == null) return;
      const dx = e.clientX - startX;
      if (dx > 40) prevBtn.click();
      if (dx < -40) nextBtn.click();
      startX = null;
    });
  })();
  