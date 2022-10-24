const authMiddleware = require("../../middlewares/auth");
const Reserva = require("../models/reserva-client");
const Servicos = require("../models/servico-empresa");
const mongoose = require("../../config/database");
const Servico = require("../models/servico-empresa");
const Funcionario = require("../models/funcionario-model");

module.exports = (app) => {
  // Autenticação com token obrigatória
  app.use(authMiddleware);

  // Retorna todos os serviços cadastrados pelas empresas e a capacidade de atendimento
  app.get("/funcionario/:id", async (req, res) => {
    const { id } = req.params;
    Funcionario.findById({ _id: id })
      .then((retorno) => {
        return res.status(200).json(retorno);
      })
      .catch((erro) => {
        res.status(512).json({ error: erro });
      });
  });
};
