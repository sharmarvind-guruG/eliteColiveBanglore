const siteConfig = {
  whatsappNumber: "919980344197",
  whatsappMessage:
    "Hi, I am interested in Elite Legacy Colive Bangalore. Please share current availability and rent details.",
  galleryImages: [
    {
      title: "Furnished room",
      alt: "Furnished coliving room with desk and bed",
      thumbnail: "./assets/images/gallary/room.jpg",
      full: "./assets/images/gallary/room.jpg",
    },
    {
      title: "Single room",
      alt: "Private room with bed and storage",
      thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=700&q=80",
      full: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=84",
    },
    {
      title: "Sharing room",
      alt: "Shared coliving room with two beds",
      thumbnail: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80",
      full: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1400&q=84",
    },
    {
      title: "Common area",
      alt: "Common lounge with sofa seating",
      thumbnail: "./assets/images/gallary/commonArea.jpg",
      full: "./assets/images/gallary/commonArea.jpg",
    },
    {
      title: "Dinning Area",
      alt: "Dinning Area with counter space and appliances",
      thumbnail: "./assets/images/gallary/dinning.jpg",
      full: "./assets/images/gallary/dinning.jpg",
    },
    {
      title: "Gym and Play Area",
      alt: "Gym and Play Area",
      thumbnail: "./assets/images/gallary/gym.jpg",
      full: "./assets/images/gallary/gym.jpg",
    },
    {
      title: "Reception",
      alt: "Reception Area",
      thumbnail: "./assets/images/gallary/reception.jpg",
      full: "./assets/images/gallary/reception.jpg",
    },
    {
      title: "Room Gallary",
      alt: "Room Gallary",
      thumbnail: "./assets/images/gallary/gallary.jpg",
      full: "./assets/images/gallary/gallary.jpg",
    },
    {
      title: "Front",
      alt: "Front",
      thumbnail: "./assets/images/gallary/front.jpg",
      full: "./assets/images/gallary/front.jpg",
    },
  ],
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

function createGalleryItem(image, index) {
  const button = document.createElement("button");
  button.className = "gallery-item";
  button.type = "button";
  button.setAttribute("data-full", image.full || image.thumbnail);
  button.setAttribute("data-gallery-index", String(index));

  const thumbnail = document.createElement("img");
  thumbnail.src = image.thumbnail;
  thumbnail.alt = image.alt || image.title || "Elite Legacy Colive gallery image";
  thumbnail.loading = "lazy";

  const label = document.createElement("span");
  label.textContent = image.title || "Gallery image";

  button.append(thumbnail, label);
  return button;
}

function createGalleryMoreItem(count) {
  const button = document.createElement("button");
  button.className = "gallery-item gallery-more";
  button.type = "button";
  button.setAttribute("data-gallery-more", "true");
  button.setAttribute("data-gallery-index", "0");

  const label = document.createElement("span");
  label.textContent = count > 6 ? `More photos +${count - 6}` : "More photos";

  button.append(label);
  return button;
}

function renderGalleries() {
  document.querySelectorAll(selectors.gallery).forEach((gallery) => {
    const mode = gallery.getAttribute("data-gallery");
    const visibleCount = mode === "home" ? 3 : 6;
    const images = siteConfig.galleryImages.slice(0, visibleCount);
    const items = images.map((image, index) => createGalleryItem(image, index));

    if (mode === "full" && siteConfig.galleryImages.length) {
      items.push(createGalleryMoreItem(siteConfig.galleryImages.length));
    }

    gallery.replaceChildren(...items);
  });
}

function initGallery() {
  const gallery = document.querySelector(selectors.gallery);
  const lightbox = document.querySelector(selectors.lightbox);
  const lightboxImage = document.querySelector(selectors.lightboxImage);
  const closeButton = document.querySelector(selectors.lightboxClose);

  if (!gallery || !lightbox || !lightboxImage || !closeButton) return;

  let currentIndex = -1;

  const previousButton = document.createElement("button");
  previousButton.className = "lightbox-nav lightbox-prev";
  previousButton.type = "button";
  previousButton.setAttribute("aria-label", "Previous image");
  previousButton.textContent = "Prev";

  const nextButton = document.createElement("button");
  nextButton.className = "lightbox-nav lightbox-next";
  nextButton.type = "button";
  nextButton.setAttribute("aria-label", "Next image");
  nextButton.textContent = "Next";

  lightbox.append(previousButton, nextButton);

  function showImage(index) {
    const image = siteConfig.galleryImages[index];
    const fullImage = image?.full || image?.thumbnail;

    if (!fullImage || !image) return;

    currentIndex = index;
    lightboxImage.setAttribute("src", fullImage);
    lightboxImage.setAttribute("alt", image.alt || image.title || "Elite Legacy Colive gallery image");
  }

  function showPreviousImage() {
    if (!siteConfig.galleryImages.length) return;
    showImage((currentIndex - 1 + siteConfig.galleryImages.length) % siteConfig.galleryImages.length);
  }

  function showNextImage() {
    if (!siteConfig.galleryImages.length) return;
    showImage((currentIndex + 1) % siteConfig.galleryImages.length);
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.setAttribute("src", "");
    lightboxImage.setAttribute("alt", "");
    currentIndex = -1;
  }

  gallery.addEventListener("click", (event) => {
    const item = event.target.closest(".gallery-item");
    if (!item) return;

    showImage(Number(item.getAttribute("data-gallery-index") || 0));
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    closeButton.focus();
  });

  closeButton.addEventListener("click", closeLightbox);
  previousButton.addEventListener("click", showPreviousImage);
  nextButton.addEventListener("click", showNextImage);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showPreviousImage();
    if (event.key === "ArrowRight") showNextImage();
  });
}

function initYear() {
  const year = document.querySelector(selectors.year);
  if (year) year.textContent = String(new Date().getFullYear());
}

initWhatsAppLinks();
initMobileNav();
initFaq();
renderGalleries();
initGallery();
initYear();
