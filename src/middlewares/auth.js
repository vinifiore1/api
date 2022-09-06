const jwt = require("jsonwebtoken");
const authConfig = require("../../auth");

module.exports = (req, res, next) => {
  const headersAuth = req.headers.authorization;

  // Se o usuário não passou um token na  requisição
  if (!headersAuth)
    return res.status(401).json({ error: "Usuário não autenticado" });

  // Separando o Bearer token
  const parts = headersAuth.split(" ");

  if (!parts.length === 2)
    return res.status(401).json({ error: "Usuário não autenticado" });

  const [scheme, token] = parts;

  // Verficando se o scheme foi passado
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "Token inválido" });
  }

  // Verificando se o token é válido
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token inválido" });

    req.userId = decoded.id;
    return next();
  });
};
