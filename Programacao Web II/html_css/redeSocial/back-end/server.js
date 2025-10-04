/*
Dependências
npm init -y
npm install express cors multer mysql2
npm install -g nodemon
*/

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Configura o Multer
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const nomeArquivo = Date.now() + path.extname(file.originalname);
    cb(null, nomeArquivo);
  }
});
const upload = multer({ storage });

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'gustagram'
};

const pool = mysql.createPool(dbConfig);

// Rota para criar post com imagem
app.post('/post', upload.single('imagem'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Arquivo de imagem é obrigatório.' });
    }
    const texto = req.body.texto;
    const imagem_url = '/uploads/' + req.file.filename;

    await pool.execute('INSERT INTO posts (texto, imagem_url) VALUES (?, ?)', [texto, imagem_url]);
    res.json({ sucesso: true, imagem_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para buscar posts
app.get('/posts', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM posts ORDER BY created_at');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Rodando em http://localhost:3000'));
