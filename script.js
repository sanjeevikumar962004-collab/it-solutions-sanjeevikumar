// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        if (navLinksContainer.style.display === 'flex') {
            navLinksContainer.style.display = 'none';
        } else {
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.flexDirection = 'column';
            navLinksContainer.style.position = 'absolute';
            navLinksContainer.style.top = '70px';
            navLinksContainer.style.left = '0';
            navLinksContainer.style.width = '100%';
            navLinksContainer.style.background = 'white';
            navLinksContainer.style.padding = '20px';
            navLinksContainer.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
        }
    });
}

// Mobile Dropdown Logic
const dropdowns = document.querySelectorAll('.dropdown');
if (window.innerWidth <= 768) {
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault(); 
                dropdown.classList.toggle('active');
            });
        }
    });
}

// Animation Observer
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-up').forEach(el => observer.observe(el));

// FAQ Accordion Logic
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            item.classList.toggle('active');
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    }
});

// Project Filtering Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                    card.classList.remove('visible');
                    setTimeout(() => card.classList.add('visible'), 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* --- AUTH & FORM HANDLING --- */

// Toggle Password Visibility
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = "password";
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// General Form Validator
function validateAndRedirect(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');

        // Reset errors
        inputs.forEach(input => {
            input.classList.remove('error');
            const wrapper = input.closest('.input-wrapper') || input.closest('.form-group') || input.closest('.input-group');
            if(wrapper) {
                const errorMsg = wrapper.querySelector('.error-msg');
                if(errorMsg) errorMsg.style.display = 'none';
            }
        });

        // Validation Logic
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                showError(input, 'This field is required');
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                isValid = false;
                showError(input, 'Please enter a valid email');
            } else if (input.type === 'password' && input.value.length < 6) {
                isValid = false;
                showError(input, 'Password must be at least 6 chars');
            }
        });

        // Special check for Signup Confirm Password
        if (formId === 'signupForm') {
            const pass = document.getElementById('signupPassword');
            const confirm = document.getElementById('signupConfirm');
            if (pass && confirm && pass.value !== confirm.value) {
                isValid = false;
                showError(confirm, 'Passwords do not match');
            }
        }

        if (isValid) {
            // Success: Redirect to 404 page as requested
            window.location.href = './404.html';
        }
    });
}

function showError(input, message) {
    input.classList.add('error');
    // Try to find the error message div nearby
    let wrapper = input.closest('.input-wrapper') || input.closest('.form-group') || input.closest('.input-group');
    if (wrapper) {
        let msgDiv = wrapper.querySelector('.error-msg');
        if (!msgDiv) {
            // If it doesn't exist (like in Contact form), create it dynamically
            msgDiv = document.createElement('div');
            msgDiv.className = 'error-msg';
            wrapper.appendChild(msgDiv);
        }
        msgDiv.textContent = message;
        msgDiv.style.display = 'block';
    }
}

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

// Initialize Validation for all forms
document.addEventListener('DOMContentLoaded', () => {
    validateAndRedirect('loginForm');
    validateAndRedirect('signupForm');
    validateAndRedirect('forgotForm');
    validateAndRedirect('contactForm1'); // For contact.html
    validateAndRedirect('contactForm2'); // For contact2.html
});

/* --- STATS & CANVAS ANIMATION --- */
// (Keeping existing animation code)
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + "+";
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const statsSection = document.querySelector('.stats-section-modern');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const endValue = parseInt(stat.getAttribute('data-target'));
                    animateValue(stat, 0, endValue, 2000);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
}

const canvas = document.getElementById('hero-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray;
    function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; init(); }
    window.addEventListener('resize', resizeCanvas);
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
            this.directionX = (Math.random() * 1.5) - 0.75; this.directionY = (Math.random() * 1.5) - 0.75;
            this.size = (Math.random() * 3) + 1; this.color = '#2563eb';
        }
        draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = this.color; ctx.fill(); }
        update() { if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX; if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY; this.x += this.directionX; this.y += this.directionY; this.draw(); }
    }
    function init() { particlesArray = []; let numberOfParticles = (canvas.height * canvas.width) / 15000; for (let i = 0; i < numberOfParticles; i++) { particlesArray.push(new Particle()); } }
    function animate() { requestAnimationFrame(animate); ctx.clearRect(0, 0, canvas.width, canvas.height); for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); } connect(); }
    function connect() { for (let a = 0; a < particlesArray.length; a++) { for (let b = a; b < particlesArray.length; b++) { let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y)); if (distance < (canvas.width/7) * (canvas.height/7) && distance < 20000) { let opacityValue = 1 - (distance / 20000); ctx.strokeStyle = 'rgba(37, 99, 235,' + opacityValue + ')'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(particlesArray[a].x, particlesArray[a].y); ctx.lineTo(particlesArray[b].x, particlesArray[b].y); ctx.stroke(); } } } }
    resizeCanvas(); animate();
}