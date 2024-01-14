// Importa los módulos necesarios
import Papa from "papaparse";
import { imagesToArray } from "../utils/imagesToArray";
import { Product, ProductAttributes } from "../models/product";
import dotenv from "dotenv";

// Configura las variables de entorno
dotenv.config();

const { DB_URL } = process.env;

// Define la función para insertar los productos
export const insertProducts = async () => {
  const productsData = (await getAllProducts()) as ProductAttributes[];
  const convertedProductsData: ProductAttributes[] =
    convertProductsData(productsData);

  try {
    const previousProducts = await Product.findAll();
    const fetchedProducts = convertedProductsData;

    const modifiedProducts = compareProducts(
      previousProducts as ProductAttributes[],
      fetchedProducts as ProductAttributes[]
    );

    console.log(
      `Se encontraron ${productsData.length} productos en la Google Shets`
    );
    for (const modifiedProduct of modifiedProducts) {
      const { id, ...productData } = modifiedProduct;

      // Busca el producto por su ID en la base de datos
      const existingProduct = await Product.findOne({
        where: { id: modifiedProduct.id },
      });

      if (existingProduct) {
        // El producto ya existe, actualiza sus propiedades
        await existingProduct.update(productData);
        console.log(`Se actualizó el producto con ID ${id}`);
      } else {
        // El producto no existe, crea un nuevo registro
        await Product.create(modifiedProduct);
        console.log(`Se creó un nuevo producto con ID ${id}`);
      }
    }

    // Obtén los IDs de los productos desde la hoja de cálculo
    const productIdsFromSheet = fetchedProducts.map((product) => product.id);

    // Elimina los productos que no se encuentran en la hoja de cálculo
    const productsToDelete = previousProducts.filter(
      (product) => !productIdsFromSheet.includes(product.id)
    );

    for (const productToDelete of productsToDelete) {
      await Product.destroy({
        where: { id: productToDelete.id },
      });
      console.log(`Se eliminó el producto con ID ${productToDelete.id}`);
    }
    const updatedsProducts = await Product.findAll();

    console.log(
      `Se encontraron ${updatedsProducts.length} productos en la base de datos`
    );
  } catch (error) {
    console.error("Error al insertar los productos:", error);
  }
};

// Convierte los datos de los productos
const convertProductsData = (productsData: any[]): ProductAttributes[] => {
  return productsData.map(({ destacado, stock, price, ...productData }) => ({
    ...productData,
    destacado: Boolean(destacado),
    stock: parseInt(stock) || 0,
    price: parseFloat(price),
  }));
};

// Obtiene todos los productos

async function getAllProducts(): Promise<ProductAttributes[]> {
  try {
    const response = await fetch(DB_URL as string);
    const blob = await response.blob();
    const text = await new Response(blob).text();
    console.log(response);
    const products: ProductAttributes[] = await new Promise(
      (resolve, reject) => {
        Papa.parse(text, {
          header: true,
          complete: (results: Papa.ParseResult<ProductAttributes>) => {
            const parsedProducts: ProductAttributes[] = results.data;
            console.log(parsedProducts);
            // Solo traer productos que tengan "name"
            const filteredProducts: ProductAttributes[] = parsedProducts.filter(
              (product) => product.name && product.id
            );

            // Crear un array con las urls de las imágenes proporcionadas
            const productsWithMultipleImages: ProductAttributes[] =
              filteredProducts.map((product) => {
                return imagesToArray(product);
              });

            resolve(productsWithMultipleImages);
          },
          error: (error: Error) => reject(new Error(error.message)),
        });
      }
    );

    return products;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

// Define la función para realizar la petición cada 10 minutos
const scheduleInterval = () => {
  setInterval(async () => {
    await insertProducts();
  }, 10 * 60 * 1000); // 10 minutos * 60 segundos * 1000 milisegundos
};

// Inicia la programación de la petición
scheduleInterval();

const compareProducts = (
  databaseProducts: ProductAttributes[],
  fetchedProducts: ProductAttributes[]
): ProductAttributes[] => {
  const modifiedProducts: ProductAttributes[] = [];

  fetchedProducts.forEach((fetchedProduct) => {
    const matchingProduct = databaseProducts.find(
      (databaseProduct) => databaseProduct.id === fetchedProduct.id
    );

    if (matchingProduct) {
      const modifiedProduct: any = {
        id: fetchedProduct.id,
        name:
          fetchedProduct.name !== matchingProduct.name
            ? fetchedProduct.name
            : matchingProduct.name,
        brand:
          fetchedProduct.brand !== matchingProduct.brand
            ? fetchedProduct.brand
            : matchingProduct.brand,
        category:
          fetchedProduct.category !== matchingProduct.category
            ? fetchedProduct.category
            : matchingProduct.category,
        subcategory:
          fetchedProduct.subcategory !== matchingProduct.subcategory
            ? fetchedProduct.subcategory
            : matchingProduct.subcategory,
        description:
          fetchedProduct.description !== matchingProduct.description
            ? fetchedProduct.description
            : matchingProduct.description,
        image:
          JSON.stringify(fetchedProduct.image) !==
          JSON.stringify(matchingProduct.image)
            ? fetchedProduct.image
            : matchingProduct.image,
        price:
          (fetchedProduct.price as any) !== matchingProduct.price
            ? fetchedProduct.price
            : matchingProduct.price,
        stock:
          fetchedProduct.stock !== matchingProduct.stock
            ? fetchedProduct.stock
            : matchingProduct.stock,
        destacado:
          fetchedProduct.destacado !== matchingProduct.destacado
            ? fetchedProduct.destacado
            : matchingProduct.destacado,
      };

      // Verifica si alguna propiedad ha cambiado
      const hasChanges =
        modifiedProduct.name !== matchingProduct.name ||
        modifiedProduct.brand !== matchingProduct.brand ||
        modifiedProduct.category !== matchingProduct.category ||
        modifiedProduct.subcategory !== matchingProduct.subcategory ||
        modifiedProduct.description !== matchingProduct.description ||
        modifiedProduct.image !== matchingProduct.image ||
        modifiedProduct.price !== matchingProduct.price ||
        modifiedProduct.stock !== matchingProduct.stock ||
        modifiedProduct.destacado !== matchingProduct.destacado;

      if (hasChanges) {
        modifiedProducts.push(modifiedProduct);
      }
    } else {
      modifiedProducts.push(fetchedProduct); // Agrega productos nuevos directamente
    }
  });

  return modifiedProducts;
};
