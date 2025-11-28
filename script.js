// ===== NAVEGACIÓN MÓVIL =====
// Obtener elementos del DOM
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Mostrar menú móvil
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Ocultar menú móvil
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// ===== HEADER CON SCROLL =====
// Agregar sombra al header cuando se hace scroll
function scrollHeader() {
    const header = document.getElementById('header');
    // Cuando el scroll es mayor a 50 viewport height, agregar clase scroll-header
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

// ===== NAVEGACIÓN ACTIVA =====
// Cambiar el enlace activo según la sección visible
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.nav__link[href*=' + sectionId + ']');

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active-link');
            } else {
                navLink.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

// ===== SCROLL SUAVE =====
// Implementar scroll suave para todos los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== BOTÓN SCROLL UP =====
// Mostrar botón de scroll up cuando el usuario baja
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // Cuando el scroll es mayor a 350 viewport height, mostrar el botón
    if (this.scrollY >= 350) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUp);

// ===== ANIMACIONES AL HACER SCROLL =====
// Intersection Observer para animar elementos cuando entran en viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos que queremos animar
const animatedElements = document.querySelectorAll(
    '.about__box, .experience__card, .skills__content, .portfolio__card, .contact__card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== VALIDACIÓN DEL FORMULARIO DE CONTACTO =====
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

// Función para validar email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar el formulario
function validateForm(formData) {
    const errors = [];
    
    // Validar nombre
    if (!formData.get('name') || formData.get('name').trim().length < 2) {
        errors.push(t('nameValidation'));
    }
    
    // Validar email
    if (!formData.get('email') || !validateEmail(formData.get('email'))) {
        errors.push(t('emailValidation'));
    }
    
    // Validar mensaje
    if (!formData.get('message') || formData.get('message').trim().length < 10) {
        errors.push(t('messageValidation'));
    }
    
    return errors;
}

// Función para mostrar mensaje
function showMessage(message, isSuccess = true) {
    contactMessage.textContent = message;
    contactMessage.className = 'contact__message ' + (isSuccess ? 'success' : 'error');
    
    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
        contactMessage.textContent = '';
        contactMessage.className = 'contact__message';
    }, 5000);
}

// Manejar el envío del formulario
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Validar formulario
        const errors = validateForm(formData);
        
        if (errors.length > 0) {
            // Mostrar errores
            showMessage(errors.join(' | '), false);
        } else {
            // Mostrar estado de envío
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            // Verificar que EmailJS esté disponible
            if (typeof emailjs === 'undefined') {
                console.error('EmailJS no está disponible');
                showMessage('Error: No se puede enviar el correo en este momento.', false);
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                return;
            }
            
            // Enviar correo usando EmailJS
            emailjs.send(
                'service_9yqr0ob',           // Tu Service ID
                'template_e307tzf',          // Tu Template ID
                {
                    to_email: 'jolinjps@hotmail.com',
                    from_name: name,
                    from_email: email,
                    message: message,
                    reply_to: email
                }
            )
            .then((response) => {
                console.log('Correo enviado exitosamente:', response);
                
                // Éxito - mostrar mensaje
                showMessage(t('successMessage'), true);
                contactForm.reset();
                
                // También enviar correo de confirmación al usuario
                emailjs.send(
                    'service_9yqr0ob',
                    'template_wvizzt5',
                    {
                        to_email: email,
                        from_name: 'Jordan Payta',
                        from_email: 'noreply@jordanpayta.com',
                        message: `Hola ${name},\n\nGracias por contactarme. He recibido tu mensaje y te responderé lo antes posible.\n\nSaludos,\nJordan Payta`,
                        reply_to: 'jolinjps@hotmail.com'
                    }
                );
                
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            })
            .catch((error) => {
                console.error('Error al enviar correo:', error);
                showMessage(t('errorMessage'), false);
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            });
        }
    });
}

// ===== VALIDACIÓN EN TIEMPO REAL =====
const formInputs = document.querySelectorAll('.contact__form-input');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
});

// Función para validar un campo individual
function validateField(field) {
    const fieldName = field.getAttribute('name');
    
    if (fieldName === 'name') {
        if (field.value.trim().length < 2) {
            field.classList.add('input-error');
        } else {
            field.classList.remove('input-error');
        }
    } else if (fieldName === 'email') {
        if (!validateEmail(field.value)) {
            field.classList.add('input-error');
        } else {
            field.classList.remove('input-error');
        }
    } else if (fieldName === 'message') {
        if (field.value.trim().length < 10) {
            field.classList.add('input-error');
        } else {
            field.classList.remove('input-error');
        }
    }
}

// ===== EFECTOS ADICIONALES =====
// Efecto de escritura en el título principal (opcional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== CONTADOR DE PROYECTOS (Animación de números) =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Observar los contadores y animarlos cuando sean visibles
const counters = document.querySelectorAll('.about__subtitle');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const text = entry.target.textContent;
            const number = parseInt(text.match(/\d+/));
            if (number) {
                animateCounter(entry.target, number, 1500);
            }
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    if (counter.textContent.includes('+')) {
        counterObserver.observe(counter);
    }
});

// ===== TEMA OSCURO/CLARO =====
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const lightTheme = 'light-theme';
const iconTheme = 'fa-sun';

// Tema previamente seleccionado (si el usuario lo eligió)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// Obtener el tema actual
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'light' : 'dark';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun';

// Validar si el usuario eligió previamente un tema
if (selectedTheme) {
    document.body.classList.remove(darkTheme, lightTheme);
    document.body.classList.add(selectedTheme);
    
    if (selectedIcon === 'fa-sun') {
        themeButton.classList.add(iconTheme);
        themeButton.querySelector('i').classList.remove('fa-moon');
        themeButton.querySelector('i').classList.add('fa-sun');
    } else {
        themeButton.classList.remove(iconTheme);
        themeButton.querySelector('i').classList.remove('fa-sun');
        themeButton.querySelector('i').classList.add('fa-moon');
    }
} else {
    // Por defecto: tema oscuro
    document.body.classList.add(darkTheme);
}

// Activar/desactivar el tema con el botón
if (themeButton) {
    themeButton.addEventListener('click', () => {
        // Toggle entre temas
        document.body.classList.toggle(darkTheme);
        document.body.classList.toggle(lightTheme);
        themeButton.classList.toggle(iconTheme);
        
        // Cambiar icono
        const icon = themeButton.querySelector('i');
        if (icon.classList.contains('fa-moon')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        
        // Guardar preferencia
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
        
        // Feedback visual
        themeButton.style.transform = 'scale(1.2) rotate(360deg)';
        setTimeout(() => {
            themeButton.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    });
}


// ===== CURSOR PERSONALIZADO (Efecto futurista opcional) =====
// Crear un cursor personalizado con efecto de seguimiento
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

// Agregar estilos para el cursor personalizado
const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
    .custom-cursor {
        width: 10px;
        height: 10px;
        background: var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    }
    
    .cursor-follower {
        width: 30px;
        height: 30px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.15s ease;
        display: none;
    }
    
    @media (min-width: 968px) {
        .custom-cursor,
        .cursor-follower {
            display: block;
        }
        
        body {
            cursor: none;
        }
        
        a, button {
            cursor: none;
        }
    }
`;
document.head.appendChild(cursorStyles);

// Mover el cursor personalizado
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animar el cursor con requestAnimationFrame para mejor rendimiento
function animateCursor() {
    // Cursor principal (más rápido)
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    // Cursor seguidor (más lento)
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.left = (followerX - 15) + 'px';
    cursorFollower.style.top = (followerY - 15) + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Efecto hover en elementos interactivos
const interactiveElements = document.querySelectorAll('a, button, .nav__link, .portfolio__card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// ===== PARTÍCULAS DE FONDO (Opcional - efecto futurista avanzado) =====
// Si quieres agregar partículas animadas en el fondo, puedes usar una librería
// como particles.js o crear un efecto simple con canvas

// ===== CONSOLA DE BIENVENIDA =====
// Mensaje de bienvenida en la consola del navegador
console.log(
    '%c¡Hola! 👋',
    'font-size: 20px; font-weight: bold; color: #3b82f6;'
);
console.log(
    '%cGracias por visitar mi portafolio',
    'font-size: 14px; color: #60a5fa;'
);
console.log(
    '%c¿Interesado en el código? Visita mi GitHub!',
    'font-size: 12px; color: #94a3b8;'
);

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy loading para imágenes
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===== INICIALIZACIÓN =====
console.log('Portfolio website loaded successfully! 🚀');

// ===== SISTEMA DE TRADUCCIÓN =====
const translations = {
    es: {
        // Navegación
        navHome: 'Inicio',
        navAbout: 'Sobre Mí',
        navExperience: 'Experiencia',
        navSkills: 'Habilidades',
        navPortfolio: 'Proyectos',
        navContact: 'Contacto',
        
        // Sección Home
        homeGreeting: 'Hola, soy',
        homeName: 'Jordan Jorge Payta Sarabia',
        homeProfession: 'Full-Stack Developer & Computer Engineer',
        homeDescription: 'Especializado en desarrollo web, inteligencia artificial y automatización de procesos. Apasionado por crear soluciones innovadoras y eficientes.',
        homeContactBtn: 'Contáctame',
        homeProjectsBtn: 'Ver Proyectos',
        homeScrollText: 'Scroll Down',
        
        // Sección About
        aboutTitle: 'Sobre Mí',
        aboutSubtitle: 'Mi introducción',
        
        // Sección Experience
        experienceTitle: 'Experiencia Profesional',
        experienceSubtitle: 'Mi trayectoria laboral',
        
        // Sección Skills
        skillsTitle: 'Habilidades',
        skillsSubtitle: 'Mi stack tecnológico',
        
        // Sección Portfolio
        portfolioTitle: 'Proyectos Destacados',
        portfolioSubtitle: 'Mi trabajo reciente',
        
        // Sección Contact
        contactTitle: 'Contacto',
        contactSubtitle: 'Ponte en contacto conmigo',
        contactEmail: 'Email',
        contactPhone: 'Teléfono',
        contactLocation: 'Ubicación',
        contactWriteMe: 'Escríbeme',
        contactCallMe: 'Llámame',
        contactFormName: 'Nombre',
        contactFormEmail: 'Email',
        contactFormMessage: 'Mensaje',
        contactFormPlaceholderName: 'Tu nombre completo',
        contactFormPlaceholderEmail: 'tu.email@ejemplo.com',
        contactFormPlaceholderMessage: 'Escribe tu mensaje aquí...',
        contactFormButton: 'Enviar Mensaje',
        
        // Footer
        footerDescription: 'Full-Stack Developer & Computer Engineer',
        footerAbout: 'Sobre Mí',
        footerExperience: 'Experiencia',
        footerProjects: 'Proyectos',
        footerCopy: '&#169; 2025 Jordan Payta. Todos los derechos reservados.',
        
        // Validaciones
        nameValidation: 'Por favor, ingresa un nombre válido (mínimo 2 caracteres).',
        emailValidation: 'Por favor, ingresa un email válido.',
        messageValidation: 'Por favor, ingresa un mensaje válido (mínimo 10 caracteres).',
        successMessage: '¡Mensaje enviado exitosamente! Te contactaré pronto.',
        errorMessage: 'Hubo un error al enviar el mensaje. Intenta nuevamente.',
        
        // Mapa
        mapTitle: 'Encuéntrame',
        mapSubtitle: 'Mi ubicación en el mapa',
        mapViewButton: 'Ver en mapa',
        mapLocation: 'Ubicación Actual',
        mapTimezone: 'Zona Horaria',
        mapCountry: 'Mexicali, Baja California 🇲🇽',
        mapTimezoneValue: 'UTC-7 (MST)',
    },
    en: {
        // Navigation
        navHome: 'Home',
        navAbout: 'About',
        navExperience: 'Experience',
        navSkills: 'Skills',
        navPortfolio: 'Projects',
        navContact: 'Contact',
        
        // Home Section
        homeGreeting: 'Hi, I\'m',
        homeName: 'Jordan Jorge Payta Sarabia',
        homeProfession: 'Full-Stack Developer & Computer Engineer',
        homeDescription: 'Specialized in web development, artificial intelligence and process automation. Passionate about creating innovative and efficient solutions.',
        homeContactBtn: 'Contact Me',
        homeProjectsBtn: 'View Projects',
        homeScrollText: 'Scroll Down',
        
        // About Section
        aboutTitle: 'About Me',
        aboutSubtitle: 'My introduction',
        
        // Experience Section
        experienceTitle: 'Professional Experience',
        experienceSubtitle: 'My work journey',
        
        // Skills Section
        skillsTitle: 'Skills',
        skillsSubtitle: 'My tech stack',
        
        // Portfolio Section
        portfolioTitle: 'Featured Projects',
        portfolioSubtitle: 'My recent work',
        
        // Contact Section
        contactTitle: 'Contact',
        contactSubtitle: 'Get in touch with me',
        contactEmail: 'Email',
        contactPhone: 'Phone',
        contactLocation: 'Location',
        contactWriteMe: 'Write to me',
        contactCallMe: 'Call me',
        contactFormName: 'Name',
        contactFormEmail: 'Email',
        contactFormMessage: 'Message',
        contactFormPlaceholderName: 'Your full name',
        contactFormPlaceholderEmail: 'your.email@example.com',
        contactFormPlaceholderMessage: 'Write your message here...',
        contactFormButton: 'Send Message',
        
        // Footer
        footerDescription: 'Full-Stack Developer & Computer Engineer',
        footerAbout: 'About',
        footerExperience: 'Experience',
        footerProjects: 'Projects',
        footerCopy: '&#169; 2025 Jordan Payta. All rights reserved.',
        
        // Validations
        nameValidation: 'Please enter a valid name (minimum 2 characters).',
        emailValidation: 'Please enter a valid email.',
        messageValidation: 'Please enter a valid message (minimum 10 characters).',
        successMessage: 'Message sent successfully! I\'ll get back to you soon.',
        errorMessage: 'There was an error sending the message. Please try again.',
        
        // Map
        mapTitle: 'Find Me',
        mapSubtitle: 'My location on the map',
        mapViewButton: 'View on map',
        mapLocation: 'Current Location',
        mapTimezone: 'Timezone',
        mapCountry: 'Mexicali, Baja California 🇲🇽',
        mapTimezoneValue: 'UTC-7 (MST)',
    }
};

// Variables de idioma
let currentLanguage = localStorage.getItem('selectedLanguage') || 'es';

// Función para obtener texto traducido
function t(key) {
    return translations[currentLanguage][key] || translations['es'][key];
}

// Función para cambiar el idioma
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    updatePageLanguage();
    updateTranslateButton();
}

// Función para actualizar el texto de la página
function updatePageLanguage() {
    // Navegación
    document.querySelectorAll('.nav__link').forEach((link, index) => {
        const keys = ['navHome', 'navAbout', 'navExperience', 'navSkills', 'navPortfolio', 'navContact'];
        link.textContent = t(keys[index]);
    });
    
    // Home Section
    const homeGreeting = document.querySelector('.home__greeting');
    const homeName = document.querySelector('.home__name');
    const homeProfession = document.querySelector('.home__profession');
    const homeDescription = document.querySelector('.home__description');
    const scrollName = document.querySelector('.home__scroll-name');
    
    if (homeGreeting) homeGreeting.textContent = t('homeGreeting');
    if (homeName) homeName.textContent = t('homeName');
    if (homeProfession) homeProfession.textContent = t('homeProfession');
    if (homeDescription) homeDescription.textContent = t('homeDescription');
    if (scrollName) scrollName.textContent = t('homeScrollText');
    
    // Botones Home
    const homeButtons = document.querySelectorAll('.home__buttons .button');
    if (homeButtons[0]) {
        homeButtons[0].innerHTML = t('homeContactBtn') + ' <i class="fas fa-paper-plane"></i>';
    }
    if (homeButtons[1]) {
        homeButtons[1].innerHTML = t('homeProjectsBtn') + ' <i class="fas fa-arrow-right"></i>';
    }
    
    // Section Titles
    document.querySelectorAll('.section__title').forEach((title, index) => {
        const titleKeys = ['aboutTitle', 'experienceTitle', 'skillsTitle', 'portfolioTitle', 'contactTitle'];
        if (titleKeys[index]) title.textContent = t(titleKeys[index]);
    });
    
    document.querySelectorAll('.section__subtitle').forEach((subtitle, index) => {
        const subtitleKeys = ['aboutSubtitle', 'experienceSubtitle', 'skillsSubtitle', 'portfolioSubtitle', 'contactSubtitle'];
        if (subtitleKeys[index]) subtitle.textContent = t(subtitleKeys[index]);
    });
    
    // Contact Cards
    const contactCards = document.querySelectorAll('.contact__card');
    const contactCardTitles = ['contactEmail', 'contactPhone', 'contactLocation'];
    const contactButtonTexts = ['contactWriteMe', 'contactCallMe'];
    
    contactCards.forEach((card, index) => {
        const cardTitle = card.querySelector('.contact__card-title');
        if (cardTitle) cardTitle.textContent = t(contactCardTitles[index]);
        
        const button = card.querySelector('.contact__button');
        if (button && index < 2) {
            button.innerHTML = t(contactButtonTexts[index]) + ' <i class="fas fa-arrow-right"></i>';
        }
    });
    
    // Contact Form
    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        const nameLabel = contactForm.querySelector('label[for*="name"]') || contactForm.querySelectorAll('.contact__form-tag')[0];
        const emailLabel = contactForm.querySelectorAll('.contact__form-tag')[1];
        const messageLabel = contactForm.querySelectorAll('.contact__form-tag')[2];
        
        if (nameLabel) nameLabel.textContent = t('contactFormName');
        if (emailLabel) emailLabel.textContent = t('contactFormEmail');
        if (messageLabel) messageLabel.textContent = t('contactFormMessage');
        
        const nameInput = contactForm.querySelector('input[name="name"]');
        const emailInput = contactForm.querySelector('input[name="email"]');
        const messageInput = contactForm.querySelector('textarea[name="message"]');
        
        if (nameInput) nameInput.placeholder = t('contactFormPlaceholderName');
        if (emailInput) emailInput.placeholder = t('contactFormPlaceholderEmail');
        if (messageInput) messageInput.placeholder = t('contactFormPlaceholderMessage');
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) submitButton.innerHTML = t('contactFormButton') + ' <i class="fas fa-paper-plane"></i>';
    }
    
    // Footer
    const footerLinks = document.querySelectorAll('.footer__link');
    const footerLinkKeys = ['footerAbout', 'footerExperience', 'footerProjects'];
    footerLinks.forEach((link, index) => {
        if (footerLinkKeys[index]) link.textContent = t(footerLinkKeys[index]);
    });
}

// Función para actualizar el botón de traducción
function updateTranslateButton() {
    const translateBtn = document.getElementById('translate-btn');
    const translateText = translateBtn.querySelector('.translate__text');
    if (currentLanguage === 'es') {
        translateText.textContent = 'EN';
        translateBtn.title = 'Cambiar idioma';
    } else {
        translateText.textContent = 'ES';
        translateBtn.title = 'Change language';
    }
}

// Event listener para el botón de traducción
const translateBtn = document.getElementById('translate-btn');
if (translateBtn) {
    translateBtn.addEventListener('click', () => {
        changeLanguage(currentLanguage === 'es' ? 'en' : 'es');
    });
}

// Actualizar página al cargar
updatePageLanguage();
updateTranslateButton();

// ===== INICIALIZACIÓN DE MAPBOX =====
// Reemplaza con tu token de Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoibHVmZmlubyIsImEiOiJjbWlpMjlpY2QwbmZ2M2dwdnB1djd5dW83In0.sqZdnXr1b7Fi3nVD_d8PYA';

// Crear mapa cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Verificar que el elemento exista
    const mapElement = document.getElementById('mapbox-map');
    if (!mapElement) return;
    
    // Inicializar mapa - Mexicali, Baja California
    const map = new mapboxgl.Map({
        container: 'mapbox-map',
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-115.4734, 32.6275], // Coordenadas de Mexicali, Baja California
        zoom: 12,
        pitch: 20,
        bearing: -20
    });

    // Agregar controles de navegación
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Agregar control de escala
    map.addControl(new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: 'metric'
    }), 'bottom-left');

    // Marcador personalizado en tu ubicación
    const marker = new mapboxgl.Marker({
        color: '#3b82f6',
        scale: 1.2
    })
    .setLngLat([-115.4734, 32.6275]) // Mexicali, Baja California
    .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
            <div class="map-popup">
                <h4>Jordan Payta</h4>
                <p>Full-Stack Developer & Computer Engineer</p>
                <p style="margin-top: 0.5rem; font-size: 0.85rem; color: #94a3b8;">Ubicación: Mexicali, Baja California 🇲🇽</p>
            </div>
        `))
    .addTo(map);

    // Hacer popup visible al hacer clic
    marker.getElement().addEventListener('click', function() {
        marker.togglePopup();
    });

    // Mostrar popup automáticamente después de que cargue el mapa
    map.on('load', function() {
        setTimeout(() => {
            marker.togglePopup();
        }, 1000);
    });

    // Animar entrada del mapa
    map.on('load', function() {
        // Efectos visuales adicionales
        const layers = map.getStyle().layers;
        
        // Cambiar algunas capas de estilo
        map.setPaintProperty('water', 'fill-color', '#06b6d4');
    });

    // Scroll suave al hacer clic en "Ver en mapa"
    const scrollButtons = document.querySelectorAll('.contact__button--scroll');
    scrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const mapSection = document.getElementById('map');
            mapSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// Función para cambiar ubicación en el mapa
function actualizarUbicacion(lat, lng, titulo) {
    if (typeof mapboxgl === 'undefined') return;
    
    const map = new mapboxgl.Map({
        container: 'mapbox-map',
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [lng, lat],
        zoom: 12
    });

    new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup()
            .setHTML(`<h4>${titulo}</h4>`))
        .addTo(map);
}
