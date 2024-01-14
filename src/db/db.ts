import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { insertProducts } from "./inserProductsDb";

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, ELEPHANT_URL } = process.env;

const OLD_URL = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;
const NEW_URL = `${ELEPHANT_URL}`;

const sequelize = new Sequelize(NEW_URL, {
  logging: false,
  native: false,
});

const performOperations = async () => {
  try {
    await insertProducts();
  } catch (error: any) {
    console.error("Error:", error.message);
  }
};
performOperations();

export { sequelize };
