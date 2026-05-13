const page = document.querySelector(".page");
const hero = document.querySelector(".home-page");
const menuToggle = document.querySelector(".home-page__menu-toggle");
const menuLinks = document.querySelectorAll(".home-page__link");
const galleryImages = Array.from(document.querySelectorAll(".home-page__img, .img-item"));

const closeMenu = () => {
    if (!hero || !menuToggle) {
        return;
    }

    hero.classList.remove("home-page_menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
};

if (hero && menuToggle) {
    menuToggle.addEventListener("click", () => {
        const isOpen = hero.classList.toggle("home-page_menu-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 900) {
                closeMenu();
            }
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });
}

const openLightbox = (startIndex) => {
    if (!page || !galleryImages.length) {
        return;
    }

    let currentIndex = startIndex;
    const overlay = document.createElement("div");
    overlay.className = "show";

    const content = document.createElement("div");
    content.className = "show__content";

    const image = document.createElement("img");
    image.className = "show__image";

    const prevButton = document.createElement("button");
    prevButton.className = "show__nav show__nav_type_prev";
    prevButton.type = "button";
    prevButton.setAttribute("aria-label", "Previous photo");
    prevButton.textContent = "←";

    const nextButton = document.createElement("button");
    nextButton.className = "show__nav show__nav_type_next";
    nextButton.type = "button";
    nextButton.setAttribute("aria-label", "Next photo");
    nextButton.textContent = "→";

    const closeButton = document.createElement("button");
    closeButton.className = "show__close";
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Close gallery");
    closeButton.textContent = "×";

    const counter = document.createElement("div");
    counter.className = "show__counter";

    const updateImage = () => {
        const currentImage = galleryImages[currentIndex];

        image.src = currentImage.src;
        image.alt = currentImage.alt || "Preview";
        counter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
    };

    const showNext = () => {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateImage();
    };

    const showPrev = () => {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateImage();
    };

    const closeLightbox = () => {
        overlay.remove();
        window.removeEventListener("keydown", handleKeydown);
    };

    let pointerStartX = null;
    let pointerStartY = null;
    let swipeOffset = 0;

    const resetSwipePreview = () => {
        swipeOffset = 0;
        image.style.transform = "";
        image.style.transition = "";
    };

    const handleKeydown = (event) => {
        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            showNext();
        }

        if (event.key === "ArrowLeft") {
            showPrev();
        }
    };

    prevButton.addEventListener("click", (event) => {
        event.stopPropagation();
        showPrev();
    });

    nextButton.addEventListener("click", (event) => {
        event.stopPropagation();
        showNext();
    });

    closeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        closeLightbox();
    });

    content.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    image.addEventListener("pointerdown", (event) => {
        pointerStartX = event.clientX;
        pointerStartY = event.clientY;
        image.style.transition = "none";
    });

    image.addEventListener("pointermove", (event) => {
        if (pointerStartX === null || pointerStartY === null) {
            return;
        }

        const deltaX = event.clientX - pointerStartX;
        const deltaY = event.clientY - pointerStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            swipeOffset = deltaX;
            image.style.transform = `translateX(${Math.max(Math.min(deltaX, 80), -80)}px)`;
        }
    });

    image.addEventListener("pointerup", () => {
        if (pointerStartX === null) {
            return;
        }

        image.style.transition = "transform 0.25s ease";

        if (swipeOffset <= -60) {
            showNext();
        } else if (swipeOffset >= 60) {
            showPrev();
        }

        pointerStartX = null;
        pointerStartY = null;
        resetSwipePreview();
    });

    image.addEventListener("pointerleave", () => {
        if (pointerStartX === null) {
            return;
        }

        pointerStartX = null;
        pointerStartY = null;
        image.style.transition = "transform 0.25s ease";
        resetSwipePreview();
    });

    image.addEventListener("pointercancel", () => {
        pointerStartX = null;
        pointerStartY = null;
        image.style.transition = "transform 0.25s ease";
        resetSwipePreview();
    });

    overlay.addEventListener("click", closeLightbox);
    window.addEventListener("keydown", handleKeydown);

    content.append(prevButton, image, nextButton, closeButton, counter);
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    updateImage();
};

galleryImages.forEach((galleryImage, index) => {
    galleryImage.addEventListener("click", () => {
        openLightbox(index);
    });
});
