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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  if (!form) return;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const consent = document.getElementById("consent");
  const status = document.getElementById("form-status");

  const fields = [
    {
      input: name,
      error: document.getElementById("name-error"),
      validate: () => name.value.trim().length >= 2,
    },
    {
      input: email,
      error: document.getElementById("email-error"),
      validate: () =>
        email.value.trim() === "" ||
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()),
    },
    {
      input: message,
      error: document.getElementById("message-error"),
      validate: () => message.value.trim().length > 0,
    },
    {
      input: consent,
      error: document.getElementById("consent-error"),
      validate: () => consent.checked,
    },
  ];

  function validateField(field) {
    const valid = field.validate();

    field.error.classList.toggle("hidden", valid);

    field.input.classList.toggle("border-red-500", !valid);
    field.input.classList.toggle("border-[#cbd8e8]", valid);

    field.input.setAttribute("aria-invalid", String(!valid));

    return valid;
  }

  fields.forEach((field) => {
    const eventName = field.input.type === "checkbox" ? "change" : "input";

    field.input.addEventListener(eventName, () => {
      validateField(field);
      status.textContent = "";
    });

    field.input.addEventListener("blur", () => {
      validateField(field);
    });
  });

  form.addEventListener("submit", (event) => {
    let isValid = true;

    fields.forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      event.preventDefault();

      const firstInvalid = fields.find((field) => !field.validate());

      firstInvalid?.input.focus();

      status.textContent = "Bitte überprüfen Sie Ihre Eingaben.";
      status.className = "mt-12 text-sm text-red-500";

      return;
    }

    status.textContent = "Formular wird gesendet ...";
    status.className = "mt-12 text-sm text-gray-600";
  });
});
