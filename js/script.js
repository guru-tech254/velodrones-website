/* === VELODRONES MAIN JAVASCRIPT === */

// DOM Elements
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Mobile Navigation Toggle
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close mobile menu when link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

// Header Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Intersection Observer for Fade-In Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Form Validation (if forms exist)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'var(--error)';
            } else {
                field.style.borderColor = 'var(--border-color)';
            }
        });

        if (!isValid) {
            e.preventDefault();
            alert('Please fill in all required fields.');
        }
    });
});

// Active Navigation Link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinksItems.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage) {
        link.classList.add('active');
    }
});

// Performance: Lazy Load Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console Branding
console.log('%c VELODRONES ', 'background: linear-gradient(135deg, #007BFF, #00C6FF); color: white; font-size: 24px; font-weight: bold; padding: 10px 20px;');
console.log('%c Premium Aerial Intelligence & Geospatial Solutions ', 'color: #a0a5b0; font-size: 12px;');
console.log('%c Contact: velodronesag@gmail.com | +254 115 874 187 ', 'color: #a0a5b0; font-size: 12px;');

// Services background video: ensure mobile-friendly behavior and autoplay fallback
(function() {
    const vid = document.querySelector('.services-bg-video');
    if (!vid) return;

    const mq = window.matchMedia('(max-width: 768px)');

    function updatePlayback() {
        if (mq.matches) {
            // Pause and hide video on small screens to save data
            try { vid.pause(); } catch (e) { /* ignore */ }
        } else {
            // Attempt to autoplay (video is muted so should work in modern browsers)
            const p = vid.play();
            if (p && p.catch) p.catch(() => { /* autoplay blocked – will play on interaction */ });
        }
    }

    // Initial check
    updatePlayback();

    // React to viewport changes
    if (mq.addEventListener) mq.addEventListener('change', updatePlayback);
    else if (mq.addListener) mq.addListener(updatePlayback);

    // If autoplay is blocked, allow play on first user interaction
    document.addEventListener('click', function onFirstInteraction() {
        if (window.innerWidth > 768) {
            vid.play().catch(() => {});
        }
    }, { once: true });
})();