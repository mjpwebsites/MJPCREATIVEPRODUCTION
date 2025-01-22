const express = require('express');
const path = require('path'); // Built-in Node.js module to work with file paths

const app = express();
const port = 3000;

// Serve the HTML file for '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
