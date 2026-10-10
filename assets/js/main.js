(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-nav");

  if (menuButton && navigation) {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    };

    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuButton.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (!navigation.contains(event.target) && !menuButton.contains(event.target)) {
        closeMenu();
      }
    });
  }

  const year = document.querySelector("#copyright-year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Only turn placeholders into links when a real HTTPS URL is configured.
  const config = window.NT4X_CONFIG || {};
  const socialContainer = document.querySelector("#social-links");
  const socialNames = {
    instagram: "Instagram",
    youtube: "YouTube",
    discord: "Discord",
    facebook: "Facebook"
  };

  if (socialContainer && config.socials) {
    Object.entries(socialNames).forEach(([key, label]) => {
      const url = config.socials[key];
      const placeholder = Array.from(socialContainer.querySelectorAll(".social-placeholder"))
        .find((item) => item.firstChild && item.firstChild.textContent.trim() === label);

      if (!placeholder || typeof url !== "string" || !url.trim()) return;

      try {
        const parsed = new URL(url);
        if (parsed.protocol !== "https:") return;
        const link = document.createElement("a");
        link.className = "social-placeholder";
        link.href = parsed.href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.append(document.createTextNode(label));
        const note = document.createElement("small");
        note.textContent = "OPEN OFFICIAL ACCOUNT ↗";
        link.append(note);
        placeholder.replaceWith(link);
      } catch (_) {
        // Invalid configuration stays a non-clickable placeholder.
      }
    });
  }
})();

