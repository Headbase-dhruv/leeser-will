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

document.addEventListener("DOMContentLoaded", function () {
  const totalSlides = document.querySelectorAll(
    ".reviewSwiper .swiper-slide",
  ).length;

  new Swiper(".reviewSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 600,
    loop: totalSlides > 3,
    watchOverflow: true,
    grabCursor: true,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    pagination: {
      el: ".review-pagination",
      clickable: true,
    },

    breakpoints: {
      576: { slidesPerView: 1, spaceBetween: 24 },
      768: { slidesPerView: 2, spaceBetween: 24 },
      1200: { slidesPerView: 3, spaceBetween: 40 },
    },
  });
});

// ---- DATA: replace `href` and names with your real PDF files ----
const rodentizide = [
  "Alpharatan Frassgel",
  "Alpharatan Rodentkiller",
  "Bonirat Blöcke Bpd",
  "Detex Blox With Biomarker",
  "Dismate PE",
  "Expert Monitoring Block",
  "finicon Fruchtfliegenfalle",
  "Mausex Duo",
  "Murablock",
  "Muskil Block",
  "Muskil Paste",
  "Nagtag Dife Bloc",
  "Nara Bloc",
  "Nara Lebensmittelköder",
  "Nara Lure",
  "Notrac Blox",
  "Ratimor Brodi Paste",
  "Ratimor Broma Paste",
  "Rodoblock DC",
  "SOLO BLOX 20g",
  "Sorexa Paste",
  "Vertox Brodiacoum",
];
const placeholder = (n, label) =>
  Array.from({ length: n }, (_, i) => `${label} ${i + 1}`);

const categories = [
  {
    id: "broschueren",
    title: "Informationsbroschüren",
    files: placeholder(10, "Broschüre"),
  },
  { id: "allgemein", title: "Allgemein", files: placeholder(13, "Dokument") },
  { id: "uv", title: "UV-Roehren", files: placeholder(9, "UV-Röhre") },
  { id: "rodentizide", title: "Rodentizide", files: rodentizide },
  { id: "klebe", title: "Klebeflächen", files: placeholder(4, "Klebefläche") },
  {
    id: "insektizide",
    title: "Insektizide",
    files: placeholder(15, "Insektizid"),
  },
];

const $ = (s) => document.querySelector(s);
const pad = (n) => String(n).padStart(2, "0");
// ---- PDF file icon (same artwork as your SVG, cropped to the first icon) ----
const icon = (cls = "") => `
  <svg class="${cls}" viewBox="123.65 0 57.253 76.553" fill="none" aria-hidden="true">
    <path d="M133.616 0L159.211 0L180.903 22.6101V66.587C180.903 72.0961 176.446 76.553 170.956 76.553H133.616C128.107 76.553 123.65 72.0961 123.65 66.587V9.96602C123.65 4.45697 128.107 0 133.616 0Z" fill="#FF6000"/>
    <path d="M159.191 0V22.438H180.902L159.191 0Z" fill="#E25400"/>
    <path d="M134.727 57.1183V43.1353H140.676C142.149 43.1353 143.315 43.5369 144.195 44.3595C145.075 45.1629 145.515 46.2533 145.515 47.6114C145.515 48.9695 145.075 50.0599 144.195 50.8633C143.315 51.6858 142.149 52.0875 140.676 52.0875H138.304V57.1183H134.727ZM138.304 49.0461H140.274C140.809 49.0461 141.23 48.9313 141.517 48.6635C141.804 48.4149 141.957 48.0705 141.957 47.6115C141.957 47.1524 141.804 46.8081 141.517 46.5594C141.23 46.2916 140.81 46.1769 140.274 46.1769H138.304V49.0461ZM146.988 57.1183V43.1353H151.942C152.918 43.1353 153.836 43.2691 154.697 43.5561C155.558 43.8431 156.342 44.2448 157.031 44.7995C157.719 45.3351 158.274 46.0619 158.676 46.9802C159.058 47.8984 159.269 48.9504 159.269 50.1364C159.269 51.3033 159.058 52.3553 158.676 53.2734C158.274 54.1916 157.719 54.9185 157.031 55.4541C156.342 56.0088 155.558 56.4105 154.697 56.6975C153.836 56.9844 152.918 57.1183 151.942 57.1183H146.988ZM150.489 54.0769H151.522C152.076 54.0769 152.593 54.0196 153.071 53.8856C153.53 53.7517 153.97 53.5413 154.391 53.2544C154.793 52.9675 155.118 52.5657 155.347 52.0301C155.577 51.4946 155.692 50.8633 155.692 50.1364C155.692 49.3903 155.577 48.7591 155.347 48.2235C155.118 47.688 154.793 47.2863 154.391 46.9993C153.97 46.7124 153.53 46.5019 153.071 46.3681C152.593 46.2342 152.076 46.1768 151.522 46.1768H150.489V54.0769ZM161.067 57.1183V43.1353H171.014V46.1768H164.644V48.4148H169.732V51.4371H164.644V57.1183H161.067Z" fill="#fff"/>
  </svg>`;


// ---- Folder cards ----
$("#folders").innerHTML = categories
  .map(
    (c) => `
      <button type="button" data-id="${c.id}"
        class="group relative block aspect-[263/191] w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy">

        <!-- back panel -->
        <span class="absolute inset-0  bg-primary rounded-[18px] sm:rounded-[28px] xl:not-3xl:rounded-[20px]"></span>

        <!-- document icons -->
        <span class="absolute left-[47%] top-[-4%] w-[21.8%] transition-transform duration-300 group-hover:-translate-y-3">${icon("block w-full h-auto")}</span>
        <span class="absolute left-[66.3%] top-0 w-[21.8%] rotate-[17deg] transition-transform duration-300 group-hover:-translate-y-3">${icon("block w-full h-auto")}</span>


        <!-- front folder (tab + body as one shape) -->
        <svg class="absolute inset-x-0 top-[19%] bottom-0 h-[81%] w-full"
             viewBox="0 0 263 155" preserveAspectRatio="none" aria-hidden="true">
          <path fill="#E4EBFF"
            d="M0 28C0 12.536 12.536 0 28 0H116.007C125.387 0 133.845 5.64535 137.443 14.3077C141.042 22.97 149.5 28.6154 158.88 28.6154H241.936C253.569 28.6154 263 38.0461 263 49.6795V127C263 142.464 250.464 155 235 155H28C12.536 155 0 142.464 0 127V28Z"/>
        </svg>

        <!-- label -->
        <span class="absolute inset-x-[6%] bottom-[8%] block sm:inset-x-[6%] lg:inset-x-[7%]">
          <span class="block text-[11px] sm:text-body/80 sm:text-xs">${pad(c.files.length)} Dateien</span>
          <span class="mt-0.5 block hyphens-auto break-words text-[13px] font-medium leading-tight sm:text-base lg:text-sm xl:text-base 2xl:text-lg text-heading">${c.title}</span>
        </span>
      </button>`,
  )
  .join("");

// ---- Popup ----
const modal = $("#modal"),
  list = $("#files");
let lastTrigger = null;

function openModal(id, trigger) {
  const c = categories.find((x) => x.id === id);
  lastTrigger = trigger;
  $("#modal-title").textContent = c.title;
  list.innerHTML = c.files
    .map(
      (name) => `
        <li>
          <a href="#" download title="${name}"
             class="flex items-center gap-8 rounded-xl px-1 py-2 transition hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-navy
                    md:flex-col md:gap-8 md:px-9 md:py-8 md:text-center">
            ${icon("size-24 shrink-0 md:h-[100px] md:w-[75px]")}
            <span class="min-w-0 flex-1 truncate text-base font-medium md:line-clamp-2 md:w-full md:flex-none md:whitespace-normal md:break-words md:text-[18px] md:leading-snug md:font-normal text-heading">${name}</span>
            <span class="text-xs text-body/80 md:text-[11px]">100kb</span>
          </a>
        </li>`,
    )
    .join("");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
  $("#close").focus();
}

function closeModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
  lastTrigger?.focus();
}

$("#folders").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-id]");
  if (btn) openModal(btn.dataset.id, btn);
});
$("#close").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (modal.classList.contains("hidden")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "Tab") {
    // simple focus trap
    const f = [...modal.querySelectorAll("a, button")];
    const first = f[0],
      last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
