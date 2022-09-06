const mongoose = require("../../config/database");
const bcrypt = require("bcryptjs");

const funcionarioSchema = new mongoose.Schema({
  tipo: {
    type: Number,
    default: 2,
  },
  razao_social: {
    type: String,
    uppercase: true,
    required: true,
  },
  responsavel: {
    type: String,
    uppercase: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  cnpj: {
    type: String,
    unique: true,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
    select: false,
  },
  pix: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

funcionarioSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;

  next();
});

const Funcionario = mongoose.model("Funcionario", funcionarioSchema);

module.exports = Funcionario;
