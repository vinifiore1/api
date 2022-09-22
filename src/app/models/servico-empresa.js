const mongoose = require("../../config/database");

const servicoFuncionarioSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
  },
  funcionario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Funcionario",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photo: {
    type: File | String,
  },
  dados: Object,
  created_at: Date,
  updated_at: Date,
});

const Servico = mongoose.model("Servico", servicoFuncionarioSchema);

module.exports = Servico;
