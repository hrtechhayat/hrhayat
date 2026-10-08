/**
 * ============================================================================
 * HABIBUR ROHMAN HAYAT — PORTFOLIO JAVASCRIPT
 * Pure Vanilla JavaScript (No Frameworks, No Libraries, No Backend)
 * Modules: Theme Toggle, Mobile Menu, Scroll Spy, Scroll Top, Footer Year
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* --------------------------------------------------------------------------
     1. THEME SWITCHER (Dark Mode Default + LocalStorage Persistence)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById("theme-toggle");
  const THEME_STORAGE_KEY = "hrhayat_theme_pref";

  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute("aria-label", "Switch to dark mode");
        themeToggleBtn.setAttribute("title", "Switch to dark mode");
      }
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute("aria-label", "Switch to light mode");
        themeToggleBtn.setAttribute("title", "Switch to light mode");
      }
    }
  }

  // Retrieve saved preference or default to dark mode
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light") {
    applyTheme("light");
  } else {
    applyTheme("dark");
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isCurrentLight = document.documentElement.getAttribute("data-theme") === "light";
      const newTheme = isCurrentLight ? "dark" : "light";
      applyTheme(newTheme);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      } catch (e) {
        // Handle private browsing storage limitations gracefully
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. MOBILE NAVIGATION MENU
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById("mobile-nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  function openMenu() {
    if (!mobileToggle || !navMenu) return;
    mobileToggle.setAttribute("aria-expanded", "true");
    navMenu.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (!mobileToggle || !navMenu) return;
    mobileToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isExpanded = mobileToggle.getAttribute("aria-expanded") === "true";
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close when any nav link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    // Close when clicking outside of the menu
    document.addEventListener("click", (e) => {
      if (navMenu.classList.contains("open") && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        closeMenu();
        mobileToggle.focus();
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. ACTIVE NAVIGATION INDICATOR (SCROLL SPY)
     -------------------------------------------------------------------------- */
  const sectionIds = ["hero", "about", "education", "competencies", "contact"];

  function updateActiveNav() {
    const scrollPos = window.scrollY + 140;
    let currentId = "hero";

    for (let i = 0; i < sectionIds.length; i++) {
      const el = document.getElementById(sectionIds[i]);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (scrollPos >= top) {
          currentId = sectionIds[i];
        }
      }
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === `#${currentId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  window.addEventListener("resize", updateActiveNav, { passive: true });
  updateActiveNav();

  /* --------------------------------------------------------------------------
     4. SCROLL TO TOP BUTTON
     -------------------------------------------------------------------------- */
  const scrollTopBtn = document.getElementById("scroll-top");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    }, { passive: true });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* --------------------------------------------------------------------------
     5. AUTOMATIC CURRENT YEAR IN FOOTER
     -------------------------------------------------------------------------- */
  const currentYearSpan = document.getElementById("current-year");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear().toString();
  }

  /* --------------------------------------------------------------------------
     6. CORE COMPETENCIES CATEGORY FILTERING
     -------------------------------------------------------------------------- */
  const filterTabs = document.querySelectorAll(".filter-tab");
  const competencyCards = document.querySelectorAll(".competency-card");

  if (filterTabs.length > 0 && competencyCards.length > 0) {
    filterTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const filter = tab.getAttribute("data-filter") || "all";

        filterTabs.forEach((t) => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");

        competencyCards.forEach((card) => {
          const categories = card.getAttribute("data-categories") || "";
          const categoryList = categories.split(" ");
          const isMatch = filter === "all" || categoryList.includes(filter);

          if (isMatch) {
            card.classList.remove("hidden");
            card.style.opacity = "0";
            card.style.transform = "translateY(8px)";
            requestAnimationFrame(() => {
              card.style.transition = "opacity 0.25s ease, transform 0.25s ease";
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            });
          } else {
            card.classList.add("hidden");
          }
        });
      });
    });
  }
});
