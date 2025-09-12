// Lightweight handler to make all `.service-read-more` buttons open the modal
// Populates modal with service details using a local serviceData map

(function() {
    const serviceData = {
        'artificial-insemination': {
            icon: 'fas fa-dna',
            title: 'Artificial Insemination',
            description: 'Professional AI to improve breeding efficiency and genetics.',
            features: [
                'High-quality semen selection',
                'Optimal timing and technique',
                'Pregnancy diagnosis and follow-up'
            ],
            benefits: [
                'Improved herd genetics',
                'Better breeding efficiency',
                'Reduced disease transmission'
            ],
            process: [
                'Assessment and planning',
                'Heat detection',
                'Semen preparation',
                'Insemination',
                'Follow-up checks'
            ],
            pricing: 'Starting from UGX 150,000 per insemination'
        },
        'reproductive-disorders': {
            icon: 'fas fa-female',
            title: 'Reproductive Disorders Management',
            description: 'Diagnosis and treatment of reproductive health issues.',
            features: [
                'Reproductive health assessment',
                'Hormonal diagnostics',
                'Infertility treatment programs'
            ],
            benefits: [
                'Higher breeding success',
                'Early issue detection',
                'Customized treatment plans'
            ],
            process: [
                'History taking',
                'Examination and tests',
                'Treatment plan',
                'Monitoring and follow-up'
            ],
            pricing: 'Consultation: UGX 200,000 (treatment varies)'
        },
        'dystocia-csection': {
            icon: 'fas fa-cut',
            title: 'Dystocia & C-Section Management',
            description: 'Emergency obstetric care for difficult births.',
            features: [
                '24/7 emergency care',
                'Dystocia management',
                'Post-operative monitoring'
            ],
            benefits: [
                'Saves mother and offspring',
                'Reduces complications',
                'Professional emergency response'
            ],
            process: [
                'Emergency assessment',
                'Stabilization',
                'Surgical intervention',
                'Recovery management'
            ],
            pricing: 'UGX 500,000 - UGX 800,000 (procedure-dependent)'
        },
        'vaccination': {
            icon: 'fas fa-syringe',
            title: 'Vaccination Services',
            description: 'Comprehensive vaccination programs for livestock and pets.',
            features: [
                'Customized schedules',
                'Core & optional vaccines',
                'Bulk vaccination programs'
            ],
            benefits: [
                'Prevents deadly diseases',
                'Protects herd health',
                'Reduces treatment costs'
            ],
            process: [
                'Assessment and planning',
                'Vaccine preparation',
                'Proper administration',
                'Record keeping'
            ],
            pricing: 'UGX 15,000 - UGX 50,000 per animal (by vaccine)'
        },
        'farm-monitoring': {
            icon: 'fas fa-chart-line',
            title: 'Farm Monitoring & Evaluation',
            description: 'Regular farm visits and health assessments.',
            features: [
                'Health assessments',
                'Disease surveillance',
                'Environment evaluation'
            ],
            benefits: [
                'Early disease detection',
                'Improved welfare',
                'Higher productivity'
            ],
            process: [
                'Initial evaluation',
                'Farm assessment',
                'Recommendations',
                'Follow-up visits'
            ],
            pricing: 'UGX 300,000 - UGX 500,000 per visit'
        },
        'reproductive-consultations': {
            icon: 'fas fa-comments',
            title: 'Reproductive Consultations',
            description: 'Expert advice on reproductive issues and breeding strategies.',
            features: [
                'Breeding strategy',
                'Problem solving',
                'Program evaluation'
            ],
            benefits: [
                'Optimized programs',
                'Better outcomes',
                'Reduced costs'
            ],
            process: [
                'Analysis',
                'Plan development',
                'Monitoring'
            ],
            pricing: 'UGX 250,000 per session'
        },
        'animal-surgeries': {
            icon: 'fas fa-procedures',
            title: 'Animal Surgeries',
            description: 'Routine and emergency surgical procedures.',
            features: [
                'Routine and emergency',
                'Sterile environment',
                'Pain management'
            ],
            benefits: [
                'Life-saving care',
                'Improved health',
                'Better recovery outcomes'
            ],
            process: [
                'Pre-surgical assessment',
                'Anesthesia',
                'Procedure',
                'Recovery management'
            ],
            pricing: 'UGX 200,000 - UGX 1,000,000 (by procedure)'
        },
        'feed-quality': {
            icon: 'fas fa-seedling',
            title: 'Feed Quality Monitoring',
            description: 'Assessment and analysis of feed quality.',
            features: [
                'Feed analysis',
                'Nutritional evaluation',
                'Storage assessment'
            ],
            benefits: [
                'Improved nutrition',
                'Better efficiency',
                'Enhanced productivity'
            ],
            process: [
                'Sampling',
                'Lab analysis',
                'Recommendations'
            ],
            pricing: 'UGX 100,000 per sample'
        },
        'herd-evaluation': {
            icon: 'fas fa-clipboard-check',
            title: 'Herd Evaluation',
            description: 'Evaluation of herd health and productivity.',
            features: [
                'Animal assessment',
                'Health evaluation',
                'Productivity analysis'
            ],
            benefits: [
                'Optimized management',
                'Improved productivity',
                'Better decisions'
            ],
            process: [
                'Assessment',
                'Data analysis',
                'Action plan'
            ],
            pricing: 'UGX 400,000 - UGX 600,000'
        },
        'disease-diagnosis': {
            icon: 'fas fa-microscope',
            title: 'Disease Diagnosis & Treatment',
            description: 'Advanced diagnostics and treatment for livestock and pets.',
            features: [
                'Clinical exam',
                'Lab diagnostics',
                'Treatment protocols'
            ],
            benefits: [
                'Accurate diagnosis',
                'Effective treatment',
                'Disease prevention'
            ],
            process: [
                'Examination',
                'Testing',
                'Treatment and follow-up'
            ],
            pricing: 'Diagnosis UGX 100,000 - UGX 300,000 (treatment varies)'
        },
        'records-management': {
            icon: 'fas fa-file-medical',
            title: 'Records Management',
            description: 'Professional maintenance of health records and documentation.',
            features: [
                'Health records',
                'Vaccination tracking',
                'Treatment documentation'
            ],
            benefits: [
                'Compliance',
                'Better decisions',
                'Traceability'
            ],
            process: [
                'System setup',
                'Data collection',
                'Reporting'
            ],
            pricing: 'UGX 150,000 per month'
        },
        'postmortem-examination': {
            icon: 'fas fa-search',
            title: 'Postmortem Examination',
            description: 'Determine cause of death and prevent future issues.',
            features: [
                'Complete examination',
                'Cause determination',
                'Prevention recommendations'
            ],
            benefits: [
                'Understand mortality',
                'Prevent disease',
                'Improve herd health'
            ],
            process: [
                'Scheduling',
                'Examination',
                'Report and recommendations'
            ],
            pricing: 'UGX 200,000 per case'
        },
        'extension-services': {
            icon: 'fas fa-hands-helping',
            title: 'Extension Services',
            description: 'Training and education on best animal health practices.',
            features: [
                'Education programs',
                'Workshops',
                'On-farm demos'
            ],
            benefits: [
                'Better practices',
                'Higher productivity',
                'Reduced disease'
            ],
            process: [
                'Needs assessment',
                'Program delivery',
                'Follow-up support'
            ],
            pricing: 'UGX 500,000 - UGX 1,000,000 per program'
        }
    };

    document.addEventListener('click', function(event) {
        const readMore = event.target.closest('.service-read-more');
        if (!readMore) return;

        event.preventDefault();
        event.stopPropagation();

        const card = readMore.closest('.service-card');
        if (!card) return;

        const serviceKey = card.getAttribute('data-service');
        const service = serviceData[serviceKey] || null;

        const iconTarget = document.getElementById('modalServiceIcon');
        const titleTarget = document.getElementById('modalServiceTitle');
        const descTarget = document.getElementById('modalServiceDescription');
        const featuresList = document.getElementById('modalServiceFeatures');
        const benefitsList = document.getElementById('modalServiceBenefits');
        const processList = document.getElementById('modalServiceProcess');
        const pricingTarget = document.getElementById('modalServicePricing');

        if (service) {
            if (iconTarget) iconTarget.className = service.icon;
            if (titleTarget) titleTarget.textContent = service.title;
            if (descTarget) descTarget.textContent = service.description;
            if (featuresList) {
                featuresList.innerHTML = '';
                service.features.forEach(text => {
                    const li = document.createElement('li');
                    li.textContent = text;
                    featuresList.appendChild(li);
                });
            }
            if (benefitsList) {
                benefitsList.innerHTML = '';
                service.benefits.forEach(text => {
                    const li = document.createElement('li');
                    li.textContent = text;
                    benefitsList.appendChild(li);
                });
            }
            if (processList) {
                // Process section removed — ensure it's empty and hidden
                processList.innerHTML = '';
            }
            if (pricingTarget) pricingTarget.textContent = '';
        } else {
            // Fallback: extract from card if mapping missing
            const iconEl = card.querySelector('.service-icon i');
            const titleEl = card.querySelector('h5');
            const descEl = card.querySelector('p');
            if (iconTarget && iconEl) iconTarget.className = iconEl.className;
            if (titleTarget && titleEl) titleTarget.textContent = titleEl.textContent.trim();
            if (descTarget && descEl) descTarget.textContent = descEl.textContent.trim();
            if (featuresList) featuresList.innerHTML = '';
            if (benefitsList) benefitsList.innerHTML = '';
            if (processList) processList.innerHTML = '';
            if (pricingTarget) pricingTarget.textContent = '';
        }

        const modalEl = document.getElementById('serviceModal');
        if (!modalEl || typeof bootstrap === 'undefined' || !bootstrap.Modal) return;
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        
        // Ensure the close button dismisses the modal
        const closeBtn = modalEl.querySelector('.btn-close');
        if (closeBtn) {
            closeBtn.setAttribute('data-bs-dismiss', 'modal');
            closeBtn.addEventListener('click', () => {
                try { modal.hide(); } catch (e) {}
            }, { once: true });
        }
        
        modal.show();
    });
})();

// Dark/Light mode toggle with persistence (uses [data-theme="dark"] on <html>)
(function() {
    function applyTheme(theme) {
        const root = document.documentElement; // <html>
        const icon = document.getElementById('themeIcon');
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
            if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
        } else {
            root.setAttribute('data-theme', 'light');
            if (icon) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
        }
    }

    // Initialize
    const saved = localStorage.getItem('theme') || 'light';
    applyTheme(saved);

    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', next);
            applyTheme(next);
        });
    }
})();

// Back to Top behavior
(function() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    function setVisible(v) {
        btn.style.opacity = v ? '1' : '0';
        btn.style.visibility = v ? 'visible' : 'hidden';
        btn.style.pointerEvents = v ? 'auto' : 'none';
        btn.style.transition = 'opacity 0.3s ease';
    }

    window.addEventListener('scroll', function() {
        const y = window.pageYOffset || document.documentElement.scrollTop || 0;
        setVisible(y > 200);
        // Update counters when stats enter view (My Impact)
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(el => {
            if (el.dataset.animated) return;
            const rect = el.getBoundingClientRect();
            const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
            if (inView) {
                el.dataset.animated = 'true';
                const target = parseInt(el.getAttribute('data-target') || '0', 10);
                const duration = 1200;
                const start = performance.now();
                function tick(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    const value = Math.floor(progress * target);
                    el.textContent = String(value);
                    if (progress < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
            }
        });
    });

    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();


