const app = require('./src/config/custom-express');
const port = 3000;

app.listen(port, () => {
    console.log('Servidor rodando na porta ', port);
});