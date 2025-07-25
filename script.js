lucide.createIcons();

class ProductTabs {
  constructor() {
    this.init();
  }

  init() {
    this.setupTabListeners();
    this.showActiveTab("sale"); // Show sale tab by default
  }

  setupTabListeners() {
    const tabButtons = document.querySelectorAll(".tab-button");

    tabButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const tabName = e.target.getAttribute("data-tab");
        this.switchTab(tabName);
      });
    });
  }

  switchTab(tabName) {
    document.querySelectorAll(".tab-button").forEach((btn) => {
      btn.classList.remove("active");
    });

    document.querySelectorAll(".product-grid").forEach((grid) => {
      grid.classList.remove("active");
    });

    document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");
    document.getElementById(tabName).classList.add("active");
  }

  showActiveTab(tabName) {
    document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");
    document.getElementById(tabName).classList.add("active");
  }
}

class FeedbackSlider {
  constructor() {
    this.currentIndex = 0;
    this.feedbackCards = document.querySelectorAll(".feedback-card");
    this.feedbackSection = document.querySelector(".feedback");
    this.totalCards = this.feedbackCards.length;

    this.init();
  }

  init() {
    this.createChevrons();
    this.setupEventListeners();
    this.updateSlider();
  }

  createChevrons() {
    const leftChevron = document.querySelector(
      ".toggle-background:first-child"
    );
    const rightChevron = document.querySelector(
      ".toggle-background:last-child"
    );

    leftChevron.classList.add("left-chevron");
    rightChevron.classList.add("right-chevron");

    this.setToggleButtonState(leftChevron, false);
    this.setToggleButtonState(rightChevron, false);
  }

  setToggleButtonState(button, isActive) {
    const icon = button.querySelector("i");

    if (isActive) {
      button.style.backgroundColor = "#C2EFD4";
      button.style.boxShadow = "none";
    } else {
      button.style.backgroundColor = "#ffffff";
      button.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
    }

    if (icon) {
      icon.style.color = "#224F34";
    }
  }

  setupEventListeners() {
    const leftChevron = document.querySelector(".left-chevron");
    const rightChevron = document.querySelector(".right-chevron");

    leftChevron.addEventListener("click", () => this.previousSlide());
    rightChevron.addEventListener("click", () => this.nextSlide());
  }

  nextSlide() {
    const rightChevron = document.querySelector(".right-chevron");
    this.setToggleButtonState(rightChevron, true);

    setTimeout(() => {
      this.setToggleButtonState(rightChevron, false);
    }, 200);

    this.currentIndex = (this.currentIndex + 1) % this.totalCards;
    this.updateSlider();
  }

  previousSlide() {
    const leftChevron = document.querySelector(".left-chevron");
    this.setToggleButtonState(leftChevron, true);

    setTimeout(() => {
      this.setToggleButtonState(leftChevron, false);
    }, 200);

    this.currentIndex =
      (this.currentIndex - 1 + this.totalCards) % this.totalCards;
    this.updateSlider();
  }

  updateSlider() {
    this.feedbackCards.forEach((card, index) => {
      card.style.opacity = "1";
      card.style.display = "block";
    });

    this.updateBackgroundColor();

    const container = document.querySelector(".feedback-card-container");
    container.style.justifyContent = "center";
  }

  updateBackgroundColor() {
    this.feedbackCards.forEach((card, index) => {
      if (index === this.currentIndex) {
        card.style.backgroundColor = "#C2EFD4";
        card.style.transform = "scale(1.05)";
      } else {
        card.style.backgroundColor = "#ffffff";
        card.style.transform = "scale(1)";
      }
    });
  }
}

class CountdownTimer {
  constructor() {
    this.targetDate = this.calculateTargetDate();
    this.init();
  }

  calculateTargetDate() {
    const now = new Date();
    const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return oneWeekFromNow;
  }

  init() {
    this.updateCountdown();
    this.interval = setInterval(() => this.updateCountdown(), 1000);
  }

  updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance < 0) {
      this.resetCountdown();
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.updateCountdownDisplay(days, hours, minutes, seconds);
  }

  updateCountdownDisplay(days, hours, minutes, seconds) {
    const countdownElements = document.querySelectorAll(".offer-countdown");

    if (countdownElements.length >= 4) {
      countdownElements[0].querySelector("p").textContent = String(
        days
      ).padStart(2, "0");
      countdownElements[1].querySelector("p").textContent = String(
        hours
      ).padStart(2, "0");
      countdownElements[2].querySelector("p").textContent = String(
        minutes
      ).padStart(2, "0");
      countdownElements[3].querySelector("p").textContent = String(
        seconds
      ).padStart(2, "0");
    }
  }

  resetCountdown() {
    this.targetDate = this.calculateTargetDate();
  }
}

class ButtonEffects {
  constructor() {
    this.init();
  }

  init() {
    this.addButtonHoverEffects();
    this.addButtonClickEffects();
  }

  addButtonHoverEffects() {
    const style = document.createElement("style");
    style.textContent = `
            button {
                transition: all 0.3s ease;
                border: none;
            }
            
            .hero-content button:hover {
                background-color: #267d49;
                transform: translateY(-2px);
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
            }
            
            .best-selling button {
                border: 2px solid #224f34;
            }
            
            .offer-content button:hover {
                background-color: #267d49;
                transform: translateY(-2px);
                box-shadow: 0 6px 12px rgba(34, 79, 52, 0.2);
            }
            
            button:active {
                transform: translateY(0);
            }
        `;
    document.head.appendChild(style);
  }

  addButtonClickEffects() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const ripple = document.createElement("span");
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    pointer-events: none;
                `;

        button.style.position = "relative";
        button.style.overflow = "hidden";
        button.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Add ripple animation
    const rippleStyle = document.createElement("style");
    rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(rippleStyle);
  }
}

class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    const exploreButton = document.querySelector(".hero-content button");
    if (exploreButton) {
      exploreButton.addEventListener("click", () => {
        document.querySelector(".best-selling").scrollIntoView({
          behavior: "smooth",
        });
      });
    }

    const seeAllButton = document.querySelector(".best-selling button");
    if (seeAllButton) {
      seeAllButton.addEventListener("click", () => {
        document.querySelector(".our-products").scrollIntoView({
          behavior: "smooth",
        });
      });
    }
  }
}

class ProductCardEffects {
  constructor() {
    this.init();
  }

  init() {
    this.addProductCardHoverEffects();
    this.addProductCardClickEffects();
  }

  addProductCardHoverEffects() {
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px) scale(1.02)";
        card.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.2)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
        card.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
      });
    });
  }

  addProductCardClickEffects() {
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
      card.addEventListener("click", () => {
        card.style.transform = "translateY(-5px) scale(0.98)";

        setTimeout(() => {
          card.style.transform = "translateY(-8px) scale(1.02)";
        }, 150);

        console.log("Product clicked:", card.querySelector("h3").textContent);
      });
    });
  }
}

class TabAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.addTabTransitionEffects();
  }

  addTabTransitionEffects() {
    const style = document.createElement("style");
    style.textContent = `
      .product-grid {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.4s ease;
      }
      
      .product-grid.active {
        opacity: 1;
        transform: translateY(0);
        animation: fadeInUp 0.6s ease;
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .product-card {
        animation: slideInUp 0.6s ease both;
      }
      
      .product-card:nth-child(1) { animation-delay: 0.1s; }
      .product-card:nth-child(2) { animation-delay: 0.2s; }
      .product-card:nth-child(3) { animation-delay: 0.3s; }
      .product-card:nth-child(4) { animation-delay: 0.4s; }
      .product-card:nth-child(5) { animation-delay: 0.5s; }
      .product-card:nth-child(6) { animation-delay: 0.6s; }
      .product-card:nth-child(7) { animation-delay: 0.7s; }
      .product-card:nth-child(8) { animation-delay: 0.8s; }
      
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  new ProductTabs();
  new FeedbackSlider();
  new CountdownTimer();
  new ButtonEffects();
  new SmoothScroll();
  new ProductCardEffects();
  new TabAnimations();

  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

window.addEventListener("resize", function () {
  const slider = new FeedbackSlider();
});

window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }
  });
});

const scrollAnimationStyle = document.createElement("style");
scrollAnimationStyle.textContent = `
    section {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;
document.head.appendChild(scrollAnimationStyle);
