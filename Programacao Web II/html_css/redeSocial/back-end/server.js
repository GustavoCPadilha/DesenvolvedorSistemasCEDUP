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
const fs = require('fs').promises; // <-- adicionado

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

// --- adicione estas rotas abaixo ---

// Rota para buscar comentários de um post
app.get('/post/:id/comments', async (req, res) => {
  const postId = req.params.id;
  try {
    const [rows] = await pool.execute(
      'SELECT id, autor, texto, created_at FROM comments WHERE post_id = ? ORDER BY created_at',
      [postId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Rota para criar comentário em um post
app.post('/post/:id/comment', async (req, res) => {
  const postId = req.params.id;
  const { texto, autor } = req.body;

  if (!texto || texto.trim() === '') {
    return res.status(400).json({ erro: 'Texto do comentário é obrigatório.' });
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO comments (post_id, autor, texto) VALUES (?, ?, ?)',
      [postId, autor || 'gu._.padilha', texto]
    );

    // retorna o comentário criado (id e timestamp)
    const [rows] = await pool.execute(
      'SELECT id, autor, texto, created_at FROM comments WHERE id = ?',
      [result.insertId]
    );

    res.json({ sucesso: true, comentario: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Rota para deletar post (e arquivo de imagem)
app.delete('/post/:id', async (req, res) => {
  const id = req.params.id;
  try {
    // busca imagem associada
    const [rows] = await pool.execute('SELECT imagem_url FROM posts WHERE id = ?', [id]);
    if (!rows || rows.length === 0) {
      return res.status(404).json({ erro: 'Post não encontrado.' });
    }

    const imagemUrl = rows[0].imagem_url || '';
    // remove arquivo de uploads (se existir)
    if (imagemUrl) {
      // imagem_url armazena algo como '/uploads/arquivo.jpg'
      const arquivoRelativo = imagemUrl.replace(/^\/+/, ''); // remove barra inicial
      const caminhoArquivo = path.resolve(__dirname, arquivoRelativo);
      try {
        await fs.unlink(caminhoArquivo);
      } catch (err) {
        // se arquivo não existir, apenas continua
        console.warn('Arquivo não pôde ser removido:', caminhoArquivo, err.message);
      }
    }

    // remove registro do banco
    await pool.execute('DELETE FROM posts WHERE id = ?', [id]);

    res.json({ sucesso: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Rodando em http://localhost:3000'));
