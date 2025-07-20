// Initialize Lucide icons
lucide.createIcons();

// Feedback Slider Functionality
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
    // Icons are now in HTML, just get references to them
    const leftChevron = document.querySelector(
      ".toggle-background:first-child"
    );
    const rightChevron = document.querySelector(
      ".toggle-background:last-child"
    );

    // Add classes for identification
    leftChevron.classList.add("left-chevron");
    rightChevron.classList.add("right-chevron");

    // Set initial state
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

    // Always keep icon color the same
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
    // Set current button to active state
    const rightChevron = document.querySelector(".right-chevron");
    this.setToggleButtonState(rightChevron, true);

    // Reset after a short delay
    setTimeout(() => {
      this.setToggleButtonState(rightChevron, false);
    }, 200);

    this.currentIndex = (this.currentIndex + 1) % this.totalCards;
    this.updateSlider();
  }

  previousSlide() {
    // Set current button to active state
    const leftChevron = document.querySelector(".left-chevron");
    this.setToggleButtonState(leftChevron, true);

    // Reset after a short delay
    setTimeout(() => {
      this.setToggleButtonState(leftChevron, false);
    }, 200);

    this.currentIndex =
      (this.currentIndex - 1 + this.totalCards) % this.totalCards;
    this.updateSlider();
  }

  updateSlider() {
    // Show all cards but highlight the current one
    this.feedbackCards.forEach((card, index) => {
      card.style.opacity = "1";
      card.style.display = "block";
    });

    // Change background color of the current card only
    this.updateBackgroundColor();

    // Update container to show all cards
    const container = document.querySelector(".feedback-card-container");
    container.style.justifyContent = "center";
  }

  updateBackgroundColor() {
    // Reset all cards to default
    this.feedbackCards.forEach((card, index) => {
      if (index === this.currentIndex) {
        // Style the active card - only change background
        card.style.backgroundColor = "#C2EFD4";
        card.style.transform = "scale(1.05)";
      } else {
        // Style inactive cards
        card.style.backgroundColor = "#ffffff";
        card.style.transform = "scale(1)";
      }
    });
  }
}

// Countdown Timer Functionality
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
    // Reset to one week when countdown reaches zero
    this.targetDate = this.calculateTargetDate();
  }
}

// Button Interactions
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
            
            .best-selling button:hover {
                background-color: #f8f9fa;
                border: 2px solid #224f34;
                transform: translateY(-2px);
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
        // Create ripple effect
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

// Smooth Scrolling for Navigation
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    // Add smooth scrolling to explore button
    const exploreButton = document.querySelector(".hero-content button");
    if (exploreButton) {
      exploreButton.addEventListener("click", () => {
        document.querySelector(".best-selling").scrollIntoView({
          behavior: "smooth",
        });
      });
    }

    // Add smooth scrolling to see all button
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

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  new FeedbackSlider();
  new CountdownTimer();
  new ButtonEffects();
  new SmoothScroll();

  // Add loading animation
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Handle window resize
window.addEventListener("resize", function () {
  // Reinitialize components that depend on dimensions
  const slider = new FeedbackSlider();
});

// Add scroll animations
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

// Add initial styles for scroll animations
const scrollAnimationStyle = document.createElement("style");
scrollAnimationStyle.textContent = `
    section {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;
document.head.appendChild(scrollAnimationStyle);
