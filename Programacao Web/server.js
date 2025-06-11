//C:\Users\lucas\OneDrive\Desktop\APILogin> nodemon server.js

//Dependências
//npm init -y
//npm install express mysql2 dotenv
//npm install cors

const cors = require('cors');

const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 3000;

// Rota GET - Listar usuários
app.get('/buscaUsuario', (req, res) => {
  db.query('SELECT * FROM usuario', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Rota GET - Listar Exercícios
app.get('/buscaExercicio', (req, res) => {
  db.query('SELECT * FROM exercicio', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Rota GET - Listar Alimentos
app.get('/buscaAlimento', (req, res) => {
  db.query('SELECT * FROM alimento', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Rota POST - Criar novo usuário
app.post('/usuarios', (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.status(400).json({ error: 'login e senha são obrigatórios' });
  }

  const sql = 'SELECT * FROM clientes WHERE login = ? AND senha = ?';
  db.query(sql, [login, senha], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Login bem-sucedido
    const user = results[0];
    res.json({
      message: 'Login bem-sucedido',
      user: {
        id: user.id,
        login: user.login,
        senha: user.senha
      }
    });
  });
});

//ROTA POST - Cadastro de novos usuarios
app.post('/cadastraUsuario', (req, res) => {
  const { nome_usuario, email, senha, data_nascimento, sexo, altura, peso_usuario } = req.body;

  if (!nome_usuario || !email || !senha || !data_nascimento || !sexo || !altura || !peso_usuario) {
    return res.status(400).json({ error: 'Preencha todos os dados solicitados!' });
  }

  const sql = 'INSERT INTO usuario (nome_usuario, email, senha, data_nascimento, sexo, altura, peso_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [nome_usuario, email, senha, data_nascimento, sexo, altura, peso_usuario ], (err, result) => {
    if (err) { 
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Usuário já está cadastrado' });
      }
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({ message: 'Usuário registrado com sucesso', id: result.insertId });
  });
});

//ROTA POST - Cadastro de novos alimentos
app.post('/cadastraAlimento', (req, res) => {
  const { nome_alimento, calorias_alimento, proteinas_alimento, carboidratos_alimento, gorduras_alimento } = req.body;

  if (!nome_alimento || !calorias_alimento || !proteinas_alimento || !carboidratos_alimento || !gorduras_alimento) {
    return res.status(400).json({ error: 'Preencha todos os dados solicitados!' });
  }

  const sql = 'INSERT INTO alimento (nome_alimento, calorias_alimento, proteinas_alimento, carboidratos_alimento, gorduras_alimento) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nome_alimento, calorias_alimento, proteinas_alimento, carboidratos_alimento, gorduras_alimento], (err, result) => {
    if (err) { 
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Alimento já cadastrado' });
      }
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({ message: 'Alimento registrado com sucesso', id: result.insertId });
  });
});

//ROTA POST - Cadastro de novos exercícios
app.post('/cadastraExercicio', (req, res) => {
  const { nome_exercicio, grupo_muscular, descricao_exercicio } = req.body;

  if (!nome_exercicio || !grupo_muscular || !descricao_exercicio) {
    return res.status(400).json({ error: 'Preencha todos os dados solicitados!' });
  }

  const sql = 'INSERT INTO exercicio (nome_exercicio, grupo_muscular, descricao_exercicio) VALUES (?, ?, ?)';
  db.query(sql, [nome_exercicio, grupo_muscular, descricao_exercicio], (err, result) => {
    if (err) { 
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Exercício já cadastrado' });
      }
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({ message: 'Exercício registrado com sucesso', id: result.insertId });
  });
});


// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});