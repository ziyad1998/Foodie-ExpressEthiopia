// Placeholder script for homepage interactivity
document.querySelectorAll('.category').forEach(cat => {
  cat.addEventListener('click', () => {
    alert("Redirecting to " + cat.querySelector('p').innerText + " menu...");
    // You can replace this with real redirection logic
    // Example: window.location.href = "menu.html?category=pizza";
  });
});
