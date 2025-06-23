// Dark Mode Toggle
document.getElementById('darkToggle').addEventListener('change', function () {
  document.body.classList.toggle('dark', this.checked);
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Typing Animation in Hero Section
const heroText = document.getElementById('hero-text');
const phrases = [
  "Transforming Real Estate Visuals",
  "Indoor and Outdoor Image Editing",
  "Accurate 2D & 3D Floor Plans",
  "Starting from Just $1 per Image"
];
let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;

function typeEffect() {
  const current = phrases[currentPhrase];
  if (isDeleting) {
    currentChar--;
  } else {
    currentChar++;
  }
  heroText.textContent = current.substring(0, currentChar);

  if (!isDeleting && currentChar === current.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000);
  } else if (isDeleting && currentChar === 0) {
    isDeleting = false;
    currentPhrase = (currentPhrase + 1) % phrases.length;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }
}
typeEffect();


// Toast Message after form submit
const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');
form.addEventListener('submit', e => {
  e.preventDefault();
  // You can add form validation or AJAX here before showing toast
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
  form.reset();
});

// Simple scroll animation using IntersectionObserver
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.3
});

cards.forEach(card => {
  observer.observe(card);
});

// Price Toggle Feature
document.getElementById("togglePrice").addEventListener("change", function () {
  const isMonthly = this.checked;
  const cards = document.querySelectorAll(".pricing-card");

  cards.forEach(card => {
    const type = card.dataset.type;
    const priceEl = card.querySelector(".price");

    if (type === "realestate") {
      priceEl.innerHTML = isMonthly ? "<strong>$25 / month</strong>" : "<strong>$1 / image</strong>";
    } else if (type === "floorplan") {
      priceEl.innerHTML = isMonthly ? "<strong>$120 / month</strong>" : "<strong>$5 / plan</strong>";
    }
  });
});

function openModal(service) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  let content = '';

  if (service === 'image') {
    content = `
      <h4>Real Estate Image Editing</h4>
      <p>Includes indoor/outdoor editing, object removal, sky replacement, HDR image stacking, and more.</p>
    `;
  } else if (service === 'floor') {
    content = `
      <h4>2D & 3D Floor Plans</h4>
      <p>Professional floor plan rendering, virtual layouts, black & white or color plans, and 3D perspective views.</p>
    `;
  } else if (service === 'ecom') {
    content = `
      <h4>eCommerce Product Editing</h4>
      <p>Includes white background, shadows, cleanup, retouching, cropping, and high-resolution outputs for Amazon, Flipkart, etc.</p>
    `;
  }

  modalBody.innerHTML = content;
  modal.style.display = 'block';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

let currentSlide = 0;
const slides = document.querySelectorAll('#portfolioSlider .slide');

function showSlide(index) {
  const slider = document.getElementById('portfolioSlider');
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function moveSlide(step) {
  showSlide(currentSlide + step);
}

// Optional: Auto-slide every 5 seconds
setInterval(() => {
  moveSlide(1);
}, 5000);

let testimonialIndex = 0;
const testimonialSlider = document.getElementById('testimonialSlider');
const testimonialCards = document.querySelectorAll('.testimonial-card');

function slideTestimonials(direction) {
  const visibleCount = Math.floor(document.querySelector('.testimonial-wrapper').offsetWidth / testimonialCards[0].offsetWidth);
  testimonialIndex += direction;
  if (testimonialIndex < 0) testimonialIndex = 0;
  if (testimonialIndex > testimonialCards.length - visibleCount) testimonialIndex = testimonialCards.length - visibleCount;

  testimonialSlider.style.transform = `translateX(-${testimonialIndex * (testimonialCards[0].offsetWidth + 20)}px)`;
}

// Auto-slide every 6 seconds
setInterval(() => {
  slideTestimonials(1);
}, 6000);


document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById('testimonialSlider');
  const cards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentIndex = 0;

  // Calculate how many cards fit in the visible area
  function cardsVisibleCount() {
    const wrapperWidth = document.querySelector('.testimonial-wrapper').offsetWidth;
    const cardWidth = cards[0].offsetWidth + 20; // card width + gap
    return Math.floor(wrapperWidth / cardWidth);
  }

  // Update slider position
  function updateSlider() {
    const cardWidth = cards[0].offsetWidth + 20; // including gap
    slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex -= 1;
    if (currentIndex < 0) currentIndex = 0;
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    const visibleCount = cardsVisibleCount();
    if (currentIndex < cards.length - visibleCount) {
      currentIndex += 1;
    }
    updateSlider();
  });

  // Optional: adjust on window resize to reset position
  window.addEventListener('resize', () => {
    const visibleCount = cardsVisibleCount();
    if (currentIndex > cards.length - visibleCount) {
      currentIndex = Math.max(cards.length - visibleCount, 0);
      updateSlider();
    }
  });

  // Initialize position
  updateSlider();
});


// Toast show function
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// Confetti effect from https://codepen.io/soulwire/pen/jERaGY adapted:
function confettiBlast() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  const colors = ['#ff0a54', '#ff477e', '#ff85a1', '#fbb1b1', '#f9bec7'];

  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function ConfettiParticle() {
    this.x = randomRange(0, W);
    this.y = randomRange(-20, 0);
    this.r = randomRange(5, 10);
    this.d = randomRange(10, 30);
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.tilt = randomRange(-10, 10);
    this.tiltAngle = 0;
    this.tiltAngleIncrement = randomRange(0.05, 0.12);
    this.speed = randomRange(2, 5);
  }

  ConfettiParticle.prototype.draw = function () {
    ctx.beginPath();
    ctx.lineWidth = this.r / 2;
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.x + this.tilt + this.r / 4, this.y);
    ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 4);
    ctx.stroke();
  };

  ConfettiParticle.prototype.update = function () {
    this.tiltAngle += this.tiltAngleIncrement;
    this.y += this.speed;
    this.tilt = Math.sin(this.tiltAngle) * 15;

    if (this.y > H) {
      this.x = randomRange(0, W);
      this.y = randomRange(-20, 0);
      this.tilt = randomRange(-10, 10);
    }
  };

  const confetti = [];
  const maxConfetti = 100;

  for (let i = 0; i < maxConfetti; i++) {
    confetti.push(new ConfettiParticle());
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, W, H);
    confetti.forEach((c) => {
      c.update();
      c.draw();
    });
  }

  let animationFrameId;
  function run() {
    drawConfetti();
    animationFrameId = requestAnimationFrame(run);
  }

  run();

  // Stop confetti after 3 seconds
  setTimeout(() => {
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, W, H);
  }, 3000);
}

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault(); // prevent real form submit

  // You can add validation or send AJAX here if needed

  showToast();
  confettiBlast();

  // Reset form after sending
  this.reset();
});

