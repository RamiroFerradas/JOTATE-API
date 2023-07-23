import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { insertProducts } from "./inserProductsDb";

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

insertProducts();

export { sequelize };
