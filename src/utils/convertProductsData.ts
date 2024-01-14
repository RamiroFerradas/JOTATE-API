import { ProductAttributes } from "../models/product";

export const convertProductsData = (
  productsData: any[]
): ProductAttributes[] => {
  return productsData.map(({ stock, consults, price, ...productData }) => ({
    ...productData,
    stock: parseInt(stock) || 0,
    consults: parseInt(consults) || 0,
    price: parseFloat(price),
  }));
};
