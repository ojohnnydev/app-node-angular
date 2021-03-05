const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mysql = require('mysql');

// parse requests of content-type: application/json
app.use(bodyParser.json());

// cria conexão com o database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'caed'
});

// conecta ao database
connection.connect((err) => {
  if (err) throw err;
  console.log('Mysql Conectado...');
});

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // Pass to next layer of middleware
  next();
});

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Busca alunos
app.get("/alunos", (req, res) => {
  let sql = 'SELECT * FROM alunos';
  let query = connection.query(sql, (err, alunos) => {
    if (err) throw err;
    res.send(JSON.stringify(alunos));
  });
});

// Busca aluno por id
app.get('/alunos/:id',(req, res) => {
  let sql = 'SELECT * FROM alunos WHERE ID = ' + req.params.id;
  let query = connection.query(sql, (err, aluno) => {
    if(err) throw err;
    res.send(JSON.stringify(aluno));
  });
});

// Salva aluno (Old Version)
/*app.post('/alunos',(req, res) => {
  let sql = "INSERT INTO alunos (NOME, CPF, DATA_NASCIMENTO, SEXO, EMAIL, MAIOR_IDADE, DATA_CRIACAO) VALUES ('" + req.body.NOME + "', '" + req.body.CPF + "', '"
    + req.body.DATA_NASCIMENTO + "', '" + req.body.SEXO + "', '" + req.body.EMAIL + "', '" + req.body.MAIOR_IDADE + "', '" + req.body.DATA_CRIACAO + "')";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"response": "sucesso"}));
  });
});*/

// Salva aluno
app.post('/alunos',(req, res) => {
  // Antes de salvar, verifica se aluno já esxiste na base, em caso positivo, o mesmo não é salvo e uma mensagem é disparada pelo sistema
  let sql = 'SELECT * FROM alunos WHERE CPF = "' + req.body.CPF + '"';
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
    if (results.length !== 0) {
      res.send(JSON.stringify({"response": "true"}));
    } else {
      let sql = "INSERT INTO alunos (NOME, CPF, DATA_NASCIMENTO, SEXO, EMAIL, MAIOR_IDADE, DATA_CRIACAO) VALUES ('" + req.body.NOME + "', '" + req.body.CPF + "', '"
                + req.body.DATA_NASCIMENTO + "', '" + req.body.SEXO + "', '" + req.body.EMAIL + "', '" + req.body.MAIOR_IDADE + "', '" + req.body.DATA_CRIACAO + "')";
      let query = connection.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"response": "sucesso"}));
   });
    }
  });
});

// Atualiza aluno
app.put('/alunos/:id',(req, res) => {
  let sql = 'UPDATE alunos SET NOME = "' + req.body.NOME + '", CPF = "' + req.body.CPF + '", DATA_NASCIMENTO = "' + req.body.DATA_NASCIMENTO + '", SEXO = "' + req.body.SEXO + '", EMAIL = "'
    + req.body.EMAIL + '", MAIOR_IDADE = "' +  req.body.MAIOR_IDADE + '", DATA_ALTERACAO = "' + req.body.DATA_ALTERACAO + '" WHERE ID = ' + req.params.id;
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({'response': 'sucesso'}));
  });
});

// Deleta aluno
app.delete('/alunos/:id',(req, res) => {
  let sql = "DELETE FROM alunos WHERE ID = "+req.params.id;
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
