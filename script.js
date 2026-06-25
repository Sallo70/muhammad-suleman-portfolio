document.addEventListener('DOMContentLoaded', () => {
    
    // ═══ Navbar Scroll Effect ═══
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ═══ Mobile Menu Toggle ═══
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ═══ Typing Effect ═══
    const typingText = document.getElementById('typingText');
    const phrases = [
        'Modern Web Apps',
        'Python Automations',
        'Data Pipelines',
        'React Interfaces',
        'CLI Tools'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect after initial animation
    setTimeout(type, 1500);

    // ═══ Number Counter Animation ═══
    const numbers = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    function startCounter() {
        if (hasCounted) return;
        
        numbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = Math.ceil(target / (duration / 16)); // 60fps
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    num.textContent = target;
                    clearInterval(timer);
                } else {
                    num.textContent = current;
                }
            }, 16);
        });

        hasCounted = true;
    }

    // Run counter when hero section is visible
    setTimeout(startCounter, 1000);

    // ═══ Skills Animation on Scroll ═══
    const skillsSection = document.getElementById('skills');
    const skillFills = document.querySelectorAll('.skill-fill');
    
    function animateSkills() {
        const rect = skillsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            skillFills.forEach(fill => {
                const percent = fill.getAttribute('data-percent');
                fill.style.width = percent + '%';
            });
            window.removeEventListener('scroll', animateSkills);
        }
    }

    window.addEventListener('scroll', animateSkills);
    // Initial check
    animateSkills();

    // ═══ Contact Form Submit ═══
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const originalContent = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
        `;
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = `
                <span>Message Sent!</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
            `;
            submitBtn.style.background = '#10b981'; // Success green
            submitBtn.style.color = '#fff';
            
            contactForm.reset();
            
            // Revert after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style = '';
            }, 3000);
            
        }, 1500);
    });
});
