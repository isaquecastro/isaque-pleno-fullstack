import express from "express";
import CreateUserSessionService from "../services/CreateUserSessionService";
import ListFriendsService from "../services/ListFriendsService";

const routes = express.Router();

const AuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "Token não informado" });
  }

  const [scheme, token] = authHeader.split(" ");

  try {
    // verifica se um token é válido e se token um usuário associado à ele

    return next();
  } catch (err) {
    return res.status(401).send({ message: "Token inválido" });
  }
};

routes.post("/sessions", async (req, res) => {
  const { email, password } = req.body;

  const result = await CreateUserSessionService(email, password);

  return res.status(201).send(result);
});

routes.get("/friends", AuthMiddleware, async (req, res) => {
  const result = await ListFriendsService();

  return res.send(result);
});

routes.use((error, req, res, next) => {
  console.log("> Error ocurred: ", error);
  res.status(500).json({ error: error.message });
});

export default routes;
