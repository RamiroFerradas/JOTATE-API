import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db";

interface ProductAttributes {
  [key: string]: any;
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  description: string;
  image: string[];
  price: number;
  stock: number;
  consults?: number;
}

interface ProductInstance extends Model<ProductAttributes>, ProductAttributes {}

const Product = sequelize.define<ProductInstance>(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subcategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    consults: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

export { Product, ProductAttributes };
