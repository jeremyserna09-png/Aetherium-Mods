document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail-strip .thumbnail');

    if (!mainImage || thumbnails.length === 0) return;

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const newImageSrc = thumbnail.getAttribute('src');

            // Si ya está mostrando la misma imagen, no hagas nada
            if (mainImage.getAttribute('src') === newImageSrc) return;

            // Efecto de fade-out
            mainImage.classList.add('fade-out');

            // Espera a que la opacidad llegue a 0 antes de cambiar la imagen
            setTimeout(() => {
                mainImage.setAttribute('src', newImageSrc);

                // Después de cambiar la imagen, quita el fade-out para hacer fade-in
                mainImage.classList.remove('fade-out');
            }, 300); // Tiempo en ms (debe coincidir con el CSS)
            
            // Actualizar miniatura activa
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        });
    });
});