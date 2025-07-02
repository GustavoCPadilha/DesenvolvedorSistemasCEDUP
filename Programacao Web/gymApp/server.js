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

// Rota GET - Planilha de treino
app.get('/buscaPlanilhaTreino', (req, res) => {
  db.query('SELECT * FROM planilhaTreino', (err, results) => {
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

// Rota GET - Progressão de carga
app.get('/buscaProgressoCarga', (req, res) => {
  db.query('SELECT * FROM progressoCarga', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Rota GET - Peso corporal
app.get('/buscaPesoCorporal', (req, res) => {
  db.query('SELECT * FROM pesoCorporal', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Rota GET - Medida corporal
app.get('/buscaMedidaCorporal', (req, res) => {
  db.query('SELECT * FROM medidaCorporal', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Rota GET - Refeições
app.get('/buscaRefeicao', (req, res) => {
  db.query('SELECT * FROM refeicao', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Rota GET - Calorias diárias
app.get('/buscaCaloriasDiarias', (req, res) => {
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

// Rota GET - Passos
app.get('/buscaPassos', (req, res) => {
  db.query('SELECT * FROM passos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Rota GET - Histórico do treino
app.get('/buscaHistoricoTreino', (req, res) => {
  db.query('SELECT * FROM historicoTreino', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Rota GET - Treino
app.get('/buscaTreino', (req, res) => {
  db.query('SELECT * FROM treino', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// ----------------------------

// Rota POST - Fazer login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'email e senha são obrigatórios' });
  }

  const sql = 'SELECT * FROM usuario WHERE email = ? AND senha = ?';
  db.query(sql, [email, senha], (err, results) => {
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
        email: user.email,
        senha: user.senha,
        nome_usuario: user.nome_usuario
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

// ROTA POST - Cadastro de planilha de treino
app.post('/cadastraPlanilhaTreino', (req, res) => {
  const { nome_planilhaTreino, data_inicio, ativa_planilhaTreino } = req.body;

  if (!nome_planilhaTreino || !data_inicio || !ativa_planilhaTreino) {
    return res.status(400).json({ error: 'Preencha todos os dados solicitados!' });
  }

  const sql = 'INSERT INTO planilhaTreino (nome_planilhaTreino, data_inicio, ativa_planilhaTreino) VALUES (?, ?, ?)';
  db.query(sql, [nome_planilhaTreino, data_inicio, ativa_planilhaTreino], (err, result) => {
    if (err) { 
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Planilha de treino já cadastrada' });
      }
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({ message: 'Planilha de treino registrada com sucesso', id: result.insertId });
  });
});

// ROTA POST - Cadastro progressão de carga
app.post('/cadastraProgressoCarga', (req, res) => {
  const { dia_progressoCarga, repeticoes_progressoCarga, carga_progressoCarga } = req.body;

  if (!dia_progressoCarga || !repeticoes_progressoCarga || !carga_progressoCarga) {
    return res.status(400).json({ error: 'Preencha todos os dados solicitados!' });
  }

  const sql = 'INSERT INTO progressoCarga (dia_progressoCarga, repeticoes_progressoCarga, carga_progressoCarga) VALUES (?, ?, ?)';
  db.query(sql, [dia_progressoCarga, repeticoes_progressoCarga, carga_progressoCarga], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Progressão já cadastrada.' });
      }
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({ message: 'Progressão de carga registrado com sucesso', id: result.insertId });
  });
});

// ROTA POST - Cadastro medida corporal
app.post('/cadastraMedidaCorporal', (req, res) => {
  const { dia_medidaCorporal, regiao_medidaCorporal, medida_cm } = req.body;

  if (!dia_medidaCorporal || !regiao_medidaCorporal || !medida_cm) {
    return res.status(400).json({ error: 'Preencha todos os dados solicitados!' });
  }

  const sql = 'INSERT INTO medidaCorporal (dia_medidaCorporal, regiao_medidaCorporal, medida_cm) VALUES (?, ?, ?)';
  db.query(sql, [dia_medidaCorporal, regiao_medidaCorporal, medida_cm], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Medida corporal já cadastrada.' });
      }
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({ message: 'Medida corporal registrado com sucesso', id: result.insertId });
  });
});

// ROTA POST - Cadastro peso corporal
app.post('/cadastraPesoCorporal', (req, res) => {
  const { dia_pesoCorporal, peso_pesoCorporal, meta_peso } = req.body;

  if (!dia_pesoCorporal || !peso_pesoCorporal || !meta_peso) {
    return res.status(400).json({ error: 'Preencha todos os dados solicitados!' });
  }

  const sql = 'INSERT INTO pesoCorporal (dia_pesoCorporal, peso_pesoCorporal, meta_peso) VALUES (?, ?, ?)';
  db.query(sql, [dia_pesoCorporal, peso_pesoCorporal, meta_peso], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Medida corporal já cadastrada.' });
      }
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({ message: 'Medida corporal registrado com sucesso', id: result.insertId });
  });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
