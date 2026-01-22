// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
    mobileMenuBtn.setAttribute('aria-label', 'Menu');
    
    const header = document.querySelector('header');
    const navLinks = document.querySelector('.nav-links');
    
    // Insert mobile menu button if header exists
    if (header && navLinks) {
        header.querySelector('.nav-container').appendChild(mobileMenuBtn);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
            
            // Update aria label
            this.setAttribute('aria-label', 
                this.classList.contains('active') ? 'Close menu' : 'Open menu'
            );
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                mobileMenuBtn.setAttribute('aria-label', 'Open menu');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                mobileMenuBtn.setAttribute('aria-label', 'Open menu');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                mobileMenuBtn.setAttribute('aria-label', 'Open menu');
                mobileMenuBtn.focus();
            }
        });
    }
    
    // Active navigation highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksList = document.querySelectorAll('.nav-links a');
    
    navLinksList.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || 
            (currentPath === 'index.html' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#28a745';
                
                // Reset after delay
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }
    
    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px',
        threshold: 0.1
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Add fade-in animation to elements
    const fadeElements = document.querySelectorAll('.member-card, .project-card, .battle-card');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        fadeObserver.observe(el);
    });
    
    // Handle device orientation changes
    let isPortrait = window.innerHeight > window.innerWidth;
    window.addEventListener('resize', () => {
        const newIsPortrait = window.innerHeight > window.innerWidth;
        if (isPortrait !== newIsPortrait) {
            isPortrait = newIsPortrait;
            // Force reflow to fix any layout issues
            document.body.style.display = 'none';
            setTimeout(() => {
                document.body.style.display = '';
            }, 10);
        }
    });
    
    // Touch feedback for mobile
    const touchElements = document.querySelectorAll('a, button');
    touchElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        
        el.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
    
    // Prevent zoom on double tap (iOS)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });
    
    // Back to top button for mobile
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--gold);
        color: var(--black);
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
        display: none;
        z-index: 99;
        box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
        transition: all 0.3s ease;
    `;
    document.body.appendChild(backToTopBtn);
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.style.display = 'flex';
            backToTopBtn.style.alignItems = 'center';
            backToTopBtn.style.justifyContent = 'center';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        @media (max-width: 768px) {
            .form-group input,
            .form-group textarea,
            .submit-btn {
                font-size: 16px; /* Prevents zoom on iOS */
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize on page load
    window.addEventListener('load', () => {
        // Add loaded class to body for CSS transitions
        document.body.classList.add('loaded');
        
        // Trigger fade-in for elements already in view
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('fade-in');
            }
        });
    });
});

// Handle resize events
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const mobileMenu = document.querySelector('.mobile-menu-btn');
            const navLinks = document.querySelector('.nav-links');
            
            if (mobileMenu && navLinks) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                mobileMenu.setAttribute('aria-label', 'Open menu');
            }
        }
    }, 250);
});