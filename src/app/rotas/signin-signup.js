const Client = require("../models/client-model");
const Funcionario = require("../models/empresa-model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../../auth");

module.exports = (app) => {
  //Cadastro como usuário
  app.post("/registro-cliente", async (req, res) => {
    const { cpf } = req.body;

    //Verifica duplicidade de email
    if (await Client.findOne({ cpf }))
      return res.status(400).json({ error: "Email já cadastrado" });

    try {
      // Insere usuário n banco
      await Client.create(req.body).then((retorno) => {
        //Omissão de senha no retorno
        retorno.senha = undefined;
        return res.json(retorno);
      });
    } catch (err) {
      return res
        .status(512)
        .json({ error: "Falha ao tentar realizar o cadastro" });
    }
  });

  //Cadastro como empresa
  app.post("/registro-funcionario", async (req, res) => {
    const { cnpj, cpf } = req.body;

    //Verifica duplicidade de email e cnpj
    if (await Funcionario.findOne({ cpf }))
      return res.status(400).json({ error: "Email já cadastrado" });
    else if (await Funcionario.findOne({ cnpj }))
      return res.status(400).json({ error: "CNPJ já cadastrado" });

    try {
      await Funcionario.create(req.body).then((retorno) => {
        retorno.senha = undefined;
        return res.json(retorno);
      });
    } catch (err) {
      return res
        .status(512)
        .json({ error: "Falha ao tentar realizar o cadastro" });
    }
  });

  //Autenticação de clientes
  app.post("/autenticacao-cliente", async (req, res) => {
    const { cpf, senha } = req.body;
    const usuario = await Client.findOne({ cpf }).select("+senha");

    // Verifica se o email passado foi cadastrado
    if (!usuario) {
      return res
        .status(512)
        .json({ error: "Usuário e/ou senha inválidos", usuario, senha });
    }

    //Verica se a senha passada é a mesma do usuário encontrado
    if (!(await bcrypt.compare(senha, usuario.senha))) {
      return res
        .status(512)
        .json({ error: "Usuário e/ou senha inválidos", usuario, senha });
    }

    //Omissão do campo senha
    usuario.senha = undefined;

    const token = jwt.sign({ id: usuario.id }, authConfig.secret, {
      expiresIn: 86400,
    });

    res.status(200).json({ usuario: usuario, token: token });
  });

  //Autenticação de clientes
  app.post("/autenticacao-funcionario", async (req, res) => {
    const { cpf, senha } = req.body;
    const usuario = await Funcionario.findOne({ cpf }).select("+senha");

    // Verifica se o email passado foi cadastrado
    if (!usuario) {
      return res.status(512).json({ error: "Usuário e/ou senha inválidos" });
    }

    //Verica se a senha passada é a mesma do usuário encontrado
    if (!(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(512).json({ error: "Usuário e/ou senha inválidos" });
    }

    //Omissão do campo senha
    usuario.senha = undefined;

    const token = jwt.sign({ id: usuario.id }, authConfig.secret, {
      expiresIn: 86400,
    });

    res.status(200).json({ usuario: usuario, token: token });
  });
};
