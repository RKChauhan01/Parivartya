/* =========================================
   HERO SLIDER DOTS
========================================= */
const slides = document.querySelectorAll(".hero-slide");


let currentSlide = 0;
/* =========================================P
   SHOW SLIDE
========================================= */

function showSlide(index) {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    currentSlide = index;
}

/* =========================================
   AUTO SLIDE
========================================= */

function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}

setInterval(nextSlide, 3000);
