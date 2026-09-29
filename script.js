// ===== SLIDESHOW INITIALIZATION =====
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
const previousBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');

let currentSlide = 0;
let slideTimer;

// Create dots for each slide
slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('.dot');

// ===== SHOW SLIDE FUNCTION =====
function showSlide(index) {
    // Handle wrap-around
    currentSlide = (index + slides.length) % slides.length;

    // Hide all slides and deactivate all dots
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
        dot.setAttribute('aria-current', i === currentSlide ? 'true' : 'false');
    });
}

// ===== GO TO SLIDE =====
function goToSlide(index) {
    showSlide(index);
    restartAutoSlide();
}

// ===== AUTO SLIDE FUNCTION =====
function autoSlide() {
    slideTimer = setTimeout(() => {
        showSlide(currentSlide + 1);
        autoSlide();
    }, 5000); // Change slide every 5 seconds
}

// ===== RESTART AUTO SLIDE =====
function restartAutoSlide() {
    clearTimeout(slideTimer);
    autoSlide();
}

// ===== EVENT LISTENERS =====
previousBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    restartAutoSlide();
});

nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    restartAutoSlide();
});

// ===== INITIALIZE SLIDESHOW =====
document.addEventListener('DOMContentLoaded', () => {
    showSlide(0);
    autoSlide();
});