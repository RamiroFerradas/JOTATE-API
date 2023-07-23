import { ProductAttributes } from "../models/product";

export const imagesToArray = (product: ProductAttributes) => {
  let imageUrls: string | string[];
  // Verificar si las imágenes están en una sola cadena separadas por comas
  if (
    typeof product.image === "string" &&
    (product.image as string).includes("static.wixstatic.com")
  ) {
    // Expresión regular para extraer las URLs
    const urlRegex = /(https?:\/\/[^,\s]+)/g;

    // Extraer las URLs del texto utilizando la expresión regular
    const urlsMatched = (product.image as string).match(urlRegex) || [];

    // Eliminar la parte de la URL después de "/v1" en cada URL
    imageUrls = urlsMatched.map((url: string) => url.split("/v1")[0]);
  } else {
    // El formato de imágenes es un array o una cadena incorrecta, se deja como está
    if (Array.isArray(product.image)) {
      imageUrls = product.image;
    } else {
      imageUrls = (product.image as string).split(",").map((url) => url.trim());
    }
  }

  return {
    ...product,
    image: imageUrls,
  };
};
