const express = require('express');
const router = express.Router();
const db = require('../db');

// Rota para buscar o primeiro usuário que existir
router.get('/', (req, res) => {
  const query = 'SELECT * FROM usuario LIMIT 1';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      return res.status(500).send('Erro ao buscar usuário');
    }

    if (results.length === 0) {
      return res.status(404).send('Nenhum usuário encontrado');
    }

    res.json(results[0]);
  });
});


// Rota para atualizar o usuário
router.post('/', (req, res) => {
  const { nome, idade, rua, bairro, estado, biografia, imagem_url } = req.body;

  const query = `
    UPDATE usuario SET 
      nome = ?, 
      idade = ?, 
      rua = ?, 
      bairro = ?, 
      estado = ?, 
      biografia = ?, 
      imagem_url = ?
    WHERE id = 1
  `;

  db.query(query, [nome, idade, rua, bairro, estado, biografia, imagem_url], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar usuário:', err);
      return res.status(500).send('Erro ao atualizar usuário');
    }
    res.send('Usuário atualizado com sucesso!');
  });
});


module.exports = router;
