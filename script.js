/* ============================================
   GOTA RESTAURANT & BEACH CLUB
   Premium JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================
    // LOADING SCREEN
    // ============================================
    const loadingScreen = document.getElementById('loadingScreen');

    function hideLoading() {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }
    }

    // Hide loading after images are ready or timeout
    let imagesLoaded = 0;
    const totalImages = document.querySelectorAll('img').length;

    function checkImagesLoaded() {
        imagesLoaded++;
        if (imagesLoaded >= Math.min(totalImages, 3)) {
            hideLoading();
        }
    }

    document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            checkImagesLoaded();
        } else {
            img.addEventListener('load', checkImagesLoaded);
            img.addEventListener('error', checkImagesLoaded);
        }
    });

    // Fallback: hide loading after 3 seconds
    setTimeout(hideLoading, 3000);

    // ============================================
    // NAVIGATION
    // ============================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const lines = navToggle.querySelectorAll('.hamburger-line');

            if (navMenu.classList.contains('active')) {
                lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const lines = navToggle.querySelectorAll('.hamburger-line');
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');

    function setActiveNavLink() {
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink, { passive: true });

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // MENU TABS
    // ============================================
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;

            // Update tabs
            menuTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Update content
            menuCategories.forEach(cat => {
                cat.classList.remove('active');
                if (cat.id === category) {
                    cat.classList.add('active');
                }
            });
        });
    });

    // ============================================
    // GALLERY FILTER
    // ============================================
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Update buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            galleryItems.forEach(item => {
                const category = item.dataset.category;

                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // ============================================
    // LIGHTBOX
    // ============================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentImageIndex = 0;
    let visibleGalleryItems = [];

    function updateVisibleItems() {
        visibleGalleryItems = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
    }

    function openLightbox(index) {
        updateVisibleItems();
        currentImageIndex = index;
        const item = visibleGalleryItems[index];
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');

        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.textContent = caption ? caption.textContent : '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImage.src = '';
        }, 400);
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % visibleGalleryItems.length;
        const item = visibleGalleryItems[currentImageIndex];
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');

        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxCaption.textContent = caption ? caption.textContent : '';
            lightboxImage.style.opacity = '1';
        }, 200);
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;
        const item = visibleGalleryItems[currentImageIndex];
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');

        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxCaption.textContent = caption ? caption.textContent : '';
            lightboxImage.style.opacity = '1';
        }, 200);
    }

    // Gallery item click
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            updateVisibleItems();
            const visibleIndex = visibleGalleryItems.indexOf(item);
            openLightbox(visibleIndex >= 0 ? visibleIndex : 0);
        });
    });

    // Lightbox controls
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', function(e) {
        e.stopPropagation();
        nextImage();
    });
    if (lightboxPrev) lightboxPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        prevImage();
    });

    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    // ============================================
    // SCROLL TO TOP
    // ============================================
    const scrollTop = document.getElementById('scrollTop');

    function toggleScrollTop() {
        if (window.scrollY > 600) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleScrollTop, { passive: true });

    if (scrollTop) {
        scrollTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // FORM VALIDATION & SUBMISSION
    // ============================================
    const reservationForm = document.getElementById('reservationForm');

    if (reservationForm) {
        // Set minimum date to today
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simple validation
            let isValid = true;
            const requiredFields = ['name', 'email', 'guests', 'date', 'time'];

            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--accent-coral)';
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 3000);
                }
            });

            if (isValid) {
                // Show success message
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Request Sent!';
                submitBtn.style.background = '#4CAF50';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    this.reset();
                }, 3000);

                console.log('Reservation request:', data);
            }
        });
    }

    // ============================================
    // PARALLAX EFFECTS
    // ============================================
    const heroImage = document.querySelector('.hero-image');

    function handleParallax() {
        if (heroImage && window.innerWidth > 768) {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;
            heroImage.style.transform = `scale(1.05) translateY(${rate}px)`;
        }
    }

    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // IMAGE LAZY LOADING ENHANCEMENT
    // ============================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px 0px'
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ============================================
    // MOUSE FOLLOW EFFECT (subtle glow on hero)
    // ============================================
    const hero = document.querySelector('.hero');

    if (hero && window.innerWidth > 1024) {
        hero.addEventListener('mousemove', function(e) {
            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            hero.style.setProperty('--mouse-x', x + '%');
            hero.style.setProperty('--mouse-y', y + '%');
        });
    }

    // ============================================
    // PERFORMANCE: Pause animations when tab hidden
    // ============================================
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.body.classList.add('paused');
        } else {
            document.body.classList.remove('paused');
        }
    });

    // ============================================
    // TOUCH SUPPORT FOR LIGHTBOX
    // ============================================
    let touchStartX = 0;
    let touchEndX = 0;

    if (lightbox) {
        lightbox.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextImage();
            } else {
                prevImage();
            }
        }
    }

    console.log('Gota Restaurant & Beach Club - Website Loaded');
});
