const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

let items = [];

// API to add an item
app.post("/add", (req, res) => {
    items.push(req.body);
    res.send({ message: "Item added", data: req.body });
});

// API to fetch all items
app.get("/items", (req, res) => {
    res.send(items);
});

// Serve frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(5000, () => console.log("Server running on port 5000"));
