const productsContainer = document.getElementById("products");
const modal = document.getElementById("modal");

let selectedProduct = "";
let selectedPrice = "";
let selectedColor = "Blanco";

fetch("data/Toysclothing.xml")
.then(res => res.text())
.then(data => {

const parser = new DOMParser();
const xml = parser.parseFromString(data, "text/xml");

const items = xml.getElementsByTagName("product");

for (let i = 0; i < items.length; i++) {

    let name = items[i].getElementsByTagName("name")[0]?.textContent;
    let price = items[i].getElementsByTagName("price")[0]?.textContent;
    let img = items[i].getElementsByTagName("image")[0]?.textContent;
    let category = items[i].getElementsByTagName("category")[0]?.textContent || "all";

    if (!name || !price || !img) {
        console.error("Producto mal formado:", items[i]);
        continue;
    }

    let card = document.createElement("div");
    card.classList.add("card");
    card.dataset.category = category;

    card.innerHTML = `
        <img src="${img}" alt="${name}" width="100%">
        <h3>${name}</h3>
        <p>${price}€</p>
    `;

    card.onclick = () => openModal(name, price, img);

    productsContainer.appendChild(card);
}

})
.catch(error => console.error("Error cargando XML:", error));

function openModal(name, price, img) {

selectedProduct = name;
selectedPrice = price;

document.getElementById("modalTitle").innerText = name;
document.getElementById("modalPrice").innerText = price + "€";

document.getElementById("modalImg").src = img;

modal.classList.remove("hidden");


}

document.getElementById("closeModal").onclick = () => {
modal.classList.add("hidden");
};

document.getElementById("themeToggle").onclick = () => {
document.body.classList.toggle("dark");
};

document.getElementById("search").addEventListener("input", function() {

let value = this.value.toLowerCase();
let cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(value)
        ? "block"
        : "none";
});

});

function filter(category) {
let cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.style.display =
        category === "all" || card.dataset.category === category
        ? "block"
        : "none";
});

}

document.querySelectorAll(".color").forEach(c => {
c.addEventListener("click", () => {

    document.querySelectorAll(".color").forEach(el => el.classList.remove("active"));

    c.classList.add("active");

    selectedColor = c.dataset.color;
});


});

document.getElementById("buyBtn").onclick = () => {

let size = document.getElementById("size").value;
let address = document.getElementById("address").value;

let color = selectedColor;

if (address.trim() === "") {
    alert("Por favor, introduce la dirección de envío");
    return;
}

fetch("server/order.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `product=${selectedProduct}&size=${size}&color=${color}&address=${address}&price=${selectedPrice}`
})
.then(res => res.text())
.then(data => {
    alert(data);
    modal.classList.add("hidden");
})
.catch(err => console.error("Error al hacer pedido:", err));
};

const menuIcon = document.querySelector(".menu-icon");
const sideMenu = document.getElementById("sideMenu");
const closeMenu = document.getElementById("closeMenu");

menuIcon.onclick = () => {
    sideMenu.classList.add("open");
};

closeMenu.onclick = () => {
    sideMenu.classList.remove("open");
};

window.onclick = (e) => {
    if (e.target === sideMenu) {
        sideMenu.classList.remove("open");
    }
};
