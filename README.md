# Sistema de gestión de productos

Aplicación web desarrollada con Node.js y Express que permite la gestión de productos mediante operaciones CRUD, implementando autenticación con JWT, base de datos MongoDB y pruebas automatizadas con Jest.

## Características principales

* Autenticación:Registro de usuarios e inicio de sesión con JWT.
* Seguridad: Implementación de rutas protegidas.
* Gestión:CRUD completo de productos.
* Persistencia: Base de datos en la nube con MongoDB Atlas.
* Calidad: Pruebas unitarias y de integración con Jest.
* DevOps: Pipeline CI/CD con GitHub Actions y despliegue automático en Render.

## Tecnologías utilizadas

* Backend:Node.js, Express.js
* Base de Datos: MongoDB Atlas, Mongoose
* Seguridad: JSON Web Tokens (JWT)
* Testing: Jest
* Despliegue: GitHub Actions, Render

## Pipeline CI/CD
* El proyecto utiliza GitHub Actions para ejecutar automáticamente las pruebas unitarias en cada push al repositorio.

## Instalación y ejecución local

Para poner en marcha el proyecto, se ejecutan los siguientes comandos en la terminal:

```bash
# 1. Clonar el repositorio
git clone Thttps://github.com/gisscastillo/gestion-productoss
cd gestion-productos

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Se crea un archivo llamado .env en la raíz y se pega lo siguiente:
echo "PORT=3000
MONGO_URI=mongodb+srv://giselle:kaliban1619@cluster0.onbpode.mongodb.net/gestion_productos?appName=Cluster0
JWT_SECRET=kaliban1619" > .env

# 4. Iniciar la aplicación en modo desarrollo
npm run dev

# 5. Ejecutar pruebas unitarias
npm test

# Endpoints principales para registro y login
POST /api/auth/register
POST /api/auth/login

#Productos (CRUD)
GET /api/products
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id

#App 
https://gestion-productoss.onrender.com
