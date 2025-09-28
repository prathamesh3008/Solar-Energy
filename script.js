// ============================
// NAVBAR: Mobile toggle & dropdown
// ============================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Close mobile menu if clicking outside
window.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
    navLinks.classList.remove('show');
  }
});

// ============================
// MODALS: Founders
// ============================
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'flex';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'none';
}

// Close modal if clicking outside
window.addEventListener('click', (e) => {
  document.querySelectorAll('.modal').forEach(modal => {
    if (e.target === modal) modal.style.display = 'none';
  });
});

// ============================
// HERO SLIDESHOW
// ============================
let slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let slideInterval = setInterval(nextSlideAuto, 4000);

function updateSlides() {
  slides.forEach((slide, i) => {
    slide.classList.remove('active', 'prev', 'next');
    if (i === currentSlide) slide.classList.add('active');
    else if (i === (currentSlide - 1 + slides.length) % slides.length) slide.classList.add('prev');
    else if (i === (currentSlide + 1) % slides.length) slide.classList.add('next');
  });
}

function nextSlideAuto() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlides();
}

function nextSlideManual() {
  nextSlideAuto();
  resetSlideInterval();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlides();
  resetSlideInterval();
}

function resetSlideInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlideAuto, 4000);
}

// Initial setup
updateSlides();

// ============================
// COUNTER ANIMATION (Stats)
// ============================
const counters = document.querySelectorAll('.counter');
const statsSection = document.querySelector('.stats');
let statsStarted = false;
const speed = 200; // smaller = faster

function animateCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const step = () => {
      count += target / speed;
      if (count < target) {
        counter.innerText = Math.ceil(count);
        requestAnimationFrame(step);
      } else {
        counter.innerText = target;
      }
    };
    step();
  });
}

// Run when stats section is visible
window.addEventListener('scroll', () => {
  if (!statsStarted && statsSection) {
    const sectionTop = statsSection.offsetTop - window.innerHeight + 100;
    if (window.scrollY > sectionTop) {
      animateCounters();
      statsStarted = true;
    }
  }
});
