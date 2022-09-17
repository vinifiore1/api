const express = require("express");
const bodyParser = require("body-parser");

const app = express();

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

//Rptas de cadastro e autenticação cliente/empresa
rotasCadAuth(app);

//Rotas referente ao cliente
reservaCliente(app);

//Rotas referente a empresa
servicoEmpresa(app);

module.exports = app;
