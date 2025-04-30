document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 0);
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', menuToggle.classList.contains('active'));
    });

    // Smooth Scroll for All Anchor Links (Nav Links and Buttons)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            // Close mobile menu if open
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', false);
        });
    });



    // List of specialties to display in the typewriter effect
    const specialties = [
        "web developer",
        "frontend specialist",
        "Cyber-Security Expert",
        "web designer",
        "full-stack developer"
    ];
    
    const typewriterElement = document.getElementById('typewriter');
    let specialtyIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    
    function typeEffect() {
        console.log('typeEffect called:', { specialtyIndex, charIndex, isDeleting });
        const currentSpecialty = specialties[specialtyIndex];
        
        if (isDeleting) {
            // Deleting text
            typewriterElement.textContent = currentSpecialty.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50; // Faster when deleting
        } else {
            // Typing text
            typewriterElement.textContent = currentSpecialty.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 150; // Slower when typing
        }
        
        // Switch between typing and deleting states
        if (!isDeleting && charIndex === currentSpecialty.length) {
            // Finished typing, pause before starting to delete
            typingDelay = 1500; // Pause for 1.5 seconds
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next specialty
            isDeleting = false;
            specialtyIndex = (specialtyIndex + 1) % specialties.length;
            typingDelay = 500; // Pause before typing next specialty
        }
        
        // Schedule the next update
        setTimeout(typeEffect, typingDelay);
    }
    
    // Start the typing effect
    typeEffect();




    // Scroll Down Button
    const scrollDown = document.querySelector('.scroll-down');
    scrollDown.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('active', window.scrollY > 300);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items
            const filter = button.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.control-btn.prev');
    const nextBtn = document.querySelector('.control-btn.next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    // Auto-slide every 5 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Modal Functionality
    const modalButtons = document.querySelectorAll('[data-modal-target]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modals.forEach(modal => modal.classList.remove('active'));
            document.body.style.overflow = 'auto';
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Keyboard Accessibility for Modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => modal.classList.remove('active'));
            document.body.style.overflow = 'auto';
        }
    });
});