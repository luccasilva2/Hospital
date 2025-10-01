document.addEventListener('DOMContentLoaded', () => {
  let currentIndex = 0;
  const images = document.querySelectorAll('.carousel-container img');
  const totalImages = images.length;
  const indicatorsContainer = document.querySelector('.indicators');

  // Create indicators dynamically
  for (let i = 0; i < totalImages; i++) {
    const dot = document.createElement('div');
    dot.classList.add('indicator');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
      updateIndicators();
    });
    indicatorsContainer.appendChild(dot);
  }

  const indicators = document.querySelectorAll('.indicator');

  function updateCarousel() {
    images.forEach((img, index) => {
      img.style.opacity = (index === currentIndex) ? '1' : '0';
    });
  }

  function updateIndicators() {
    indicators.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateCarousel();
    updateIndicators();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateCarousel();
    updateIndicators();
  }

  // Auto slide every 3 seconds
  setInterval(nextSlide, 3000);

  // Manual controls
  document.querySelector('.next').addEventListener('click', nextSlide);
  document.querySelector('.prev').addEventListener('click', prevSlide);

  // Initialize
  updateCarousel();
  updateIndicators();
});
