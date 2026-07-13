# APA La Plata — Sitio web

Trabajo Práctico Final — Etapa 3 (Construcción). Sitio estático en HTML y CSS
propios (sin frameworks de CSS externos) para APA La Plata, asociación civil
de rescate y adopción de perros.

## Estructura

- `index.html` — Inicio (hero, sobre la organización, destacados, cómo adoptar, cómo colaborar)
- `adopcion.html` — Catálogo de adopción con filtros por tamaño y edad
- `animal.html` — Plantilla de detalle de un animal
- `contacto.html` — Formulario de contacto y cómo colaborar
- `sistema.html` — Documentación del sistema de diseño (Etapa 4)
- `css/styles.css` — Variables de diseño (custom properties), layout con CSS Grid, componentes y container queries
- `js/main.js` — Menú mobile y filtros del catálogo (vanilla JS, sin librerías)

## Cómo verlo localmente

```
python3 -m http.server 8000
```

y abrir `http://localhost:8000/index.html`.

## Requerimientos técnicos cubiertos

- Custom properties de color, tipografía y espaciado definidas en `:root` (`css/styles.css`)
- Layout macro con CSS Grid (`.pagina`, `.grilla-adopcion-layout`, `.grilla-adopcion`, `.pie-pagina__grid`); Flexbox solo para microcomposición (nav, botones)
- Container queries en `.tarjeta-animal` (adapta su composición según el ancho de su contenedor, no del viewport)
- Diseño responsivo mobile-first, probado en 375px / 768px / 1280px
- HTML semántico (`header`, `nav`, `main`, `section`, `article`, `footer`, jerarquía de encabezados)
