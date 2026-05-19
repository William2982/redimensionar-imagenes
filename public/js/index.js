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

/* FOOTER */
const year = new Date().getFullYear();
document.querySelector('footer p').innerHTML = `&copy; ${year} William Sosa. Todos los derechos reservados.`;