const cursor = document.querySelector('.cursor');
const cursorCore = document.querySelector('.cursor-core');
const cursorAura = document.querySelector('.cursor-aura');

// Custom cursor for the desktop version.
document.addEventListener('mousemove', (event) => {
  if (!cursor) return;

  cursorCore.style.left = `${event.clientX}px`;
  cursorCore.style.top = `${event.clientY}px`;
  cursorAura.style.left = `${event.clientX}px`;
  cursorAura.style.top = `${event.clientY}px`;
});

// Give links, buttons and cards a little cursor feedback.
document.querySelectorAll('a, button, .tech-card, .stat, .path-card, .cycle article, .time-item, .dashboard, .vault-box, .team > div, .notes-grid > div').forEach((element) => {
  element.addEventListener('mouseenter', () => cursor?.classList.add('active'));
  element.addEventListener('mouseleave', () => cursor?.classList.remove('active'));
});

// Reveal sections as they enter the screen.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});

// Animated number counters.
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target = Number(counter.dataset.target);
    const decimalPlaces = target % 1 !== 0 ? 1 : 0;
    const start = performance.now();

    function updateCounter(time) {
      const progress = Math.min((time - start) / 1100, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;

      counter.textContent = decimalPlaces
        ? value.toFixed(decimalPlaces)
        : Math.round(value).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
    counterObserver.unobserve(counter);
  });
}, { threshold: 0.65 });

document.querySelectorAll('.counter').forEach((counter) => {
  counterObserver.observe(counter);
});

// Visual evidence slider.
const imageFrames = [...document.querySelectorAll('.image-frame')];
const imageDots = [...document.querySelectorAll('.image-dots .dot')];
let currentImage = 0;
let imageTimer;

function showImage(index) {
  if (!imageFrames.length) return;

  currentImage = index;

  imageFrames.forEach((frame, frameIndex) => {
    frame.classList.toggle('active', frameIndex === index);
  });

  imageDots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === index);
  });
}

function startImageRotation() {
  clearInterval(imageTimer);

  if (imageFrames.length < 2) return;

  imageTimer = setInterval(() => {
    showImage((currentImage + 1) % imageFrames.length);
  }, 4500);
}

imageDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showImage(index);
    startImageRotation();
  });
});

startImageRotation();

// Animate timeline items one after another when the timeline appears.
const timeline = document.querySelector('.timeline');

if (timeline) {
  const timelineItems = [...timeline.querySelectorAll('.time-item')];

  const timelineObserver = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;

    timelineItems.forEach((item, index) => {
      setTimeout(() => item.classList.add('show'), index * 180);
    });

    timelineObserver.disconnect();
  }, { threshold: 0.2 });

  timelineObserver.observe(timeline);
}
