const header = document.querySelector('.header');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)'; } 
    else { header.style.boxShadow = 'none'; }
});

const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
document.querySelectorAll('.fade-in').forEach(el => { observer.observe(el); });

console.log('%c VELODRONES ', 'background: #007BFF; color: white; font-size: 20px; font-weight: bold; padding: 10px;');