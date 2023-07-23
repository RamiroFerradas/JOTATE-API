![SDlogo](../client/src/assets/images/logo.jpeg)

# Prueba técnica - StoryDots

# BACKEND

---

### Indice:

<ul>
<li> <a href="#inicio">INICIO</a>
 <li><a href="#obj">- Objetivos del Proyecto</a></li>
 <li><a href="#stack">- Stack de tecnologias</a></li>
 <li><a href="#instrucciones">- Instrucciones</a></li>
 <li><a href="#comenzando">- Comenzando</a></li>
 </li>
 <br>
<li> <a href="#endpoints">ENDPOINTS</a> 
 <li><a href="#products">- Products</a></li>
<li><a href="#brands">- Brands</a></li>
<ul>

<span id="inicio"></span>
<span id="obj"></span>

<span id="intro"></span>

## Intro

En este coding challenge te vamos a proponer construir las bases de lo que luego podría transformarse en un ecommerce.

## Objetivos del Proyecto

Queremos que construyas una API REST con Node que pueda realizar las operaciones CRUD de productos. Para eso te proponemos que construyas un endpoint /products.

Los productos deben tener al menos las siguientes propiedades:
id
name
description
image_url (pueden traer imágenes que no están hosteadas en la app)
price

El endpoint debe permitir traer un listado de todos los productos, como también de cada uno en particular filtrando por id. No es necesario que la API requiera token o algún tipo de autenticación para funcionar.
Como mencionamos antes, deben ser posibles todas las operaciones CRUD, así que además de obtener productos se deben poder crear, actualizar y eliminar.

### Extras

- Podés implementar algún tipo de autenticación a la API para proteger los métodos de creación, actualización y borrado. De este modo solamente un request autenticado podría hacer estas operaciones, mientras que los métodos de lectura (GET) serían públicos.
- Podés agregar un segundo modelo de marcas a la aplicación. Cada producto tendría que tener entonces una marca de manera obligatoria, o sea, no debería haber productos sin marca. Las marcas deberían tener un name y un logo_url.
  En caso de que elijas hacer este extra, te recomendamos utilizar un approach relacional (SQL) usando herramientas como Sequelize o Prisma (puede ser otro, son solo sugerencias).

<span id="stack"></span>

### Stack

- Node
- Express
- PostgreSQL
- Git

<span id="instrucciones"></span>

## Instrucciones

1.  En la carpeta raiz crear un archivo llamado: `.env` que tenga la siguientes variables de entorno:

`DB_USER=postgres`

`DB_PASSWORD=ramiferra97`

`DB_HOST=localhost`

`DB_PORT=3001`

`DB_NAME=storydots_ecommerce`

`PORT=3001` ---> si no se especifica sera por defecto "3001"

`SECRET_TOKEN=my-secret-token` (\*)

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

Adicionalmente será necesario crear desde psql una base de datos llamada `storydots_ecommerce`

```http

(*) La variable de entorno "SECRET_TOKEN" simula un token para poder acceder a las operaciones CRUD POST PUT Y DELETE de ambas rutas, sin la autenticacions

  Headers

| Parameter       | Value             | Description  |
| :-------------- | :---------------- | :----------- |
| `Authorization` | `my-secret-token` | **Required** |

```

<span id="instrucciones"></span>

## Iniciar

<br />

- Instrucciones para iniciar:

1. Instalar en la carpeta `/api` las dependecias ingresando en nuestro terminal el comando:

```bash
npm install
```

2. Inicializar ingresando el comando:

```bash
npm start
```

---

<span id="endpoints"></span>

# Endpoints/Flags que pueden utilizar:

<span id="products"></span>

#### PRODUCTS

- GET <b style="">/products</b> --> traer todos los productos de la base de datos.
- GET <b style="">/products/{id}</b> --> traer producto particular mediante un ID proporcionado por params.
- GET <b style="">/products?name={nombre}</b> --> traer producto mediante un nombre específico. Ingresar nombre por query con el `'key': 'name'`.(ej: `http://localhost:3001/products?name=lavarropas automatico`).

- POST <b style="">/products</b> --> Crear un nuevao producto. Pasar por por el cuerpo de la petición (request.body) los siguientes parametros:

```bash
{
  "name": "Producto A", ---> REQUERIDO
  "description": "Este es un producto de ejemplo", ---> REQUERIDO
  "image_url": "https://ejemplo.com/imagen.jpg", ---> REQUERIDO
  "price": 10.99, ---> REQUERIDO
  "bramd": {
    "name": "Marca1", ---> REQUERIDO
    "logo_url": "https://ejemplo.com/logo.jpg"
  }
}
```

- PUT <b style="">/products/{id}</b> --> Modificar un producto particular mediante un ID proporcionado por params, y los mismos parametros que queramos modificar por el cuerpo de la petición (request.body) al igual que el `'POST'`.

- DELETE <b style="">/products/{id}</b> --> Borrar un producto particular mediante un ID proporcionado por params.

<span id="brands"></span>

#### BRANDS

- GET <b style="">/brands</b> --> traer todas las marcas de la base de datos.
- GET <b style="">/brands/{id}</b> --> traer producto particular mediante un ID proporcionado por params.
- GET <b style="">/brands?name={nombre}</b> --> traer marca mediante un nombre específico. Ingresar nombre por query con el `'key': 'name'`.(ej: `http://localhost:3001/brands?name=samsung`).

- POST <b style="">/brands</b> --> Crear una nueva marca. Pasar por por el cuerpo de la petición (request.body) los siguientes parametros:

```bash
{
  "name": "Samsung",
  "logo_url": "https://ejemplo.com/logo.jpg"
}

```

- PUT <b style="">/brands/{id}</b> --> Modificar una marca particular mediante un ID proporcionado por params, y los mismos parametros que queramos modificar por el cuerpo de la petición (request.body) al igual que el `'POST'`.

- DELETE <b style="">/brands/{id}</b> --> Borrar una marca particular mediante un ID proporcionado por params.
