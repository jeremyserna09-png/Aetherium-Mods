// === Cargar Sidebar y Footer con fallback local ===
document.addEventListener("DOMContentLoaded", () => {
    const loadComponent = (selector, filePath, fallbackHTML) => {
        const container = document.querySelector(selector);
        if (!container) return;

        // Transición visual
        container.classList.add("fade-in");

        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error(`No se pudo cargar ${filePath}`);
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                setTimeout(() => container.classList.add("loaded"), 100);
            })
            .catch(() => {
                // Si fetch falla (por ejemplo, en file:///), usa el contenido de respaldo
                console.warn(`⚠️ No se pudo cargar ${filePath}, usando fallback local`);
                container.innerHTML = fallbackHTML;
                setTimeout(() => container.classList.add("loaded"), 100);
            });
    };

    // Sidebar de respaldo
    const sidebarFallback = `
        <aside class="sidebar">
          <div class="sidebar-header">
              <img src="../img/Perfect_repository.png" alt="Logo Aetherium Mods" class="sidebar-logo">
              <h3>Aetherium Mods</h3>
              <p>Perfect Repository</p>
          </div>
          <nav>
              <ul>
                  <li><a href="../index.html"><i class="fas fa-home"></i> Página Principal</a></li>
                  <li><a href="#destacados"><i class="fas fa-star"></i> Destacados</a></li>
                  <li><a href="#juegos"><i class="fas fa-gamepad"></i> Juegos Compatibles</a></li>
                  <li><a href="#noticias"><i class="fas fa-bullhorn"></i> Noticias</a></li>
                  <li><a href="#contacto"><i class="fas fa-comments"></i> Foro / Comunidad</a></li>
              </ul>
          </nav>
        </aside>
    `;

    // Footer de respaldo
    const footerFallback = `
        <footer class="site-footer">
          <div class="footer-container">
              <div class="footer-column contact-info">
                  <img src="../img/Perfect_repository.png" alt="Logo Aetherium Mods" class="footer-logo">
                  <p>Aetherium Mods</p>
                  <p>El mejor centro de Mods</p>
                  <p class="contact-detail"><i class="fas fa-envelope"></i> aetherium.mods@gmail.com</p>
              </div>

              <div class="footer-column site-links">
                  <h4>Comunidad</h4>
                  <ul>
                      <li><a href="#"><i class="fas fa-comments"></i> Foro Oficial</a></li>
                      <li><a href="#"><i class="fab fa-discord"></i> Discord</a></li>
                  </ul>
              </div>
          </div>
          <div class="footer-bottom">
              <p>&copy; 2025 Aetherium Mods. Todos los derechos reservados.</p>
          </div>
        </footer>
    `;

    // Cargar los componentes (fetch o fallback)
    loadComponent("#sidebar-container", "../partials/sidebar.html", sidebarFallback);
    loadComponent("#footer-container", "../partials/footer.html", footerFallback);
});


