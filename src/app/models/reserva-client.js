const mongoose = require("../../config/database");
const Schema = mongoose.Schema;

const reservaClienteSchema = new Schema({
  tipo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "ABERTO",
  },
  funcionario: {
    type: Schema.Types.ObjectId,
    ref: "Funcionario",
    required: true,
  },
  servico: {
    type: Schema.Types.ObjectId,
    ref: "Servico",
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  data_servico: {
    type: Date,
    required: true,
  },
  hora_servico: {
    type: String,
    required: true,
  },
  dados: Object,
  created_at: Date,
  updated_at: Date,
});

const Reserva = mongoose.model("Reserva", reservaClienteSchema);

module.exports = Reserva;
