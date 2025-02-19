// Función para obtener imágenes de cada producto desde el atributo data-images
function obtenerImagenesDeCarpeta(imgElement) {
    const folder = imgElement.getAttribute("data-folder");
    const imagesList = imgElement.getAttribute("data-images").split(",");
    return imagesList.map(image => `${folder}/${image.trim()}`);
}

// Variables del lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
let imagenActual = 0;
let imagenesArray = [];

// Función para abrir el Lightbox
function openLightbox(imgElement) {
    imagenesArray = obtenerImagenesDeCarpeta(imgElement);
    if (imagenesArray.length > 0) {
        imagenActual = 0;
        lightbox.style.display = "flex";
        lightboxImg.src = imagenesArray[imagenActual];
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
}

// Función para cerrar el lightbox
function closeLightbox() {
    lightbox.style.display = "none";
}

// Agregar evento a las imágenes para abrir el lightbox directamente
document.querySelectorAll(".imagen-producto img").forEach(img => {
    img.addEventListener("click", (e) => {
        e.preventDefault();
        openLightbox(img);
    });
});

// Cerrar el lightbox al hacer clic fuera
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});
