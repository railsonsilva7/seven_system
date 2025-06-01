// Configurações
const config = {
    whatsapp: {
        number: '5511999999999',
        message: 'Olá! Gostaria de fazer um orçamento.'
    },
    selectors: {
        header: '.header',
        whatsappButtons: [
            '#whatsappHero',
            '#whatsappCta',
            '#whatsappContact'
        ],
        serviceActions: '.service-action'
    }
};

// Utilitários
const utils = {
    createWhatsAppLink: (message = config.whatsapp.message) => {
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${config.whatsapp.number}?text=${encodedMessage}`;
    },
    
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Gerenciador de WhatsApp
const whatsAppManager = {
    init() {
        config.selectors.whatsappButtons.forEach(selector => {
            const button = document.querySelector(selector);
            if (button) {
                button.href = utils.createWhatsAppLink();
                button.target = '_blank';
                button.rel = 'noopener noreferrer';
            }
        });

        // Adiciona listeners para botões de serviço
        document.querySelectorAll(config.selectors.serviceActions).forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const service = button.dataset.service;
                const message = `Olá! Gostaria de um orçamento para ${service}.`;
                window.open(utils.createWhatsAppLink(message), '_blank', 'noopener,noreferrer');
            });
        });
    }
};

// Gerenciador de Scroll
const scrollManager = {
    init() {
        const header = document.querySelector(config.selectors.header);
        let lastScroll = 0;

        const handleScroll = utils.throttle(() => {
            const currentScroll = window.scrollY;

            // Atualiza classe do header
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Direção do scroll
            if (currentScroll > lastScroll) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        }, 100);

        window.addEventListener('scroll', handleScroll);
    }
};

// Gerenciador de Navegação
const navigationManager = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

// Gerenciador de Interações
const interactionManager = {
    init() {
        // Hover effects nos cards de serviço
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // Feedback visual nos botões
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;

                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
};

// Gerenciador de Acessibilidade
const a11yManager = {
    init() {
        // Foco visível apenas ao usar teclado
        document.body.addEventListener('mousedown', () => {
            document.body.classList.add('using-mouse');
        });

        document.body.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.remove('using-mouse');
            }
        });

        // ARIA labels dinâmicos
        document.querySelectorAll('.service-card').forEach(card => {
            const title = card.querySelector('h3').textContent;
            const button = card.querySelector('.service-action');
            if (button) {
                button.setAttribute('aria-label', `Solicitar orçamento para ${title}`);
            }
        });
    }
};

// Gerenciador de Performance
const performanceManager = {
    init() {
        // Lazy loading de imagens
        if ('loading' in HTMLImageElement.prototype) {
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        } else {
            // Fallback para navegadores que não suportam lazy loading
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
            document.body.appendChild(script);
        }

        // Preconnect para recursos externos
        const preconnectLinks = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://cdnjs.cloudflare.com'
        ];

        preconnectLinks.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = url;
            document.head.appendChild(link);
        });
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    whatsAppManager.init();
    scrollManager.init();
    navigationManager.init();
    interactionManager.init();
    a11yManager.init();
    performanceManager.init();
});

// Service Worker (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .catch(err => console.log('Service Worker registration failed:', err));
    });
} 