const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
const previous = document.querySelector('.previous');
const next = document.querySelector('.next');
let current = 0;
let timer;

slides.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.className = 'dot';
  dot.type = 'button';
  dot.setAttribute('aria-label', `Show slide ${index + 1}`);
  dot.addEventListener('click', () => showSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('.dot');

function showSlide(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === current);
    dot.setAttribute('aria-current', i === current ? 'true' : 'false');
  });
}

function restartTimer() {
  clearInterval(timer);
  timer = setInterval(() => showSlide(current + 1), 5000);
}

previous.addEventListener('click', () => { showSlide(current - 1); restartTimer(); });
next.addEventListener('click', () => { showSlide(current + 1); restartTimer(); });
showSlide(0);
restartTimer();
