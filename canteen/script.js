// ---------------- STUDENT DATA ----------------
const students = [
    { regNo: "23CS001", password: "1234" },
    { regNo: "23CS002", password: "1234" },
    { regNo: "23CS003", password: "1234" },
    { regNo: "23CS004", password: "1234" },
    { regNo: "23CS005", password: "1234" }
];

// ---------------- MENU ITEMS ----------------
const menuItems = [
    { id: 1, name: "Samosa", price: 15 },
    { id: 2, name: "Biscuits", price: 10 },
    { id: 3, name: "Lays", price: 20 },
    { id: 4, name: "Kurkure", price: 20 },
    { id: 5, name: "Sandwich", price: 30 },
    { id: 6, name: "Tea", price: 10 }
];

// ---------------- LOGIN ----------------
if (document.getElementById("login-form")) {
    document.getElementById("login-form").addEventListener("submit", function(e) {
        e.preventDefault();

        const regNo = document.getElementById("regNo").value;
        const password = document.getElementById("password").value;

        const user = students.find(
            student => student.regNo === regNo && student.password === password
        );

        if (user) {
            localStorage.setItem("currentUser", regNo);
            window.location.href = "home.html";
        } else {
            document.getElementById("login-error").innerText = "Invalid Credentials";
        }
    });
}

// ---------------- CHECK LOGIN ----------------
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

// ---------------- LOAD MENU ----------------
if (document.getElementById("menu-items")) {
    const container = document.getElementById("menu-items");
    menuItems.forEach(item => {
        container.innerHTML += `
            <div class="menu-item">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
                <button onclick="addToCart(${item.id})">Add</button>
            </div>
        `;
    });
}

// ---------------- CART ----------------
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

if (document.getElementById("cart-items")) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cart-items");
    let total = 0;

    cart.forEach(id => {
        const item = menuItems.find(i => i.id === id);
        total += item.price;
        container.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
    });

    document.getElementById("total-price").innerText = total;
}

// ---------------- PLACE ORDER ----------------
function placeOrder() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    localStorage.removeItem("cart");
    window.location.href = "order-confirmation.html";
}

// ---------------- ORDER CONFIRM ----------------
if (document.getElementById("order-details")) {
    const user = localStorage.getItem("currentUser");
    document.getElementById("order-details").innerText =
        "Thank you " + user + " for your order!";
}

// ---------------- LOGOUT ----------------
function logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}