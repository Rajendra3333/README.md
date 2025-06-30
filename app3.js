const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Path to JSON file
const filePath = path.join(__dirname, "data", "items.json");

// Helper to read and write file
const readData = () => JSON.parse(fs.readFileSync(filePath));
const writeData = (data) =>
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// GET all items
app.get("/items", (req, res) => {
  const items = readData();
  res.json(items);
});

// CREATE new item
app.post("/items", (req, res) => {
  const items = readData();
  const newItem = req.body;
  newItem.id = items.length + 1;
  items.push(newItem);
  writeData(items);
  res.status(201).json(newItem);
});

// UPDATE item by ID
app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  const items = readData();
  const index = items.findIndex((item) => item.id === id);
  if (index !== -1) {
    items[index] = { id, ...updatedItem };
    writeData(items);
    res.json(items[index]);
  } else {
    res.status(404).send("Item not found");
  }
});

// DELETE item by ID
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const items = readData();
  const newItems = items.filter((item) => item.id !== id);
  if (items.length === newItems.length) {
    return res.status(404).send("Item not found");
  }
  writeData(newItems);
  res.send("Item deleted");
});

app.listen(PORT, () => {
  console.log(`CRUD API running on http://localhost:${PORT}`);
});
