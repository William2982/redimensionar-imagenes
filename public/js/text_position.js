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

/* TEXT POSITION */
// Eventos de inputs
function inputEvents(input, action, funcion) {
    document.getElementById(input).addEventListener(action, funcion);
}

// Mostrar texto
bgText();
function bgText() {
    const bgTexto = document.getElementById('bg-texto').value;
    const bg = document.querySelector(".bg");
    bg.innerHTML = bgTexto;
}
inputEvents('bg-texto', 'input', bgText);

// Cambiar fuente de texto
function fuente() {
    const fuente = document.getElementById('fuente-input').value;
    const content = document.getElementById('content');
    const bgSvg = document.querySelector("#content svg");
    const bgP = document.querySelector(".bg p");
    content.style.fontSize = fuente + "px";
    if (bgP) {
        bgP.style.fontSize = fuente + "px";
    }
    if (bgSvg) {
        bgSvg.style.height = fuente + "px";
        bgSvg.style.width = fuente + "px";
    }
}
inputEvents('fuente-input', 'input', fuente);

// Convertir de hex a rbg
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { r, g, b };
}
// Cambiar color de fondo y texto
function bgColors() {
    const colorBg = document.getElementById("colorbg-input").value;
    const colorText = document.getElementById("color-input").value;
    const opacityInput = document.getElementById('opacity-input').value;
    const rgb = hexToRgb(colorBg);
    const bg = document.querySelector(".bg");
    bg.style.backgroundColor = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${opacityInput})`;
    bg.style.color = colorText;
}
inputEvents('colorbg-input', 'input', bgColors);
inputEvents('opacity-input', 'input', bgColors);
inputEvents('color-input', 'input', bgColors);

// Cambiar posicion de texto
function bgPosition() {
    const bg = document.querySelector(".bg");
    const positionUnidad = document.getElementById('position-unidad').value;
    let positionTop = document.getElementById('position-top-input').value;
    let positionBottom = document.getElementById('position-bottom-input').value;
    let positionLeft = document.getElementById('position-left-input').value;
    let positionRight = document.getElementById('position-right-input').value;

    if (positionTop === '') {
        positionTop = "auto";
    } else {
        positionTop += positionUnidad;
    }
    if (positionBottom === '') {
        positionBottom = "auto";
    } else {
        positionBottom += positionUnidad;
    }
    if (positionLeft === '') {
        positionLeft = "auto";
    } else {
        positionLeft += positionUnidad;
    }
    if (positionRight === '') {
        positionRight = "auto";
    } else {
        positionRight += positionUnidad;
    }

    bg.style.right = positionRight;
    bg.style.bottom = positionBottom;
    bg.style.top = positionTop;
    bg.style.left = positionLeft;

    if (positionUnidad === '%') {
        bg.style.transform = 'translate(-50%, -50%)';
    } else {
        bg.style.transform = '';
    }
}
inputEvents('position-unidad', 'change', bgPosition);
inputEvents('position-top-input', 'input', bgPosition);
inputEvents('position-bottom-input', 'input', bgPosition);
inputEvents('position-left-input', 'input', bgPosition);
inputEvents('position-right-input', 'input', bgPosition);

/* RESIZE */
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