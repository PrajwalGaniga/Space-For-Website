// Simple navbar scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 50);
});

// You can add more animations with AOS.js or GSAP here later
