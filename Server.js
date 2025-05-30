// Epic Dragon Ball Z Style Animated HTML Server for SepevsPepe
// Usage: node server.js
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files (css, js, images)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`SepevsPepe Epic Server is running at http://localhost:${PORT}`);
});