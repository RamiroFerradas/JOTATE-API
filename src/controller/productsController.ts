import { Product, ProductAttributes } from "../models/product";

const ERROR = `Error @ controller/productsController --> `;
let cachedProducts: ProductAttributes[] | null = null;

const getAllProducts = async () => {
  try {
    // Verifica si los productos ya están en la caché
    if (cachedProducts) {
      console.log("Obteniendo productos desde la caché...");
      return cachedProducts;
    }

    // Si no hay productos en la caché, realiza la consulta a la base de datos
    const products = await Product.findAll();

    if (products.length) {
      // Actualiza la caché con los nuevos productos
      cachedProducts = products;

      return products;
    } else {
      return "No se encontraron productos";
    }
  } catch (e: any) {
    console.error(`${ERROR}, getAllProducts --→ ${e}`);
    return e.message;
  }
};

const getProductById = async (productId: string) => {
  try {
    const product = await Product.findByPk(productId);
    if (product) {
      console.log(`Se encontró el producto con ID ${productId}`);
      return product;
    } else {
      console.log(`No se encontró un producto con ID ${productId}`);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el producto por ID:", error);
    return null;
  }
};

const updateProduct = async (id: string, updatedData: ProductAttributes) => {
  try {
    const product = await Product.findByPk(id);
    if (product) {
      await product.update(updatedData);
      console.log(`Se actualizó el producto con ID ${id}`);
      return product;
    } else {
      console.log(`No se encontró un producto con ID ${id}`);
      return null;
    }
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return null;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  updateProduct,
};
