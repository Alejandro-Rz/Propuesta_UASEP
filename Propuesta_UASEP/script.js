document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selector de navegación dinámico
    const sections = document.querySelectorAll('.section-container');
    const navLinks = document.querySelectorAll('nav .nav-link');

    const highlightNavigation = () => {
        let scrollPosition = window.scrollY + 250; 

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNavigation);

    // 2. Efecto Parallax interactivo con el ratón para los orbes de fondo
    const shapes = document.querySelectorAll('.shape');
    
    document.addEventListener('mousemove', (e) => {
        // Calculamos la posición del ratón relativa al centro de la pantalla
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        
        shapes.forEach((shape, index) => {
            // Cada figura se mueve a una velocidad distinta multiplicando por un factor
            const speed = (index + 1) * 30; 
            shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // 3. Animaciones de entrada al hacer Scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Aparece cuando el 10% del elemento es visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => scrollObserver.observe(el));

    // 4. Simulación de interactividad en botones y tarjetas de acción
    const actionElements = document.querySelectorAll('.btn, .action-card');
    
    actionElements.forEach(element => {
        element.addEventListener('click', (e) => {
            if (element.getAttribute('href') === '#' || element.tagName === 'BUTTON' || element.classList.contains('action-card')) {
                e.preventDefault();
                // Extracción segura de texto dependiendo si es un botón o una tarjeta
                const text = element.querySelector('h3') ? element.querySelector('h3').textContent : element.textContent.trim();
                alert(`¡Interacción detectada!\n\nMódulo: "${text}"`);
            }
        });
    });
});