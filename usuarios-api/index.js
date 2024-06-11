// usuarios/index.js

const express = require("express");
const mongoose = require('mongoose');
const { usuariosModel } = require('./models');
const uri = 'mongodb+srv://ayrtonrios:Papasfritas091@cluster0.g38fljg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(uri);

const app = express();
app.use(express.json());

const port = 8080;

// Ruta de inicio
app.get('/', (req, res) => { 
  res.send("I am alive (Usuarios)"); 
});

app.post('/usuarios', async(req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { dni, name, lastname, state } = req.body;

    // Crear una nueva instancia del modelo de usuario
    const nuevoUsuario = new usuariosModel({
      dni,
      name,
      lastname,
      state
    });

    // Guardar el nuevo usuario en la base de datos
    const usuarioGuardado = await nuevoUsuario.save();

    // Devolver la respuesta con el usuario recién guardado
    res.status(201).json(usuarioGuardado);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/usuarios/:dni', async (req, res) => {
  try {
    // Obtener el DNI de los parámetros de la solicitud
    const dni = req.params.dni;

    // Buscar el usuario en la base de datos por su DNI
    const usuario = await usuariosModel.findOne({ dni });

    // Verificar si el usuario fue encontrado
    if (usuario) {
      // Devolver el usuario encontrado en la respuesta
      res.status(200).json(usuario);
    } else {
      // Si el usuario no fue encontrado, devolver un mensaje de error
      res.status(403).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/usuarios', async (req, res) => {
  try {
    // Buscar todos los usuarios en la base de datos
    const usuarios = await usuariosModel.find({});

    // Devolver la lista de usuarios en la respuesta
    res.status(200).json(usuarios);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Usuarios API listening on port ${port}`)
});
