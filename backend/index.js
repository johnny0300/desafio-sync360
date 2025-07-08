const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuario');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json()); // transforma JSON em objeto JS

// Rotas
app.use('/usuario', usuarioRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

//Conexão com Nuvem e DB Online para criação de perfil próprio
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

