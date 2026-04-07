const API = "https://TWOJ-BACKEND.onrender.com";

const products = [
  { name: "Crystal Vape X", price: 30 },
  { name: "Crystal Liquid Mango", price: 25 }
];

let selectedProduct = null;

const container = document.getElementById("products");

products.forEach(p => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <h3>${p.name}</h3>
    <p>${p.price} zł</p>
    <button onclick='openModal("${p.name}")'>Zamów</button>
  `;
  container.appendChild(div);
});

function openModal(name) {
  selectedProduct = name;
  document.getElementById("modal").classList.remove("hidden");
}

async function submitOrder() {
  const quantity = document.getElementById("quantity").value;
  const payment = document.getElementById("payment").value;

  await fetch(API + "/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      product: selectedProduct,
      quantity,
      payment
    })
  });

  alert("Zamówienie wysłane!");
}
