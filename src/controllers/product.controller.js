const Product = require('../models/Product');

// Obtener productos del usuario
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

// Crear producto
exports.createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    const product = new Product({
      name,
      price,
      user: req.user.id
    });

    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

//Actualizar producto
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    // Verificar
    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

//Eliminar producto
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    // Verificar dueño
    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    await product.deleteOne();

    res.json({ msg: 'Producto eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};
