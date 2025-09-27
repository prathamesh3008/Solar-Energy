// Select elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Toggle menu on click
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// ----------------------
// Modal functionality
function openModal(id) {
  document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// Close modal if user clicks outside content
window.onclick = function(event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};

// ----------------------
// Hero slideshow with arrows
let slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let slideInterval = setInterval(nextSlideAuto, 4000); // auto change every 4s

// Update slides with fade + slide effect
function updateSlides() {
  slides.forEach((slide, i) => {
    slide.classList.remove('active', 'prev', 'next');

    if (i === currentSlide) {
      slide.classList.add('active');
    } else if (i === (currentSlide - 1 + slides.length) % slides.length) {
      slide.classList.add('prev');
    } else if (i === (currentSlide + 1) % slides.length) {
      slide.classList.add('next');
    }
  });
}

// Automatic next slide
function nextSlideAuto() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlides();
}

// Manual next slide
function nextSlideManual() {
  nextSlideAuto();
  resetSlideInterval();
}

// Manual previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlides();
  resetSlideInterval();
}

// Reset interval after manual navigation
function resetSlideInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlideAuto, 4000);
}

// Initial setup
updateSlides();

// ----------------------
// Counter animation
const counters = document.querySelectorAll('.counter');
const speed = 200; // smaller = faster

const animateCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

// Run when stats section is visible
const statsSection = document.querySelector('.stats');
let statsStarted = false;

window.addEventListener('scroll', () => {
  const sectionTop = statsSection.offsetTop - window.innerHeight + 100;
  if (!statsStarted && window.scrollY > sectionTop) {
    animateCounters();
    statsStarted = true;
  }
});
