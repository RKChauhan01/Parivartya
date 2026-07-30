// Parivartya Corporation - Main Script
// Handles dynamic includes, form submission, animations

// Load header/footer
async function loadIncludes() {
  try {
    const header = document.getElementById("header-placeholder");
    if (header) {
      header.innerHTML = await (await fetch("./header.html")).text();
    }
    const footer = document.getElementById("footer-placeholder");
    if (footer) {
      footer.innerHTML = await (await fetch("./footer.html")).text();
    }
    console.log("✅ Includes loaded");
  } catch (e) {
    console.error("Includes failed:", e);
  }
}

// Init app
async function init() {
  await loadIncludes();
  initializePage();
}

document.addEventListener("DOMContentLoaded", init);

// Main page init
function initializePage() {
  mobileNav();
  smoothScroll();
  scrollAnimations();
  contactForm();
  statsCounter();
}

function mobileNav() {
  const toggle = document.querySelector(".mobile-toggle");
  const nav = document.querySelector(".nav");
  const links = document.querySelectorAll(".nav-list a");

  toggle?.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  links.forEach((link) =>
    link.addEventListener("click", () => nav.classList.remove("active")),
  );
}

function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      target?.scrollIntoView({ behavior: "smooth" });
    });
  });
}

// Contact Form (EmailJS)
function contactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("from_name")?.trim();
    const email = formData.get("reply_to")?.trim();
    const subject = formData.get("subject")?.trim();
    const message = formData.get("message")?.trim();

    // Validation
    if (!name || !email || !message || !isValidEmail(email)) {
      showAlert("Please fill all fields with valid email", "error");
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = "Sending...";
    btn.disabled = true;

    try {
      await emailjs.sendForm(
        "service_sgnnc2c",
        "template_s46ioff",
        form,
        "IhmVq1EMEdFKsXedP",
      );

      showAlert("✅ Message sent! Reply soon.", "success");
      form.reset();
    } catch (error) {
      showAlert("Failed to send. Try again.", "error");
      console.error("EmailJS error:", error);
    }

    btn.textContent = original;
    btn.disabled = false;
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showAlert(message, type = "success") {
  const alert = document.createElement("div");
  alert.className = "alert";
  alert.textContent = message;
  alert.style.cssText = `
        position: fixed; top: 20px; right: 20px; padding: 15px 20px;
        border-radius: 8px; color: white; z-index: 9999; font-weight: 500;
        background: ${type === "error" ? "#ef4444" : "#10b981"};
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    `;
  document.body.appendChild(alert);

  setTimeout(() => alert.remove(), 4000);
}

// Scroll animations
function scrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  });

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s, transform 0.6s";
    observer.observe(el);
  });
}

// Stats counter
function statsCounter() {
  const stats = document.querySelectorAll(".stat-number");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const stat = entry.target;
        const target = parseInt(stat.dataset.target);
        let count = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            stat.textContent = target;
            clearInterval(timer);
          } else {
            stat.textContent = Math.floor(count);
          }
        }, 20);
        observer.unobserve(entry.target);
      }
    });
  });
  stats.forEach((stat) => observer.observe(stat));
}

function backToTop() {
  const btn = document.createElement("button");
  btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  btn.style.cssText = `position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px; background: #87CEEB; border: none; border-radius: 50%; cursor: pointer; opacity: 0; transition: all 0.3s; z-index: 999;`;
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) btn.style.opacity = "1";
    else btn.style.opacity = "0";
  });

  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
}

console.log("🎯 Parivartya script loaded!");
