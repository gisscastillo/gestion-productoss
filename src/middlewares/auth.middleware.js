const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return res.status(401).json({ msg: 'No existe el token, autorización denegada' });
    }

    const token = authHeader.replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();

  } catch (error) {
    res.status(401).json({ msg: 'Token inválido, intente nuevamente' });
  }
};

module.exports = authMiddleware;
