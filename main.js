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

  // Lightbox functionality
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');

  // Auto-agregar clase lightbox-img a imágenes relevantes
  const autoLightboxSelectors = [
    '.postventa-img-wrap img',
    '.galeria-item img',
    '.servicios-img img'
  ];

  const lightboxImages = [];
  let currentImageIndex = 0;

  autoLightboxSelectors.forEach(function(selector) {
    document.querySelectorAll(selector).forEach(function(img) {
      if (!img.classList.contains('lightbox-img')) {
        img.classList.add('lightbox-img');
        img.style.cursor = 'pointer';
      }
    });
  });

  // Recopilar todas las imágenes lightbox
  document.querySelectorAll('.lightbox-img').forEach(function(img) {
    lightboxImages.push(img);
    img.addEventListener('click', function() {
      currentImageIndex = lightboxImages.indexOf(this);
      openLightbox(this.src, this.alt);
    });
  });

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % lightboxImages.length;
    const nextImg = lightboxImages[currentImageIndex];
    lightboxImg.src = nextImg.src;
    lightboxImg.alt = nextImg.alt;
  }

  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length;
    const prevImg = lightboxImages[currentImageIndex];
    lightboxImg.src = prevImg.src;
    lightboxImg.alt = prevImg.alt;
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', showNextImage);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', showPrevImage);
  }

  // Cerrar con click fuera de la imagen
  if (lightboxModal) {
    lightboxModal.addEventListener('click', function(e) {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Cerrar con tecla Escape y navegar con flechas
  document.addEventListener('keydown', function(e) {
    if (!lightboxModal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    }
  });

  // ========================================
  // MODAL DE PRODUCTO
  // ========================================

  const productoModal = document.getElementById('producto-modal');
  const productoModalClose = document.querySelector('.producto-modal-close');
  const modalImgContainer = document.getElementById('modal-img-container');
  const modalBodyContent = document.getElementById('modal-body-content');
  const modalWaBtn = document.getElementById('modal-wa-btn');

  // Función para renderizar el contenido del modal
  function renderProductoModal(productoId) {
    const producto = productosData[productoId];
    if (!producto) return;

    // Renderizar imagen(es)
    modalImgContainer.innerHTML = '';
    if (producto.imagenes && producto.imagenes.length > 0) {
      if (producto.imagenes.length === 1) {
        modalImgContainer.innerHTML = '<img src="' + producto.imagenes[0] + '" alt="' + producto.titulo + '" loading="lazy">';
      } else {
        // Para múltiples imágenes (como Tuberías que tiene 2)
        var heightPerImage = (100 / producto.imagenes.length) + '%';
        modalImgContainer.innerHTML = producto.imagenes.map(function(imgSrc) {
          return '<img src="' + imgSrc + '" alt="' + producto.titulo + '" loading="lazy" style="width: 100%; height: ' + heightPerImage + '; object-fit: cover; flex: 1;">';
        }).join('');
      }
    }

    // Renderizar contenido del body
    let bodyHTML = '<h3>' + producto.titulo + '</h3>';
    
    if (producto.subtitulo) {
      bodyHTML += '<h4>' + producto.subtitulo + '</h4>';
    }

    if (producto.descripcion) {
      bodyHTML += '<p>' + producto.descripcion + '</p>';
    }

    if (producto.descripcionExtra) {
      bodyHTML += '<p>' + producto.descripcionExtra + '</p>';
    }

    // Especificaciones técnicas
    if (producto.especificaciones) {
      bodyHTML += '<div class="producto-specs"><h5>' + producto.especificaciones.titulo + '</h5><ul>';
      producto.especificaciones.items.forEach(function(item) {
        bodyHTML += '<li>' + item + '</li>';
      });
      bodyHTML += '</ul></div>';
    }

    // Características principales
    if (producto.caracteristicas) {
      bodyHTML += '<div class="producto-apps"><strong>Características Principales:</strong><div class="producto-tags">';
      producto.caracteristicas.forEach(function(caracteristica) {
        bodyHTML += '<span class="producto-tag">' + caracteristica + '</span>';
      });
      bodyHTML += '</div></div>';
    }

    // Tags
    if (producto.tags) {
      bodyHTML += '<div class="producto-tags">';
      producto.tags.forEach(function(tag) {
        bodyHTML += '<span class="producto-tag">' + tag + '</span>';
      });
      bodyHTML += '</div>';
    }

    // Aplicaciones
    if (producto.aplicaciones) {
      bodyHTML += '<div class="producto-apps"><strong>Aplicaciones:</strong><div class="producto-tags">';
      producto.aplicaciones.forEach(function(app) {
        bodyHTML += '<span class="producto-tag">' + app + '</span>';
      });
      bodyHTML += '</div></div>';
    }

    modalBodyContent.innerHTML = bodyHTML;

    // Configurar botón de WhatsApp
    if (producto.waMessage) {
      modalWaBtn.href = 'https://wa.me/543513557556?text=' + encodeURIComponent(producto.waMessage);
    }
  }

  // Función para abrir el modal
  function openProductoModal(productoId) {
    renderProductoModal(productoId);
    productoModal.classList.add('active');
    productoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  // Función para cerrar el modal
  function closeProductoModal() {
    productoModal.classList.remove('active');
    productoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Event listeners para abrir modal desde las cards
  document.querySelectorAll('.producto-card[data-producto-id]').forEach(function(card) {
    card.addEventListener('click', function(e) {
      const productoId = this.getAttribute('data-producto-id');
      openProductoModal(productoId);
    });

    // También agregar listener al botón "Ver más"
    const btnVerMas = card.querySelector('.btn-ver-mas');
    if (btnVerMas) {
      btnVerMas.addEventListener('click', function(e) {
        e.stopPropagation();
        const productoId = card.getAttribute('data-producto-id');
        openProductoModal(productoId);
      });
    }
  });

  // Cerrar modal con el botón X
  if (productoModalClose) {
    productoModalClose.addEventListener('click', closeProductoModal);
  }

  // Cerrar modal con click fuera del contenido
  if (productoModal) {
    productoModal.addEventListener('click', function(e) {
      if (e.target === productoModal) {
        closeProductoModal();
      }
    });
  }

  // Cerrar modal con tecla Escape
  document.addEventListener('keydown', function(e) {
    if (productoModal.classList.contains('active') && e.key === 'Escape') {
      closeProductoModal();
    }
  });

}());
