document.addEventListener('DOMContentLoaded', function() {
    // Fade-in animation for mission statements
    const missionStatements = document.querySelectorAll('.mission p');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.5 });

    missionStatements.forEach(statement => {
        observer.observe(statement);
    });

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let count = 0;
                const updateCounter = () => {
                    const increment = target / 200;
                    if (count < target) {
                        count += increment;
                        entry.target.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCounter();
            }
        });
    }, { threshold: 1 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showNextTestimonial() {
        testimonials[currentTestimonial].classList.remove('active');
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
    }

    setInterval(showNextTestimonial, 5000);
    // Refugee Demographics Chart
    const refugeeChartCtx = document.getElementById('refugeeChart').getContext('2d');
    new Chart(refugeeChartCtx, {
        type: 'bar',
        data: {
            labels: ['1990', '2000', '2010', '2020'],
            datasets: [{
                label: 'Number of Refugees',
                data: [20000, 50000, 80000, 123000],
                backgroundColor: 'rgba(0, 114, 188, 0.6)',
                borderColor: 'rgba(0, 114, 188, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });

    // Add this new code for scroll animations
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        animateOnScroll.observe(element);
    });

    // Update the Refugee Demographics Chart
    const ctx = document.getElementById('refugeeChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['1990', '2000', '2010', '2020'],
            datasets: [{
                label: 'Number of Refugees',
                data: [20000, 50000, 80000, 123000],
                backgroundColor: 'rgba(0, 114, 188, 0.6)',
                borderColor: 'rgba(0, 114, 188, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });

    // Add menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Accessibility: Toggle aria-expanded attribute
        const isExpanded = mainNav.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded.toString());
    });

    // Close mobile menu when a link is clicked
    mainNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && window.innerWidth <= 768) {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Add scroll event for header background
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});