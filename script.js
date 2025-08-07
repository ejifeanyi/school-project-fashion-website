// VogueVibe Fashion House - JavaScript Application
class VogueVibeApp {
  constructor() {
    this.cart = [];
    this.registeredEvents = [];
    this.init();
  }

  init() {
    this.initNavigation();
    this.initProductFiltering();
    this.initModals();
    this.initForms();
    this.initScrollEffects();
    this.initAnimations();
    this.initNotifications();
    this.initEventFiltering();
  }

  // Navigation functionality
  initNavigation() {
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        navToggle.classList.toggle("active");
      });

      // Close menu when clicking on links
      const navLinks = navMenu.querySelectorAll(".nav-link");
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("active");
          navToggle.classList.remove("active");
        });
      });
    }

    // Scroll to top functionality
    this.createScrollToTopButton();
  }

  createScrollToTopButton() {
    const scrollBtn = document.createElement("button");
    scrollBtn.className = "scroll-to-top";
    scrollBtn.innerHTML = "↑";
    scrollBtn.setAttribute("aria-label", "Scroll to top");
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.add("visible");
      } else {
        scrollBtn.classList.remove("visible");
      }
    });
  }

  // Product filtering
  initProductFiltering() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const productCards = document.querySelectorAll(".product-card");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Update active filter button
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Get filter category from onclick attribute or data attribute
        const onClick = button.getAttribute("onclick");
        let category = "all";
        if (onClick) {
          const match = onClick.match(/filterProducts\('([^']+)'\)/);
          if (match) category = match[1];
        }

        this.filterProducts(category);
      });
    });
  }

  filterProducts(category) {
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");

      if (category === "all" || cardCategory === category) {
        card.style.display = "block";
        card.style.animation = "fadeIn 0.5s ease forwards";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Event filtering
  initEventFiltering() {
    const filterButtons = document.querySelectorAll(
      ".event-filters .filter-btn"
    );

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Update active filter button
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Get filter category from onclick attribute
        const onClick = button.getAttribute("onclick");
        let category = "all";
        if (onClick) {
          const match = onClick.match(/filterEvents\('([^']+)'\)/);
          if (match) category = match[1];
        }

        this.filterEvents(category);
      });
    });
  }

  filterEvents(category) {
    const eventCards = document.querySelectorAll(".event-card");

    eventCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");

      if (category === "all" || cardCategory === category) {
        card.style.display = "block";
        card.style.animation = "fadeIn 0.5s ease forwards";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Event details modal
  showEventDetails(eventId) {
    const events = {
      "spring-launch-2026": {
        title: "Spring Collection Launch",
        date: "March 15, 2026",
        time: "7:00 PM - 10:00 PM",
        location: "VogueVibe Flagship Store, New York",
        description:
          "Experience the unveiling of our most anticipated collection yet. The Spring 2026 line represents a bold new chapter in contemporary luxury, featuring innovative fabrics, sustainable practices, and designs that celebrate individuality.",
        highlights: [
          "Live runway presentation",
          "Champagne reception",
          "Exclusive pre-orders",
          "Meet the designers",
        ],
        category: "launches",
      },
      "styling-workshop": {
        title: "Personal Styling Workshop",
        date: "April 2, 2026",
        time: "2:00 PM - 5:00 PM",
        location: "VogueVibe Design Studio, New York",
        description:
          "Learn the art of personal styling from our expert stylists. This hands-on workshop covers wardrobe essentials, color coordination, and how to create versatile looks for any occasion.",
        highlights: [
          "Professional styling tips",
          "Hands-on wardrobe assessment",
          "Personal style consultation",
          "Take-home style guide",
        ],
        category: "workshops",
      },
      "vip-preview": {
        title: "VIP Summer Preview",
        date: "April 20, 2026",
        time: "6:00 PM - 9:00 PM",
        location: "Private Showroom, Manhattan",
        description:
          "An exclusive preview of our upcoming summer collection. By invitation only - experience luxury fashion in an intimate setting with personalized service and private shopping.",
        highlights: [
          "First look at summer collection",
          "Private shopping experience",
          "Complimentary alterations",
          "Exclusive pricing",
        ],
        category: "private",
      },
      "sustainability-talk": {
        title: "Sustainable Fashion Panel",
        date: "May 10, 2026",
        time: "3:00 PM - 4:30 PM",
        location: "Virtual Event",
        description:
          "Join industry leaders for an insightful discussion on sustainable fashion practices, ethical manufacturing, and the future of eco-conscious luxury fashion.",
        highlights: [
          "Industry expert speakers",
          "Q&A session",
          "Sustainable fashion insights",
          "Virtual networking",
        ],
        category: "launches",
      },
      "fabric-workshop": {
        title: "Fabric Selection Masterclass",
        date: "May 25, 2026",
        time: "1:00 PM - 4:00 PM",
        location: "VogueVibe Atelier, Brooklyn",
        description:
          "Discover the secrets of fabric selection with our master craftspeople. Learn about different materials, their properties, and how they influence the final garment.",
        highlights: [
          "Hands-on fabric exploration",
          "Quality assessment techniques",
          "Sustainability considerations",
          "Expert guidance",
        ],
        category: "workshops",
      },
      "fall-preview": {
        title: "Fall Collection Gala",
        date: "September 15, 2026",
        time: "7:30 PM - 11:00 PM",
        location: "The Plaza Hotel, New York",
        description:
          "Our most prestigious event of the year. Join us for an elegant evening showcasing our Fall collection in a spectacular runway show, followed by dinner and dancing.",
        highlights: [
          "Black tie runway show",
          "Gourmet dinner service",
          "Live entertainment",
          "Exclusive collection access",
        ],
        category: "launches",
      },
    };

    const event = events[eventId];
    if (!event) {
      this.showNotification("Event details not found", "error");
      return;
    }

    const modalContent = document.getElementById("eventModalContent");
    if (!modalContent) return;

    modalContent.innerHTML = `
      <div class="event-details-modal">
        <h2>${event.title}</h2>
        <div class="event-meta" style="margin: 20px 0; color: #666;">
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Time:</strong> ${event.time}</p>
          <p><strong>Location:</strong> ${event.location}</p>
        </div>
        <p style="margin: 20px 0; line-height: 1.6;">${event.description}</p>
        <div class="event-highlights" style="margin: 20px 0;">
          <h4>Event Highlights:</h4>
          <ul style="margin: 10px 0; padding-left: 20px;">
            ${event.highlights
              .map((highlight) => `<li>${highlight}</li>`)
              .join("")}
          </ul>
        </div>
        <div class="event-actions" style="display: flex; gap: 16px; margin-top: 30px;">
          <button class="btn-primary" onclick="app.events.registerForEvent('${eventId}')">
            Register Now
          </button>
          <button class="btn-secondary" onclick="app.events.addToCalendar('${eventId}')">
            Add to Calendar
          </button>
        </div>
      </div>
    `;

    this.showModal("event-modal");
  }

  // Event registration
  registerForEvent(eventId) {
    // Check if already registered
    if (this.registeredEvents.includes(eventId)) {
      this.showNotification(
        "You're already registered for this event!",
        "info"
      );
      return;
    }

    // Add to registered events
    this.registeredEvents.push(eventId);

    // Close event modal and show success modal
    this.closeModal("event-modal");

    // Update success message
    const successMessage = document.getElementById("registrationMessage");
    if (successMessage) {
      successMessage.textContent =
        "You're all set! We'll send you a confirmation email with event details.";
    }

    this.showModal("registration-success");
    this.showNotification("Successfully registered for event!", "success");
  }

  // Add to calendar functionality
  addToCalendar(eventId) {
    const events = {
      "spring-launch-2026": {
        title: "Spring Collection Launch",
        date: "2026-03-15",
        startTime: "19:00",
        endTime: "22:00",
        location: "VogueVibe Flagship Store, New York",
      },
      "styling-workshop": {
        title: "Personal Styling Workshop",
        date: "2026-04-02",
        startTime: "14:00",
        endTime: "17:00",
        location: "VogueVibe Design Studio, New York",
      },
      "vip-preview": {
        title: "VIP Summer Preview",
        date: "2026-04-20",
        startTime: "18:00",
        endTime: "21:00",
        location: "Private Showroom, Manhattan",
      },
      "sustainability-talk": {
        title: "Sustainable Fashion Panel",
        date: "2026-05-10",
        startTime: "15:00",
        endTime: "16:30",
        location: "Virtual Event",
      },
      "fabric-workshop": {
        title: "Fabric Selection Masterclass",
        date: "2026-05-25",
        startTime: "13:00",
        endTime: "16:00",
        location: "VogueVibe Atelier, Brooklyn",
      },
      "fall-preview": {
        title: "Fall Collection Gala",
        date: "2026-09-15",
        startTime: "19:30",
        endTime: "23:00",
        location: "The Plaza Hotel, New York",
      },
    };

    const event = events[eventId];
    if (!event) {
      this.showNotification("Event not found", "error");
      return;
    }

    // Create calendar URL (Google Calendar format)
    const startDateTime = `${event.date}T${event.startTime}:00`;
    const endDateTime = `${event.date}T${event.endTime}:00`;

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${startDateTime.replace(/[-:]/g, "")}/${endDateTime.replace(
      /[-:]/g,
      ""
    )}&location=${encodeURIComponent(
      event.location
    )}&details=${encodeURIComponent("VogueVibe Fashion House Event")}`;

    // Open in new tab
    window.open(calendarUrl, "_blank");
    this.showNotification("Calendar event created!", "success");
  }

  // Newsletter form handler for events page
  handleNewsletterSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;

    if (email) {
      this.showNotification(
        "Thank you for subscribing! You'll receive event updates.",
        "success"
      );
      form.reset();
    }
  }

  // Modal functionality
  initModals() {
    // Close modal when clicking outside
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        this.closeModal(e.target.id);
      }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const openModal = document.querySelector(".modal.show");
        if (openModal) {
          this.closeModal(openModal.id);
        }
      }
    });
  }

  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }
  }

  showProductDetails(name, category, price) {
    const modalContent = document.getElementById("productModalContent");
    if (!modalContent) return;

    modalContent.innerHTML = `
      <div class="product-modal-content">
        <div class="product-modal-image">
          <div class="product-image-placeholder" style="height: 300px; background: linear-gradient(45deg, #f0f0f0, #e5e5e5); border-radius: 8px; margin-bottom: 20px;"></div>
        </div>
        <h3>${name}</h3>
        <p class="product-category">Category: ${
          category.charAt(0).toUpperCase() + category.slice(1)
        }</p>
        <p class="product-modal-price" style="font-size: 24px; font-weight: 700; color: var(--secondary-color); margin: 20px 0;">$${price.toLocaleString()}</p>
        <p>This exquisite piece represents the pinnacle of luxury fashion design. Crafted with the finest materials and attention to detail, it embodies sophistication and timeless elegance.</p>
        <div class="product-details" style="margin: 20px 0;">
          <h4>Details:</h4>
          <ul style="margin: 10px 0; padding-left: 20px; color: var(--text-secondary);">
            <li>Premium materials and construction</li>
            <li>Available in multiple sizes</li>
            <li>Professional tailoring included</li>
            <li>30-day return policy</li>
          </ul>
        </div>
        <div class="product-actions" style="display: flex; gap: 16px; margin-top: 30px;">
          <button class="btn-primary" onclick="app.cart.addToCart('${name}', ${price}); app.ui.closeModal('product-modal');">Add to Cart</button>
          <button class="btn-secondary" onclick="app.navigation.goToPage('inquiries.html')">Contact for Consultation</button>
        </div>
      </div>
    `;

    this.showModal("product-modal");
  }

  // Cart functionality
  initCart() {
    this.cart = this.cart || [];
  }

  addToCart(name, price) {
    const item = {
      id: Date.now(),
      name,
      price,
      quantity: 1,
    };

    const existingItem = this.cart.find((cartItem) => cartItem.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push(item);
    }

    this.showCartNotification(`${name} added to cart!`);
  }

  showCartNotification(message) {
    this.showNotification(message, "success");
  }

  // Form handling
  initForms() {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) =>
        this.handleContactSubmit(e)
      );
    }

    const newsletterForms = document.querySelectorAll(".newsletter-form");
    newsletterForms.forEach((form) => {
      form.addEventListener("submit", (e) => this.handleNewsletterForm(e));
    });
  }

  handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const data = {
      inquiryType: formData.get("inquiryType"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      preferredDate: formData.get("preferredDate"),
      message: formData.get("message"),
      newsletter: formData.get("newsletter") === "on",
    };

    if (
      !data.inquiryType ||
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.message
    ) {
      this.showNotification("Please fill in all required fields.", "error");
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      this.showModal("success-modal");
      form.reset();
      console.log("Contact form submitted:", data);
    }, 2000);
  }

  setInquiryType(type) {
    const inquirySelect = document.getElementById("inquiryType");
    if (inquirySelect) {
      inquirySelect.value = type;
      const form = document.getElementById("contactForm");
      if (form) {
        form.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          const firstNameField = document.getElementById("firstName");
          if (firstNameField) firstNameField.focus();
        }, 500);
      }
    }
  }

  handleNewsletterForm(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;

    if (email) {
      this.showNotification(
        "Thank you for subscribing to our newsletter!",
        "success"
      );
      form.reset();
    }
  }

  // Notification system
  initNotifications() {
    if (!document.getElementById("notification-container")) {
      const container = document.createElement("div");
      container.id = "notification-container";
      container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        pointer-events: none;
      `;
      document.body.appendChild(container);
    }
  }

  showNotification(message, type = "info") {
    const container = document.getElementById("notification-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `notification-toast ${type}`;
    toast.style.cssText = `
      background: ${
        type === "success"
          ? "#4CAF50"
          : type === "error"
          ? "#f44336"
          : "#2196F3"
      };
      color: white;
      padding: 16px 24px;
      margin-bottom: 10px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transform: translateX(100%);
      transition: transform 0.3s ease;
      pointer-events: auto;
      max-width: 300px;
      word-wrap: break-word;
    `;

    toast.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>${message}</span>
        <button style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; margin-left: 10px;">&times;</button>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transform = "translateX(0)";
    }, 100);

    const closeBtn = toast.querySelector("button");
    closeBtn.addEventListener("click", () => this.closeNotification(toast));

    setTimeout(() => this.closeNotification(toast), 4000);
  }

  closeNotification(element) {
    if (typeof element === "string") {
      element = document.getElementById(element);
    }

    if (element) {
      element.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }, 300);
    }
  }

  // Scroll effects and animations
  initScrollEffects() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          const counters = entry.target.querySelectorAll(".stat-number");
          counters.forEach((counter) => this.animateCounter(counter));
        }
      });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll(
      ".hero, .collections-preview, .experience, .products-section, .leadership-section, .contact-section, .featured-event, .events-list"
    );
    elementsToObserve.forEach((el) => {
      el.classList.add("fade-in");
      observer.observe(el);
    });
  }

  initAnimations() {
    if (!document.getElementById("animation-styles")) {
      const style = document.createElement("style");
      style.id = "animation-styles";
      style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .scroll-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: #2c3e50;
          color: white;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          z-index: 1000;
          opacity: 0;
          transform: translateY(100px);
          transition: all 0.3s ease;
        }
        
        .scroll-to-top.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .scroll-to-top:hover {
          background: #34495e;
          transform: translateY(-2px);
        }
      `;
      document.head.appendChild(style);
    }
  }

  animateCounter(counterElement) {
    const target = parseInt(counterElement.textContent.replace(/\D/g, ""));
    const duration = 2000;
    const start = Date.now();
    const startValue = 0;

    const updateCounter = () => {
      const now = Date.now();
      const progress = Math.min((now - start) / duration, 1);
      const currentValue = Math.floor(
        startValue + (target - startValue) * progress
      );

      const suffix = counterElement.textContent.replace(/[\d,]/g, "");
      counterElement.textContent = currentValue.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  }

  goToPage(page) {
    this.showNotification(`Navigating to ${page}...`, "info");
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.location.href = page;
      }
    }, 500);
  }
}

// Create global app instance with organized modules
const app = {
  core: null,

  init() {
    this.core = new VogueVibeApp();
    return this;
  },

  ui: {
    showModal(modalId) {
      app.core.showModal(modalId);
    },
    closeModal(modalId) {
      app.core.closeModal(modalId);
    },
    closeNotification(notificationId) {
      app.core.closeNotification(notificationId);
    },
  },

  products: {
    filterProducts(category) {
      app.core.filterProducts(category);
    },
    showProductDetails(name, category, price) {
      app.core.showProductDetails(name, category, price);
    },
  },

  cart: {
    addToCart(name, price) {
      app.core.addToCart(name, price);
    },
  },

  forms: {
    handleContactSubmit(event) {
      app.core.handleContactSubmit(event);
    },
    setInquiryType(type) {
      app.core.setInquiryType(type);
    },
    handleNewsletterSubmit(event) {
      app.core.handleNewsletterSubmit(event);
    },
  },

  events: {
    filterEvents(category) {
      app.core.filterEvents(category);
    },
    showEventDetails(eventId) {
      app.core.showEventDetails(eventId);
    },
    registerForEvent(eventId) {
      app.core.registerForEvent(eventId);
    },
    addToCalendar(eventId) {
      app.core.addToCalendar(eventId);
    },
  },

  navigation: {
    goToPage(page) {
      app.core.goToPage(page);
    },
  },
};

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  app.init();
});

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    const animatedElements = document.querySelectorAll('[style*="animation"]');
    animatedElements.forEach((el) => {
      el.style.animationPlayState = "paused";
    });
  } else {
    const pausedElements = document.querySelectorAll(
      '[style*="animation-play-state: paused"]'
    );
    pausedElements.forEach((el) => {
      el.style.animationPlayState = "running";
    });
  }
});

// Export for potential module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = { VogueVibeApp, app };
}
