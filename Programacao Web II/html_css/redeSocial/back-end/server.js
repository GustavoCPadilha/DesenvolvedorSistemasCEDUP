// Importação das dependências necessárias
const express = require('express');    // Framework web
const cors = require('cors');          // Permite requisições de diferentes origens
const multer = require('multer');      // Middleware para upload de arquivos
const mysql = require('mysql2/promise'); // Cliente MySQL com suporte a Promises
const path = require('path');          // Manipulação de caminhos de arquivos
const fs = require('fs').promises;     // Operações de arquivo assíncronas

const app = express();
const PORT = 3000;
// Define o caminho absoluto para a pasta de uploads
const BASE_UPLOADS = path.join(__dirname, 'uploads');

// Configurações do Express
app.use(cors());                       // Habilita CORS para todas as rotas
app.use(express.json());              // Parse do corpo das requisições como JSON
app.use('/uploads', express.static(BASE_UPLOADS)); // Serve arquivos estáticos da pasta uploads

// Configuração do Multer para upload de arquivos
// Especifica onde e como os arquivos enviados serão salvos
const storage = multer.diskStorage({
  destination: BASE_UPLOADS,
  filename: (req, file, cb) => {
    // Gera um nome único baseado no timestamp para evitar conflitos
    const name = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, name);
  }
});
const upload = multer({ storage });

// DB pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'gustagram',
  waitForConnections: true,
  connectionLimit: 10
});

// POST /post -> cria post com imagem
app.post('/post', upload.single('imagem'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Arquivo de imagem é obrigatório.' });

    const texto = req.body.texto || '';
    const imagem_url = `/uploads/${req.file.filename}`;

    await pool.execute('INSERT INTO posts (texto, imagem_url) VALUES (?, ?)', [texto, imagem_url]);
    res.json({ sucesso: true, imagem_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET /posts -> lista posts (ordenados do mais novo ao mais antigo)
app.get('/posts', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET /post/:id/comments -> comentários de um post
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

// POST /post/:id/comment -> cria comentário
app.post('/post/:id/comment', async (req, res) => {
  const postId = req.params.id;
  const { texto, autor } = req.body;
  if (!texto || !texto.trim()) return res.status(400).json({ erro: 'Texto do comentário é obrigatório.' });

  try {
    const [result] = await pool.execute(
      'INSERT INTO comments (post_id, autor, texto) VALUES (?, ?, ?)',
      [postId, autor || 'gu._.padilha', texto]
    );

    const [rows] = await pool.execute('SELECT id, autor, texto, created_at FROM comments WHERE id = ?', [result.insertId]);
    res.json({ sucesso: true, comentario: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Rota para deletar um post
// Além de remover o registro do banco, também exclui o arquivo de imagem associado
app.delete('/post/:id', async (req, res) => {
  const id = req.params.id;
  try {
    // Primeiro busca o post para obter o caminho da imagem
    const [rows] = await pool.execute('SELECT imagem_url FROM posts WHERE id = ?', [id]);
    if (!rows || rows.length === 0) return res.status(404).json({ erro: 'Post não encontrado.' });

    const imagemUrl = rows[0].imagem_url || '';
    if (imagemUrl) {
      const arquivoRelativo = imagemUrl.replace(/^\/+/, '');
      const caminhoArquivo = path.resolve(__dirname, arquivoRelativo);
      try {
        await fs.unlink(caminhoArquivo);
      } catch (err) {
        console.warn('Arquivo não pôde ser removido (talvez já tenha sido removido):', err.message);
      }
    }

    await pool.execute('DELETE FROM posts WHERE id = ?', [id]);
    res.json({ sucesso: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Rodando em http://localhost:${PORT}`));
