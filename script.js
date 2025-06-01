document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.getElementById('whatsappButton');
    
    whatsappButton.addEventListener('click', function() {
        // Número de telefone (substitua pelo seu número)
        const phoneNumber = '5599999999999';
        
        // Mensagem personalizada (codificada para URL)
        const message = encodeURIComponent('Olá! Estou interessado no seu produto. Pode me dar mais informações?');
        
        // Criar o link do WhatsApp
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
        
        // Abrir o WhatsApp em uma nova aba
        window.open(whatsappLink, '_blank');
    });
}); 