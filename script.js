// Sticky Header
const header = document.querySelector('header');
const headerHeight = header.offsetHeight;

window.addEventListener('scroll', () => {
    if (window.scrollY > headerHeight) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if it's open
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        }
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Accessibility: Toggle aria-expanded attribute
    const isExpanded = mainNav.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded.toString());
});

// Close mobile menu function
function closeMobileMenu() {
    mainNav.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
}

// Close mobile menu when a link is clicked
mainNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && window.innerWidth <= 768) {
        closeMobileMenu();
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && !header.contains(e.target) && mainNav.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Counter Animation
const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS

    const updateCounter = () => {
        count += increment;
        counter.textContent = Math.floor(count);

        if (count < target) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };

    updateCounter();
};

const observeCounters = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
};

observeCounters();

// Story Carousel
const storyCarousel = document.querySelector('.story-carousel');
if (storyCarousel) {
    let startX, startY, dist, threshold = 150, allowedTime = 200, elapsedTime, startTime;

    storyCarousel.addEventListener('touchstart', function(e) {
        var touchobj = e.changedTouches[0];
        dist = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    }, false);

    storyCarousel.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, false);

    storyCarousel.addEventListener('touchend', function(e) {
        var touchobj = e.changedTouches[0];
        dist = touchobj.pageX - startX;
        elapsedTime = new Date().getTime() - startTime;

        var swiperightBol = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.pageY - startY) <= 100);
        var swipeleftBol = (elapsedTime <= allowedTime && dist < -threshold && Math.abs(touchobj.pageY - startY) <= 100);

        if (swiperightBol) {
            storyCarousel.scrollBy({left: -300, behavior: 'smooth'});
        } else if (swipeleftBol) {
            storyCarousel.scrollBy({left: 300, behavior: 'smooth'});
        }
    }, false);
}

// Language Switcher
const languageSelect = document.querySelector('.language-switcher select');
languageSelect.addEventListener('change', (e) => {
    // Implement language switching logic here
    console.log(`Language changed to: ${e.target.value}`);
});

// Donation Progress Bar Animation
const progressBar = document.querySelector('.progress-bar');
if (progressBar) {
    const animateProgressBar = () => {
        let width = 0;
        const targetWidth = parseInt(progressBar.style.width);
        const interval = setInterval(() => {
            if (width >= targetWidth) {
                clearInterval(interval);
            } else {
                width++;
                progressBar.style.width = width + '%';
                progressBar.textContent = width + '%';
            }
        }, 10);
    };

    const observeProgressBar = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBar();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(progressBar);
    };

    observeProgressBar();
}

// Newsletter Form Submission
const newsletterForm = document.querySelector('.footer-section.newsletter form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        // Implement newsletter subscription logic here
        console.log(`Subscribed with email: ${email}`);
        e.target.reset();
    });
}

// Accessibility: Skip to Main Content
const skipLink = document.createElement('a');
skipLink.href = '#main';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link visually-hidden';
document.body.insertBefore(skipLink, document.body.firstChild);

skipLink.addEventListener('focus', () => skipLink.classList.remove('visually-hidden'));
skipLink.addEventListener('blur', () => skipLink.classList.add('visually-hidden'));

// Collapsible Sections
const collapsibleSections = document.querySelectorAll('.collapsible');

collapsibleSections.forEach(section => {
    const heading = section.querySelector('h2');
    const content = section.querySelector('.collapsible-content');

    heading.addEventListener('click', () => {
        content.classList.toggle('active');
        heading.classList.toggle('active');
    });
});