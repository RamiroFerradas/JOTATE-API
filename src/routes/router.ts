import { NextFunction, Request, Response } from "express";

const { Router } = require("express");

const router = Router();
const productsRoute = require("./Products/index");

const { AUTH_TOKEN } = process.env;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || authorization !== AUTH_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

module.exports = authMiddleware;

router.use("/products", authMiddleware, productsRoute);

module.exports = router;
