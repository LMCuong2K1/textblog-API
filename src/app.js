const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello Mentor, Server Blog API is running!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});