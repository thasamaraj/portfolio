document.addEventListener('DOMContentLoaded', async () => {

  async function loadPartial(id, file) {
    const el = document.getElementById(id);
    if (!el) return;

    const res = await fetch(file);
    el.innerHTML = await res.text();
  }

  await loadPartial('header', 'header.html');
  await loadPartial('footer', 'footer.html');

  // 🔑 Activate correct menu item
  setActiveMenu();
});

  


  function setActiveMenu() {
    const currentPage =
      location.pathname.split('/').pop() || 'index.html';
  
    document.querySelectorAll('.nav-links a').forEach(link => {
      const linkPage = link.getAttribute('href');
  
      if (linkPage === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  


document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
  
    if (!toggle || !nav) return;
  
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
  
      // Change icon
      toggle.textContent = isOpen ? '✕' : '☰';
  
      // Accessibility (bonus, but good practice)
      toggle.setAttribute('aria-expanded', isOpen);
    });
  });

  
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.textContent = '☰';
      toggle.setAttribute('aria-expanded', false);
    });
  });


  
  





  const galleryData = {
    wood: [
      "assets/images/wood1.jpg",
      "assets/images/wood2.jpg",
      "assets/images/wood3.jpg",
      "assets/images/wood4.jpg",
      "assets/images/wood5.jpg",
      "assets/images/wood6.jpg"
    ],
    dogs: [
      "assets/images/dog1.jpg",
      "assets/images/dog2.jpg",
      "assets/images/dog3.mov",
      "assets/images/dog4.mov"
    ],
    birds: [
      "assets/images/bird1.jpg",
      "assets/images/bird2.mov",
      "assets/images/bird3.mov",
      "assets/images/bird4.mov",
      "assets/images/bird5.mov"
    ],
    craft: [
      "assets/images/craft1.jpg",
      "assets/images/craft2.jpg",      
      "assets/images/craft3.jpg",
      "assets/images/craft4.jpg",
      "assets/images/craft5.jpg",
      "assets/images/craft6.jpg"
    ]
  };
  
  let currentGallery = [];
  let currentIndex = 0;
  
  function openGallery(type, index) {
    currentGallery = galleryData[type];
    currentIndex = index;
  
    document.getElementById("lightbox-img").src = currentGallery[currentIndex];
    document.getElementById("lightbox").classList.add("active");
  }
  
  function closeGallery() {
    document.getElementById("lightbox").classList.remove("active");
  }
  
  function nextImage() {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    document.getElementById("lightbox-img").src = currentGallery[currentIndex];
  }
  
  function prevImage() {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    document.getElementById("lightbox-img").src = currentGallery[currentIndex];
  }


  window.openGallery = openGallery;
  window.closeGallery = closeGallery;
  window.nextImage = nextImage;
  window.prevImage = prevImage;