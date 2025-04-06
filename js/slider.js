document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideWidth = slider.clientWidth;
    let isAnimating = false;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.addEventListener('click', () => {
            if (!isAnimating && index !== currentSlide) {
                goToSlide(index);
            }
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dots button');
    dots[0].classList.add('active');

    // Set initial position
    updateSliderPosition();

    // Next slide
    nextBtn.addEventListener('click', () => {
        if (!isAnimating) {
            currentSlide = (currentSlide + 1) % slideCount;
            animateSlideTransition('next');
        }
    });

    // Previous slide
    prevBtn.addEventListener('click', () => {
        if (!isAnimating) {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            animateSlideTransition('prev');
        }
    });

    // Auto-advance (optional)
    let slideInterval = setInterval(() => {
        if (!isAnimating) {
            currentSlide = (currentSlide + 1) % slideCount;
            animateSlideTransition('next');
        }
    }, 6000);

    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            if (!isAnimating) {
                currentSlide = (currentSlide + 1) % slideCount;
                animateSlideTransition('next');
            }
        }, 6000);
    });

    function animateSlideTransition(direction) {
        isAnimating = true;
        
        // Add animation classes based on direction
        const currentActive = slides[currentSlide];
        if (direction === 'next') {
            currentActive.classList.add('slide-enter');
        } else {
            currentActive.classList.add('slide-enter');
        }
        
        // Update slider position
        updateSliderPosition();
        updateDots();
        
        // Remove animation classes after animation completes
        setTimeout(() => {
            currentActive.classList.remove('slide-enter');
            isAnimating = false;
        }, 700);
    }

    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        const direction = index > currentSlide ? 'next' : 'prev';
        currentSlide = index;
        animateSlideTransition(direction);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        slideWidth = slider.clientWidth;
        updateSliderPosition();
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!isAnimating) {
            if (e.key === 'ArrowRight') {
                currentSlide = (currentSlide + 1) % slideCount;
                animateSlideTransition('next');
            } else if (e.key === 'ArrowLeft') {
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                animateSlideTransition('prev');
            }
        }
    });
});