window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.style.opacity = 0;
    preloader.style.pointerEvents = "none";
    setTimeout(() => {
      preloader.style.display = "none";
      handleScrollCheck();

      const firstItem = document.querySelector(".faq-item");
      const firstItemContent = firstItem.querySelector(".faq-content");
      firstItemContent.style.maxHeight = firstItemContent.scrollHeight + "px";
      firstItem.classList.add("border-l-4", "border-l-red-600");
      
    }, 300); // waktu tunggu animasi fade out
  }, 500); // delay awal sebelum mulai fade
});

// Get element
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const whatsappBtn = document.getElementById("whatsappBtn");
const heroSection = document.getElementById("heroSection");

const sidebar = document.getElementById("mobileSidebar");
const overlay = document.getElementById("overlay");
const hamburgerBtn = document.getElementById("hamburgerBtn");

const counters = document.querySelectorAll(".counter");

// Scroll event
function handleScrollCheck() {
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  if (window.scrollY > heroBottom) {
    scrollToTopBtn.classList.remove("hidden");
    whatsappBtn.classList.add("bottom-24");
  } else {
    scrollToTopBtn.classList.add("hidden");
    whatsappBtn.classList.remove("bottom-24");
    whatsappBtn.classList.add("bottom-6");
  }
}

window.addEventListener("scroll", handleScrollCheck);
window.addEventListener("load", handleScrollCheck);

// Scroll to top behavior
scrollToTopBtn.querySelector("button").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });

      if (sidebar.contains(this)) {
        sidebar.classList.add("-translate-x-full");
        overlay.classList.add("hidden");
      }
    }
  });
});

// Mobile Toggle Button
hamburgerBtn.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
  overlay.classList.toggle("hidden");
});

overlay.addEventListener("click", () => {
  sidebar.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
});

const toggles = document.querySelectorAll(".faq-toggle");

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const faqItem = toggle.closest(".faq-item");
    const content = faqItem.querySelector(".faq-content");
    const icon = toggle.querySelector(".faq-icon");

    // Tutup semua yang lain
    document.querySelectorAll(".faq-item").forEach((item) => {
      const itemContent = item.querySelector(".faq-content");
      const itemIcon = item.querySelector(".faq-icon");

      if (item !== faqItem) {
        itemContent.style.maxHeight = "0px";
        itemIcon.textContent = "+";
        item.classList.remove("border-l-4", "border-l-red-600");
      }
    });

    // Toggle active
    if (content.style.maxHeight && content.style.maxHeight !== "0px") {
      content.style.maxHeight = "0px";
      icon.textContent = "+";
      faqItem.classList.remove("border-l-4", "border-l-red-600");
    } else {
      // agar transition halus, set maxHeight sesuai isi
      content.style.maxHeight = content.scrollHeight + "px";
      icon.textContent = "−";
      faqItem.classList.add("border-l-4", "border-l-red-600");
    }
  });
});

counters.forEach((counter) => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText;
    const increment = target / 100;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target.toLocaleString(); // Format angka
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCount();
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 1.0 }
  );

  observer.observe(counter);
});

const floatingElements = document.querySelectorAll(".floating");
floatingElements.forEach((el) => {
  el.style.animationDelay = `${Math.random() * 2}s`;
});
