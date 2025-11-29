let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add item
function addToCart(name, price) {
    cart.push({ name, price });
    localStorageStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added!");
}
let user = localStorage.getItem("username");

if(!user){
    alert("Please login first.");
    window.location.href = "login.html";
    return;
}


// Show items in cart
function showCart() {
    let box = document.getElementById("cart-items");
    if (!box) return;

    let total = 0;
    box.innerHTML = "";

    cart.forEach((item, index) => {
        box.innerHTML += `
                ${item.name} - $${item.price}
                <button onclick="removeFromCart(${index})">Remove</button>
            </p>
        `;
        total += item.price;
    });

    document.getElementById("total").innerText = "Total: $" + total;
}

// Remove item
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
}

showCart();
// Set initial activity time
sessionStorage.setItem("lastActivity", Date.now());

// Update activity time on user actions
function updateActivity() {
  sessionStorage.setItem("lastActivity", Date.now());
}
updateActivity();

window.addEventListener("mousemove", updateActivity);
window.addEventListener("keypress", updateActivity);
window.addEventListener("click", updateActivity);
window.addEventListener("scroll", updateActivity);

// Check inactivity every 5 seconds
setInterval(() => {
  let lastActivity = parseInt(sessionStorage.getItem("lastActivity"), 10);
  if (lastActivity) {
    let now = Date.now();
    let diff = now - lastActivity;

    if (diff > 5 * 1000) { // 5 seconds
      alert("You have been logged out due to inactivity.");
      localStorage.removeItem("username"); // clear login
      sessionStorage.clear(); // clear session data
      window.location.href = "login.html"; // redirect
    }
  }
}, 5000); // check every 5 seconds
