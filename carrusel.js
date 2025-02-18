document.addEventListener("DOMContentLoaded", function () {
    const carouselContainer = document.querySelector(".carousel-container");
    const carousel = document.querySelector(".carousel");
    const images = document.querySelectorAll('.carousel-image');
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let currentSlide = 0;
    let totalImages = images.length;
    let interval;
    let startX = 0;
    let isDragging = false;
    let isMobile = window.innerWidth <= 768; // Detectar si es móvil

    // Asegurar que el contenedor principal oculte el desbordamiento
    carouselContainer.style.overflow = "hidden";
    carousel.style.display = "flex";
    carousel.style.transition = "transform 0.5s ease-in-out";

    function updateCarouselPosition() {
        if (images.length === 0) return;

        if (isMobile) {
            // En móvil, mover en porcentaje (%)
            const offset = -currentSlide * 100;
            carousel.style.transform = `translateX(${offset}%)`;
        } else {
            // En PC, mover en píxeles (px) usando el ancho de la imagen
            const imageWidth = images[0].clientWidth;
            const offset = -currentSlide * imageWidth;
            carousel.style.transform = `translateX(${offset}px)`;
        }
    }

    function moveSlide(step) {
        clearInterval(interval); // Detener el auto-scroll al cambiar manualmente
        currentSlide = (currentSlide + step + totalImages) % totalImages;
        updateCarouselPosition();
        startCarousel(); // Reiniciar el auto-scroll después de mover
    }

    prevBtn.addEventListener("click", () => moveSlide(-1));
    nextBtn.addEventListener("click", () => moveSlide(1));

    function startCarousel() {
        clearInterval(interval); // Evitar múltiples intervalos activos
        interval = setInterval(() => {
            moveSlide(1);
        }, 4000);
    }

    // Eventos de toque en móviles
    carouselContainer.addEventListener("touchstart", (e) => {
        if (!isMobile) return; // Solo aplicar en móviles
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(interval); // Pausar auto-scroll al tocar
    });

    carouselContainer.addEventListener("touchmove", (e) => {
        if (!isMobile || !isDragging) return;
        let moveX = e.touches[0].clientX;
        let diff = moveX - startX;

        if (Math.abs(diff) > 50) { // Si el deslizamiento es significativo
            moveSlide(diff > 0 ? -1 : 1);
            isDragging = false;
        }
    });

    carouselContainer.addEventListener("touchend", () => {
        if (!isMobile) return;
        isDragging = false;
        startCarousel(); // Reanudar auto-scroll después de tocar
    });

    // Detectar cambios en el tamaño de la pantalla y actualizar la configuración
    window.addEventListener("resize", () => {
        isMobile = window.innerWidth <= 768;
        updateCarouselPosition();
    });

    // Iniciar carrusel cuando la página cargue completamente
    window.addEventListener("load", function () {
        if (images.length === 0) {
            console.error("No se encontraron imágenes en el carrusel.");
            return;
        }
        updateCarouselPosition();
        startCarousel();
    });
});
