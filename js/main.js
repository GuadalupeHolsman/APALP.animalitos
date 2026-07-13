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
      tarjeta.style.display = mostrar ? '' : 'none';
      if (mostrar) visibles++;
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
