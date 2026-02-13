// Navigation interactions and enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll behavior for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', function() {
        // Create search modal or expand search bar
        const searchModal = document.createElement('div');
        searchModal.className = 'search-modal';
        searchModal.innerHTML = `
            <div class="search-overlay">
                <div class="search-container">
                    <input type="text" placeholder="Search products..." class="search-input" autofocus>
                    <button class="search-close">&​times;</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(searchModal);
        
        // Add styles for search modal
        const style = document.createElement('style');
        style.textContent = `
            .search-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2000;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: flex-start;
                justify-content: center;
                padding-top: 100px;
            }
            .search-container {
                position: relative;
                width: 90%;
                max-width: 600px;
            }
            .search-input {
                width: 100%;
                padding: 1.5rem 3rem 1.5rem 1.5rem;
                font-size: 1.2rem;
                border: none;
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.1);
                color: white;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .search-input::placeholder {
                color: rgba(255, 255, 255, 0.6);
            }
            .search-close {
                position: absolute;
                right: 1rem;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                padding: 0.5rem;
            }
        `;
        document.head.appendChild(style);
        
        // Focus input
        const searchInput = searchModal.querySelector('.search-input');
        searchInput.focus();
        
        // Close functionality
        const closeBtn = searchModal.querySelector('.search-close');
        const closeModal = () => {
            document.body.removeChild(searchModal);
            document.head.removeChild(style);
        };
        
        closeBtn.addEventListener('click', closeModal);
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal || e.target.classList.contains('search-overlay')) {
                closeModal();
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    });

    // Cart functionality
    const cartBtn = document.querySelector('.cart-btn');
    let cartItems = 2; // Initial cart count
    
    cartBtn.addEventListener('click', function() {
        // Toggle cart sidebar or modal
        console.log('Cart clicked - items:', cartItems);
        // You can expand this to show a cart sidebar
    });

    // Account functionality
    const accountBtn = document.querySelector('.account-btn');
    accountBtn.addEventListener('click', function() {
        // Show account dropdown or modal
        console.log('Account clicked');
        // You can expand this to show user account options
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add smooth transition for navbar
    navbar.style.transition = 'transform 0.3s ease';
});
// Mobile menu toggle
const mobileMenuToggle = document.createElement('button');
mobileMenuToggle.className = 'mobile-menu-toggle';
mobileMenuToggle.setAttribute('aria-label', 'Toggle mobile menu');
mobileMenuToggle.innerHTML = `
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
`;

// Add mobile menu toggle to nav
const navContainer = document.querySelector('.nav-container');
navContainer.appendChild(mobileMenuToggle);

// Mobile menu functionality
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Hero section refresh animation
function triggerHeroRefresh() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.classList.remove('refresh-animation');
        void heroSection.offsetWidth; // Force reflow
        heroSection.classList.add('refresh-animation');
        
       
    }
}

// Trigger refresh animation on page load
window.addEventListener('load', () => {
    setTimeout(triggerHeroRefresh, 100);
});

// Optional: Trigger refresh on visibility change (when user returns to tab)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        triggerHeroRefresh();
    }
});


// Scroll fade-in animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    fadeElements.forEach(el => observer.observe(el));
    
    // Add page load animation to products section
    const productsSection = document.querySelector('.products-section');
    if (productsSection) {
        productsSection.classList.add('page-load-animation');
    }
});

// Enhanced refresh animation for products
function triggerProductsRefresh() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animation = 'none';
        void card.offsetWidth; // Force reflow
        card.style.animation = `pageLoadFade 0.8s ease-out ${index * 0.1}s both`;
    });
}


// Animated counter for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;
        
        const updateCount = () => {
            const count = +counter.innerText;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        
        updateCount();
    });
}

// Trigger counter animation when about section is visible
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            if (counters.length > 0 && counters[0].innerText === '0') {
                animateCounters();
            }
        }
    });
}, { threshold: 0.5 });

// Observe about section for counter animation
document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }
});

// Gallery lightbox functionality
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryBtn = document.querySelector('.gallery-btn');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.gallery-title').textContent;
            const description = this.querySelector('.gallery-description').textContent;
            
            createLightbox(img.src, title, description);
        });
    });
    
    if (galleryBtn) {
        galleryBtn.addEventListener('click', function() {
            // Open full gallery view or modal
            console.log('View full gallery clicked');
            // You can expand this to show a modal with all images
        });
    }
}

function createLightbox(imageSrc, title, description) {
    const lightbox = document.createElement('div');
    lightbox.className = 'gallery-lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay">
            <div class="lightbox-content">
                <button class="lightbox-close">&​times;</button>
                <img src="${imageSrc}" alt="${title}" class="lightbox-image">
                <div class="lightbox-info">
                    <h3 class="lightbox-title">${title}</h3>
                    <p class="lightbox-description">${description}</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Add lightbox styles
    const lightboxStyles = document.createElement('style');
    lightboxStyles.textContent = `
        .gallery-lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 3000;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        .lightbox-overlay {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content {
            position: relative;
            text-align: center;
        }
        
        .lightbox-image {
            max-width: 100%;
            max-height: 70vh;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        }
        
        .lightbox-info {
            margin-top: 1.5rem;
            color: white;
        }
        
        .lightbox-title {
            font-family: 'Oswald', sans-serif;
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        
        .lightbox-description {
            color: rgba(255, 255, 255, 0.8);
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            padding: 0.5rem;
            transition: transform 0.3s ease;
        }
        
        .lightbox-close:hover {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(lightboxStyles);
    
    // Close functionality
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const closeLightbox = () => {
        document.body.removeChild(lightbox);
        document.head.removeChild(lightboxStyles);
    };
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-overlay')) {
            closeLightbox();
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initGalleryLightbox();
});


// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message (you can replace this with actual form submission)
            showFormMessage('success', 'Thank you for your message! We\'ll get back to you within 24 hours.');
            
            // Reset form
            this.reset();
            
            // Log form data (remove this in production)
            console.log('Form submitted:', data);
        });
    }
    
    // Add floating label effect
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        // Show label on focus
        input.addEventListener('focus', function() {
            const label = this.nextElementSibling;
            if (label && label.classList.contains('form-label')) {
                label.style.opacity = '1';
            }
        });
        
        // Hide label on blur if empty
        input.addEventListener('blur', function() {
            const label = this.nextElementSibling;
            if (label && label.classList.contains('form-label') && !this.value) {
                label.style.opacity = '0';
            }
        });
        
        // Show label if has value
        if (input.value) {
            const label = input.nextElementSibling;
            if (label && label.classList.contains('form-label')) {
                label.style.opacity = '1';
            }
        }
    });
}

function showFormMessage(type, message) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    
    // Add styles
    const messageStyles = document.createElement('style');
    messageStyles.textContent = `
        .form-message {
            padding: 1rem 1.5rem;
            border-radius: 10px;
            margin-bottom: 1.5rem;
            font-weight: 500;
            animation: slideInUp 0.5s ease;
        }
        
        .form-message-success {
            background: rgba(76, 175, 80, 0.1);
            border: 1px solid rgba(76, 175, 80, 0.3);
            color: #4CAF50;
        }
        
        .form-message-error {
            background: rgba(244, 67, 54, 0.1);
            border: 1px solid rgba(244, 67, 54, 0.3);
            color: #f44336;
        }
    `;
    document.head.appendChild(messageStyles);
    
    // Insert message after form
    const contactForm = document.getElementById('contactForm');
    contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
            messageStyles.remove();
        }
    }, 5000);
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});


// Back to top and WhatsApp button functionality
function initFloatingButtons() {
    const backToTopBtn = document.getElementById('backToTop');
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    // Show/hide buttons based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Back to top button - show after scrolling down 300px
        if (scrollPosition > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        // WhatsApp button - show after scrolling down 100px
        if (scrollPosition > 100) {
            whatsappBtn.classList.add('visible');
        } else {
            whatsappBtn.classList.remove('visible');
        }
    });
    
    // Back to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect for WhatsApp button
    whatsappBtn.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
}

// Newsletter form functionality
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('.newsletter-input').value;
            
            // Show success message
            showNewsletterMessage('success', `Thank you for subscribing with ${email}!`);
            
            // Reset form
            this.reset();
            
            // Log subscription (remove this in production)
            console.log('Newsletter subscription:', email);
        });
    }
}

function showNewsletterMessage(type, message) {
    // Remove existing messages
    const existingMessage = document.querySelector('.newsletter-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `newsletter-message newsletter-message-${type}`;
    messageDiv.textContent = message;
    
    // Add styles
    const messageStyles = document.createElement('style');
    messageStyles.textContent = `
        .newsletter-message {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            font-weight: 500;
            z-index: 2000;
            animation: slideInRight 0.5s ease;
            max-width: 300px;
        }
        
        .newsletter-message-success {
            background: rgba(76, 175, 80, 0.9);
            color: white;
            box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
        }
        
        .newsletter-message-error {
            background: rgba(244, 67, 54, 0.9);
            color: white;
            box-shadow: 0 10px 30px rgba(244, 67, 54, 0.3);
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(messageStyles);
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
            messageStyles.remove();
        }
    }, 5000);
}

// Initialize floating buttons and newsletter when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initFloatingButtons();
    initNewsletterForm();
});


// Sale countdown functionality
function initSaleCountdown() {
    // Set the end date (7 days from now for demo)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate - now;
        
        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Sale product interactions
function initSaleProducts() {
    const quickViewBtns = document.querySelectorAll('.sale-quick-view');
    const addToCartBtns = document.querySelectorAll('.sale-add-to-cart');
    const shopBtn = document.querySelector('.sale-shop-btn');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.sale-product-card');
            const productName = productCard.querySelector('.sale-product-name').textContent;
            showSaleMessage('info', `Quick view: ${productName}`);
        });
    });
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.sale-product-card');
            const productName = productCard.querySelector('.sale-product-name').textContent;
            const price = productCard.querySelector('.sale-current-price').textContent;
            showSaleMessage('success', `${productName} added to cart for ${price}!`);
        });
    });
    
    if (shopBtn) {
        shopBtn.addEventListener('click', function() {
            showSaleMessage('info', 'Redirecting to all sale items...');
        });
    }
}

function showSaleMessage(type, message) {
    // Remove existing messages
    const existingMessage = document.querySelector('.sale-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `sale-message sale-message-${type}`;
    messageDiv.textContent = message;
    
    // Add styles
    const messageStyles = document.createElement('style');
    messageStyles.textContent = `
        .sale-message {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            font-weight: 500;
            z-index: 2000;
            animation: slideInRight 0.5s ease;
            max-width: 300px;
        }
        
        .sale-message-success {
            background: rgba(76, 175, 80, 0.9);
            color: white;
            box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
        }
        
        .sale-message-info {
            background: rgba(74, 144, 226, 0.9);
            color: white;
            box-shadow: 0 10px 30px rgba(74, 144, 226, 0.3);
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(messageStyles);
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
            messageStyles.remove();
        }
    }, 3000);
}

// Initialize sale section when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSaleCountdown();
    initSaleProducts();
});