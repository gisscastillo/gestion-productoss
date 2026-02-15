const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    if (process.env.NODE_ENV === 'test') {
      console.log('Modo test: conexión a Mongo omitida');
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado');

  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;
