// ----------------------------------------
// INITIAL LOAD MESSAGE
// ----------------------------------------
console.log("Kick Exquisite Loaded Successfully");

// ----------------------------------------
// SCROLL TO TOP BUTTON
// ----------------------------------------
const scrollBtn = document.createElement("button");
scrollBtn.innerText = "↑";
scrollBtn.id = "scrollTopBtn";
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ----------------------------------------
// CART BADGE
// ----------------------------------------
function updateCartBadge() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const badge = document.querySelector("#cart-count");

  if (badge) badge.textContent = cart.length;
}

updateCartBadge();

// ----------------------------------------
// ADD TO CART SYSTEM
// ----------------------------------------
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const item = {
      name: button.dataset.name,
      price: parseFloat(button.dataset.price),
      image: button.dataset.image,
      qty: 1
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existing = cart.find(p => p.name === item.name);

    if (existing) {
      existing.qty++;
    } else {
      cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
    showAddMessage(item.name);
  });
});

// ----------------------------------------
// ADDED TO CART POPUP
// ----------------------------------------
function showAddMessage(productName) {
  let msg = document.createElement("div");
  msg.className = "cart-message";
  msg.innerText = `${productName} added to cart!`;

  msg.style.position = "fixed";
  msg.style.bottom = "20px";
  msg.style.left = "50%";
  msg.style.transform = "translateX(-50%)";
  msg.style.background = "black";
  msg.style.color = "white";
  msg.style.padding = "12px 18px";
  msg.style.borderRadius = "8px";
  msg.style.opacity = "0.9";
  msg.style.zIndex = "9999";

  document.body.appendChild(msg);

  setTimeout(() => msg.remove(), 1600);
}

// ----------------------------------------
// CART PAGE LOADER
// ----------------------------------------
function loadCartPage() {
  const box = document.getElementById("cart-container");
  if (!box) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    box.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let html = `
    <table class="cart-table">
      <tr><th>Item</th><th>Qty</th><th>Price</th><th>Remove</th></tr>
  `;

  let total = 0;

  cart.forEach((item, idx) => {
    total += item.price * item.qty;

    html += `
      <tr>
        <td>${item.name}</td>
        <td>
          <button class="qty-btn" onclick="changeQty(${idx}, -1)">-</button>
          ${item.qty}
          <button class="qty-btn" onclick="changeQty(${idx}, 1)">+</button>
        </td>
        <td>R${(item.price * item.qty).toFixed(2)}</td>
        <td><button class="remove-btn" onclick="removeItem(${idx})">X</button></td>
      </tr>`;
  });

  html += `
    <tr class="total-row">
      <td><strong>Total</strong></td>
      <td></td>
      <td><strong>R${total.toFixed(2)}</strong></td>
      <td></td>
    </tr>
  </table>`;

  box.innerHTML = html;
}

loadCartPage();

// ----------------------------------------
// CHANGE QUANTITY
// ----------------------------------------
function changeQty(index, amount) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart[index].qty += amount;

  if (cart[index].qty <= 0) cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCartPage();
  updateCartBadge();
}

// ----------------------------------------
// REMOVE ITEM
// ----------------------------------------
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCartPage();
  updateCartBadge();
}