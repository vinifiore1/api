const mongoose = require("mongoose");

//Conexão com o mongodb na database reserva
mongoose.connect(
  "mongodb+srv://clinica:mnnCZP6d4Wv7KUfb@cluster0.qiuvd.mongodb.net/clinica?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose.Promise = global.Promise;

module.exports = mongoose;
