const bcrypt = require('bcrypt');
const express = require('express');
const _ = require('underscore');

const User = require('../models/user');

const app = express();

app.get('/usuario', function (req, res) {
  let { desde } = req.query || 0;
  desde = Number(desde);
  let { limite } = req.query || 5;
  limite = Number(limite);
  
  User.find({ estado: true }, 'nombre email role estado google img')
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      User.countDocuments({ estado: true }, (err, conteo) => {
        res.json({
          ok: true,
          usuarios,
          conteo
        });
      });
    });
});

app.post('/usuario', function (req, res) {
  let { body } = req;
  let user = new User({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body. role
  });

  user.save((err, userDB) => {
    if(err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      usuario: userDB
    });
  });
});

app.put('/usuario/:id', function (req, res) {
  let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
  let { id } = req.params;

  User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      user: userDB
    });
  });
});

app.delete('/usuario/:id', function (req, res) {
  let { id } = req.params;
  let cambiaEstado = {
    estado: false
  }

  User.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    if (!usuarioBorrado) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuario no encontrado"
        }
      });
    }

    res.json({
      ok: true,
      user: usuarioBorrado
    });
  });
});

module.exports = app;