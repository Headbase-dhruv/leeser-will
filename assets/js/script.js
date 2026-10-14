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

// philosophieSwiper JS
document.addEventListener("DOMContentLoaded", () => {
  const swiperElement = document.querySelector(".philosophieSwiper");

  if (!swiperElement || typeof Swiper === "undefined") return;

  let philosophieSwiper = null;

  function initPhilosophieSwiper() {
    if (window.innerWidth < 640) {
      if (!philosophieSwiper) {
        philosophieSwiper = new Swiper(".philosophieSwiper", {
          slidesPerView: 1.1,
          spaceBetween: 16,
          slidesOffsetBefore: 16,

          // Auto slide every 2 seconds
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
          
          speed: 500,
          grabCursor: true,
          watchOverflow: true,
          pagination: {
            el: ".philosophie-pagination",
            clickable: true,
          },
        });
      }
    } else if (philosophieSwiper) {
      philosophieSwiper.destroy(true, true);
      philosophieSwiper = null;
    }
  }

  initPhilosophieSwiper();

  window.addEventListener("resize", initPhilosophieSwiper);
});
