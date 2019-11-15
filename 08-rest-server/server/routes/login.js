const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const app = express();

app.post('/login', (req, res) => {
  let { body } = req;

  User.findOne({ email: body.email }, (err, userDB) => {
    if (err){
      return res.status(400).json({
        ok: false,
        err
      });
    }

    if (!userDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: '(Usuario) o Password incorrecto'
        }
      });
    }

    if (!bcrypt.compareSync(body.password, userDB.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario o (Password) incorrecto'
        }
      });
    }

    let token = jwt.sign({
      usuario: userDB
    }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

    res.json({
      ok: true,
      usuario: userDB,
      token
    });
  });
});

module.exports = app;