document.addEventListener("DOMContentLoaded", () => {

    const allCarousels = document.querySelectorAll(".svc-carousel");

    allCarousels.forEach(carousel => {
        const track = carousel.querySelector(".svc-track");
        const images = carousel.querySelectorAll("img");
        const btnPrev = carousel.querySelector(".svc-prev");
        const btnNext = carousel.querySelector(".svc-next");

        let index = 0;
        let autoSlide;

        // --- FUNCIONES ---
        const update = () => {
            track.style.transform = `translateX(-${index * 100}%)`;
        };

        const next = () => {
            index = (index + 1) % images.length;
            update();
        };

        const prev = () => {
            index = (index - 1 + images.length) % images.length;
            update();
        };

        // --- BOTONES ---
        btnNext.addEventListener("click", () => {
            stopAuto();
            next();
            startAuto();
        });

        btnPrev.addEventListener("click", () => {
            stopAuto();
            prev();
            startAuto();
        });

        // --- AUTO SLIDE ---
        const startAuto = () => {
            autoSlide = setInterval(next, 3500); // cada 3.5 segundos
        };

        const stopAuto = () => {
            clearInterval(autoSlide);
        };

        startAuto();

        // --- SWIPE EN CELULAR ---
        let startX = 0;
        let endX = 0;

        track.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
            stopAuto();
        });

        track.addEventListener("touchmove", (e) => {
            endX = e.touches[0].clientX;
        });

        track.addEventListener("touchend", () => {
            let diff = endX - startX;

            if (Math.abs(diff) > 50) {
                if (diff < 0) next();      // deslizó a la izquierda
                else prev();               // deslizó a la derecha
            }

            startAuto();
        });

    });

});
