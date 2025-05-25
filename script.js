// Společný JavaScript pro všechny stránky

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuCloseBtn = document.querySelector('.mobile-menu-close-btn');
    const mobileMenu = document.querySelector('#mobile-menu'); // Použití ID selektoru pro přesnější výběr

    if (mobileMenuBtn && mobileMenu && mobileMenuCloseBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', String(!isExpanded)); // Zajistí, že hodnota je string
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : ''; // Zabrání skrolování těla, když je menu otevřené
        });

        mobileMenuCloseBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            if (mobileMenuBtn) { // Kontrola, zda mobileMenuBtn existuje
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
        });

        // Close mobile menu when clicking a link inside it
        const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                if (mobileMenuBtn) { // Kontrola, zda mobileMenuBtn existuje
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
                document.body.style.overflow = '';
            });
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            // Pokud kliknutí není na tlačítko menu (ani jeho obsah) A NENÍ uvnitř samotného menu
            if (mobileMenuBtn && !mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                if (mobileMenuBtn) { // Kontrola, zda mobileMenuBtn existuje
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
                document.body.style.overflow = '';
            }
        }
    });


    // Smooth scrolling for anchor links (pokud by byly na stránce)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            if (hrefAttribute && hrefAttribute !== '#') { // Ignorovat prázdné #
                const target = document.querySelector(hrefAttribute);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Lazy loading fallback for older browsers
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.remove('lazy'); 
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }

    // Add focus styles for keyboard navigation
    function handleFirstTab(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
            window.removeEventListener('keydown', handleFirstTab);
            window.addEventListener('mousedown', handleMouseDown);
        }
    }

    function handleMouseDown() {
        document.body.classList.remove('keyboard-navigation');
        window.removeEventListener('mousedown', handleMouseDown);
        window.addEventListener('keydown', handleFirstTab);
    }

    window.addEventListener('keydown', handleFirstTab);

});

