document.addEventListener('DOMContentLoaded', function() {
    // Configuração do WhatsApp
    const phoneNumber = '5599999999999';
    const message = encodeURIComponent('Olá! Gostaria de solicitar um orçamento para manutenção do meu dispositivo.');
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

    // Função para abrir o WhatsApp
    function openWhatsApp(e) {
        e.preventDefault();
        window.open(whatsappLink, '_blank');
    }

    // Adicionar evento de clique a todos os botões de WhatsApp
    const whatsappButtons = [
        document.getElementById('whatsappHeader'),
        document.getElementById('whatsappButton'),
        document.getElementById('whatsappButtonCta')
    ];

    whatsappButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', openWhatsApp);
        }
    });

    // Animação suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 