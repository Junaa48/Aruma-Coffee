gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ========================================
// Smooth Scroll Animation for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            closeMobileMenu();

            gsap.to(window, {
                duration: 1.5,
                scrollTo: {
                    y: targetSection,
                    offsetY: 80 // Offset untuk navbar
                },
                ease: "power3.inOut"
            });
        }
    });
});

// ========================================
// Loader Sequence
// ========================================
const tlLoader = gsap.timeline();
tlLoader.to(".loader-text", {
    y: 0,
    duration: 1.2,
    ease: "power4.out",
    stagger: 0.2
})
.to("#loader", {
    y: "-100%",
    duration: 1,
    ease: "power2.inOut",
    delay: 0.5
})
.to(".hero-anim", {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out"
}, "-=0.5");

// ========================================
// Parallax Effect for Hero Image
// ========================================
gsap.to(".parallax-bg", {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
        trigger: "header",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// ========================================
// Reveal Text on Scroll
// ========================================
gsap.utils.toArray('.reveal-text').forEach(text => {
    gsap.from(text, {
        scrollTrigger: {
            trigger: text,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// ========================================
// Image Reveal on Scroll
// ========================================
gsap.utils.toArray('.reveal-on-scroll').forEach(img => {
    gsap.from(img, {
        scrollTrigger: {
            trigger: img,
            start: "top 80%",
        },
        scale: 1.2,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
    });
});

// ========================================
// Menu Hover Logic (Floating Image)
// ========================================
const floatingImg = document.getElementById('menu-floating-img');
const menuSection = document.querySelector('#menu');

function initMenuHover() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            const imgSrc = item.getAttribute('data-img');
            floatingImg.src = imgSrc;
            gsap.to(floatingImg, { scale: 1, opacity: 1, duration: 0.3 });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(floatingImg, { scale: 0, opacity: 0, duration: 0.3 });
        });

        item.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            
            gsap.to(floatingImg, {
                left: x,
                top: y,
                x: 20,
                y: 20,
                duration: 0.5,
                ease: "power3.out"
            });
        });
    });
}

// Only active on desktop
if (window.matchMedia("(min-width: 768px)").matches) {
    initMenuHover();

    // ========================================
    // Custom Cursor Logic
    // ========================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        gsap.to(cursorOutline, {
            x: posX,
            y: posY,
            duration: 0.15,
            ease: "power2.out"
        });
    });

    // Hover triggers for cursor
    document.querySelectorAll('.hover-trigger, a, button').forEach(trigger => {
        trigger.addEventListener('mouseenter', () => {
            gsap.to(cursorOutline, { scale: 1.5, backgroundColor: "rgba(212, 165, 116, 0.2)", borderColor: "transparent" });
        });
        trigger.addEventListener('mouseleave', () => {
            gsap.to(cursorOutline, { scale: 1, backgroundColor: "transparent", borderColor: "rgba(28, 27, 26, 0.3)" });
        });
    });
}


// ========================================
// NEW — Navbar Scroll Effect
// ========================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
});


// ========================================
// NEW — Hamburger Menu (Mobile)
// ========================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
}

function openMobileMenu() {
    hamburger.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.classList.add('menu-open');
}

hamburger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});


// ========================================
// NEW — Menu Tabs
// ========================================
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-category');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.dataset.category;

        // Update active tab
        menuTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update active category
        menuCategories.forEach(cat => {
            cat.classList.remove('active');
            if (cat.dataset.category === category) {
                cat.classList.add('active');
            }
        });

        // Re-init hover for new menu items (desktop only)
        if (window.matchMedia("(min-width: 768px)").matches) {
            initMenuHover();
        }
    });
});


// ========================================
// NEW — Counter Animation
// ========================================
document.querySelectorAll('.counter').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    
    gsap.fromTo(counter, 
        { innerText: 0 },
        {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
                trigger: counter,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        }
    );
});


// ========================================
// NEW — Back to Top Button
// ========================================
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: 0 },
        ease: "power3.inOut"
    });
});


// ========================================
// NEW — Testimonial Cards Animation
// ========================================
gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: "power3.out"
    });
});


// ========================================
// NEW — Gallery Items Entrance Animation
// ========================================
gsap.utils.toArray('.gallery-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
        },
        x: 80,
        opacity: 0,
        duration: 1,
        delay: i * 0.1,
        ease: "power3.out"
    });
});


// ========================================
// NEW — CTA Section Parallax
// ========================================
const ctaBg = document.querySelector('.cta-section img');
if (ctaBg) {
    gsap.to(ctaBg, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
            trigger: ".cta-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}


// ========================================
// NEW — Location Section Animation
// ========================================
gsap.utils.toArray('.location-info-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        x: 40,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power3.out"
    });
});
