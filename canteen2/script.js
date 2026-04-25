/* =========================
   Modern Canteen (Swiggy-style)
   Multi-page app (localStorage)
========================= */

// ---------- DEFAULT USERS (stored once) ----------
const DEFAULT_USERS = [
  { email: "student@example.com", password: "1234", name: "Student User" },
  { email: "test@example.com", password: "test", name: "Test User" }
  { email:"gurramtharakeswarreddy@gmail.com",password:"123456",name:"user"}
];

function getUsers() {
  const saved = JSON.parse(localStorage.getItem("users"));
  if (saved && Array.isArray(saved) && saved.length) return saved;
  localStorage.setItem("users", JSON.stringify(DEFAULT_USERS));
  return DEFAULT_USERS;
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// ---------- MENU DATA ----------
const menuItems = [
  { id: 1,  name: "Samosa",      price: 15, available: true,  category:"Starters", veg:true,  rating:4.5, time:"10-15", image:"images/samosa.jpg" },
  { id: 2,  name: "Biscuits",    price: 10, available: true,  category:"Starters", veg:true,  rating:4.0, time:"5-10",  image:"images/biscuit.jpg" },
  { id: 3,  name: "Poha",        price: 20, available: true,  category:"Mains",    veg:true,  rating:4.3, time:"15-20", image:"images/pulihora.jpg" },
  { id: 4,  name: "Tea",         price: 10, available: true,  category:"Drinks",   veg:true,  rating:4.6, time:"5-8",   image:"images/tea.jpg" },
  { id: 5,  name: "Sandwich",    price: 30, available: true,  category:"Mains",    veg:true,  rating:4.2, time:"12-18", image:"images/sandwitch.jpg" },
  { id: 6,  name: "Momo",        price: 25, available: true,  category:"Starters", veg:false, rating:4.4, time:"12-18", image:"images/momo.jpg" },
  { id: 7,  name: "Pav Bhaji",   price: 50, available: true,  category:"Mains",    veg:true,  rating:4.7, time:"18-25", image:"images/pacv bhaji.jpg" },
  { id: 8,  name: "Chicken",     price: 50, available: true,  category:"Mains",    veg:false, rating:4.1, time:"10-15", image:"images/misai.jpg" },
  { id: 9,  name: "Daal Chawal", price: 60, available: true,  category:"Mains",    veg:true,  rating:4.3, time:"20-30", image:"images/dal chawal.jpg" },
  { id: 10, name: "Puri Bhaji",  price: 40, available: true,  category:"Mains",    veg:true,  rating:4.2, time:"18-25", image:"images/puri.jpg" },
  { id: 11, name: "Upma",        price: 25, available: false, category:"Mains",    veg:true,  rating:4.0, time:"15-20", image:"images/upma.jpg" },
  { id: 12, name: "Lays",        price: 20, available: true,  category:"Starters", veg:true,  rating:4.0, time:"2-5",   image:"images/lays.jpg" }
];
// ---------- STATE ----------
let activeCategory = "All";
let vegOnly = false;
let sortAsc = true;

// ---------- HELPERS ----------
function qs(id){ return document.getElementById(id); }

function toast(msg){
  const t = qs("toast");
  if(!t) return;
  t.innerText = msg;
  t.style.display = "block";
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=> t.style.display="none", 1600);
}

function getTable(){
  const params = new URLSearchParams(window.location.search);
  return params.get("table") || localStorage.getItem("table") || "T1";
}
function setTablePersist(){
  localStorage.setItem("table", getTable());
}

function formatINR(n){ return `₹${n}`; }

// CART stored as object: { [id]: qty }
function getCart(){
  return JSON.parse(localStorage.getItem("cartV2")) || {};
}
function saveCart(cart){
  localStorage.setItem("cartV2", JSON.stringify(cart));
}
function cartCount(cart){
  return Object.values(cart).reduce((a,b)=>a+b,0);
}
function cartSubtotal(cart){
  let sum = 0;
  for(const [id, qty] of Object.entries(cart)){
    const item = menuItems.find(i=>i.id === Number(id));
    if(item) sum += item.price * qty;
  }
  return sum;
}

function updateCartCountUI(){
  const cart = getCart();
  const count = cartCount(cart);
  const el = qs("cart-count");
  if(el) el.innerText = count;

  const sticky = qs("sticky-cart");
  const stickySub = qs("sticky-sub");
  if(sticky && stickySub){
    const subtotal = cartSubtotal(cart);
    stickySub.innerText = `${count} items • ${formatINR(subtotal)}`;
  }
}

function addToCart(id){
  const item = menuItems.find(i=>i.id === id);
  if(!item || !item.available) return;

  const cart = getCart();
  cart[id] = (cart[id] || 0) + 1;
  saveCart(cart);
  updateCartCountUI();
  toast("Added to cart ✅");
  // refresh quantity buttons
  renderMenu();
}

function decFromCart(id){
  const cart = getCart();
  if(!cart[id]) return;
  cart[id]--;
  if(cart[id] <= 0) delete cart[id];
  saveCart(cart);
  updateCartCountUI();
  renderMenu();
  loadCart();
}

function incFromCart(id){
  addToCart(id);
  loadCart();
}

// ---------- AUTH ----------
function checkLogin(){
  const user = localStorage.getItem("currentUser");
  if(!user){
    window.location.href = "index.html";
  }
}

// LOGIN FORM
if(qs("login-form")){
  qs("login-form").addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = qs("email").value.trim();
    const password = qs("password").value.trim();
    const errorEl = qs("login-error");

    const users = getUsers();
    const user = users.find(u=>u.email === email && u.password === password);

    if(user){
      localStorage.setItem("currentUser", user.name);
      localStorage.setItem("userEmail", user.email);
      window.location.href = "home.html";
    }else{
      errorEl.innerText = "❌ Invalid email or password!";
    }
  });
}

// SIGNUP FORM
if(qs("signup-form")){
  qs("signup-form").addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = qs("fullname").value.trim();
    const email = qs("email").value.trim();
    const password = qs("password").value.trim();
    const confirm = qs("confirm-password").value.trim();
    const errorEl = qs("signup-error");

    if(password !== confirm){
      errorEl.innerText = "❌ Passwords do not match!";
      return;
    }

    const users = getUsers();
    if(users.find(u=>u.email === email)){
      errorEl.innerText = "❌ Email already registered!";
      return;
    }

    users.push({ email, password, name });
    saveUsers(users);

    localStorage.setItem("currentUser", name);
    localStorage.setItem("userEmail", email);

    window.location.href = "home.html";
  });
}

// pages that require auth
if(
  window.location.pathname.includes("home.html") ||
  window.location.pathname.includes("cart.html") ||
  window.location.pathname.includes("order-confirmation.html")
){
  checkLogin();
  setTablePersist();
}

// ---------- MENU RENDER ----------
function filteredMenu(){
  const q = (qs("search-input")?.value || "").toLowerCase();
  return menuItems
    .filter(i => activeCategory === "All" ? true : i.category === activeCategory)
    .filter(i => vegOnly ? i.veg : true)
    .filter(i => (i.name.toLowerCase().includes(q)))
    .sort((a,b)=> sortAsc ? a.price-b.price : b.price-a.price);
}

function renderMenu(){
  const grid = qs("menu-items");
  if(!grid) return;

  const cart = getCart();
  const items = filteredMenu();

  grid.innerHTML = items.map(item=>{
    const qty = cart[item.id] || 0;
    const vegTag = item.veg ? `<span class="tag veg">VEG</span>` : `<span class="tag nonveg">NON-VEG</span>`;
    const ratingTag = `<span class="tag rating">⭐ ${item.rating}</span>`;
    const stockTag = item.available ? `` : `<span class="tag" style="color:#991b1b;background:#fff1f2;border-color:#fecaca">SOLD OUT</span>`;

    const controls = item.available
      ? (qty > 0
        ? `<div class="qty">
            <button onclick="decFromCart(${item.id})">−</button>
            <span>${qty}</span>
            <button onclick="incFromCart(${item.id})">+</button>
          </div>`
        : `<button class="btn btn-primary" onclick="addToCart(${item.id})">Add</button>`
      )
      : `<button class="btn" style="background:#e5e7eb;color:#6b7280;cursor:not-allowed" disabled>Unavailable</button>`;

    return `
      <div class="card">
        <img src="${item.image}" alt="${item.name}">
        <div class="card-body">
          <div class="title-row">
            <div>
              <div class="item-title">${item.name}</div>
              <div class="meta">${item.category} • ${item.time} min</div>
            </div>
            <div class="price">${formatINR(item.price)}</div>
          </div>

          <div class="tags">
            ${vegTag}
            ${ratingTag}
            ${stockTag}
          </div>

          <div class="qty-row">
            <div class="meta">Best for quick bite</div>
            ${controls}
          </div>
        </div>
      </div>
    `;
  }).join("");

  // set active pill UI
  document.querySelectorAll(".pill").forEach(p=>p.classList.remove("active"));
  const pills = Array.from(document.querySelectorAll(".pill"));
  const pill = pills.find(p => p.innerText.trim().toLowerCase() === activeCategory.toLowerCase());
  if(pill) pill.classList.add("active");
}

// public functions used by HTML
window.setCategory = function(cat){
  activeCategory = cat;
  renderMenu();
};
window.toggleVegOnly = function(){
  vegOnly = !vegOnly;
  toast(vegOnly ? "Veg only ✅" : "Veg filter removed");
  renderMenu();
};
window.sortByPrice = function(){
  sortAsc = !sortAsc;
  toast(sortAsc ? "Sorted: low → high" : "Sorted: high → low");
  renderMenu();
};
window.searchFood = function(){
  renderMenu();
};

// load menu on home
if(qs("menu-items")){
  const userName = localStorage.getItem("currentUser") || "User";
  if(qs("user-name")) qs("user-name").innerText = userName;

  const table = getTable();
  if(qs("table-chip")) qs("table-chip").innerText = `Table ${table}`;

  updateCartCountUI();
  renderMenu();
}

// ---------- CART PAGE ----------
function loadCart(){
  const container = qs("cart-items");
  if(!container) return;

  const cart = getCart();
  const entries = Object.entries(cart);

  if(entries.length === 0){
    container.innerHTML = `
      <div class="muted" style="padding:14px">
        🛒 Your cart is empty. Go to Menu and add items.
      </div>
    `;
    updateSummary(0);
    return;
  }

  container.innerHTML = entries.map(([id, qty])=>{
    const item = menuItems.find(i=>i.id === Number(id));
    if(!item) return "";
    const lineTotal = item.price * qty;

    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div style="flex:1">
          <h4>${item.name}</h4>
          <div class="muted">${item.category} • ${item.time} min</div>
          <div class="qty" style="margin-top:10px">
            <button onclick="decFromCart(${item.id})">−</button>
            <span>${qty}</span>
            <button onclick="incFromCart(${item.id})">+</button>
          </div>
        </div>
        <div style="text-align:right;font-weight:900;color:var(--swiggy)">
          ${formatINR(lineTotal)}
          <div>
            <button class="btn" style="background:#fff1f2;color:#991b1b;border:1px solid #fecaca;margin-top:10px"
              onclick="removeItem(${item.id})">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  updateSummary(cartSubtotal(cart));
}

function updateSummary(subtotal){
  const tax = Math.round(subtotal * 0.05);
  const service = subtotal > 0 ? 10 : 0;
  const total = subtotal + tax + service;

  if(qs("subtotal")) qs("subtotal").innerText = subtotal;
  if(qs("tax")) qs("tax").innerText = tax;
  if(qs("service")) qs("service").innerText = service;
  if(qs("total-price")) qs("total-price").innerText = total;
}

window.removeItem = function(id){
  const cart = getCart();
  delete cart[id];
  saveCart(cart);
  updateCartCountUI();
  loadCart();
  toast("Removed ❌");
};

if(qs("cart-items")){
  updateCartCountUI();
  loadCart();
}

// ---------- ORDER ----------
window.placeOrder = function(){
  const cart = getCart();
  if(cartCount(cart) === 0){
    toast("Cart is empty ❌");
    return;
  }

  // Create fake order
  const orderId = "ORD-" + Math.floor(100000 + Math.random()*900000);
  const table = getTable();
  const subtotal = cartSubtotal(cart);
  const tax = Math.round(subtotal * 0.05);
  const service = 10;
  const total = subtotal + tax + service;

  const order = {
    orderId,
    table,
    total,
    time: new Date().toLocaleString(),
    eta: new Date(Date.now() + 25*60000).toLocaleTimeString()
  };

  localStorage.setItem("lastOrder", JSON.stringify(order));
  localStorage.removeItem("cartV2");
  updateCartCountUI();
  window.location.href = "order-confirmation.html";
};

// confirmation page
if(qs("order-details")){
  const user = localStorage.getItem("currentUser") || "Guest";
  const order = JSON.parse(localStorage.getItem("lastOrder") || "{}");

  qs("order-details").innerText = `Thanks ${user}! Your order ${order.orderId || ""} is confirmed.`;
  qs("order-time").innerText = `Order time: ${order.time || new Date().toLocaleString()}`;
  qs("estimated-time").innerText = `Estimated ready by: ${order.eta || new Date(Date.now()+25*60000).toLocaleTimeString()}`;
  const tableEl = qs("table-info");
  if(tableEl) tableEl.innerText = `Table: ${order.table || getTable()} • Total: ${formatINR(order.total || 0)}`;
}

// ---------- LOGOUT ----------
window.logout = function(){
  localStorage.removeItem("currentUser");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("cartV2");
  window.location.href = "index.html";
};