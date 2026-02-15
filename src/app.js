require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');

const app = express();
conectarDB();

// Middlewares base
app.use(cors());
app.use(express.json());
app.use(express.static('src/views'));


//  Ruta de prueba
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.get('/', (req, res) => {
  res.send('API de gestión de productos funcionando');
});

//Servidor
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}

module.exports = app;