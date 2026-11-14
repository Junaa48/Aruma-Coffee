// ========================================
// Aruma Coffee — Main Interactive Script
// ========================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGSAP = typeof window.gsap !== 'undefined';

if (hasGSAP) {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// ========================================
// DOM References
// ========================================
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const backToTop = document.getElementById('back-to-top');
const floatingImg = document.getElementById('menu-floating-img');
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-category');
const menuItems = document.querySelectorAll('.menu-item');

// Modal References
const menuModal = document.getElementById('menu-modal');
const menuModalClose = document.getElementById('menu-modal-close');
const menuModalImg = document.getElementById('menu-modal-img');
const menuModalTitle = document.getElementById('menu-modal-title');
const menuModalDesc = document.getElementById('menu-modal-desc');
const menuModalPrice = document.getElementById('menu-modal-price');
const menuModalOrder = document.getElementById('menu-modal-order');

// ========================================
// Mobile Menu Logic
// ========================================
function closeMobileMenu() {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
}

function openMobileMenu() {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('active');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
}

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

// ========================================
// Smooth Scroll Navigation
// ========================================
function scrollToPosition(target, offsetY = 0) {
    if (hasGSAP && !prefersReducedMotion) {
        gsap.to(window, {
            duration: 1.2,
            scrollTo: {
                y: target,
                offsetY
            },
            ease: 'power3.inOut'
        });
        return;
    }

    const top = typeof target === 'number'
        ? target
        : target.getBoundingClientRect().top + window.scrollY - offsetY;

    window.scrollTo({
        top: Math.max(0, top),
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId) return;

        e.preventDefault();

        if (targetId === '#') {
            if (this.closest('#navbar')) {
                closeMobileMenu();
                scrollToPosition(0);
            }
            return;
        }

        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            closeMobileMenu();
            scrollToPosition(targetSection, 80);
        }
    });
});

// ========================================
// Loader & Hero Reveal Sequence
// ========================================
function showHeroImmediately() {
    if (loader) {
        loader.style.display = 'none';
    }
    document.querySelectorAll('.hero-anim').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}

if (!hasGSAP || prefersReducedMotion) {
    showHeroImmediately();
    document.querySelectorAll('.counter').forEach(counter => {
        counter.textContent = counter.getAttribute('data-target') || '0';
    });
} else {
    const tlLoader = gsap.timeline({
        onComplete: () => {
            if (loader) loader.style.display = 'none';
        }
    });

    tlLoader
        .to('.loader-text', {
            y: 0,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.15
        })
        .to('#loader', {
            y: '-100%',
            duration: 0.9,
            ease: 'power2.inOut',
            delay: 0.35
        })
        .to('.hero-anim', {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out'
        }, '-=0.4');

    // ========================================
    // Parallax Effects (with overscan .parallax-img)
    // ========================================
    if (document.querySelector('.parallax-bg')) {
        gsap.fromTo('.parallax-bg',
            { yPercent: -6 },
            {
                yPercent: 10,
                ease: 'none',
                scrollTrigger: {
                    trigger: 'header',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            }
        );
    }

    const ctaBg = document.querySelector('.cta-bg-img');
    if (ctaBg) {
        gsap.fromTo(ctaBg,
            { yPercent: -8 },
            {
                yPercent: 8,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.cta-section',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            }
        );
    }

    // ========================================
    // Scroll Reveal Animations
    // ========================================
    gsap.utils.toArray('.reveal-text').forEach(text => {
        gsap.from(text, {
            scrollTrigger: {
                trigger: text,
                start: 'top 88%',
                once: true
            },
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out'
        });
    });

    gsap.utils.toArray('.reveal-on-scroll').forEach(img => {
        gsap.from(img, {
            scrollTrigger: {
                trigger: img,
                start: 'top 85%',
                once: true
            },
            scale: 1.15,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });
    });

    gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                once: true
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'power3.out'
        });
    });

    if (document.querySelector('.gallery-scroll')) {
        gsap.from('.gallery-scroll', {
            scrollTrigger: {
                trigger: '.gallery-scroll',
                start: 'top 90%',
                once: true
            },
            y: 35,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out'
        });
    }

    gsap.utils.toArray('.location-info-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                once: true
            },
            x: 35,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });

    // ========================================
    // Counter Animation
    // ========================================
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || '0', 10);
        const state = { val: 0 };

        gsap.to(state, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: counter,
                start: 'top 88%',
                once: true
            },
            onUpdate: () => {
                counter.textContent = Math.round(state.val).toString();
            }
        });
    });
}

// ========================================
// Combined Scroll State (Navbar + Back to Top + Floating Preview Reset)
// ========================================
function hideFloatingImage() {
    if (!floatingImg) return;
    if (hasGSAP) {
        gsap.to(floatingImg, { scale: 0.85, opacity: 0, duration: 0.2, overwrite: 'auto' });
    } else {
        floatingImg.style.opacity = '0';
    }
}

function updateScrollUI() {
    const scrollY = window.scrollY;

    if (navbar) {
        navbar.classList.toggle('nav-scrolled', scrollY > 80);
    }

    if (backToTop) {
        backToTop.classList.toggle('visible', scrollY > 600);
    }

    hideFloatingImage();
}

window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

if (backToTop) {
    backToTop.addEventListener('click', () => {
        scrollToPosition(0);
    });
}

// ========================================
// Menu Floating Image Preview (Desktop Pointer Only, Attached Once)
// ========================================
const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function getClampedPreviewPosition(clientX, clientY) {
    const imgSize = 280;
    const margin = 20;
    const offset = 24;

    let targetX = clientX + offset;
    if (targetX + imgSize + margin > window.innerWidth) {
        targetX = clientX - imgSize - offset;
    }
    targetX = Math.max(margin, Math.min(targetX, window.innerWidth - imgSize - margin));

    let targetY = clientY - imgSize / 2;
    targetY = Math.max(margin, Math.min(targetY, window.innerHeight - imgSize - margin));

    return { x: targetX, y: targetY };
}

if (isFinePointer && floatingImg && hasGSAP) {
    gsap.set(floatingImg, { scale: 0.85, opacity: 0 });

    const moveImgX = gsap.quickTo(floatingImg, 'x', { duration: 0.35, ease: 'power3.out' });
    const moveImgY = gsap.quickTo(floatingImg, 'y', { duration: 0.35, ease: 'power3.out' });

    menuItems.forEach(item => {
        item.addEventListener('mouseenter', e => {
            const imgSrc = item.getAttribute('data-img');
            const title = item.getAttribute('data-title') || 'Menu Preview';
            if (!imgSrc) return;

            if (floatingImg.getAttribute('src') !== imgSrc) {
                floatingImg.src = imgSrc;
            }
            floatingImg.alt = title;

            const pos = getClampedPreviewPosition(e.clientX, e.clientY);
            gsap.set(floatingImg, { x: pos.x, y: pos.y });
            gsap.to(floatingImg, { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
        });

        item.addEventListener('mousemove', e => {
            const pos = getClampedPreviewPosition(e.clientX, e.clientY);
            moveImgX(pos.x);
            moveImgY(pos.y);
        });

        item.addEventListener('mouseleave', () => {
            hideFloatingImage();
        });
    });
}

// ========================================
// Custom Cursor (Desktop Fine Pointer Only)
// ========================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (isFinePointer && hasGSAP && !prefersReducedMotion && cursorDot && cursorOutline) {
    document.body.classList.add('has-custom-cursor');
    gsap.set([cursorDot, cursorOutline], { xPercent: -50, yPercent: -50, opacity: 0 });

    const moveOutlineX = gsap.quickTo(cursorOutline, 'x', { duration: 0.16, ease: 'power2.out' });
    const moveOutlineY = gsap.quickTo(cursorOutline, 'y', { duration: 0.16, ease: 'power2.out' });

    let cursorVisible = false;

    window.addEventListener('mousemove', e => {
        const target = e.target;
        const overNativeZone = target instanceof Element && target.closest('iframe, input, textarea, select');

        if (overNativeZone) {
            if (cursorVisible) {
                cursorVisible = false;
                gsap.to([cursorDot, cursorOutline], { opacity: 0, duration: 0.15 });
            }
            return;
        }

        if (!cursorVisible) {
            cursorVisible = true;
            gsap.set([cursorDot, cursorOutline], { x: e.clientX, y: e.clientY });
            gsap.to([cursorDot, cursorOutline], { opacity: 1, duration: 0.2 });
        }

        gsap.set(cursorDot, { x: e.clientX, y: e.clientY });
        moveOutlineX(e.clientX);
        moveOutlineY(e.clientY);
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        cursorVisible = false;
        gsap.to([cursorDot, cursorOutline], { opacity: 0, duration: 0.2 });
    });

    document.querySelectorAll('.hover-trigger, a, button, .menu-item').forEach(trigger => {
        trigger.addEventListener('mouseenter', () => {
            gsap.to(cursorOutline, {
                scale: 1.5,
                backgroundColor: 'rgba(212, 165, 116, 0.25)',
                borderColor: 'transparent',
                duration: 0.2
            });
        });
        trigger.addEventListener('mouseleave', () => {
            gsap.to(cursorOutline, {
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: 'rgba(250, 248, 245, 0.75)',
                duration: 0.2
            });
        });
    });
}

// ========================================
// Menu Tabs
// ========================================
menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.dataset.category;
        hideFloatingImage();

        menuTabs.forEach(t => {
            const isActive = t === tab;
            t.classList.toggle('active', isActive);
            t.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        menuCategories.forEach(cat => {
            const isMatch = cat.dataset.category === category;
            cat.classList.toggle('active', isMatch);
            cat.hidden = !isMatch;
        });
    });
});

// ========================================
// Menu Quick-View & Order Modal
// ========================================
function openMenuModal(item) {
    if (!menuModal) return;

    const title = item.getAttribute('data-title') || '';
    const desc = item.getAttribute('data-desc') || '';
    const price = item.getAttribute('data-price') || '';
    const imgSrc = item.getAttribute('data-img') || '';

    if (menuModalImg && imgSrc) {
        menuModalImg.src = imgSrc;
        menuModalImg.alt = title;
    }
    if (menuModalTitle) menuModalTitle.textContent = title;
    if (menuModalDesc) menuModalDesc.textContent = desc;
    if (menuModalPrice) menuModalPrice.textContent = price;

    if (menuModalOrder) {
        const message = `Halo Aruma Coffee, saya ingin memesan ${title} (${price}).`;
        menuModalOrder.href = `https://wa.me/628123456789?text=${encodeURIComponent(message)}`;
    }

    hideFloatingImage();
    menuModal.classList.add('active');
    menuModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeMenuModal() {
    if (!menuModal) return;
    menuModal.classList.remove('active');
    menuModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

menuItems.forEach(item => {
    item.addEventListener('click', () => openMenuModal(item));
    item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openMenuModal(item);
        }
    });
});

if (menuModal) {
    menuModal.addEventListener('click', e => {
        if (e.target === menuModal) closeMenuModal();
    });
}
if (menuModalClose) {
    menuModalClose.addEventListener('click', closeMenuModal);
}

// Escape Key closes Menu Modal or Mobile Menu
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (menuModal && menuModal.classList.contains('active')) {
            closeMenuModal();
        } else if (mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }
});

// ========================================
// Gallery Smooth Drag-to-Scroll (Inertia + Controls + Progress)
// ========================================
const galleryScroll = document.querySelector('.gallery-scroll');
const galleryPrev = document.getElementById('gallery-prev');
const galleryNext = document.getElementById('gallery-next');
const galleryProgress = document.getElementById('gallery-progress');

if (galleryScroll) {
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0; // px per ms
    let momentumRaf = null;
    let buttonAnim = null;

    function stopAnimations() {
        if (momentumRaf !== null) {
            cancelAnimationFrame(momentumRaf);
            momentumRaf = null;
        }
        if (buttonAnim) {
            buttonAnim.kill();
            buttonAnim = null;
        }
    }

    function updateGalleryControls() {
        const maxScroll = Math.max(0, galleryScroll.scrollWidth - galleryScroll.clientWidth);
        const current = galleryScroll.scrollLeft;

        if (galleryPrev) galleryPrev.disabled = current <= 2;
        if (galleryNext) galleryNext.disabled = current >= maxScroll - 2;

        if (galleryProgress) {
            if (maxScroll <= 0) {
                galleryProgress.style.width = '100%';
            } else {
                const ratio = current / maxScroll;
                const base = (galleryScroll.clientWidth / galleryScroll.scrollWidth) * 100;
                const widthPct = Math.min(100, base + ratio * (100 - base));
                galleryProgress.style.width = `${widthPct.toFixed(1)}%`;
            }
        }
    }

    function startInertiaGlide() {
        if (Math.abs(velocity) < 0.05) {
            galleryScroll.classList.remove('is-dragging');
            return;
        }

        let prevTime = performance.now();

        function step(now) {
            const dt = Math.min(32, Math.max(1, now - prevTime));
            prevTime = now;

            const maxScroll = galleryScroll.scrollWidth - galleryScroll.clientWidth;
            galleryScroll.scrollLeft -= velocity * dt;

            // Redam kecepatan secara konsisten di 60Hz/120Hz/144Hz
            velocity *= Math.pow(0.93, dt / 16.67);

            const atEdge = galleryScroll.scrollLeft <= 0 || galleryScroll.scrollLeft >= maxScroll;
            if (Math.abs(velocity) < 0.02 || atEdge) {
                momentumRaf = null;
                galleryScroll.classList.remove('is-dragging');
                updateGalleryControls();
                return;
            }

            momentumRaf = requestAnimationFrame(step);
        }

        momentumRaf = requestAnimationFrame(step);
    }

    galleryScroll.addEventListener('mousedown', e => {
        if (e.button !== 0) return;
        e.preventDefault();
        stopAnimations();

        isDragging = true;
        galleryScroll.classList.add('is-dragging');
        startX = e.clientX;
        startScrollLeft = galleryScroll.scrollLeft;
        lastX = e.clientX;
        lastTime = performance.now();
        velocity = 0;
    });

    window.addEventListener('mousemove', e => {
        if (!isDragging) return;
        e.preventDefault();

        const now = performance.now();
        const dt = Math.max(1, now - lastTime);
        const dx = e.clientX - lastX;

        velocity = 0.65 * velocity + 0.35 * (dx / dt);
        galleryScroll.scrollLeft = startScrollLeft - (e.clientX - startX);

        lastX = e.clientX;
        lastTime = now;
    });

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;

        // Reset momentum jika user menahan pointer diam sebelum melepas
        if (performance.now() - lastTime > 80) {
            velocity = 0;
        }
        startInertiaGlide();
    }

    window.addEventListener('mouseup', endDrag);
    window.addEventListener('blur', endDrag);

    function scrollByCard(direction) {
        stopAnimations();
        const card = galleryScroll.querySelector('.gallery-item');
        const gap = parseFloat(getComputedStyle(galleryScroll).columnGap || getComputedStyle(galleryScroll).gap || '24') || 24;
        const stepSize = card ? card.getBoundingClientRect().width + gap : galleryScroll.clientWidth * 0.7;
        const maxScroll = Math.max(0, galleryScroll.scrollWidth - galleryScroll.clientWidth);
        const target = Math.max(0, Math.min(maxScroll, galleryScroll.scrollLeft + direction * stepSize));

        if (hasGSAP && !prefersReducedMotion) {
            galleryScroll.classList.add('is-dragging');
            buttonAnim = gsap.to(galleryScroll, {
                scrollLeft: target,
                duration: 0.65,
                ease: 'power3.out',
                onComplete: () => {
                    buttonAnim = null;
                    galleryScroll.classList.remove('is-dragging');
                    updateGalleryControls();
                }
            });
        } else {
            galleryScroll.scrollTo({
                left: target,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        }
    }

    if (galleryPrev) galleryPrev.addEventListener('click', () => scrollByCard(-1));
    if (galleryNext) galleryNext.addEventListener('click', () => scrollByCard(1));

    galleryScroll.addEventListener('scroll', updateGalleryControls, { passive: true });
    window.addEventListener('resize', updateGalleryControls, { passive: true });
    updateGalleryControls();
}

// ========================================
// Newsletter Form & Social Placeholder Feedback
// ========================================
const newsletterForm = document.getElementById('newsletter-form');
const newsletterEmail = document.getElementById('newsletter-email');
const newsletterFeedback = document.getElementById('newsletter-feedback');

if (newsletterForm && newsletterEmail && newsletterFeedback) {
    newsletterForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = newsletterEmail.value.trim();
        if (!email || !newsletterEmail.checkValidity()) {
            newsletterFeedback.textContent = 'Masukkan alamat email yang valid.';
            newsletterFeedback.className = 'text-xs mt-2 text-red-400';
            return;
        }

        newsletterFeedback.textContent = `Terima kasih! ${email} telah terdaftar untuk promo Aruma Coffee.`;
        newsletterFeedback.className = 'text-xs mt-2 text-aruma-gold';
        newsletterForm.reset();
    });
}

const socialFeedback = document.getElementById('social-feedback');
document.querySelectorAll('[data-coming-soon]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const platform = link.getAttribute('data-coming-soon');
        if (socialFeedback && platform) {
            socialFeedback.textContent = `Tautan ${platform} resmi Aruma Coffee akan segera tersedia.`;
        }
    });
});

// ========================================
// Dynamic Copyright Year
// ========================================
const copyrightYear = document.getElementById('copyright-year');
if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear().toString();
}
