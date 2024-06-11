// usuarios/models.js

const mongoose = require('mongoose');
const { usuariosSchema } = require('./schemas');

const usuariosModel = mongoose.model('Usuarios', usuariosSchema);

module.exports = { usuariosModel };
