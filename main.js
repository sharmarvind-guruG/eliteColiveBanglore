const siteConfig = {
  whatsappNumber: "919999999999",
  whatsappMessage:
    "Hi, I am interested in Elite Colive Bangalore. Please share current availability and rent details.",
};

const selectors = {
  nav: "[data-nav]",
  navToggle: "[data-nav-toggle]",
  whatsapp: "[data-whatsapp]",
  faqList: "[data-faq-list]",
  gallery: "[data-gallery]",
  lightbox: "[data-lightbox]",
  lightboxImage: "[data-lightbox-image]",
  lightboxClose: "[data-lightbox-close]",
  year: "[data-year]",
};

function buildWhatsAppUrl() {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;
}

function initWhatsAppLinks() {
  document.querySelectorAll(selectors.whatsapp).forEach((link) => {
    link.setAttribute("href", buildWhatsAppUrl());
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
}

function initMobileNav() {
  const nav = document.querySelector(selectors.nav);
  const toggle = document.querySelector(selectors.navToggle);

  if (!nav || !toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function initFaq() {
  const faqList = document.querySelector(selectors.faqList);
  if (!faqList) return;

  faqList.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
}

function initGallery() {
  const gallery = document.querySelector(selectors.gallery);
  const lightbox = document.querySelector(selectors.lightbox);
  const lightboxImage = document.querySelector(selectors.lightboxImage);
  const closeButton = document.querySelector(selectors.lightboxClose);

  if (!gallery || !lightbox || !lightboxImage || !closeButton) return;

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.setAttribute("src", "");
    lightboxImage.setAttribute("alt", "");
  }

  gallery.addEventListener("click", (event) => {
    const item = event.target.closest(".gallery-item");
    if (!item) return;

    const image = item.querySelector("img");
    const fullImage = item.getAttribute("data-full") || image?.getAttribute("src");

    if (!fullImage || !image) return;

    lightboxImage.setAttribute("src", fullImage);
    lightboxImage.setAttribute("alt", image.getAttribute("alt") || "Elite Colive gallery image");
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    closeButton.focus();
  });

  closeButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });
}

function initYear() {
  const year = document.querySelector(selectors.year);
  if (year) year.textContent = String(new Date().getFullYear());
}

initWhatsAppLinks();
initMobileNav();
initFaq();
initGallery();
initYear();
