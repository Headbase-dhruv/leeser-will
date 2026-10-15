
document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis({
    autoRaf: true,
    duration: 2,
    smoothWheel: true,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.2,
    lerp: 0.08,
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);

      if (target) {
        event.preventDefault();
        lenis.scrollTo(target, {
          duration: 2,
        });
      }
    });
  });
});
