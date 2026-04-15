document.addEventListener('DOMContentLoaded', () => {
    // Feature Initializers
    initParallax();
    initCounters();
    initModals();
    initCookies();
    initLeadForm();
    initSmoothScroll();
    initRevealAnimations();
});

/**
 * Optimized Parallax using requestAnimationFrame
 */
function initParallax() {
    const parallaxLines = document.getElementById('parallax-lines');
    const navbar = document.getElementById('navbar');
    if (!parallaxLines && !navbar) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                
                // Parallax background
                if (parallaxLines) {
                    parallaxLines.style.transform = `translateY(${scrollY * 0.1}px) rotate(45deg)`;
                }
                
                // Sticky Navbar Transition
                if (navbar) {
                    if (scrollY > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * Fluid Counter Animation using requestAnimationFrame
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter-num');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    function animate(el) {
        const target = +el.getAttribute('data-target');
        if (isNaN(target)) return;
        
        const duration = 1500;
        let startTimestamp = null;

        function step(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            el.textContent = Math.floor(progress * target).toLocaleString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.textContent = target.toLocaleString();
            }
        }
        window.requestAnimationFrame(step);
    }

    counters.forEach(c => observer.observe(c));
}

/**
 * Static Modal Management (Privacy / Terms)
 */
function initModals() {
    const triggers = document.querySelectorAll('.open-modal');
    const closeBtns = document.querySelectorAll('.close-modal');
    const overlays = document.querySelectorAll('.modal-overlay');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = `modal-${trigger.getAttribute('data-modal')}`;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeAll = () => {
        overlays.forEach(m => {
            m.style.display = 'none';
        });
        document.body.style.overflow = '';
    };

    closeBtns.forEach(b => b.addEventListener('click', closeAll));
    overlays.forEach(o => o.addEventListener('click', (e) => {
        if (e.target === o) closeAll();
    }));

    // ESC key closes modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAll();
    });
}

/**
 * Cookie Consent Banner (non-blocking bottom bar)
 */
function initCookies() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');
    const closeBtn = document.getElementById('close-cookie-banner');
    const STORAGE_KEY = 'v-law-cookies-accepted';

    if (!banner) return;

    // Show banner only if user hasn't already responded
    if (!localStorage.getItem(STORAGE_KEY)) {
        // Small delay so the slide-up animation is visible
        banner.style.display = 'block';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                banner.classList.add('active');
            });
        });
    }

    const dismissBanner = () => {
        banner.classList.remove('active');
        // Wait for slide-out animation then hide
        setTimeout(() => { banner.style.display = 'none'; }, 600);
    };

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem(STORAGE_KEY, 'accepted');
            dismissBanner();
        });
    }

    if (rejectBtn) {
        rejectBtn.addEventListener('click', () => {
            localStorage.setItem(STORAGE_KEY, 'rejected');
            dismissBanner();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            localStorage.setItem(STORAGE_KEY, 'dismissed');
            dismissBanner();
        });
    }
}

/**
 * Lead Form Logic with Security Awareness
 */
function initLeadForm() {
    const form = document.getElementById('lead-form');
    const feedback = document.getElementById('form-feedback');
    if (!form || !feedback) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const data = {
            name: form.querySelector('#name').value.trim(),
            phone: form.querySelector('#phone').value.trim(),
            subject: form.querySelector('#subject').value,
            story: form.querySelector('#story').value.trim(),
            timestamp: new Date().toISOString()
        };

        console.log('Lead Securely Captured:', data);
        
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = 'שולח פנייה...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerText = 'הפנייה נשלחה בהצלחה';
            feedback.textContent = 'תודה, פנייתך התקבלה. עו"ד מישל ון דן סטין יחזור אליך בהקדם.';
            feedback.style.display = 'block';
            
            setTimeout(() => {
                form.reset();
                btn.innerText = originalText;
                btn.disabled = false;
                feedback.style.display = 'none';
            }, 5000);
        }, 1200);
    });
}

/**
 * Modern Smooth Scroll
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Scroll-Reveal Animations
 */
function initRevealAnimations() {
    // Add .reveal to all major sections except hero
    document.querySelectorAll('section:not(.hero), .stats-bar, footer').forEach(section => {
        section.classList.add('reveal');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
