// ================= HEADER & MOBILE MENU =================
const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

if (menuBtn && mainNav) {
  menuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("nav-open");
    const icon = menuBtn.querySelector("i");
    if (mainNav.classList.contains("nav-open")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("nav-open");
      const icon = menuBtn.querySelector("i");
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    });
  });
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (mainNav && mainNav.classList.contains("nav-open")) {
    if (!mainNav.contains(e.target) && !menuBtn.contains(e.target)) {
      mainNav.classList.remove("nav-open");
      const icon = menuBtn.querySelector("i");
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  }
});

// ================= SCROLL REVEAL =================
const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
);

revealEls.forEach((el) => observer.observe(el));

// ================= SCROLL SPY (Active Nav Link) =================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#mainNav a");

function updateActiveLink() {
  let current = "";
  const scrollPos = window.pageYOffset + 150;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active-link");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

// ================= PROJECT FILTERS =================
const filterButtons = document.querySelectorAll(".filter-pill");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      if (filter === "all" || category === filter) {
        card.style.display = "flex";
        card.style.animation = "fadeInUp 0.4s ease forwards";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ================= THEME TOGGLE =================
const themeToggleBtn = document.getElementById("themeToggle");
const themeIcon = themeToggleBtn?.querySelector("i");

// Check saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
  if (themeIcon) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");

    if (themeIcon) {
      if (isLight) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
      } else {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
      }
    }

    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}

// ================= SMOOTH SCROLL FOR ANCHOR LINKS =================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ================= TYPING EFFECT FOR HERO (Optional enhancement) =================
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = "";
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// ================= HEADER SCROLL EFFECT =================
const header = document.querySelector("header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.opacity =
      currentScroll > lastScroll && currentScroll > 300 ? "0" : "1";
    header.style.transform =
      currentScroll > lastScroll && currentScroll > 300
        ? "translateY(-100%)"
        : "translateY(0)";
  } else {
    header.style.opacity = "1";
    header.style.transform = "translateY(0)";
  }

  header.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  lastScroll = currentScroll;
});

// Add CSS animation for filter
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
