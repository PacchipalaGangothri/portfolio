/* =====================================================
   GANGOTHRI — PORTFOLIO SCRIPT
   Handles: 3D tilt, typing, cursor, scroll, animations
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── CUSTOM CURSOR ─── */
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    let mouseX = 0,
        mouseY = 0;
    let followerX = 0,
        followerY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Cursor scale on hover interactive elements
    const interactiveEls = document.querySelectorAll('a, button, .flip-card, .card-tilt, .social-link, .btn');
    interactiveEls.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.background = 'var(--amber-light)';
            follower.style.width = '60px';
            follower.style.height = '60px';
            follower.style.opacity = '0.3';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'var(--amber)';
            follower.style.width = '36px';
            follower.style.height = '36px';
            follower.style.opacity = '0.5';
        });
    });


    /* ─── NAVBAR SCROLL EFFECT ─── */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    /* ─── HAMBURGER MENU ─── */
    const hamburger = document.getElementById('hamburger');
    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('nav-open');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => navbar.classList.remove('nav-open'));
    });


    /* ─── SMOOTH SCROLL ─── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 72;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top,
                    behavior: 'smooth'
                });
            }
        });
    });


    /* ─── TYPING ANIMATION ─── */
    const roles = [
        'Software Developer',
        'Python Programmer',
        'SQL Developer',
        'Web Developer',
        'Problem Solver'
    ];
    let roleIdx = 0,
        charIdx = 0,
        isDeleting = false;
    const typedEl = document.getElementById('typedRole');

    function typeRole() {
        const current = roles[roleIdx];
        if (isDeleting) {
            charIdx--;
        } else {
            charIdx++;
        }
        typedEl.textContent = current.slice(0, charIdx);

        let delay = isDeleting ? 60 : 100;
        if (!isDeleting && charIdx === current.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            delay = 400;
        }
        setTimeout(typeRole, delay);
    }
    setTimeout(typeRole, 1200);


    /* ─── 3D TILT EFFECT ─── */
    function initTilt(el) {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);
            const tiltX = dy * -10;
            const tiltY = dx * 10;
            el.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02,1.02,1.02)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        });
    }
    document.querySelectorAll('[data-tilt]').forEach(initTilt);


    /* ─── 3D PROFILE CARD TILT ─── */
    const profileWrapper = document.getElementById('profileWrapper');
    const profileCard = profileWrapper ? profileWrapper.querySelector('.profile-card-3d') : null;
    if (profileWrapper && profileCard) {
        profileWrapper.addEventListener('mousemove', e => {
            const rect = profileWrapper.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);
            profileCard.style.transform = `perspective(900px) rotateY(${dx * 15}deg) rotateX(${-dy * 10}deg)`;
        });
        profileWrapper.addEventListener('mouseleave', () => {
            profileCard.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
        });
    }


    /* ─── SCROLL REVEAL ─── */
    const revealEls = document.querySelectorAll(
        '.about-card, .skill-category-card, .timeline-card, .project-card, .cert-card, .contact-card, .section-title, .section-label, .about-description, .about-details, .hero-stats'
    );

    // Add reveal classes
    revealEls.forEach((el, i) => {
        if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right')) {
            el.classList.add('reveal');
        }
    });

    // Also add reveal to timeline items
    document.querySelectorAll('.timeline-item[data-side="left"] .timeline-card').forEach(el => {
        el.classList.remove('reveal');
        el.classList.add('reveal-left');
    });
    document.querySelectorAll('.timeline-item[data-side="right"] .timeline-card').forEach(el => {
        el.classList.remove('reveal');
        el.classList.add('reveal-right');
    });

    // Stagger children in grids
    document.querySelectorAll('.skills-grid, .projects-grid, .about-cards-side, .cert-grid').forEach(g => {
        g.classList.add('stagger');
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });


    /* ─── SKILL BAR ANIMATION ─── */
    const skillBarsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.skill-fill[data-width]');
                bars.forEach(bar => {
                    const w = bar.getAttribute('data-width');
                    bar.style.width = w;
                });
                skillBarsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    document.querySelectorAll('.skill-category-card').forEach(card => {
        skillBarsObserver.observe(card);
    });


    /* ─── ACTIVE NAV LINK ON SCROLL ─── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const activeSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--amber)' : '';
                });
            }
        });
    }, {
        threshold: 0.4
    });

    sections.forEach(s => activeSectionObserver.observe(s));


    /* ─── PARTICLE EFFECT ON HERO (subtle) ─── */
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        const count = 20;
        for (let i = 0; i < count; i++) {
            const dot = document.createElement('div');
            dot.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(232,160,69,${Math.random() * 0.4 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        z-index: 0;
        animation: particleFloat ${Math.random() * 10 + 8}s ease-in-out infinite ${Math.random() * 5}s;
      `;
            hero.appendChild(dot);
        }

        const style = document.createElement('style');
        style.textContent = `
      @keyframes particleFloat {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
        33% { transform: translateY(-${Math.random() * 30 + 20}px) translateX(${Math.random() * 20 - 10}px); opacity: 0.7; }
        66% { transform: translateY(-${Math.random() * 50 + 10}px) translateX(${Math.random() * 30 - 15}px); opacity: 0.4; }
      }
    `;
        document.head.appendChild(style);
    }
    createParticles();


    /* ─── COUNT-UP ANIMATION FOR STATS ─── */
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const nums = entry.target.querySelectorAll('.stat-num');
            nums.forEach(num => {
                const raw = num.textContent;
                const isFloat = raw.includes('.');
                const suffix = raw.replace(/[\d.]/g, '');
                const target = parseFloat(raw);
                if (isNaN(target)) return;
                let start = 0;
                const duration = 1500;
                const startTime = performance.now();

                function update(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 3);
                    const val = start + (target - start) * ease;
                    num.textContent = isFloat ? val.toFixed(2) + suffix : Math.round(val) + suffix;
                    if (progress < 1) requestAnimationFrame(update);
                }
                requestAnimationFrame(update);
            });
            statsObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.5
    });

    document.querySelectorAll('.hero-stats').forEach(el => statsObserver.observe(el));


    /* ─── GLITCH EFFECT ON LOGO ─── */
    const logo = document.querySelector('.nav-logo');
    if (logo) {
        setInterval(() => {
            logo.style.textShadow = `
        ${Math.random() * 4 - 2}px 0 rgba(232,160,69,0.8),
        ${Math.random() * 4 - 2}px 0 rgba(56,189,248,0.6)
      `;
            setTimeout(() => {
                logo.style.textShadow = 'none';
            }, 100);
        }, 4000);
    }


    /* ─── MOBILE: touch tilt for profile ─── */
    if (profileWrapper && profileCard) {
        let touchStartX = 0,
            touchStartY = 0;
        profileWrapper.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, {
            passive: true
        });
        profileWrapper.addEventListener('touchmove', e => {
            const dx = (e.touches[0].clientX - touchStartX) / 80;
            const dy = (e.touches[0].clientY - touchStartY) / 80;
            profileCard.style.transform = `perspective(900px) rotateY(${dx * 15}deg) rotateX(${-dy * 10}deg)`;
        }, {
            passive: true
        });
        profileWrapper.addEventListener('touchend', () => {
            profileCard.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
        });
    }


    /* ─── CONSOLE EASTER EGG ─── */
    console.log('%c👋 Hi there, recruiter!', 'color: #e8a045; font-size: 20px; font-weight: bold;');
    console.log('%cLooking for a talented developer? You just found one 😄', 'color: #f5c87a; font-size: 14px;');
    console.log('%c📧 pacchipalagangothri@gmail.com', 'color: #94a3b8; font-size: 13px;');

});