const express = require('express');
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
