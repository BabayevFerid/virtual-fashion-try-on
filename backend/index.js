const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

const clothes = require('./clothes.json');

app.get('/api/clothes', (req, res) => {
  res.json(clothes);
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
