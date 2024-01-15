import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { insertProducts } from "./inserProductsDb";

dotenv.config();

const { DATABASE_URL, NODE_ENV } = process.env;
console.log(NODE_ENV);

const sequelize = new Sequelize(`${DATABASE_URL}`, {
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
