/* HEADER */
const hamburger = document.querySelector('header .hamburger');
const navLinks = document.querySelector('header .nav-links');
const navItems = document.querySelectorAll('header .nav-links a');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
        navLinks.classList.remove('active');
    }
});
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

/* RESIZE */
// Eventos de inputs
function inputEvents(input, action, funcion) {
    document.getElementById(input).addEventListener(action, funcion);
}
// Cambiar dimensiones de contenido
function resizeImage() {
    const newWidth = document.getElementById("ancho-input").value;
    const newHeight = document.getElementById("alto-input").value;
    const contentDiv = document.getElementById("content");
    contentDiv.style.width = newWidth + "px";
    contentDiv.style.height = newHeight + "px";
}
inputEvents('ancho-input', 'input', resizeImage);
inputEvents('alto-input', 'input', resizeImage);

// Cargar imagen como fondo del contenido
document.getElementById("file-input").addEventListener("change", function (event) {
    const file = event.target.files[0];
    const contentDiv = document.getElementById("content");
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                document.getElementById("ancho-input").value = img.width;
                document.getElementById("alto-input").value = img.height;
                contentDiv.style.width = img.width + "px";
                contentDiv.style.height = img.height + "px";
                contentDiv.style.backgroundImage = `url(${e.target.result})`;
            };
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// Capturar y descargar la imagen
function downloadImage() {
    const calidad = document.getElementById('calidad-input').value;
    const contentDiv = document.getElementById("content");
    html2canvas(contentDiv, {
        backgroundColor: null,
        scale: calidad
    }).then(canvas => {
        let link = document.createElement('a');
        link.download = 'resized-WNS.png';
        link.href = canvas.toDataURL();
        link.click();
    }).catch(error => {
        console.error('Error al capturar la imagen:', error);
    });
}
inputEvents('download-btn', 'click', downloadImage);

/* FOOTER */
const year = new Date().getFullYear();
document.querySelector('footer p').innerHTML = `&copy; ${year} William Sosa. Todos los derechos reservados.`;