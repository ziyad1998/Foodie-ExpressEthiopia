document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.menu-card');
    const name = card.querySelector('h3').innerText;
    const price = parseInt(card.querySelector('.price').innerText.replace('ETB', '').trim());
    const image = card.querySelector("img").getAttribute("src");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1, image });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
    alert(`${name} added to cart!`);
  });
});

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = totalItems;
}

// Initialize badge on page load
updateCartBadge();
