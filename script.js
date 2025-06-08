document.addEventListener('DOMContentLoaded', () => {
    // Comprehensive error handling and logging
    window.addEventListener('error', function(event) {
        console.error('Unhandled error:', event);
        alert('An unexpected error occurred. Please refresh the page.');
    });

    // Placeholder EmailJS Configuration (MUST BE REPLACED)
    const EMAIL_JS_CONFIG = {
        userId: 'YOUR_EMAILJS_USER_ID',      // Replace with actual User ID
        serviceId: 'YOUR_EMAILJS_SERVICE_ID', // Replace with actual Service ID
        templateId: 'YOUR_EMAILJS_TEMPLATE_ID' // Replace with actual Template ID
    };

    // Safer AOS initialization with fallback
    try {
        AOS.init({
            duration: 1200,
            once: true
        });
    } catch (error) {
        console.warn('AOS initialization failed:', error);
    }

    // Mobile menu toggle with error handling
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-menu-open');
        });
    } else {
        console.warn('Mobile menu elements not found');
    }

    // Sticky header with safe implementation
    const header = document.querySelector('.sticky-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Safe Swiper initialization with error handling
    try {
        const swiper = new Swiper('.barbershop-gallery', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            }
        });
    } catch (error) {
        console.error('Swiper initialization failed:', error);
    }

    // Service card hover effects with safer implementation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            try {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            } catch (error) {
                console.warn('Error in service card hover effect:', error);
            }
        });
    });

    // Navigation hover effects with error prevention
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            try {
                e.target.style.transform = 'scale(1.05)';
            } catch (error) {
                console.warn('Navigation hover enter error:', error);
            }
        });
        link.addEventListener('mouseleave', (e) => {
            try {
                e.target.style.transform = 'scale(1)';
            } catch (error) {
                console.warn('Navigation hover leave error:', error);
            }
        });
    });

    // Storefront parallax with safe check
    const storefrontImage = document.querySelector('.storefront-image-container');
    if (storefrontImage) {
        window.addEventListener('mousemove', (e) => {
            try {
                const x = (e.clientX - window.innerWidth / 2) / 50;
                const y = (e.clientY - window.innerHeight / 2) / 50;
                storefrontImage.style.transform = `translateX(${-x}px) translateY(${-y}px) scale(1.05)`;
            } catch (error) {
                console.warn('Storefront parallax error:', error);
            }
        });
    }

    // Enhanced cursor trail with more dynamic behavior
    function createEnhancedCursorTrail() {
        const trail = document.createElement('div');
        trail.classList.add('cursor-trail');
        document.body.appendChild(trail);

        const trailHistory = [];
        const trailLength = 5;

        document.addEventListener('mousemove', (e) => {
            trail.style.left = `${e.clientX}px`;
            trail.style.top = `${e.clientY}px`;

            // Optional: Create multiple trailing particles
            const particle = trail.cloneNode(true);
            particle.style.opacity = '0.5';
            particle.style.transform = 'scale(0.5)';
            document.body.appendChild(particle);

            trailHistory.push(particle);
            if (trailHistory.length > trailLength) {
                const oldParticle = trailHistory.shift();
                oldParticle.remove();
            }
        });
    }
    createEnhancedCursorTrail();

    // Safe EmailJS Initialization
    try {
        emailjs.init(EMAIL_JS_CONFIG.userId);
    } catch (error) {
        console.error('Email Service Initialization Error:', error);
    }

    // Add comprehensive global error handling
    window.addEventListener('error', (event) => {
        console.error('Unhandled global error:', event.error);
        alert('Ocurrió un error inesperado. Por favor recarga la página.');
    });

    // Enhanced Booking Form with more detailed error handling
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();

            try {
                const formData = Object.fromEntries(new FormData(this));
                
                // Validate form data
                const missingFields = Object.entries(formData)
                    .filter(([key, value]) => !value.trim())
                    .map(([key]) => key);

                if (missingFields.length > 0) {
                    throw new Error(`Campos requeridos: ${missingFields.join(', ')}`);
                }

                // Prepare WhatsApp message
                const whatsappMessage = Object.entries(formData)
                    .map(([key, value]) => `*${key}:* ${value}`)
                    .join('\n');
                
                const whatsappLink = `https://wa.me/5561698977?text=${encodeURIComponent(whatsappMessage)}`;

                // Send via EmailJS
                emailjs.send(
                    EMAIL_JS_CONFIG.serviceId, 
                    EMAIL_JS_CONFIG.templateId, 
                    {
                        ...formData,
                        to_email: 'dominguezortizbrayan99@gmail.com'
                    }
                )
                .then(response => {
                    window.open(whatsappLink, '_blank');
                    alert('¡Reserva enviada con éxito!');
                    bookingForm.reset();
                })
                .catch(error => {
                    console.error('Email Send Error:', error);
                    alert('Error al enviar la reserva. Intenta de nuevo.');
                });

            } catch (error) {
                console.error('Booking Submission Error:', error);
                alert(error.message || 'Error en la reserva');
            }
        });
    }
});