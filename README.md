# Portfolio Website - Jordan Jorge Payta Sarabia

## 📋 Descripción

Portfolio profesional de Jordan Jorge Payta Sarabia, Full-Stack Developer y Computer Engineer. Sitio estático multi-página (sin build ni frameworks), con diseño claro, tipografía Space Grotesk/Inter/IBM Plex Mono, sistema de traducción ES/EN y componentes de header/footer compartidos.

## ✨ Características

- **Multi-página real**: cada sección tiene su propia URL (`about.html`, `experience.html`, etc.), no scroll de una sola página
- **Header y footer compartidos**: se cargan dinámicamente vía `fetch()` desde `components/` para no duplicar el marcado en cada página
- **Traducción ES/EN**: todo el contenido visible se traduce mediante `js/translations.js`; el idioma por defecto es inglés y la preferencia del usuario se guarda en `localStorage`
- **Habilidades en pestañas**: interfaz de pestañas accesible (patrón ARIA tabs) en vez de una cuadrícula de tarjetas
- **Formulario de contacto funcional**: validación en tiempo real + envío real vía Web3Forms
- **Rendimiento**: imágenes en WebP optimizadas, `loading="lazy"` en imágenes fuera de la vista inicial, Font Awesome cargado de forma no bloqueante
- **Accesibilidad**: foco visible, `aria-label`/`title` en íconos sin texto, tamaños táctiles ≥44px, soporte a `prefers-reduced-motion`

## 📁 Estructura del Proyecto

```
Portafolio/
│
├── index.html            # Inicio (hero)
├── about.html             # Sobre Mí
├── experience.html        # Experiencia + Educación
├── skills.html             # Habilidades (interfaz de pestañas)
├── portfolio.html          # Proyectos
├── contact.html            # Contacto
│
├── components/
│   ├── header.html         # Header + navegación (compartido)
│   └── footer.html         # Footer + botón scroll-up (compartido)
│
├── css/
│   └── style.css
│
├── js/
│   ├── script.js           # Interactividad, includes, formulario, traducciones
│   └── translations.js     # Diccionario de textos ES/EN
│
├── assets/
│   ├── images/              # Fotos y capturas de proyectos (.webp servidas al sitio)
│   └── documents/           # CV y demás PDFs
│
├── docs/
│   └── Jordan_Payta_CV.md   # CV en Markdown (fuente de referencia)
│
├── ui-design/
│   └── ux-principles.es.md  # Principios de UX usados para el diseño
│
└── README.md
```

## 🚀 Cómo Usar

Como el header/footer se cargan con `fetch()`, el sitio necesita un servidor HTTP local (no funciona abriendo `index.html` directamente con doble clic, por restricciones de CORS en `file://`).

**Con Python:**
```bash
python3 -m http.server 8000
```

**Con Node.js:**
```bash
npx http-server -p 8000
```

Luego abre `http://localhost:8000`.

## 📱 Páginas del Portfolio

1. **Inicio** — Presentación principal con nombre, rol y llamados a la acción
2. **Sobre Mí** — Biografía profesional, años de experiencia y botón de descarga del CV
3. **Experiencia** — Timeline de experiencia laboral + formación académica
4. **Habilidades** — Stack tecnológico por categorías (pestañas)
5. **Proyectos** — 6 proyectos destacados con íconos de tecnologías usadas
6. **Contacto** — Formulario funcional (Web3Forms) + datos de contacto

## 🛠️ Tecnologías Utilizadas

- **HTML5 / CSS3 / JavaScript (Vanilla)** — sin frameworks ni build step
- **Font Awesome 6.4.0** — íconos
- **Google Fonts** — Space Grotesk, Inter, IBM Plex Mono
- **Web3Forms** — envío del formulario de contacto (sin backend propio)

## 📝 Personalización

- **Contenido y textos**: editar el diccionario `js/translations.js` (claves `data-i18n` en cada página)
- **Header/footer**: editar `components/header.html` / `components/footer.html` — el cambio se refleja en las 6 páginas automáticamente
- **Colores y tipografía**: variables CSS al inicio de `css/style.css` (`:root`)
- **Imágenes**: reemplazar los archivos en `assets/images/` (formato recomendado: WebP)

## ✅ Validación del Formulario

- **Nombre**: mínimo 2 caracteres
- **Email**: formato válido
- **Mensaje**: mínimo 10 caracteres

El envío se realiza vía [Web3Forms](https://web3forms.com) — requiere una access key gratuita configurada como campo oculto en `contact.html` (`<input type="hidden" name="access_key" ...>`).

## 🌐 Deployment

Cualquier hosting de archivos estáticos funciona (las URLs usan extensión `.html`, sin necesitar reglas de reescritura del servidor):

### GitHub Pages
1. Sube el proyecto a un repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona la rama `main` y carpeta `root`

### Netlify / Vercel
Arrastra la carpeta del proyecto a [Netlify Drop](https://app.netlify.com/drop), o conecta el repositorio para deployment automático.

## 📧 Contacto

- **Email**: jolinjips@hotmail.com
- **Teléfono**: +1 951-347-6252
- **Ubicación**: Mexicali, Baja California

## 📄 Licencia

Este proyecto es de uso personal para Jordan Jorge Payta Sarabia.

---

**Desarrollado por Jordan Payta**
