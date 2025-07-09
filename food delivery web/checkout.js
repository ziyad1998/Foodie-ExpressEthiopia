const cartCount = document.getElementById("cart-count");
const orderSummary = document.getElementById("order-summary");
const checkoutForm = document.getElementById("checkout-form");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartBadge() {
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}

function renderOrderSummary() {
  if (!orderSummary) return;

  if (cart.length === 0) {
    orderSummary.innerHTML = "<p>Your cart is empty. Please add items first.</p>";
    return;
  }

  let total = 0;
  let html = `<h3>Order Summary | የትዕዛዝ እይታ</h3>`;
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    html += `
      <div class="order-item">
        <span>${item.name} (x${item.quantity})</span>
        <span>ETB ${itemTotal}</span>
      </div>
    `;
  });
  html += `<hr/><div class="order-item"><strong>Total:</strong> <strong>ETB ${total}</strong></div>`;
  orderSummary.innerHTML = html;
}

// Form submission handler
if (checkoutForm) {
  checkoutForm.addEventListener("submit", function(e) {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    // Collect form data
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const payment = document.getElementById("payment").value;

    if (!name || !phone || !address || !payment) {
      alert("Please fill in all required fields.");
      return;
    }

    // For now: show confirmation alert with order info
    alert(`Thank you, ${name}! Your order has been placed.\n\nDelivery Address:\n${address}\n\nPayment Method: ${payment === 'cod' ? 'Cash on Delivery' : 'Card Payment'}`);

    // Clear cart and redirect to home or thank you page
    localStorage.removeItem("cart");
    updateCartBadge();
    window.location.href = "home.html";
  });
}

// Initialize page
updateCartBadge();
renderOrderSummary();
