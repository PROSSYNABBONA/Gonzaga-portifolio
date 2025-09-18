// Custom JavaScript for Dr. Gonzaga's Professional Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initNavbarScroll();
    initContactForm();
    initGalleryModal();
    initLoadingStates();
    initStatisticsCounter();
    initPricingCards();
    initBlogCards();
    debugImagePaths();
    initMobileNavToggle();
    initBackToTop();
    initThemeToggle();
    initAppointmentForm();
    initVideoCards();
    initCaseStudies();
    initArticleCards();
    initHeroTilt();
    initTestimonialAutoSlide();
    initExperienceSection();
    // Removed auto init of service modals to prevent unintended popup on refresh
    
    // Removed temporary test border and click handler on service cards
    initDropdownServiceLinks();

    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Keep mobile menu state unchanged; user will close via X
            }
        });
    });
}

// Dropdown Service Links Handler
function initDropdownServiceLinks() {
    const dropdownServiceLinks = document.querySelectorAll('.dropdown-item[data-service]');
    const serviceModal = new bootstrap.Modal(document.getElementById('serviceModal'));
    
    // Service data (reuse from initServiceModals)
    const serviceData = {
        'artificial-insemination': {
            icon: 'fas fa-dna',
            title: 'Artificial Insemination',
            description: 'I provide professional artificial insemination services to improve breeding efficiency and genetic quality of your livestock.',
            features: [
                'High-quality semen selection and storage',
                'Proper timing and technique for insemination',
                'Pregnancy diagnosis and follow-up',
                'Genetic improvement programs',
                'Breeding records management'
            ],
            benefits: [
                'Improved genetic quality of offspring',
                'Reduced risk of disease transmission',
                'Better breeding efficiency',
                'Access to superior genetics',
                'Cost-effective breeding programs'
            ],
            process: [
                'Initial consultation and animal assessment',
                'Heat detection and timing optimization',
                'Semen preparation and quality check',
                'Insemination procedure',
                'Post-insemination monitoring',
                'Pregnancy diagnosis and follow-up'
            ],
            pricing: 'Starting from UGX 150,000 per insemination'
        },
        'reproductive-disorders': {
            icon: 'fas fa-female',
            title: 'Reproductive Disorders Management',
            description: 'I provide expert diagnosis and treatment of reproductive health issues in farm animals to maximize breeding success.',
            features: [
                'Comprehensive reproductive health assessment',
                'Hormonal imbalance diagnosis',
                'Infertility treatment programs',
                'Breeding soundness evaluation',
                'Reproductive surgery when needed'
            ],
            benefits: [
                'Improved breeding success rates',
                'Early detection of reproductive issues',
                'Customized treatment plans',
                'Reduced breeding costs',
                'Better herd productivity'
            ],
            process: [
                'Detailed reproductive history taking',
                'Physical examination and diagnostics',
                'Laboratory testing if needed',
                'Treatment plan development',
                'Monitoring and follow-up',
                'Success evaluation and adjustment'
            ],
            pricing: 'Consultation: UGX 200,000, Treatment varies by condition'
        },
        'dystocia-csection': {
            icon: 'fas fa-cut',
            title: 'Dystocia & C-Section Management',
            description: 'I provide emergency obstetric care including dystocia management and cesarean sections for difficult births.',
            features: [
                '24/7 emergency obstetric care',
                'Dystocia diagnosis and management',
                'Emergency cesarean sections',
                'Post-operative care and monitoring',
                'Maternal and neonatal health assessment'
            ],
            benefits: [
                'Saves both mother and offspring',
                'Reduces mortality rates',
                'Professional emergency response',
                'Minimizes complications',
                'Preserves breeding potential'
            ],
            process: [
                'Emergency assessment and diagnosis',
                'Stabilization of the animal',
                'Surgical intervention if needed',
                'Post-operative monitoring',
                'Recovery management',
                'Follow-up care and evaluation'
            ],
            pricing: 'Emergency C-Section: UGX 500,000 - UGX 800,000'
        },
        'vaccination': {
            icon: 'fas fa-syringe',
            title: 'Vaccination Services',
            description: 'I provide comprehensive vaccination programs for cattle, poultry, dogs, and cats to prevent disease outbreaks.',
            features: [
                'Customized vaccination schedules',
                'Core and optional vaccines',
                'Bulk vaccination programs',
                'Vaccine storage and handling',
                'Immunity monitoring'
            ],
            benefits: [
                'Prevents deadly diseases',
                'Reduces treatment costs',
                'Improves animal welfare',
                'Protects herd health',
                'Increases productivity'
            ],
            process: [
                'Health assessment and planning',
                'Vaccine selection and preparation',
                'Proper administration technique',
                'Record keeping and documentation',
                'Follow-up monitoring',
                'Schedule maintenance'
            ],
            pricing: 'Per animal: UGX 15,000 - UGX 50,000 depending on vaccine type'
        },
        'animal-surgeries': {
            icon: 'fas fa-procedures',
            title: 'Animal Surgeries',
            description: 'Professional surgical procedures for various animal health conditions and emergency interventions.',
            features: [
                'Routine surgical procedures',
                'Emergency surgeries',
                'Sterile surgical environment',
                'Post-operative care',
                'Pain management'
            ],
            benefits: [
                'Life-saving interventions',
                'Improved animal health',
                'Professional surgical care',
                'Reduced suffering',
                'Better recovery outcomes'
            ],
            process: [
                'Pre-surgical assessment',
                'Anesthesia administration',
                'Surgical procedure',
                'Post-operative monitoring',
                'Recovery management',
                'Follow-up care'
            ],
            pricing: 'Surgery costs vary by procedure: UGX 200,000 - UGX 1,000,000'
        },
        'disease-diagnosis': {
            icon: 'fas fa-microscope',
            title: 'Disease Diagnosis & Treatment',
            description: 'Advanced diagnostic services and treatment for cattle, goats, pigs, dogs, and cats.',
            features: [
                'Clinical examination',
                'Laboratory diagnostics',
                'Disease identification',
                'Treatment protocols',
                'Prevention strategies'
            ],
            benefits: [
                'Accurate diagnosis',
                'Effective treatment',
                'Disease prevention',
                'Reduced mortality',
                'Better animal welfare'
            ],
            process: [
                'Clinical examination',
                'Diagnostic testing',
                'Disease identification',
                'Treatment plan development',
                'Treatment administration',
                'Monitoring and follow-up'
            ],
            pricing: 'Diagnosis: UGX 100,000 - UGX 300,000, Treatment varies by condition'
        },
        'farm-monitoring': {
            icon: 'fas fa-chart-line',
            title: 'Farm Monitoring & Evaluation',
            description: 'Regular farm visits and health assessments to ensure optimal animal welfare and productivity.',
            features: [
                'Regular farm health assessments',
                'Disease surveillance programs',
                'Nutritional evaluation',
                'Housing and environment assessment',
                'Productivity monitoring'
            ],
            benefits: [
                'Early disease detection',
                'Improved animal welfare',
                'Increased productivity',
                'Reduced mortality rates',
                'Better farm management'
            ],
            process: [
                'Initial farm evaluation',
                'Health assessment of all animals',
                'Environmental analysis',
                'Recommendations and action plan',
                'Regular follow-up visits',
                'Progress monitoring and adjustment'
            ],
            pricing: 'Farm visit: UGX 300,000 - UGX 500,000 per visit'
        }
    };
    
    dropdownServiceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const serviceType = this.getAttribute('data-service');
            const service = serviceData[serviceType];
            
            if (service) {
                // Update modal content
                document.getElementById('modalServiceIcon').className = service.icon;
                document.getElementById('modalServiceTitle').textContent = service.title;
                document.getElementById('modalServiceDescription').textContent = service.description;
                
                // Update features list
                const featuresList = document.getElementById('modalServiceFeatures');
                featuresList.innerHTML = '';
                service.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });
                
                // Update benefits list
                const benefitsList = document.getElementById('modalServiceBenefits');
                benefitsList.innerHTML = '';
                service.benefits.forEach(benefit => {
                    const li = document.createElement('li');
                    li.textContent = benefit;
                    benefitsList.appendChild(li);
                });
                
                // Update process list
                const processList = document.getElementById('modalServiceProcess');
                processList.innerHTML = '';
                service.process.forEach(step => {
                    const li = document.createElement('li');
                    li.textContent = step;
                    processList.appendChild(li);
                });
                
                // Update pricing
                document.getElementById('modalServicePricing').textContent = service.pricing;
                
                // Close dropdown and show modal
                const dropdown = bootstrap.Dropdown.getInstance(this.closest('.dropdown-toggle'));
                if (dropdown) {
                    dropdown.hide();
                }
                
                // Scroll to services section first
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Show modal after a short delay
                setTimeout(() => {
                    serviceModal.show();
                }, 500);
                
                // Track service view for analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'service_view', {
                        'service_name': service.title,
                        'source': 'dropdown_menu'
                    });
                }
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements (excluding service cards)
    const animatedElements = document.querySelectorAll('.about-feature, .gallery-item, .contact-item');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Ensure service cards are always visible
    const serviceCards = document.querySelectorAll('.service-card');
    console.log('Service cards found:', serviceCards.length);
    
    // Make all service cards visible immediately
    serviceCards.forEach(card => {
        card.classList.add('animate-in');
        console.log('Made service card visible:', card);
    });
    
    // Hero section animation
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        heroContent.classList.add('slide-in-left');
        observer.observe(heroContent);
    }
    
    if (heroImage) {
        heroImage.classList.add('slide-in-right');
        observer.observe(heroImage);
    }
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Always show navbar with enhanced styling when scrolled
        if (scrollTop > 100) {
            navbar.classList.add('navbar-scrolled');
            navbar.style.transform = 'translateY(0)';
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
            navbar.style.left = '0';
            navbar.style.right = '0';
            navbar.style.zIndex = '1030';
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
            navbar.style.left = '0';
            navbar.style.right = '0';
            navbar.style.zIndex = '1030';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const service = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            // Validate form
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Gallery modal functionality
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    console.log('[Gallery] initializing, items found:', galleryItems.length);
    
    galleryItems.forEach(item => {
        // Make items obviously interactive and accessible
        item.style.cursor = 'pointer';
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');

        item.addEventListener('click', function() {
            console.log('[Gallery] item clicked');
            const img = this.querySelector('img');
            const titleEl = this.querySelector('.gallery-overlay h5');
            const descEl = this.querySelector('.gallery-overlay p');
            const title = titleEl ? titleEl.textContent : (img?.alt || '');
            const description = descEl ? descEl.textContent : '';
            if (img && img.src) {
                console.log('[Gallery] opening modal for:', img.src);
            showImageModal(img.src, title, description);
            }
        });

        // Keyboard support
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
                const img = this.querySelector('img');
                const titleEl = this.querySelector('.gallery-overlay h5');
                const descEl = this.querySelector('.gallery-overlay p');
                const title = titleEl ? titleEl.textContent : (img?.alt || '');
                const description = descEl ? descEl.textContent : '';
                if (img && img.src) {
                    console.log('[Gallery] keyboard open for:', img.src);
                    showImageModal(img.src, title, description);
                }
            }
        });
    });

    // Event delegation fallback (in case items are added later)
    document.addEventListener('click', function(e) {
        const item = e.target.closest('.gallery-item');
        if (!item) return;
        console.log('[Gallery] delegated click');
        const img = item.querySelector('img');
        const titleEl = item.querySelector('.gallery-overlay h5');
        const descEl = item.querySelector('.gallery-overlay p');
        const title = titleEl ? titleEl.textContent : (img?.alt || '');
        const description = descEl ? descEl.textContent : '';
        if (img && img.src) {
            showImageModal(img.src, title, description);
        }
    });
}

// Fallback: in case DOMContentLoaded fired before handlers bound
window.addEventListener('load', () => {
    try {
        initGalleryModal();
    } catch (e) {
        console.warn('[Gallery] load fallback error:', e);
    }
});

// Image modal
function showImageModal(imageSrc, title, description) {
    // Remove existing modal
    const existingModal = document.querySelector('.image-modal');
    if (existingModal) existingModal.remove();
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${imageSrc}" alt="${title}" class="modal-image">
                <div class="modal-info">
                    <h4>${title}</h4>
                    <p>${description}</p>
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            z-index: 1;
            transition: background 0.3s ease;
        }
        
        .modal-close:hover {
            background: rgba(0, 0, 0, 0.8);
        }
        
        .modal-image {
            width: 100%;
            height: auto;
            max-height: 70vh;
            object-fit: contain;
        }
        
        .modal-info {
            padding: 1.5rem;
            text-align: center;
        }
        
        .modal-info h4 {
            color: #333;
            margin-bottom: 0.5rem;
        }
        
        .modal-info p {
            color: #666;
            margin: 0;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); }
            to { transform: translateX(100%); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    });
    
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.parentNode) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Loading states
function initLoadingStates() {
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // Handle successful load
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.classList.add('loaded');
        });
        
        // Handle load error
        img.addEventListener('error', function() {
            console.warn('Image failed to load:', this.src);
            this.style.opacity = '0.5';
            this.style.filter = 'grayscale(100%)';
            
            // Add error placeholder
            if (!this.parentElement.querySelector('.image-error')) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'image-error';
                errorDiv.innerHTML = `
                    <div style="
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                        background: #f8f9fa;
                        color: #6c757d;
                        text-align: center;
                        padding: 1rem;
                    ">
                        <i class="fas fa-image" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                        <span>Image not available</span>
                    </div>
                `;
                this.parentElement.appendChild(errorDiv);
            }
        });
        
        // Trigger load event if image is already cached
        if (img.complete) {
            img.dispatchEvent(new Event('load'));
        }
    });
}

// Navbar scroll effect styles
const navbarScrollStyle = document.createElement('style');
navbarScrollStyle.textContent = `
    .navbar {
        transition: all 0.3s ease;
    }
    
    .navbar-scrolled {
        background: rgba(44, 90, 160, 0.95) !important;
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(navbarScrollStyle);

// Add smooth reveal animation for sections
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-revealed');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        observer.observe(section);
    });
}

// Initialize reveal animation
document.addEventListener('DOMContentLoaded', revealOnScroll);

// Statistics Counter Animation
function initStatisticsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    console.log('Statistics counter initialized:', {
        statNumbers: statNumbers.length,
        elements: statNumbers
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Stat number entering view:', entry.target);
                const target = parseInt(entry.target.getAttribute('data-target'));
                console.log('Target value:', target);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        console.log('Observing stat element:', stat, 'Target:', stat.getAttribute('data-target'));
        observer.observe(stat);
    });
}

function animateCounter(element, target) {
    console.log('Starting counter animation:', element, 'Target:', target);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
            console.log('Counter animation completed:', target);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

// Pricing Cards Interaction
function initPricingCards() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('featured') 
                ? 'scale(1.05) translateY(-10px)' 
                : 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('featured') 
                ? 'scale(1.05)' 
                : 'translateY(0)';
        });
    });
}

// Blog Cards Interaction
function initBlogCards() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        const readMoreLink = card.querySelector('.read-more');
        
        if (readMoreLink) {
            readMoreLink.addEventListener('click', function(e) {
                e.preventDefault();
                showBlogModal(card);
            });
        }
    });
}

// Blog Modal
function showBlogModal(card) {
    const title = card.querySelector('h5').textContent;
    const content = card.querySelector('p').textContent;
    const image = card.querySelector('img').src;
    const date = card.querySelector('.blog-date');
    const day = date.querySelector('.day').textContent;
    const month = date.querySelector('.month').textContent;
    
    // Remove existing modal
    const existingModal = document.querySelector('.blog-modal');
    if (existingModal) existingModal.remove();
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'blog-modal';
    modal.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="blog-modal-image">
                    <img src="${image}" alt="${title}">
                    <div class="blog-modal-date">
                        <span class="day">${day}</span>
                        <span class="month">${month}</span>
                    </div>
                </div>
                <div class="blog-modal-body">
                    <h3>${title}</h3>
                    <p>${content}</p>
                    <div class="blog-modal-actions">
                        <button class="btn btn-primary">Read Full Article</button>
                        <button class="btn btn-outline-secondary">Share</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .blog-modal .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .blog-modal .modal-content {
            position: relative;
            max-width: 800px;
            max-height: 90%;
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: column;
        }
        
        .blog-modal .modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            z-index: 1;
            transition: background 0.3s ease;
        }
        
        .blog-modal .modal-close:hover {
            background: rgba(0, 0, 0, 0.8);
        }
        
        .blog-modal-image {
            position: relative;
            height: 300px;
            overflow: hidden;
        }
        
        .blog-modal-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .blog-modal-date {
            position: absolute;
            top: 20px;
            left: 20px;
            background: var(--primary-color);
            color: white;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            min-width: 70px;
        }
        
        .blog-modal-date .day {
            display: block;
            font-size: 1.8rem;
            font-weight: bold;
            line-height: 1;
        }
        
        .blog-modal-date .month {
            display: block;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .blog-modal-body {
            padding: 2rem;
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        
        .blog-modal-body h3 {
            color: var(--text-dark);
            margin-bottom: 1rem;
            font-weight: 600;
        }
        
        .blog-modal-body p {
            color: var(--text-light);
            line-height: 1.6;
            margin-bottom: 2rem;
            flex: 1;
        }
        
        .blog-modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: auto;
        }
        
        @media (max-width: 768px) {
            .blog-modal .modal-content {
                max-width: 95%;
                margin: 1rem;
            }
            
            .blog-modal-image {
                height: 200px;
            }
            
            .blog-modal-body {
                padding: 1.5rem;
            }
            
            .blog-modal-actions {
                flex-direction: column;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    });
    
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.parentNode) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Debug image paths
function debugImagePaths() {
    const images = document.querySelectorAll('img');
    console.log('=== Image Debug Information ===');
    images.forEach((img, index) => {
        console.log(`Image ${index + 1}:`, {
            src: img.src,
            alt: img.alt,
            complete: img.complete,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight
        });
    });
    console.log('=== End Image Debug ===');
}

// Mobile Navigation Toggle
function initMobileNavToggle() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarClose = document.querySelector('.navbar-close');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    console.log('Mobile nav initialized - Width:', window.innerWidth, 'Mobile:', window.innerWidth <= 991);
    
    if (navbarToggler && navbarClose && navbarCollapse) {
        
        // Handle close button click
        navbarClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button clicked');
            
            if (window.innerWidth <= 991) {
                // Force close the menu
                navbarCollapse.classList.remove('show');
                navbarToggler.style.display = 'block';
                navbarClose.style.display = 'none';
                console.log('Menu closed via X button');
            }
        });
        
        // Handle toggler click
        navbarToggler.addEventListener('click', function() {
            console.log('Hamburger clicked');
            
            if (window.innerWidth <= 991) {
                // Use a longer timeout to ensure Bootstrap has processed the click
                setTimeout(() => {
                    const isMenuOpen = navbarCollapse.classList.contains('show');
                    console.log('Menu state after click:', isMenuOpen);
                    
                    if (isMenuOpen) {
                        console.log('Menu opened - showing X button');
                        navbarToggler.style.display = 'none';
                        navbarClose.style.display = 'flex';
                    } else {
                        console.log('Menu closed - hiding X button');
                        navbarToggler.style.display = 'block';
                        navbarClose.style.display = 'none';
                    }
                }, 500);
            }
        });
        
        // Sync button states with Bootstrap collapse events
        navbarCollapse.addEventListener('shown.bs.collapse', () => {
            if (window.innerWidth <= 991) {
                navbarToggler.style.display = 'none';
                navbarClose.style.display = 'flex';
            }
        });
        navbarCollapse.addEventListener('hidden.bs.collapse', () => {
            if (window.innerWidth <= 991) {
                navbarToggler.style.display = 'block';
                navbarClose.style.display = 'none';
            }
        });
        
        // Keep menu open on nav link taps (user closes with X)
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 991 && this.dataset.close !== 'true') {
                    // Prevent Bootstrap from auto-collapsing via default behavior
                    // (We do nothing here so the menu stays open)
                }
            });
        });
    } else {
        console.log('❌ Mobile nav elements not found!');
        console.log('Toggler:', navbarToggler);
        console.log('Close:', navbarClose);
        console.log('Collapse:', navbarCollapse);
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        // Smooth scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Debug: Log button status
        console.log('Back to top button initialized:', backToTopBtn);
    } else {
        console.log('Back to top button not found!');
    }
}

// Theme Toggle (Dark/Light Mode)
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Apply new theme
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            updateThemeIcon(newTheme);
            
            // Add transition effect
            body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
        });
    }
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
}

// Add CSS for section reveal animation
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .section-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .section-revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(revealStyle);

// Appointment Form Handler
function initAppointmentForm() {
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(appointmentForm);
            const appointmentData = {
                name: appointmentForm.querySelector('input[type="text"]').value,
                email: appointmentForm.querySelector('input[type="email"]').value,
                phone: appointmentForm.querySelector('input[type="tel"]').value,
                service: appointmentForm.querySelector('select').value,
                date: appointmentForm.querySelector('input[type="date"]').value,
                time: appointmentForm.querySelectorAll('select')[1].value,
                notes: appointmentForm.querySelector('textarea').value
            };
            
            // Validate form
            if (!appointmentData.name || !appointmentData.email || !appointmentData.phone || !appointmentData.service || !appointmentData.date || !appointmentData.time) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Simulate appointment booking
            showNotification('Appointment request submitted successfully! We will contact you soon.', 'success');
            appointmentForm.reset();
            
            // In a real application, you would send this data to a server
            console.log('Appointment Data:', appointmentData);
        });
    }
}

// Video Cards Handler
function initVideoCards() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        const playButton = card.querySelector('.play-button');
        
        if (playButton) {
            playButton.addEventListener('click', function() {
                // In a real application, you would open a video modal or redirect to video
                showNotification('Video player would open here', 'info');
                
                // Track video play event for analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'video_play', {
                        'video_title': card.querySelector('h5').textContent
                    });
                }
            });
        }
    });
}

// Case Studies Handler
function initCaseStudies() {
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    
    caseStudyCards.forEach(card => {
        card.addEventListener('click', function() {
            const caseTitle = this.querySelector('h5').textContent;
            
            // Track case study view for analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'case_study_view', {
                    'case_title': caseTitle
                });
            }
        });
    });
}

// Article Cards Handler
function initArticleCards() {
    const articleCards = document.querySelectorAll('.article-card');
    const readMoreLinks = document.querySelectorAll('.read-more');
    
    articleCards.forEach(card => {
        card.addEventListener('click', function() {
            const articleTitle = this.querySelector('h5').textContent;
            
            // Track article view for analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'article_view', {
                    'article_title': articleTitle
                });
            }
        });
    });
    
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const articleTitle = this.closest('.article-card').querySelector('h5').textContent;
            
            // In a real application, you would open the full article
            showNotification(`Opening article: ${articleTitle}`, 'info');
            
            // Track article click for analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'article_click', {
                    'article_title': articleTitle
                });
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': '#28a745',
        'error': '#dc3545',
        'warning': '#ffc107',
        'info': '#17a2b8'
    };
    return colors[type] || '#17a2b8';
}

// Add notification animations to CSS
const notificationStyles = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Service Modals Functionality
function initServiceModals() {
    console.log('=== INITIALIZING SERVICE MODALS ===');
    console.log('Document ready state:', document.readyState);
    
    const serviceCards = document.querySelectorAll('.service-card[data-service]');
    console.log('Service cards found:', serviceCards.length);
    console.log('Service cards:', serviceCards);
    
    const serviceModalElement = document.getElementById('serviceModal');
    console.log('Modal element found:', !!serviceModalElement);
    console.log('Modal element:', serviceModalElement);
    
    let serviceModal = null;
    if (serviceModalElement) {
        try {
            serviceModal = new bootstrap.Modal(serviceModalElement);
            console.log('Bootstrap modal created successfully');
        } catch (error) {
            console.error('Error creating Bootstrap modal:', error);
        }
    }
    
    console.log('Service modals initialized:', {
        cards: serviceCards.length,
        modal: !!serviceModalElement,
        modalInstance: !!serviceModal
    });
    
    // Test: Add click listener to first service card for debugging
    if (serviceCards.length > 0) {
        console.log('Adding test click listener to first service card');
        serviceCards[0].addEventListener('click', function() {
            console.log('Test click on first service card');
            alert('Service card clicked!');
        });
    } else {
        console.log('No service cards found - cannot add click listener');
    }
    
    // Fallback: Try to find service cards again after delay
    setTimeout(() => {
        console.log('=== FALLBACK: RE-CHECKING SERVICE CARDS ===');
        const fallbackServiceCards = document.querySelectorAll('.service-card[data-service]');
        console.log('Fallback service cards found:', fallbackServiceCards.length);
        
        if (fallbackServiceCards.length > 0) {
            console.log('Adding click listeners to fallback service cards');
            fallbackServiceCards.forEach((card, index) => {
                // Remove any existing click listeners first
                card.onclick = null;
                card.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Fallback service card clicked:', index);
                    alert('Fallback service card clicked! Card: ' + index);
                });
            });
        }
    }, 1000);
    
    // Additional test: Try to find ALL service cards (not just with data-service)
    setTimeout(() => {
        console.log('=== TESTING ALL SERVICE CARDS ===');
        const allServiceCards = document.querySelectorAll('.service-card');
        console.log('All service cards found:', allServiceCards.length);
        
        allServiceCards.forEach((card, index) => {
            console.log('Service card', index, ':', card);
            console.log('Has data-service:', card.hasAttribute('data-service'));
            console.log('Data-service value:', card.getAttribute('data-service'));
        });
    }, 2000);
    
    // Test: Try to show modal after 2 seconds
    setTimeout(() => {
        console.log('Testing modal display...');
        if (serviceModalElement && serviceModal) {
            console.log('Modal elements found, attempting to show...');
            try {
                serviceModal.show();
                console.log('Test modal show successful');
                setTimeout(() => {
                    serviceModal.hide();
                    console.log('Test modal hidden');
                }, 2000);
            } catch (error) {
                console.error('Test modal show failed:', error);
            }
        } else {
            console.log('Modal elements not found');
        }
    }, 2000);
    
    // Service data
    const serviceData = {
        'artificial-insemination': {
            icon: 'fas fa-dna',
            title: 'Artificial Insemination',
            description: 'I provide professional artificial insemination services to improve breeding efficiency and genetic quality of your livestock.',
            features: [
                'High-quality semen selection and storage',
                'Proper timing and technique for insemination',
                'Pregnancy diagnosis and follow-up',
                'Genetic improvement programs',
                'Breeding records management'
            ],
            benefits: [
                'Improved genetic quality of offspring',
                'Reduced risk of disease transmission',
                'Better breeding efficiency',
                'Access to superior genetics',
                'Cost-effective breeding programs'
            ],
            process: [
                'Initial consultation and animal assessment',
                'Heat detection and timing optimization',
                'Semen preparation and quality check',
                'Insemination procedure',
                'Post-insemination monitoring',
                'Pregnancy diagnosis and follow-up'
            ],
            pricing: 'Starting from UGX 150,000 per insemination'
        },
        'reproductive-disorders': {
            icon: 'fas fa-female',
            title: 'Reproductive Disorders Management',
            description: 'I provide expert diagnosis and treatment of reproductive health issues in farm animals to maximize breeding success.',
            features: [
                'Comprehensive reproductive health assessment',
                'Hormonal imbalance diagnosis',
                'Infertility treatment programs',
                'Breeding soundness evaluation',
                'Reproductive surgery when needed'
            ],
            benefits: [
                'Improved breeding success rates',
                'Early detection of reproductive issues',
                'Customized treatment plans',
                'Reduced breeding costs',
                'Better herd productivity'
            ],
            process: [
                'Detailed reproductive history taking',
                'Physical examination and diagnostics',
                'Laboratory testing if needed',
                'Treatment plan development',
                'Monitoring and follow-up',
                'Success evaluation and adjustment'
            ],
            pricing: 'Consultation: UGX 200,000, Treatment varies by condition'
        },
        'dystocia-csection': {
            icon: 'fas fa-cut',
            title: 'Dystocia & C-Section Management',
            description: 'I provide emergency obstetric care including dystocia management and cesarean sections for difficult births.',
            features: [
                '24/7 emergency obstetric care',
                'Dystocia diagnosis and management',
                'Emergency cesarean sections',
                'Post-operative care and monitoring',
                'Maternal and neonatal health assessment'
            ],
            benefits: [
                'Saves both mother and offspring',
                'Reduces mortality rates',
                'Professional emergency response',
                'Minimizes complications',
                'Preserves breeding potential'
            ],
            process: [
                'Emergency assessment and diagnosis',
                'Stabilization of the animal',
                'Surgical intervention if needed',
                'Post-operative monitoring',
                'Recovery management',
                'Follow-up care and evaluation'
            ],
            pricing: 'Emergency C-Section: UGX 500,000 - UGX 800,000'
        },
        'vaccination': {
            icon: 'fas fa-syringe',
            title: 'Vaccination Services',
            description: 'I provide comprehensive vaccination programs for cattle, poultry, dogs, and cats to prevent disease outbreaks.',
            features: [
                'Customized vaccination schedules',
                'Core and optional vaccines',
                'Bulk vaccination programs',
                'Vaccine storage and handling',
                'Immunity monitoring'
            ],
            benefits: [
                'Prevents deadly diseases',
                'Reduces treatment costs',
                'Improves animal welfare',
                'Protects herd health',
                'Increases productivity'
            ],
            process: [
                'Health assessment and planning',
                'Vaccine selection and preparation',
                'Proper administration technique',
                'Record keeping and documentation',
                'Follow-up monitoring',
                'Schedule maintenance'
            ],
            pricing: 'Per animal: UGX 15,000 - UGX 50,000 depending on vaccine type'
        },
        'animal-surgeries': {
            icon: 'fas fa-procedures',
            title: 'Animal Surgeries',
            description: 'Professional surgical procedures for various animal health conditions and emergency interventions.',
            features: [
                'Routine surgical procedures',
                'Emergency surgeries',
                'Sterile surgical environment',
                'Post-operative care',
                'Pain management'
            ],
            benefits: [
                'Life-saving interventions',
                'Improved animal health',
                'Professional surgical care',
                'Reduced suffering',
                'Better recovery outcomes'
            ],
            process: [
                'Pre-surgical assessment',
                'Anesthesia administration',
                'Surgical procedure',
                'Post-operative monitoring',
                'Recovery management',
                'Follow-up care'
            ],
            pricing: 'Surgery costs vary by procedure: UGX 200,000 - UGX 1,000,000'
        },
        'disease-diagnosis': {
            icon: 'fas fa-microscope',
            title: 'Disease Diagnosis & Treatment',
            description: 'Advanced diagnostic services and treatment for cattle, goats, pigs, dogs, and cats.',
            features: [
                'Clinical examination',
                'Laboratory diagnostics',
                'Disease identification',
                'Treatment protocols',
                'Prevention strategies'
            ],
            benefits: [
                'Accurate diagnosis',
                'Effective treatment',
                'Disease prevention',
                'Reduced mortality',
                'Better animal welfare'
            ],
            process: [
                'Clinical examination',
                'Diagnostic testing',
                'Disease identification',
                'Treatment plan development',
                'Treatment administration',
                'Monitoring and follow-up'
            ],
            pricing: 'Diagnosis: UGX 100,000 - UGX 300,000, Treatment varies by condition'
        },
        'farm-monitoring': {
            icon: 'fas fa-chart-line',
            title: 'Farm Monitoring & Evaluation',
            description: 'Regular farm visits and health assessments to ensure optimal animal welfare and productivity.',
            features: [
                'Regular farm health assessments',
                'Disease surveillance programs',
                'Nutritional evaluation',
                'Housing and environment assessment',
                'Productivity monitoring'
            ],
            benefits: [
                'Early disease detection',
                'Improved animal welfare',
                'Increased productivity',
                'Reduced mortality rates',
                'Better farm management'
            ],
            process: [
                'Initial farm evaluation',
                'Health assessment of all animals',
                'Environmental analysis',
                'Recommendations and action plan',
                'Regular follow-up visits',
                'Progress monitoring and adjustment'
            ],
            pricing: 'Farm visit: UGX 300,000 - UGX 500,000 per visit'
        },
        'reproductive-consultations': {
            icon: 'fas fa-comments',
            title: 'Reproductive Consultations',
            description: 'Expert advice and consultation on reproductive problems and breeding strategies for farm animals.',
            features: [
                'Breeding strategy development',
                'Reproductive problem solving',
                'Genetic improvement planning',
                'Breeding program evaluation',
                'Technical training and education'
            ],
            benefits: [
                'Optimized breeding programs',
                'Better reproductive outcomes',
                'Reduced breeding costs',
                'Improved genetic progress',
                'Enhanced farm profitability'
            ],
            process: [
                'Current situation analysis',
                'Problem identification',
                'Solution development',
                'Implementation planning',
                'Monitoring and support',
                'Results evaluation'
            ],
            pricing: 'Consultation: UGX 250,000 per session'
        },
        'animal-surgeries': {
            icon: 'fas fa-procedures',
            title: 'Animal Surgeries',
            description: 'Professional surgical procedures for various animal health conditions and emergency interventions.',
            features: [
                'Routine surgical procedures',
                'Emergency surgeries',
                'Sterile surgical environment',
                'Post-operative care',
                'Pain management'
            ],
            benefits: [
                'Life-saving interventions',
                'Improved animal health',
                'Professional surgical care',
                'Reduced suffering',
                'Better recovery outcomes'
            ],
            process: [
                'Pre-surgical assessment',
                'Anesthesia administration',
                'Surgical procedure',
                'Post-operative monitoring',
                'Recovery management',
                'Follow-up care'
            ],
            pricing: 'Surgery costs vary by procedure: UGX 200,000 - UGX 1,000,000'
        },
        'feed-quality': {
            icon: 'fas fa-seedling',
            title: 'Feed Quality Monitoring',
            description: 'Assessment and analysis of feed quality to ensure optimal nutrition for your livestock.',
            features: [
                'Feed quality analysis',
                'Nutritional content evaluation',
                'Feed safety assessment',
                'Storage condition evaluation',
                'Nutritional recommendations'
            ],
            benefits: [
                'Improved animal nutrition',
                'Better feed efficiency',
                'Reduced feed costs',
                'Enhanced productivity',
                'Better animal health'
            ],
            process: [
                'Feed sample collection',
                'Laboratory analysis',
                'Nutritional evaluation',
                'Recommendations development',
                'Implementation support',
                'Monitoring and adjustment'
            ],
            pricing: 'Feed analysis: UGX 100,000 per sample'
        },
        'herd-evaluation': {
            icon: 'fas fa-clipboard-check',
            title: 'Herd Evaluation',
            description: 'Comprehensive evaluation of herd health, productivity, and breeding potential assessment.',
            features: [
                'Individual animal assessment',
                'Herd health evaluation',
                'Productivity analysis',
                'Breeding potential assessment',
                'Management recommendations'
            ],
            benefits: [
                'Optimized herd management',
                'Improved productivity',
                'Better breeding decisions',
                'Reduced health issues',
                'Increased profitability'
            ],
            process: [
                'Herd health assessment',
                'Individual animal evaluation',
                'Data collection and analysis',
                'Recommendations development',
                'Implementation planning',
                'Follow-up monitoring'
            ],
            pricing: 'Herd evaluation: UGX 400,000 - UGX 600,000'
        },
        'records-management': {
            icon: 'fas fa-file-medical',
            title: 'Records Management',
            description: 'Professional maintenance of health records and documentation for your livestock operations.',
            features: [
                'Health record maintenance',
                'Vaccination tracking',
                'Treatment documentation',
                'Breeding records',
                'Performance monitoring'
            ],
            benefits: [
                'Better farm management',
                'Compliance with regulations',
                'Improved decision making',
                'Traceability',
                'Professional documentation'
            ],
            process: [
                'Record system setup',
                'Data collection',
                'Documentation maintenance',
                'Regular updates',
                'Analysis and reporting',
                'System optimization'
            ],
            pricing: 'Record management: UGX 150,000 per month'
        },
        'postmortem-examination': {
            icon: 'fas fa-search',
            title: 'Postmortem Examination',
            description: 'Thorough postmortem examinations to determine cause of death and prevent future health issues.',
            features: [
                'Complete postmortem examination',
                'Cause of death determination',
                'Disease identification',
                'Prevention recommendations',
                'Detailed reporting'
            ],
            benefits: [
                'Understanding of mortality causes',
                'Disease prevention',
                'Improved herd health',
                'Reduced future losses',
                'Better management decisions'
            ],
            process: [
                'Examination scheduling',
                'Thorough postmortem',
                'Sample collection',
                'Laboratory analysis',
                'Report preparation',
                'Recommendations delivery'
            ],
            pricing: 'Postmortem examination: UGX 200,000 per case'
        },
        'extension-services': {
            icon: 'fas fa-hands-helping',
            title: 'Extension Services',
            description: 'Educational programs and training for farmers on best practices in animal health and management.',
            features: [
                'Farmer education programs',
                'Best practices training',
                'Technical workshops',
                'On-farm demonstrations',
                'Resource materials'
            ],
            benefits: [
                'Improved farming practices',
                'Better animal care',
                'Increased productivity',
                'Reduced disease incidence',
                'Enhanced knowledge'
            ],
            process: [
                'Needs assessment',
                'Program development',
                'Training delivery',
                'Practical demonstrations',
                'Follow-up support',
                'Impact evaluation'
            ],
            pricing: 'Training programs: UGX 500,000 - UGX 1,000,000 per program'
        }
    };
    
    serviceCards.forEach(card => {
        console.log('Adding click listener to service card:', card);
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('=== SERVICE CARD CLICKED ===');
            console.log('Clicked element:', this);
            console.log('Data-service attribute:', this.getAttribute('data-service'));
            
            const serviceType = this.getAttribute('data-service');
            console.log('Service type:', serviceType);
            const service = serviceData[serviceType];
            console.log('Service data found:', !!service);
            console.log('Service data:', service);
            
            if (service) {
                // Update modal content
                document.getElementById('modalServiceIcon').className = service.icon;
                document.getElementById('modalServiceTitle').textContent = service.title;
                document.getElementById('modalServiceDescription').textContent = service.description;
                
                // Update features list
                const featuresList = document.getElementById('modalServiceFeatures');
                featuresList.innerHTML = '';
                service.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });
                
                // Update benefits list
                const benefitsList = document.getElementById('modalServiceBenefits');
                benefitsList.innerHTML = '';
                service.benefits.forEach(benefit => {
                    const li = document.createElement('li');
                    li.textContent = benefit;
                    benefitsList.appendChild(li);
                });
                
                // Update process list
                const processList = document.getElementById('modalServiceProcess');
                processList.innerHTML = '';
                service.process.forEach(step => {
                    const li = document.createElement('li');
                    li.textContent = step;
                    processList.appendChild(li);
                });
                
                // Update pricing
                document.getElementById('modalServicePricing').textContent = service.pricing;
                
                // Show modal
                console.log('Attempting to show service modal');
                console.log('Modal element:', serviceModalElement);
                console.log('Modal instance:', serviceModal);
                
                try {
                    serviceModal.show();
                    console.log('Modal show() called successfully');
                } catch (error) {
                    console.error('Error showing modal:', error);
                }
                
                // Track service view for analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'service_view', {
                        'service_name': service.title
                    });
                }
            }
        });
    });

    // Also enable explicit "Click for more details" buttons inside cards
    const readMoreButtons = document.querySelectorAll('.service-card .service-read-more');
    readMoreButtons.forEach((button) => {
        button.style.cursor = 'pointer';
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const parentCard = this.closest('.service-card');
            if (!parentCard) {
                return;
            }
            
            const serviceType = parentCard.getAttribute('data-service');
            const service = serviceData[serviceType];
            if (!service) {
                return;
            }
            
                // Update modal content
                document.getElementById('modalServiceIcon').className = service.icon;
                document.getElementById('modalServiceTitle').textContent = service.title;
                document.getElementById('modalServiceDescription').textContent = service.description;
                
                const featuresList = document.getElementById('modalServiceFeatures');
                featuresList.innerHTML = '';
            service.features.forEach((feature) => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });
                
                const benefitsList = document.getElementById('modalServiceBenefits');
                benefitsList.innerHTML = '';
            service.benefits.forEach((benefit) => {
                    const li = document.createElement('li');
                    li.textContent = benefit;
                    benefitsList.appendChild(li);
                });
                
                const processList = document.getElementById('modalServiceProcess');
                processList.innerHTML = '';
            service.process.forEach((step) => {
                    const li = document.createElement('li');
                    li.textContent = step;
                    processList.appendChild(li);
                });
                
                document.getElementById('modalServicePricing').textContent = service.pricing;
                
            try {
                serviceModal.show();
            } catch (error) {
                console.error('Error showing modal from read-more:', error);
            }
            
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'service_view', {
                        'service_name': service.title,
                    'source': 'read_more_button'
                    });
            }
        });
    });
}

// Subtle interactive tilt effect for hero image
function initHeroTilt() {
    const container = document.querySelector('.hero-image');
    const image = container ? container.querySelector('img') : null;
    if (!container || !image) return;

    // Page-load animation: scale/fade/bounce
    image.style.opacity = '0';
    image.style.transform = 'scale(0.85) translateY(20px)';
    setTimeout(() => {
        image.style.transition = 'transform 600ms cubic-bezier(.2,1.2,.2,1), opacity 600ms ease-out';
        image.style.opacity = '1';
        image.style.transform = 'scale(1.03) translateY(0)';
        setTimeout(() => {
            image.style.transition = 'transform 300ms ease-out';
            image.style.transform = 'scale(1)';
        }, 600);
    }, 100);

    const maxRotate = 8; // degrees
    const maxTranslate = 12; // px

    container.style.perspective = '800px';
    image.style.transition = 'transform 0.15s ease-out, box-shadow 0.2s ease-out';
    image.style.willChange = 'transform';

    function handleMove(event) {
        const rect = container.getBoundingClientRect();
        const x = (event.clientX || (event.touches && event.touches[0]?.clientX) || (rect.left + rect.width / 2)) - rect.left;
        const y = (event.clientY || (event.touches && event.touches[0]?.clientY) || (rect.top + rect.height / 2)) - rect.top;
        const percentX = (x / rect.width) * 2 - 1;  // -1 to 1
        const percentY = (y / rect.height) * 2 - 1; // -1 to 1

        const rotateY = -percentX * maxRotate;
        const rotateX = percentY * maxRotate;
        const translateX = percentX * maxTranslate;
        const translateY = percentY * maxTranslate;

        image.style.transform = `translate(${translateX}px, ${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        image.style.boxShadow = `${-translateX}px ${Math.abs(translateY)}px 40px rgba(0,0,0,0.35)`;
    }

    function handleLeave() {
        image.style.transform = 'translate(0, 0) rotateX(0) rotateY(0)';
        image.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    }

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
        // Gentle parallax on device tilt (if available)
        window.addEventListener('deviceorientation', (e) => {
            const beta = Math.max(-45, Math.min(45, e.beta || 0));   // front-back tilt
            const gamma = Math.max(-45, Math.min(45, e.gamma || 0)); // left-right tilt
            const rotateX = (beta / 45) * (maxRotate / 2);
            const rotateY = (gamma / 45) * (maxRotate / 2);
            image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }, { passive: true });
    } else {
        container.addEventListener('mousemove', handleMove);
        container.addEventListener('mouseleave', handleLeave);
    }
}

// Auto-slide testimonials horizontally
function initTestimonialAutoSlide() {
    const section = document.getElementById('testimonials');
    if (!section) return;
    const rows = section.querySelectorAll('.row');
    // Find the row that contains testimonial cards
    const track = Array.from(rows).find(r => r.querySelector('.testimonial-card'));
    if (!track) return;

    // Prepare horizontal track
    track.style.overflowX = 'hidden';
    track.style.flexWrap = 'nowrap';

    // Ensure each column doesn't wrap
    const slides = Array.from(track.children);
    slides.forEach(slide => {
        slide.style.flex = '0 0 auto';
    });

    // Duplicate content to create seamless loop
    const clone = track.innerHTML;
    track.insertAdjacentHTML('beforeend', clone);

    let pos = 0;
    let speed = 0.6; // px per frame
    let rafId = null;
    let isPaused = false;

    function step() {
        if (!isPaused) {
            pos += speed;
            const halfWidth = track.scrollWidth / 2;
            if (pos >= halfWidth) {
                pos = 0;
            }
            track.scrollLeft = pos;
        }
        rafId = requestAnimationFrame(step);
    }

    // Pause on hover/touch
    track.addEventListener('mouseenter', () => { isPaused = true; });
    track.addEventListener('mouseleave', () => { isPaused = false; });
    track.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
    track.addEventListener('touchend', () => { isPaused = false; }, { passive: true });

    // Start animation
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(step);
}

// Experience Section Enhancement - Simple and Clean
function initExperienceSection() {
    const experienceSection = document.getElementById('experience');
    if (!experienceSection) return;
    
    const experienceItems = document.querySelectorAll('.experience-item');
    
    // Simple fade-in animation on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                experienceObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Initialize items with simple styling
    experienceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease-out';
        
        // Simple hover effect
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        experienceObserver.observe(item);
    });
}

