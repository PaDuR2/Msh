$(document).ready(function() {
    const $slider = $('.slider');
    const $slides = $('.slide');
    const $dotsContainer = $('.slider-dots');
    const slideCount = $slides.length;
    let currentIndex = 0;
    let slideWidth = $('.slider-container').width();
    let autoSlideInterval;
    
    // Create dots for navigation
    $slides.each(function(index) {
        $dotsContainer.append('<div class="dot" data-index="' + index + '"></div>');
    });
    
    const $dots = $('.dot');
    
    // Set initial state
    updateSlider();
    
    // Handle window resize
    $(window).resize(function() {
        slideWidth = $('.slider-container').width();
        updateSlider();
    }).trigger('resize');
    
    // Next button click handler
    $('.next').click(function() {
        goToSlide((currentIndex + 1) % slideCount);
    });
    
    // Previous button click handler
    $('.prev').click(function() {
        goToSlide((currentIndex - 1 + slideCount) % slideCount);
    });
    
    // Dot click handler
    $dots.on('click', function() {
        const index = $(this).data('index');
        goToSlide(index);
    });
    
    // Handle touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    $slider.on('touchstart', function(e) {
        touchStartX = e.originalEvent.touches[0].clientX;
        clearInterval(autoSlideInterval); // Pause auto-slide during interaction
    });
    
    $slider.on('touchend', function(e) {
        touchEndX = e.originalEvent.changedTouches[0].clientX;
        handleSwipe();
        startAutoSlide(); // Resume auto-slide
    });
    
    function handleSwipe() {
        const threshold = 50; // Minimum swipe distance
        if (touchStartX - touchEndX > threshold) {
            // Swipe left - next slide
            goToSlide((currentIndex + 1) % slideCount);
        } else if (touchEndX - touchStartX > threshold) {
            // Swipe right - previous slide
            goToSlide((currentIndex - 1 + slideCount) % slideCount);
        }
    }
    
    // Update slider position and active dot
    function updateSlider() {
        const offset = -currentIndex * slideWidth;
        $slider.css('transform', `translateX(${offset}px)`);
        $dots.removeClass('active').eq(currentIndex).addClass('active');
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    // Auto-slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(function() {
            goToSlide((currentIndex + 1) % slideCount);
        }, 5000);
    }
    
    // Start auto-slide
    startAutoSlide();
    
    // Pause auto-slide when hovering over slider (for desktop)
    $('.slider-container').hover(
        function() {
            clearInterval(autoSlideInterval);
        },
        function() {
            startAutoSlide();
        }
    );
});