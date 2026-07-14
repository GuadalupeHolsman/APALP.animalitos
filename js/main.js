(function () {
  var navToggle = document.getElementById('nav-toggle');
  var navPrincipal = document.getElementById('nav-principal');

  if (navToggle && navPrincipal) {
    navToggle.addEventListener('click', function () {
      var abierto = navPrincipal.classList.toggle('esta-abierto');
      navToggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
  }
})();

(function () {
  var grilla = document.getElementById('grilla-adopcion');
  if (!grilla) return;

  var tarjetas = Array.prototype.slice.call(grilla.querySelectorAll('.tarjeta-animal'));
  var checkboxes = Array.prototype.slice.call(document.querySelectorAll('.barra-filtros input[type="checkbox"]'));
  var botonLimpiar = document.getElementById('limpiar-filtros');

  function valoresActivos(nombre) {
    return checkboxes
      .filter(function (cb) { return cb.name === nombre && cb.checked; })
      .map(function (cb) { return cb.value; });
  }

  function aplicarFiltros() {
    var tamanos = valoresActivos('tamano');
    var edades = valoresActivos('edad');
    var visibles = 0;

    tarjetas.forEach(function (tarjeta) {
      var coincideTamano = tamanos.length === 0 || tamanos.indexOf(tarjeta.dataset.tamano) !== -1;
      var coincideEdad = edades.length === 0 || edades.indexOf(tarjeta.dataset.edad) !== -1;
      var mostrar = coincideTamano && coincideEdad;

      if (mostrar) {
        tarjeta.style.display = '';
        // fuerza reflow para que la transición de reaparición se dispare
        void tarjeta.offsetWidth;
        tarjeta.classList.remove('tarjeta-animal--oculta');
        visibles++;
      } else if (!tarjeta.classList.contains('tarjeta-animal--oculta')) {
        tarjeta.classList.add('tarjeta-animal--oculta');
        tarjeta.addEventListener('transitionend', function ocultar() {
          tarjeta.removeEventListener('transitionend', ocultar);
          if (tarjeta.classList.contains('tarjeta-animal--oculta')) {
            tarjeta.style.display = 'none';
          }
        });
      }
    });

    var mensajeVacio = grilla.querySelector('.grilla-adopcion__resultado-vacio');
    if (visibles === 0) {
      if (!mensajeVacio) {
        mensajeVacio = document.createElement('p');
        mensajeVacio.className = 'grilla-adopcion__resultado-vacio';
        mensajeVacio.textContent = 'No hay perros que coincidan con estos filtros por ahora.';
        grilla.appendChild(mensajeVacio);
      }
    } else if (mensajeVacio) {
      mensajeVacio.remove();
    }
  }

  checkboxes.forEach(function (cb) {
    cb.addEventListener('change', aplicarFiltros);
  });

  if (botonLimpiar) {
    botonLimpiar.addEventListener('click', function () {
      checkboxes.forEach(function (cb) { cb.checked = false; });
      aplicarFiltros();
    });
  }
})();

(function () {
  var elementos = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (!elementos.length) return;

  if (!('IntersectionObserver' in window)) {
    elementos.forEach(function (el) { el.classList.add('reveal--visible'); });
    return;
  }

  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('reveal--visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  elementos.forEach(function (el) { observador.observe(el); });
})();

(function () {
  var carruseles = Array.prototype.slice.call(document.querySelectorAll('.carrusel-fotos'));

  carruseles.forEach(function (carrusel) {
    var pista = carrusel.querySelector('.carrusel-fotos__pista');
    var slides = Array.prototype.slice.call(carrusel.querySelectorAll('.carrusel-fotos__slide'));
    var dots = Array.prototype.slice.call(carrusel.querySelectorAll('.carrusel-fotos__dot'));
    var btnPrev = carrusel.querySelector('[data-carrusel-prev]');
    var btnNext = carrusel.querySelector('[data-carrusel-next]');
    if (!pista || !slides.length) return;

    var indiceActual = 0;
    var timerAutoplay = null;

    function irASlide(indice) {
      indiceActual = (indice + slides.length) % slides.length;
      pista.scrollTo({ left: slides[indiceActual].offsetLeft, behavior: 'smooth' });
      actualizarDots();
    }

    function actualizarDots() {
      dots.forEach(function (dot, i) {
        dot.setAttribute('aria-current', i === indiceActual ? 'true' : 'false');
      });
    }

    function detenerAutoplay() {
      if (timerAutoplay) {
        window.clearInterval(timerAutoplay);
        timerAutoplay = null;
      }
    }

    function iniciarAutoplay() {
      detenerAutoplay();
      timerAutoplay = window.setInterval(function () {
        irASlide(indiceActual + 1);
      }, 4500);
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', function () {
        irASlide(indiceActual - 1);
        iniciarAutoplay();
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', function () {
        irASlide(indiceActual + 1);
        iniciarAutoplay();
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        irASlide(i);
        iniciarAutoplay();
      });
    });

    // Sincroniza el índice/los puntos cuando el usuario hace swipe manual
    var sincronizarDesdeScroll = debounce(function () {
      var anchoSlide = slides[0].offsetWidth || 1;
      indiceActual = Math.round(pista.scrollLeft / anchoSlide);
      actualizarDots();
    }, 100);
    pista.addEventListener('scroll', sincronizarDesdeScroll);

    carrusel.addEventListener('mouseenter', detenerAutoplay);
    carrusel.addEventListener('mouseleave', iniciarAutoplay);
    carrusel.addEventListener('focusin', detenerAutoplay);
    carrusel.addEventListener('focusout', iniciarAutoplay);

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      iniciarAutoplay();
    }
  });

  function debounce(fn, espera) {
    var manija;
    return function () {
      var contexto = this, args = arguments;
      window.clearTimeout(manija);
      manija = window.setTimeout(function () { fn.apply(contexto, args); }, espera);
    };
  }
})();
