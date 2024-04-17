const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// conecta MongoDB
mongoose.connect('mongodb://localhost:27017/meu_banco_de_dados', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB');
});

// define o modelo de dados
const Pedido = mongoose.model('Pedido', {
  codigoBarras: String,
  setor: String,
});

// configura o body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// rota p/servir o arquivo HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// rota p/ lidar com o envio do formulário
app.post('/enviar', (req, res) => {
  const { codigoBarras, setor } = req.body;

  // salva no MongoDB
  const pedido = new Pedido({ codigoBarras, setor });
  pedido.save((err, pedido) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao salvar o pedido');
    } else {
      console.log('Pedido salvo:', pedido);
      res.send('Pedido salvo com sucesso!');
    }
  });
});

// inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
