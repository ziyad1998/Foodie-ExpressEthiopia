const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart-total"); // Only ONE element with this ID!
const cartCount = document.getElementById("cart-count");

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    if (cartTotal) cartTotal.textContent = "ETB 0";
    if (cartCount) cartCount.textContent = "0";
    return;
  }

  let total = 0;
  let itemCount = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    itemCount += item.quantity;

    const card = document.createElement("div");
    card.className = "menu-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="item-info">
        <h3>${item.name}</h3>
        <p>Price: ETB ${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Total: ETB ${itemTotal}</p>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
    cartContainer.appendChild(card);
  });

  // Update total cost and cart count badge
  if (cartTotal) cartTotal.textContent = `ETB ${total}`;
  if (cartCount) cartCount.textContent = itemCount;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Checkout button handler
const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }
    window.location.href = "checkout.html";
  });
}

// Initial render on page load
renderCart();
