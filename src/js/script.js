document.addEventListener('DOMContentLoaded', () => {
  // Carousel functionality
  let currentIndex = 0;
  const images = document.querySelectorAll('.carousel-container img');
  const totalImages = images.length;
  const indicatorsContainer = document.querySelector('.indicators');

  if (images.length > 0) {
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
  }

  // Tab functionality
  window.openTab = function(evt, tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-button');

    tabContents.forEach(content => {
      content.style.display = 'none';
    });

    tabButtons.forEach(button => {
      button.classList.remove('active');
    });

    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.classList.add('active');
  };

  // Search patient functionality
  window.searchPatient = function() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const resultsDiv = document.getElementById('search-results');
    const patients = ['Pedro Marciniak', 'Lucca Silva', 'Amanda Adames', 'Ana Boni'];

    resultsDiv.innerHTML = '';

    const filteredPatients = patients.filter(patient => patient.toLowerCase().includes(input));

    if (filteredPatients.length > 0) {
      const ul = document.createElement('ul');
      filteredPatients.forEach(patient => {
        const li = document.createElement('li');
        li.textContent = patient;
        ul.appendChild(li);
      });
      resultsDiv.appendChild(ul);
    } else {
      resultsDiv.textContent = 'Nenhum paciente encontrado.';
    }
  };

  // Form validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateForm(this)) {
        if (this.querySelector('h2') && this.querySelector('h2').textContent === 'Login') {
          // Redirect to especialidades.html for login
          window.location.href = 'views/especialidades.html';
        } else {
          alert('Formulário enviado com sucesso!');
        }
      }
    });
  });

  function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
      if (!input.value.trim()) {
        alert(`Por favor, preencha o campo ${input.previousElementSibling.textContent}.`);
        isValid = false;
        return;
      }
      if (input.type === 'email' && !isValidEmail(input.value)) {
        alert('Por favor, insira um email válido.');
        isValid = false;
        return;
      }
    });
    return isValid;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
