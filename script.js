const plants = [
    { id: 1, name: "Snake Plant", price: 20 },
    { id: 2, name: "Aloe Vera", price: 15 },
    { id: 3, name: "Peace Lily", price: 25 },
    { id: 4, name: "Spider Plant", price: 18 },
    { id: 5, name: "Fiddle Leaf Fig", price: 40 },
    { id: 6, name: "Pothos", price: 12 },
    { id: 7, name: "Rubber Plant", price: 30 },
    { id: 8, name: "Monstera", price: 35 },
    { id: 9, name: "Cactus", price: 10 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById("cart-count");
    if (cartCount) cartCount.innerText = count;
}

function displayProducts() {
    const container = document.getElementById("product-container");
    if (!container) return;

    plants.forEach(plant => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <h3>${plant.name}</h3>
            <p>$${plant.price}</p>
            <button onclick="addToCart(${plant.id})">Add to Cart</button>
        `;
        container.appendChild(div);
    });
}

function addToCart(id) {
    const plant = plants.find(p => p.id === id);
    const existing = cart.find(p => p.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...plant, quantity: 1 });
    }

    saveCart();
}

function displayCart() {
    const container = document.getElementById("cart-items");
    const totalSpan = document.getElementById("cart-total");
    if (!container) return;

    container.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <p>Quantity: 
                <button onclick="changeQty(${item.id}, -1)">-</button>
                ${item.quantity}
                <button onclick="changeQty(${item.id}, 1)">+</button>
            </p>
            <p>Total: $${item.price * item.quantity}</p>
            <button onclick="removeItem(${item.id})">Delete</button>
            <hr>
        `;
        container.appendChild(div);
    });

    totalSpan.innerText = total;
}

function changeQty(id, amount) {
    const item = cart.find(p => p.id === id);
    if (!item) return;

    item.quantity += amount;
    if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== id);
    }

    saveCart();
    displayCart();
}

function removeItem(id) {
    cart = cart.filter(p => p.id !== id);
    saveCart();
    displayCart();
}

function checkout() {
    alert("Checkout Coming Soon!");
}

updateCartCount();
displayProducts();
displayCart();
