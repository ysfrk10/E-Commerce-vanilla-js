let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function addToCart(id, name, price, image) {
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }
  saveCart();
  openCartDrawer();
  showToast(`${name} added to cart`);
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
}

function updateQuantity(id, change) {
  const item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      saveCart();
    }
  }
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className =
    "fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50 opacity-0 transform translate-y-5 transition-all duration-300 pointer-events-none";
  toast.innerText = message;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.remove("opacity-0", "translate-y-5");
  });

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-5");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function checkout() {
  if (cart.length === 0) {
    showToast("Your cart is empty.");
    return;
  }
  cart = [];
  saveCart();
  closeCartDrawer();
  showToast("checkout done successfully");
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCountElements = document.querySelectorAll(".cart-count");

  if (!cartItemsContainer || !cartTotal) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="text-gray-400 text-center py-4">Your cart is empty.</p>';
    cartTotal.innerText = "$0.00";
    cartCountElements.forEach((el) => (el.innerText = "0"));
    return;
  }

  let totalNum = 0;
  let countNum = 0;
  cartItemsContainer.innerHTML = cart
    .map((item) => {
      totalNum += item.price * item.quantity;
      countNum += item.quantity;
      return `
      <div class="flex items-center space-x-4 bg-gray-800 p-3 rounded-lg relative border border-gray-700">
        <img src="${item.image}" alt="${item.name.replace(/"/g, "&quot;")}" class="w-16 h-16 object-cover rounded">
        <div class="flex-1">
          <h4 class="text-sm font-bold text-white line-clamp-1" title="${item.name.replace(/"/g, "&quot;")}">${item.name}</h4>
          <p class="text-blue-400 text-sm font-semibold mt-1">$${item.price.toFixed(2)}</p>
          <div class="flex items-center space-x-2 mt-2">
            <button onclick="updateQuantity('${item.id}', -1)" class="w-6 h-6 bg-gray-700 rounded text-white flex items-center justify-center hover:bg-gray-600 transition-colors">-</button>
            <span class="text-white text-sm w-6 text-center">${item.quantity}</span>
            <button onclick="updateQuantity('${item.id}', 1)" class="w-6 h-6 bg-gray-700 rounded text-white flex items-center justify-center hover:bg-gray-600 transition-colors">+</button>
          </div>
        </div>
        <button onclick="removeFromCart('${item.id}')" class="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    })
    .join("");

  cartTotal.innerText = `$${totalNum.toFixed(2)}`;
  cartCountElements.forEach((el) => (el.innerText = countNum.toString()));
}

function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("overlay");
  if (!drawer || !overlay) return;
  overlay.classList.remove("hidden");
  setTimeout(() => {
    drawer.classList.remove("translate-x-full");
  }, 10);
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("overlay");
  if (!drawer || !overlay) return;
  drawer.classList.add("translate-x-full");

  setTimeout(() => {
    overlay.classList.add("hidden");
  }, 300);
}

document.addEventListener("DOMContentLoaded", () => {
  // Inject cart HTML
  const body = document.body;
  const cartHTML = `
  <!-- Overlay -->
  <div id="overlay"
       class="fixed inset-0 bg-black/50 hidden z-40"></div>
  <!-- Cart Drawer -->
  <div id="cart-drawer"
       class="fixed inset-y-0 right-0 w-80 bg-gray-900 border-l border-gray-700 shadow-2xl
              transform translate-x-full transition-transform duration-300 ease-in-out z-50 flex flex-col">

    <!-- Header -->
    <div class="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
      <h2 class="text-xl font-bold text-white">
        <i class="fas fa-shopping-cart text-blue-400 mr-2"></i>Your Cart
      </h2>
      <button onclick="closeCartDrawer()" class="text-gray-400 hover:text-white">
        <i class="fas fa-times text-xl"></i>
      </button>
    </div>

    <!-- Items -->
    <div id="cart-items" class="flex-1 overflow-y-auto p-4 space-y-4">
    </div>

    <!-- Footer -->
    <div class="p-4 border-t border-gray-700 bg-gray-800">
      <div class="flex justify-between items-center mb-4">
        <span class="text-gray-300 font-semibold">Total:</span>
        <span id="cart-total" class="text-xl font-black text-blue-400">$0.00</span>
      </div>

      <button onclick="checkout()" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg">
        Checkout
      </button>
    </div>

  </div>
`;

  // Append to body safely FIRST
  body.insertAdjacentHTML("beforeend", cartHTML);

  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("overlay");

  if (overlay) {
    overlay.addEventListener("click", closeCartDrawer);
  }

  updateCartUI();

  // Attach open listener to generic cart buttons
  const cartDrawerBtns = document.querySelectorAll(".cart-drawer-btn");
  cartDrawerBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  });
});
