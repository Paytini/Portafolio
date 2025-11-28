# Portfolio Website - Jordan Jorge Payta Sarabia

![Portfolio Preview](https://paytini.github.io/Portafolio/)

## 📋 Descripción

Portfolio profesional moderno y futurista para Jordan Jorge Payta Sarabia, Full-Stack Developer y Computer Engineer. Este sitio web presenta un diseño responsivo con una paleta de colores azul futurista, efectos glassmorphism, animaciones suaves y una experiencia de usuario premium.

## ✨ Características

- **Diseño Moderno y Futurista**: Paleta de colores azul con gradientes y efectos glassmorphism
- **Totalmente Responsivo**: Optimizado para móviles, tablets y computadoras de escritorio
- **Animaciones Suaves**: Transiciones y efectos de scroll animados
- **Formulario de Contacto**: Validación en tiempo real con JavaScript
- **Navegación Intuitiva**: Menú de navegación con scroll suave y enlaces activos
- **Cursor Personalizado**: Efecto de cursor futurista (solo en escritorio)
- **SEO Optimizado**: Meta tags y estructura semántica HTML5
- **Performance**: Lazy loading de imágenes y optimizaciones de rendimiento

## 🎨 Paleta de Colores

- **Primary**: `#3b82f6` (Azul)
- **Primary Dark**: `#2563eb`
- **Primary Light**: `#60a5fa`
- **Secondary**: `#06b6d4` (Cyan)
- **Accent**: `#8b5cf6` (Púrpura)
- **Background Dark**: `#0f172a`
- **Background Darker**: `#020617`
- **Card Background**: `#1e293b`

## 📁 Estructura del Proyecto

```
jordan-webDesigns/
│
├── index.html          # Estructura HTML principal
├── style.css           # Estilos CSS con diseño futurista
├── script.js           # JavaScript para interactividad
├── README.md           # Documentación del proyecto
│
└── assets/             # Recursos multimedia
    ├── profile.jpg     # Foto de perfil (placeholder SVG)
    ├── project1.jpg    # Proyecto 1: AI Automation
    ├── project2.jpg    # Proyecto 2: Web Application
    ├── project3.jpg    # Proyecto 3: Academic System
    ├── project4.jpg    # Proyecto 4: IoT Embedded
    ├── project5.jpg    # Proyecto 5: Data Analytics
    └── project6.jpg    # Proyecto 6: Mobile App
```

## 🚀 Cómo Usar

### Opción 1: Abrir Directamente
1. Navega a la carpeta del proyecto
2. Haz doble clic en `index.html`
3. El sitio se abrirá en tu navegador predeterminado

### Opción 2: Servidor Local (Recomendado)
Para una mejor experiencia, especialmente con las funcionalidades de JavaScript:

**Con Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Con Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Con PHP:**
```bash
php -S localhost:8000
```

Luego abre tu navegador en `http://localhost:8000`

## 📱 Secciones del Portfolio

1. **Home/Hero**: Presentación principal con nombre, título y llamados a la acción
2. **Sobre Mí**: Biografía profesional y estadísticas
3. **Experiencia**: Timeline de experiencia laboral con detalles de cada posición
4. **Habilidades**: Stack tecnológico organizado por categorías
5. **Proyectos**: Galería de 6 proyectos destacados con descripciones y tecnologías
6. **Contacto**: Formulario de contacto funcional con validación
7. **Footer**: Enlaces de navegación y redes sociales

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS, Flexbox y Grid
- **JavaScript (Vanilla)**: Interactividad sin dependencias
- **Font Awesome 6.4.0**: Iconos
- **Google Fonts (Inter)**: Tipografía moderna

## 📝 Personalización

### Reemplazar Imágenes
Las imágenes actuales son placeholders SVG. Para usar tus propias imágenes:

1. Reemplaza `assets/profile.jpg` con tu foto de perfil
2. Reemplaza `assets/project1.jpg` a `project6.jpg` con capturas de tus proyectos
3. Formatos recomendados: JPG, PNG o WebP
4. Tamaños recomendados:
   - Perfil: 400x400px
   - Proyectos: 800x600px

### Actualizar Información Personal
Edita `index.html` para actualizar:
- Nombre y título profesional
- Biografía y descripción
- Experiencia laboral
- Habilidades y tecnologías
- Proyectos y descripciones
- Información de contacto
- Enlaces de redes sociales

### Modificar Colores
Edita las variables CSS en `style.css` (líneas 1-50):
```css
:root {
    --primary-color: #3b82f6;  /* Cambia el color principal */
    --secondary-color: #06b6d4; /* Cambia el color secundario */
    /* ... más variables */
}
```

## ✅ Validación del Formulario

El formulario de contacto incluye validación en tiempo real:
- **Nombre**: Mínimo 2 caracteres
- **Email**: Formato de email válido
- **Mensaje**: Mínimo 10 caracteres

**Nota**: El formulario actualmente simula el envío. Para implementar envío real, necesitas:
1. Un backend (PHP, Node.js, Python, etc.)
2. Un servicio de email (SendGrid, Mailgun, etc.)
3. O un servicio de formularios (Formspree, Netlify Forms, etc.)

## 🌐 Deployment

### GitHub Pages
1. Sube el proyecto a un repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona la rama `main` y carpeta `root`
4. Tu sitio estará disponible en `https://tu-usuario.github.io/nombre-repo`

### Netlify
1. Arrastra la carpeta del proyecto a [Netlify Drop](https://app.netlify.com/drop)
2. O conecta tu repositorio de GitHub para deployment automático

### Vercel
```bash
npm i -g vercel
cd jordan-webDesigns
vercel
```

## 📧 Contacto

- **Email**: jolipips@hotmail.com
- **Teléfono**: (+1) 951-347-6252
- **Ubicación**: Mexicali, Baja California

## 📄 Licencia

Este proyecto es de uso personal para Jordan Jorge Payta Sarabia.

## 🎯 Próximas Mejoras

- [ ] Integrar backend para formulario de contacto
- [ ] Agregar modo claro/oscuro toggle
- [ ] Implementar blog section
- [ ] Agregar animaciones con GSAP
- [ ] Integrar Google Analytics
- [ ] Agregar certificaciones section
- [ ] Implementar multi-idioma (ES/EN)

---

**Desarrollado con ❤️ por Jordan Payta**
