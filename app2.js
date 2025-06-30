const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Route to serve JSON data
app.get("/items", (req, res) => {
  const filePath = path.join(__dirname, "data", "items.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading JSON file");
    }
    res.send(data); // raw JSON
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
