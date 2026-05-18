(function () {
  'use strict';

  const navHeader = document.getElementById('nav-header');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      navHeader.classList.add('scrolled');
    } else {
      navHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen.toString());
  });

  navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', function (e) {
    if (!navHeader.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  const allSections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    let current = '';
    const scrollY = window.scrollY;

    allSections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    allNavLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });

  const revealElements = document.querySelectorAll('.reveal');
  const heroElements = document.querySelectorAll('.reveal-hero');

  function createRevealObserver(threshold) {
    return new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: threshold || 0.12,
      rootMargin: '0px 0px -40px 0px'
    });
  }

  const revealObserver = createRevealObserver(0.1);
  revealElements.forEach(function (el) { revealObserver.observe(el); });

  const heroObserver = createRevealObserver(0.05);
  heroElements.forEach(function (el) { heroObserver.observe(el); });

  const counters = document.querySelectorAll('.counter');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (target - startValue) * eased);
      el.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (counter) { counterObserver.observe(counter); });

  const form = document.getElementById('contacto-form');
  const formStatus = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nombre = form.nombre.value.trim();
      const telefono = form.telefono.value.trim();
      const mensaje = form.mensaje.value.trim();

      if (!nombre || !telefono || !mensaje) {
        formStatus.textContent = 'Por favor completá los campos obligatorios.';
        formStatus.className = 'form-status error';
        return;
      }

      const email = form.email.value.trim();
      const cultivo = form.cultivo.value.trim();

      let text = 'Hola HidroArca, les escribo desde la web.\n\n';
      text += 'Nombre: ' + nombre + '\n';
      text += 'Teléfono: ' + telefono + '\n';
      if (email) text += 'Email: ' + email + '\n';
      if (cultivo) text += 'Cultivo/Proyecto: ' + cultivo + '\n';
      text += '\nMensaje: ' + mensaje;

      const waUrl = 'https://wa.me/543513557556?text=' + encodeURIComponent(text);

      formStatus.textContent = 'Redirigiendo a WhatsApp...';
      formStatus.className = 'form-status success';

      setTimeout(function () {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
        form.reset();
        formStatus.textContent = 'Mensaje listo para enviar por WhatsApp.';
      }, 600);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const imgElements = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    imgElements.forEach(function (img) { imgObserver.observe(img); });
  }
}());
