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


  
  













  // ===== SAFE NAV FIX =====
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.querySelector('.nav-links');
    const toggle = document.querySelector('.menu-toggle');

    if (!nav || !toggle) return;

    nav.classList.remove('open');
    toggle.textContent = '☰';
    toggle.setAttribute('aria-expanded', false);
  });
});


// ===== GALLERY DATA =====
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
    "assets/images/dog3.mp4",
    "assets/images/dog4.mp4"
  ],
  birds: [
    "assets/images/bird1.jpg",
    "assets/images/bird2.mp4",
    "assets/images/bird3.mp4",
    "assets/images/bird4.mp4",
    "assets/images/bird5.mp4"
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


// ===== OPEN =====
function openGallery(type, index) {
  currentGallery = galleryData[type];
  currentIndex = index;

  showMedia();
  document.getElementById("lightbox").classList.add("active");
}


// ===== SHOW MEDIA =====
function showMedia() {
  const img = document.getElementById("lightbox-img");
  const video = document.getElementById("lightbox-video");
  const src = currentGallery[currentIndex];

  if (!img || !video) return;

  if (src.endsWith(".mp4")) {
    img.style.display = "none";
    video.style.display = "block";
    video.src = src;
    video.play();
  } else {
    video.pause();
    video.style.display = "none";
    img.style.display = "block";
    img.src = src;
  }
}


// ===== NEXT / PREV =====
function nextImage() {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  showMedia();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  showMedia();
}


// ===== CLOSE (FIXED) =====
function closeGallery() {
  const lightbox = document.getElementById("lightbox");
  const video = document.getElementById("lightbox-video");

  lightbox.classList.remove("active");

  if (video) {
    video.pause();
    video.currentTime = 0;
  }
}


// ===== GLOBAL ACCESS =====
window.openGallery = openGallery;
window.closeGallery = closeGallery;
window.nextImage = nextImage;
window.prevImage = prevImage;


// ===== CLICK OUTSIDE TO CLOSE =====
document.getElementById("lightbox").addEventListener("click", function(e) {
  if (e.target.id === "lightbox") {
    closeGallery();
  }
});