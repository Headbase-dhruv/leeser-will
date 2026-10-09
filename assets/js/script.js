document.addEventListener("DOMContentLoaded", () => {
  const swiperElement = document.querySelector(".advantages-swiper");

  if (!swiperElement || typeof Swiper === "undefined") {
    return;
  }

  new Swiper(".advantages-swiper", {
    slidesPerView: 1,
    spaceBetween: 25,
    speed: 600,
    watchOverflow: true,

    // Auto slide every 2 seconds
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    // Responsive breakpoints
    breakpoints: {
      576: {
        slidesPerView: 2,
        spaceBetween: 32,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },

    // Custom pagination
    pagination: {
      el: ".advantages-pagination",
      clickable: true,
    },
  });
});