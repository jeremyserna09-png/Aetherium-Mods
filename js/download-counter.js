document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("downloadBtn");
    const countElement = document.getElementById("downloadCount");

    if (!btn || !countElement) return;

    // Extrae el número actual del texto (ej. "45 890 descargas")
    let count = parseInt(countElement.textContent.replace(/\D/g, ""));

    btn.addEventListener("click", () => {
        count++;
        countElement.textContent = count.toLocaleString("es-ES") + " descargas";

        // Animación "bump"
        countElement.classList.add("bump");
        setTimeout(() => countElement.classList.remove("bump"), 300);
    });
});