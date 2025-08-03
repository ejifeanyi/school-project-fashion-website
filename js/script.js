document.addEventListener("DOMContentLoaded", function () {
  // Initialize Lucide icons
  lucide.createIcons();

  // Initialize all components
  initMarquee();
  initProductTabs();
  initProductGrids();
  initContactForm();
  initLoginModal();
  initEventRSVP();
  initSmoothScroll();
  initAnimations();
});

// Marquee Animation
function initMarquee() {
  const marquee = document.querySelector(".marquee p");
  if (marquee) {
    let position = 0;
    setInterval(() => {
      position--;
      marquee.style.transform = `translateX(${position}px)`;

      if (position < -marquee.offsetWidth) {
        position = window.innerWidth;
      }
    }, 20);
  }
}

// Product Tabs
function initProductTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Hide all product grids
      const productGrids = document.querySelectorAll(".product-grid");
      productGrids.forEach((grid) => grid.classList.remove("active"));

      // Show the selected grid
      const tabName = this.getAttribute("data-tab");
      document.getElementById(tabName).classList.add("active");
    });
  });
}

// Product Grids (Load products dynamically)
function initProductGrids() {
  const products = {
    women: [
      {
        name: "Silk Evening Gown",
        price: "$299",
        image: "images/product1.jpg",
      },
      {
        name: "Casual Summer Dress",
        price: "$129",
        image: "images/product2.jpg",
      },
      { name: "Tailored Blazer", price: "$199", image: "images/product3.jpg" },
      {
        name: "Floral Maxi Dress",
        price: "$159",
        image: "images/product4.jpg",
      },
    ],
    men: [
      { name: "Classic Suit", price: "$349", image: "images/product5.jpg" },
      { name: "Casual Shirt", price: "$79", image: "images/product6.jpg" },
      { name: "Denim Jacket", price: "$129", image: "images/product7.jpg" },
      { name: "Chino Pants", price: "$89", image: "images/product8.jpg" },
    ],
    accessories: [
      {
        name: "Leather Handbag",
        price: "$199",
        image: "images/accessory1.jpg",
      },
      { name: "Silk Scarf", price: "$59", image: "images/accessory2.jpg" },
      {
        name: "Statement Necklace",
        price: "$89",
        image: "images/accessory3.jpg",
      },
      {
        name: "Designer Sunglasses",
        price: "$149",
        image: "images/accessory4.jpg",
      },
    ],
    "new-arrivals": [
      { name: "Boho Chic Dress", price: "$179", image: "images/new1.jpg" },
      { name: "Tailored Tuxedo", price: "$399", image: "images/new2.jpg" },
      { name: "Knit Sweater", price: "$119", image: "images/new3.jpg" },
      { name: "Leather Boots", price: "$229", image: "images/new4.jpg" },
    ],
  };

  // Load products into each grid
  for (const category in products) {
    const grid = document.getElementById(category);
    if (grid) {
      grid.innerHTML = products[category]
        .map(
          (product) => `
                <div class="product-card fade-in">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="price">${product.price}</p>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            `
        )
        .join("");
    }
  }

  // Featured products on home page
  const featuredGrid = document.querySelector(
    ".featured-products .product-grid"
  );
  if (featuredGrid) {
    featuredGrid.innerHTML = products["new-arrivals"]
      .map(
        (product) => `
            <div class="product-card fade-in">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>
        `
      )
      .join("");
  }

  // Add to cart functionality
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const productCard = this.closest(".product-card");
      const productName = productCard.querySelector("h3").textContent;
      const productPrice = productCard.querySelector(".price").textContent;

      alert(`Added to cart: ${productName} - ${productPrice}`);

      // Animation
      this.textContent = "Added!";
      setTimeout(() => {
        this.textContent = "Add to Cart";
      }, 2000);
    });
  });
}

// Contact Form
function initContactForm() {
  const contactForm = document.getElementById("inquiryForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Here you would typically send this data to a server
      console.log("Form submitted:", { name, email, subject, message });

      // Show success message
      alert("Thank you for your message! We will get back to you soon.");

      // Reset form
      contactForm.reset();
    });
  }
}

// Login Modal
function initLoginModal() {
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      const modalHTML = `
                <div class="modal-overlay">
                    <div class="modal">
                        <h3>Login to Your Account</h3>
                        <form id="loginForm">
                            <div class="form-group">
                                <input type="email" placeholder="Email" required>
                            </div>
                            <div class="form-group">
                                <input type="password" placeholder="Password" required>
                            </div>
                            <button type="submit">Login</button>
                            <p class="modal-close">Close</p>
                        </form>
                    </div>
                </div>
            `;

      document.body.insertAdjacentHTML("beforeend", modalHTML);

      // Close modal
      document
        .querySelector(".modal-close")
        .addEventListener("click", function () {
          document.querySelector(".modal-overlay").remove();
        });

      // Login form submission
      document
        .getElementById("loginForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();
          alert("Login functionality would be implemented here");
          document.querySelector(".modal-overlay").remove();
        });
    });
  }
}

// Event RSVP
function initEventRSVP() {
  document.querySelectorAll(".rsvp-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const eventTitle =
        this.closest(".event-details").querySelector("h3").textContent;
      alert(`RSVP for "${eventTitle}" would be processed here`);
    });
  });
}

// Smooth Scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
}

// Page Animations
function initAnimations() {
  // Fade in elements when they come into view
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach((element) => {
    element.style.opacity = 0;
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(element);
  });

  // Page load animation
  document.body.style.opacity = 0;
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = 1;
  }, 100);
}

// DOM Structure Visualization (for assessment)
function visualizeDOM() {
  console.log("DOM Structure of Élégance Website:");
  console.log("=================================");

  const domStructure = {
    document: {
      html: {
        head: {
          meta: [],
          title: "Élégance | Premium Fashion House",
          link: ["stylesheet"],
          script: ["Lucide Icons"],
        },
        body: {
          marquee: {},
          nav: {
            h1: "Élégance",
            ul: ["HOME", "SHOP", "ABOUT", "EVENTS", "CONTACT"],
            button: "LOGIN",
          },
          main: {
            // This would vary by page
            hero: {},
            featuredProducts: {},
            about: {},
            products: {},
            events: {},
            contact: {},
          },
          footer: {
            h1: "Élégance",
            div: ["Terms", "Privacy", "Cookies"],
          },
          script: ["script.js"],
        },
      },
    },
  };

  console.log(domStructure);
  console.log(
    "Note: Actual DOM structure would be more detailed and vary by page."
  );
}

// Call DOM visualization (for assessment purposes)
visualizeDOM();
