const jwt = require('jsonwebtoken');

// Verify Token
let verifyToken = (req, res, next) => {
  let token = req.get('token');

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: 'Token no valido'
        }
      });
    }

    req.usuario = decoded.usuario;
    next();
  });
};

//Verify Admin
let verifyAdminRole = (req, res, next) => {
  let { usuario } = req;

  if (usuario.role === 'ADMIN_ROLE') {
    next();
  } else {
    return res.json({
      ok: false,
      err: {
        message: 'El usuario no es administrador'
      }
    });
  }
}

module.exports = {
  verifyToken,
  verifyAdminRole
}