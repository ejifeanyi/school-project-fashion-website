// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript loaded successfully!");

  // Initialize Lucide icons
  lucide.createIcons();

  // Get references to DOM elements
  const homeBtn = document.getElementById("homeBtn");
  const settingsBtn = document.getElementById("settingsBtn");
  const userBtn = document.getElementById("userBtn");
  const output = document.getElementById("output");

  // Add event listeners
  homeBtn.addEventListener("click", function () {
    output.textContent = "Home button clicked! 🏠";
    output.style.borderLeftColor = "#27ae60";
  });

  settingsBtn.addEventListener("click", function () {
    output.textContent = "Settings button clicked! ⚙️";
    output.style.borderLeftColor = "#e74c3c";
  });

  userBtn.addEventListener("click", function () {
    output.textContent = "Profile button clicked! 👤";
    output.style.borderLeftColor = "#9b59b6";
  });

  // Example of a utility function
  function showMessage(message, color = "#3498db") {
    output.textContent = message;
    output.style.borderLeftColor = color;
  }

  // Example of working with Lucide icons dynamically
  function addNewButton() {
    const buttonGroup = document.querySelector(".button-group");
    const newBtn = document.createElement("button");
    newBtn.className = "btn";
    newBtn.innerHTML = '<i data-lucide="plus"></i> Add New';

    newBtn.addEventListener("click", function () {
      showMessage("New button clicked! ➕", "#f39c12");
    });

    buttonGroup.appendChild(newBtn);
    // Re-initialize icons for new elements
    lucide.createIcons();
  }

  // Uncomment the line below to add a new button dynamically
  // setTimeout(addNewButton, 2000);
});

// Example of a global utility function
function getCurrentTime() {
  return new Date().toLocaleTimeString();
}

// Example of handling window events
window.addEventListener("resize", function () {
  console.log("Window resized to:", window.innerWidth, "x", window.innerHeight);
});
