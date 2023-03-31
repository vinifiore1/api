const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();

app.use(cors({ origin: true, credentials: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const rotasCadAuth = require("../app/rotas/signin-signup");
const servicoEmpresa = require("../app/rotas/sevicos-empresa");
const reservaCliente = require("../app/rotas/reservas-cliente");
const funcionario = require("../app/rotas/funcionario");

//Rptas de cadastro e autenticação cliente/empresa
rotasCadAuth(app);

//Rotas referente ao cliente
reservaCliente(app);

//Rotas referente a empresa
servicoEmpresa(app);

//rotas funcionario
funcionario(app);

module.exports = app;
