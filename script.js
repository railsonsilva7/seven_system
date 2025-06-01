// Configuração do número do WhatsApp
const WHATSAPP_NUMBER = '5511999999999'; // Substitua pelo número real
const WHATSAPP_MESSAGE = 'Olá! Gostaria de fazer um orçamento.';

// Função para criar link do WhatsApp
function createWhatsAppLink(message = WHATSAPP_MESSAGE) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Função para inicializar os botões do WhatsApp
function initWhatsAppButtons() {
    const whatsappButtons = [
        document.getElementById('whatsappHeader'),
        document.getElementById('whatsappButton'),
        document.getElementById('whatsappButtonCta'),
        document.getElementById('whatsappFooter')
    ];

    whatsappButtons.forEach(button => {
        if (button) {
            button.href = createWhatsAppLink();
            button.target = '_blank';
            button.rel = 'noopener noreferrer';
        }
    });
}

// Função para lidar com o scroll da página
function handleScroll() {
    const header = document.querySelector('.header');
    const backToTop = document.getElementById('back-to-top');
    const scrollPosition = window.scrollY;

    // Header com fundo transparente no scroll
    if (scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Botão "Voltar ao topo"
    if (scrollPosition > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Animação de elementos no scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const delay = element.dataset.delay || 0;

        if (elementTop < window.innerHeight - 50 && elementBottom > 0) {
            setTimeout(() => {
                element.classList.add('visible');
            }, delay);
        }
    });
}

// Função para scroll suave
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 100,
            behavior: 'smooth'
        });
    }
}

// Função para inicializar os links de navegação
function initNavigationLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });
}

// Função para inicializar o botão "Voltar ao topo"
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Função para melhorar a acessibilidade do teclado
function initKeyboardAccessibility() {
    // Adiciona outline apenas quando usar o teclado
    document.body.addEventListener('mousedown', () => {
        document.body.classList.add('using-mouse');
    });

    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.remove('using-mouse');
        }
    });

    // Adiciona suporte a teclas para elementos interativos
    document.querySelectorAll('details').forEach(detail => {
        detail.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                detail.open = !detail.open;
            }
        });
    });
}

// Função para carregar imagens de forma lazy
function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback para navegadores que não suportam lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
}

// Função para melhorar a performance de eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Função para adicionar feedback visual nos botões
function initButtonFeedback() {
    const buttons = document.querySelectorAll('button, .primary-button, .secondary-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    initWhatsAppButtons();
    initNavigationLinks();
    initBackToTop();
    initKeyboardAccessibility();
    initLazyLoading();
    initButtonFeedback();

    // Adiciona listener de scroll com debounce
    window.addEventListener('scroll', debounce(handleScroll, 10));
    
    // Executa handleScroll inicialmente para configurar o estado inicial
    handleScroll();
});

// Service Worker para PWA (se necessário)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    });
} 