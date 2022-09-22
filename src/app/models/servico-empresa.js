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
  total_reservas: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    default: "",
  },
  dados: Object,
  created_at: Date,
  updated_at: Date,
});

const Servico = mongoose.model("Servico", servicoFuncionarioSchema);

module.exports = Servico;
