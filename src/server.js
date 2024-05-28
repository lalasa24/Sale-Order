// server.js

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/active-order-sales', (req, res) => {
  const formData = req.body;
  // Process the form data (e.g., save it to a database)
  console.log('Received form data:', formData);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
