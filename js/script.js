gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Smooth Scroll Animation for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
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

// Loader Sequence
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

// Parallax Effect for Hero Image
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

// Reveal Text on Scroll
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

// Image Reveal on Scroll
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

// Menu Hover Logic (Floating Image)
const menuItems = document.querySelectorAll('.menu-item');
const floatingImg = document.getElementById('menu-floating-img');
const menuSection = document.querySelector('#menu');

// Only active on desktop
if (window.matchMedia("(min-width: 768px)").matches) {
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
            // Calculate position relative to viewport
            const x = e.clientX;
            const y = e.clientY;
            
            gsap.to(floatingImg, {
                left: x,
                top: y,
                x: 20, // offset
                y: 20, // offset
                duration: 0.5,
                ease: "power3.out"
            });
        });
    });

    // Custom Cursor Logic
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
