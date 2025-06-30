// Import express
const express = require("express");

// Create express app
const app = express();

// Define port
const PORT = 3000;

// Home route that returns group names in HTML
app.get("/", (req, res) => {
  res.send(`
    <h1>Our Group</h1>
    <ul>
      <li>Rajendra Shrestha</li>
      <li>Girish Bisural</li>
      <li>Netra Bahadur Sutar Karki</li>
    </ul>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
