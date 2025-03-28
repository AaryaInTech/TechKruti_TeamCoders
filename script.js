document.getElementById("itemForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const contact = document.getElementById("contact").value;

    const response = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, contact })
    });

    document.getElementById("itemForm").reset();
    fetchItems();
});

async function fetchItems() {
    const response = await fetch("http://localhost:5000/items");
    const items = await response.json();

    const itemsList = document.getElementById("itemsList");
    itemsList.innerHTML = "";

    items.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${item.title}</strong> - ${item.description} <br> Contact: ${item.contact}`;
        itemsList.appendChild(li);
    });
}

// Load items on page load
fetchItems();
