const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // altere aqui se seu usuário for diferente
  password: 'anamaezona04',        // sua senha do MySQL
  database: 'desafio_sync360'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err);
  } else {
    console.log('Conectado ao MySQL com sucesso!');
  }
});

module.exports = connection;
