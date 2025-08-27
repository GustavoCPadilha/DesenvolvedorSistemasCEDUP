const cors = require('cors');
const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/buscaPais', (req, res) => {
  db.query('SELECT pais, capital FROM PaisesCapitais', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
