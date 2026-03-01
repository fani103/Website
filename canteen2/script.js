// ===== USER DATA =====
const users = [
    { email: "student@example.com", password: "1234", name: "Student User" },
    { email: "test@example.com", password: "test", name: "Test User" }
];

// ===== MENU ITEMS WITH IMAGES =====
const menuItems = [
    { id: 1, name: "Samosa", price: 15, available: true, image: "https://via.placeholder.com/300x200?text=Samosa" },
    { id: 2, name: "Biscuits", price: 10, available: true, image: "https://via.placeholder.com/300x200?text=Biscuits" },
    { id: 3, name: "Poha", price: 20, available: true, image: "https://via.placeholder.com/300x200?text=Poha" },
    { id: 4, name: "Tea", price: 10, available: true, image: "https://via.placeholder.com/300x200?text=Tea" },
    { id: 5, name: "Sandwich", price: 30, available: true, image: "https://via.placeholder.com/300x200?text=Sandwich" },
    { id: 6, name: "Momo", price: 25, available: true, image: "https://via.placeholder.com/300x200?text=Momo" },
    { id: 7, name: "Pav Bhaji", price: 50, available: true, image: "https://via.placeholder.com/300x200?text=Pav+Bhaji" },
    { id: 8, name: "Misai", price: 50, available: true, image: "https://via.placeholder.com/300x200?text=Misai" },
    { id: 9, name: "Daal Chawal", price: 60, available: true, image: "https://via.placeholder.com/300x200?text=Daal+Chawal" },
    { id: 10, name: "Puri Bhaji", price: 40, available: true, image: "https://via.placeholder.com/300x200?text=Puri+Bhaji" },
    { id: 11, name: "Upma", price: 25, available: false, image: "https://via.placeholder.com/300x200?text=Upma" },
    { id: 12, name: "Lays", price: 20, available: true, image: "https://via.placeholder.com/300x200?text=Lays" }
];

// ===== LOGIN PAGE =====
if (document.getElementById("login-form")) {
    document.getElementById("login-form").addEventListener("submit", function(e) {
        e.preventDefault();
        
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const errorEl = document.getElementById("login-error");
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem("currentUser", user.name);
            localStorage.setItem("userEmail", email);
            window.location.href = "home.html";
        } else {
            errorEl.innerText = "❌ Invalid email or password!";
        }
    });
}

// ===== SIGNUP PAGE =====
if (document.getElementById("signup-form")) {
    document.getElementById("signup-form").addEventListener("submit", function(e) {
        e.preventDefault();
        
        const fullname = document.getElementById("fullname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const errorEl = document.getElementById("signup-error");
        
        if (password !== confirmPassword) {
            errorEl.innerText = "❌ Passwords do not match!";
            return;
        }
        
        if (users.find(u => u.email === email)) {
            errorEl.innerText = "❌ Email already registered!";
            return;
        }
        
        users.push({ email, password, name: fullname });
        localStorage.setItem("currentUser", fullname);
        localStorage.setItem("userEmail", email);
        window.location.href = "home.html";
    });
}

// ===== CHECK LOGIN =====
function checkLogin() {
    const user = localStorage.getItem("currentUser");
    if (!user) {
        window.location.href = "index.html";
    }
}

if (window.location.pathname.includes("home.html") ||
    window.location.pathname.includes("cart.html") ||
    window.location.pathname.includes("order-confirmation.html")) {
    checkLogin();
}

// ===== LOAD MENU =====
if (document.getElementById("menu-items")) {
    loadMenu(menuItems);
    updateCartCount();
    
    const userName = localStorage.getItem("currentUser");
    if (document.getElementById("user-name")) {
        document.getElementById("user-name").innerText = userName || "User";
    }
}

function loadMenu(items) {
    const container = document.getElementById("menu-items");
    container.innerHTML = "";
    
    items.forEach(item => {
        const available = item.available ? "Available" : "Sold Out";
        const availableClass = item.available ? "available" : "unavailable";
        const disabled = !item.available ? "disabled" : "";
        
        container.innerHTML += `
            <div class="menu-item">
                <img src="${item.image}" alt="${item.name}" class="menu-item-image">
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <p class="price">₹${item.price}</p>
                    <span class="availability ${availableClass}">${available}</span>
                    <div class="menu-item-actions">
                        <button class="btn-add-cart" onclick="addToCart(${item.id})" ${disabled}>
                            ${item.available ? "🛒 Add to Cart" : "Out of Stock"}
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// ===== SEARCH FUNCTION =====
function searchFood() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    const filtered = menuItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm)
    );
    loadMenu(filtered);
}

// ===== ADD TO CART =====
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("✅ Added to cart!");
}

// ===== UPDATE CART COUNT =====
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.innerText = cart.length;
    }
}

// ===== LOAD CART =====
if (document.getElementById("cart-items")) {
    loadCart();
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cart-items");
    let subtotal = 0;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <p>🛒 Your cart is empty!</p>
                <p>Add some delicious items to get started.</p>
            </div>
        `;
    } else {
        container.innerHTML = "";
        cart.forEach((id, index) => {
            const item = menuItems.find(i => i.id === id);
            subtotal += item.price;
            
            container.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>₹${item.price}</p>
                    </div>
                    <div class="cart-item-price">₹${item.price}</div>
                    <button class="btn-remove" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
        });
    }
    
    updateSummary(subtotal);
}

// ===== UPDATE SUMMARY =====
function updateSummary(subtotal) {
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;
    
    document.getElementById("subtotal").innerText = subtotal;
    document.getElementById("tax").innerText = tax;
    document.getElementById("total-price").innerText = total;
}

// ===== REMOVE FROM CART =====
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

// ===== PLACE ORDER =====
function placeOrder() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("❌ Cart is empty!");
        return;
    }
    
    localStorage.removeItem("cart");
    updateCartCount();
    window.location.href = "order-confirmation.html";
}

// ===== ORDER CONFIRMATION =====
if (document.getElementById("order-details")) {
    const user = localStorage.getItem("currentUser");
    const currentTime = new Date().toLocaleString();
    const estimatedTime = new Date(Date.now() + 30 * 60000).toLocaleTimeString();
    
    document.getElementById("order-details").innerText = `Thank you ${user} for your order!`;
    document.getElementById("order-time").innerText = `Order placed at: ${currentTime}`;
    document.getElementById("estimated-time").innerText = `Estimated delivery: ${estimatedTime}`;
}

// ===== LOGOUT =====
function logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}