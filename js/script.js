async function loadInclude(placeholderId, url) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    try {
        const response = await fetch(url);
        if (response.ok) {
            placeholder.outerHTML = await response.text();
        }
    } catch (error) {
        console.error('No se pudo cargar ' + url, error);
    }
}

function initHeader() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle) {
        navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
    }

    if (navClose) {
        navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
    });

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        link.classList.toggle('active-link', link.getAttribute('href') === currentPage);
    });

    function scrollHeader() {
        const header = document.getElementById('header');
        if (!header) return;
        header.classList.toggle('scroll-header', window.scrollY >= 50);
    }
    window.addEventListener('scroll', scrollHeader);
    scrollHeader();

    const translateBtn = document.getElementById('translate-btn');
    if (translateBtn) {
        translateBtn.addEventListener('click', () => {
            changeLanguage(currentLanguage === 'es' ? 'en' : 'es');
        });
    }
}

function initFooter() {
    function scrollUp() {
        const scrollUpBtn = document.getElementById('scroll-up');
        if (!scrollUpBtn) return;
        scrollUpBtn.classList.toggle('show-scroll', window.scrollY >= 350);
    }
    window.addEventListener('scroll', scrollUp);
    scrollUp();

    document.getElementById('scroll-up')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

Promise.all([
    loadInclude('header-include', 'components/header.html'),
    loadInclude('footer-include', 'components/footer.html')
]).then(() => {
    initHeader();
    initFooter();
    updatePageLanguage();
});

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

const animatedElements = document.querySelectorAll(
    '.experience__card, .education__card, .skills__layout, .portfolio__card, .contact__card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm(formData) {
    const errors = [];

    if (!formData.get('name') || formData.get('name').trim().length < 2) {
        errors.push(t('nameValidation'));
    }

    if (!formData.get('email') || !validateEmail(formData.get('email'))) {
        errors.push(t('emailValidation'));
    }

    if (!formData.get('message') || formData.get('message').trim().length < 10) {
        errors.push(t('messageValidation'));
    }

    return errors;
}

function showMessage(message, isSuccess = true) {
    contactMessage.textContent = message;
    contactMessage.className = 'contact__message ' + (isSuccess ? 'success' : 'error');

    setTimeout(() => {
        contactMessage.textContent = '';
        contactMessage.className = 'contact__message';
    }, 5000);
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const errors = validateForm(formData);

        if (errors.length > 0) {
            showMessage(errors.join(' | '), false);
            return;
        }

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalHTML = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + t('contactFormSending');

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showMessage(t('successMessage'), true);
                    contactForm.reset();
                } else {
                    console.error('Web3Forms respondió con error:', data);
                    showMessage(t('errorMessage'), false);
                }
            })
            .catch((error) => {
                console.error('Error al enviar el mensaje:', error);
                showMessage(t('errorMessage'), false);
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalHTML;
            });
    });
}

const skillTabs = document.querySelectorAll('.skills__tab');
skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;

        skillTabs.forEach(t => {
            t.classList.remove('active-tab');
            t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active-tab');
        tab.setAttribute('aria-selected', 'true');

        document.querySelectorAll('.skills__panel').forEach(panel => {
            panel.hidden = panel.id !== targetId;
        });
    });
});

const formInputs = document.querySelectorAll('.contact__form-input');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
});

function validateField(field) {
    const fieldName = field.getAttribute('name');

    if (fieldName === 'name') {
        field.classList.toggle('input-error', field.value.trim().length < 2);
    } else if (fieldName === 'email') {
        field.classList.toggle('input-error', !validateEmail(field.value));
    } else if (fieldName === 'message') {
        field.classList.toggle('input-error', field.value.trim().length < 10);
    }
}

console.log('%c¡Hola! 👋', 'font-size: 20px; font-weight: bold; color: #2451e0;');
console.log('%cGracias por visitar mi portafolio', 'font-size: 14px; color: #5b6577;');
console.log('%c¿Interesado en el código? Visita mi GitHub!', 'font-size: 12px; color: #8791a1;');

let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

function t(key) {
    return translations[currentLanguage][key] || translations['es'][key];
}

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    updatePageLanguage();
}

function updatePageLanguage() {
    document.documentElement.lang = currentLanguage;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.getAttribute('data-i18n'));
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });

    updateTranslateButton();
}

function updateTranslateButton() {
    const translateBtn = document.getElementById('translate-btn');
    if (!translateBtn) return;
    const translateText = translateBtn.querySelector('.translate__text');
    if (currentLanguage === 'es') {
        translateText.textContent = 'EN';
        translateBtn.title = 'Change language';
    } else {
        translateText.textContent = 'ES';
        translateBtn.title = 'Cambiar idioma';
    }
}

updatePageLanguage();
