import { NextFunction, Request, Response } from "express";

const { Router } = require("express");

const router = Router();
const productsRoute = require("./Products/index");

const { AUTH_TOKEN } = process.env;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const { AUTH_TOKEN } = process.env;

  if (!authorization || authorization !== `Bearer ${AUTH_TOKEN}`) {
    console.log("Token ingresado:", authorization); // Agrega esta línea para loguear el token
    return res.status(401).json({
      error: "Unauthorized",
      authorization: authorization || "Token no proporcionado",
      expectedToken: `Bearer ${AUTH_TOKEN}`,
    });
  }

  next();
};
module.exports = authMiddleware;

router.use("/products", authMiddleware, productsRoute);

module.exports = router;
