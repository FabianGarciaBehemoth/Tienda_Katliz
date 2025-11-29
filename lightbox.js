// Función para obtener imágenes de cada producto o servicio desde el atributo data-images
function obtenerImagenesDeCarpeta(imgElement) {
    const folder = imgElement.getAttribute("data-folder");
    const imagesList = imgElement.getAttribute("data-images");
    if (imagesList) {
        return imagesList.split(",").map(image => `${folder}/${image.trim()}`);
    } else {
        return [imgElement.src]; // Si no hay data-images, usar la imagen misma
    }
}

// Variables del lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxDesc = document.getElementById("lightbox-desc"); // Nuevo para descripción
let imagenActual = 0;
let imagenesArray = [];

// Función para abrir el Lightbox
function openLightbox(imgElement) {
    imagenesArray = obtenerImagenesDeCarpeta(imgElement);
    if (imagenesArray.length > 0) {
        imagenActual = 0;
        lightbox.style.display = "flex";
        lightboxImg.src = imagenesArray[imagenActual];
        lightboxImg.alt = imgElement.alt || "";
        if (lightboxDesc) lightboxDesc.textContent = imgElement.alt || "";
    }
}

// Función para cambiar de imagen
function changeImage(direction) {
    imagenActual += direction;
    if (imagenActual < 0) {
        imagenActual = imagenesArray.length - 1;
    } else if (imagenActual >= imagenesArray.length) {
        imagenActual = 0;
    }
    lightboxImg.src = imagenesArray[imagenActual];
    lightboxImg.alt = lightboxImg.alt || "";
    if (lightboxDesc) lightboxDesc.textContent = lightboxImg.alt || "";
}

// Función para cerrar el lightbox
function closeLightbox() {
    lightbox.style.display = "none";
}

// --- EVENTOS PARA PRODUCTOS ---
document.querySelectorAll(".imagen-producto img").forEach(img => {
    img.addEventListener("click", (e) => {
        e.preventDefault();
        openLightbox(img);
    });
});

// --- EVENTOS PARA SERVICIOS ---
document.querySelectorAll(".svc-track img").forEach(img => {
    img.addEventListener("click", () => {
        imagenesArray = Array.from(img.parentElement.querySelectorAll("img")).map(i => i.src);
        imagenActual = Array.from(img.parentElement.querySelectorAll("img")).indexOf(img);
        lightbox.style.display = "flex";
        lightboxImg.src = imagenesArray[imagenActual];
        lightboxDesc.textContent = img.alt || "";
    });
});

// --- Cerrar el lightbox al hacer clic fuera ---
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});
