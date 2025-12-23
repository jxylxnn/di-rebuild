// Removed imports for static version
// import './style.css'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugin if available globally
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

// Header scroll effect
const header = document.querySelector('.header')
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled')
    } else {
        header.classList.remove('scrolled')
    }
})

// Initialize animations
const initAnimations = () => {
    console.log("Main.js: Initializing animations");
    // Hero Animations
    const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } })

    heroTl.from('.nav-container', {
        y: -40,
        opacity: 0,
        duration: 1.2,
        delay: 0.5
    })
        .from('.hero-bg img', {
            scale: 1.2,
            duration: 3,
            opacity: 0,
            ease: 'power3.out'
        }, 0)
        .from('.hero .reveal-text', {
            y: 100,
            opacity: 0,
            duration: 1.5,
            stagger: 0.2,
            skewY: 7,
            ease: 'expo.out'
        }, "-=2")

    // Scroll Trigger animations for sections
    gsap.utils.toArray('.section').forEach(section => {
        console.log("Main.js: Found section", section.className);
        const header = section.querySelector('.section-header, .section-title')
        const items = section.querySelectorAll('.brothers-grid > *, .gallery-grid > *, .resources-card, .shop-grid > *, .contact-grid, .about-content, .about-media')

        if (header && !header.closest('.about-content')) {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: 'power4.out'
            })
        }

        if (items.length > 0) {
            gsap.from(items, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                },
                y: 60,
                opacity: 0,
                duration: 1.5,
                stagger: 0.1,
                ease: 'expo.out',
                clearProps: "transform" // Clear transform after animation to avoid hover conflicts
            })
        }
    })

    // Parallax effects
    gsap.to('.hero-bg img', {
        scrollTrigger: {
            delay: 0,
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: '20%',
        ease: 'none'
    })

    gsap.to('.about-media img', {
        scrollTrigger: {
            trigger: '.section-about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: -60,
        scale: 1.05,
        ease: 'none'
    })

    // Refresh ScrollTrigger after a slight delay to account for image loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            ScrollTrigger.refresh()
        }, 100)
    })
}

// Mobile Nav Toggle with GSAP staggered animation
const navToggle = document.querySelector('.nav-toggle')
const navLinks = document.querySelector('.nav-links')
const navLinksItems = document.querySelectorAll('.nav-links li')

const toggleMenu = () => {
    const isActive = navToggle.classList.toggle('active')
    navLinks.classList.toggle('active')
    document.body.classList.toggle('menu-open')

    // Kill any ongoing animations to prevent overlap
    gsap.killTweensOf(navLinksItems)

    if (isActive) {
        gsap.to(navLinksItems, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power4.out',
            delay: 0.2
        })
    } else {
        gsap.to(navLinksItems, {
            opacity: 0,
            y: 20,
            duration: 0.4,
            ease: 'power2.in'
        })
    }
}

if (navToggle) {
    navToggle.addEventListener('click', toggleMenu)
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu()
        }
    })
})

// Reset menu on resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        navToggle.classList.remove('active')
        navLinks.classList.remove('active')
        document.body.classList.remove('menu-open')
        gsap.set(navLinksItems, { clearProps: 'all' })
    }
})

// Micro-interactions for buttons and cards
const initMicroInteractions = () => {
    // Button Hover Effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            })
        })
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            })
        })
    })

    // Brother Card Hover (Enhanced with GSAP to avoid conflicts)
    document.querySelectorAll('.brother-card').forEach(card => {
        const img = card.querySelector('img')

        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -12,
                scale: 1.02,
                duration: 0.5,
                ease: 'power2.out',
                overwrite: 'auto'
            })
            if (img) {
                gsap.to(img, {
                    scale: 1.1,
                    duration: 0.6,
                    ease: 'power2.out',
                    overwrite: 'auto'
                })
            }
        })

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out',
                overwrite: 'auto'
            })
            if (img) {
                gsap.to(img, {
                    scale: 1,
                    duration: 0.6,
                    ease: 'power2.out',
                    overwrite: 'auto'
                })
            }
        })
    })

    // Shop Item Hover
    document.querySelectorAll('.shop-item').forEach(item => {
        const img = item.querySelector('img')

        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                y: -10,
                duration: 0.5,
                ease: 'power2.out',
                overwrite: 'auto'
            })
            if (img) {
                gsap.to(img, {
                    scale: 1.05,
                    duration: 0.6,
                    ease: 'power2.out',
                    overwrite: 'auto'
                })
            }
        })

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
                overwrite: 'auto'
            })
            if (img) {
                gsap.to(img, {
                    scale: 1,
                    duration: 0.6,
                    ease: 'power2.out',
                    overwrite: 'auto'
                })
            }
        })
    })
}

// Simple smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const targetId = this.getAttribute('href')
        try {
            const target = document.querySelector(targetId)
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                })
            }
        } catch (e) {
            // Handle cases where targetId might not be a valid selector
        }
    })
})

const startApp = () => {
    if (typeof gsap !== 'undefined') {
        initAnimations()
        initMicroInteractions()
    } else {
        console.error("GSAP not loaded")
    }
}

document.addEventListener('DOMContentLoaded', startApp)
