function filterContent() {
    // 1. Obtener el valor de búsqueda y normalizarlo
    const input = document.getElementById('search-input');
    // Convertir a minúsculas, remover acentos y espacios extra para una búsqueda flexible
    const filter = input.value.toLowerCase().trim(); 

    // 2. Obtener todas las tarjetas de contenido
    const cards = document.querySelectorAll('.content-card');

    // 3. Recorrer cada tarjeta para aplicar el filtro
    cards.forEach(card => {
        // Obtener el texto de la tarjeta (título y descripción)
        const title = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        // El texto completo de la tarjeta para buscar
        const cardText = title + ' ' + description; 

        // 4. Determinar si la tarjeta debe mostrarse
        if (cardText.includes(filter)) {
            // Si el texto de la tarjeta CONTIENE el texto del filtro, la muestra
            card.style.display = ''; // Usar el display por defecto (grid item)
        } else {
            // Si no contiene el texto, la oculta
            card.style.display = 'none';
        }
    });
}