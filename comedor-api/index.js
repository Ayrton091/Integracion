// comedor/index.js

const express = require("express");
const mongoose = require('mongoose');
const { comedorModel } = require('./models');
const uri = 'mongodb+srv://ayrtonrios:Papasfritas091@cluster0.g38fljg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(uri);

const app = express();
app.use(express.json());

const port = 8081;

// Ruta de inicio
app.get('/', (req, res) => { 
  res.send("I am alive (Comedor)"); 
});

app.post('/comedor/suspender/:dni', async(req, res) => {
    try {
      // Obtener el DNI del alumno de los parámetros de la solicitud
      const dni = req.params.dni;
  
      // Verificar si el alumno existe en la base de datos de usuarios
      const alumno = await usuariosModel.findOne({ dni });
  
      if (alumno) {
        // Si el alumno existe, cambiar su estado a suspendido
        alumno.estado = 'suspendido';
  
        // Guardar el cambio en la base de datos
        await alumno.save();
  
        // Devolver una respuesta exitosa
        res.status(200).json({ message: 'Alumno suspendido del uso del comedor' });
      } else {
        // Si el alumno no existe, devolver un mensaje de error
        res.status(404).json({ message: 'Alumno no encontrado en la base de datos de usuarios' });
      }
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

app.listen(port, () => {
  console.log(`Comedor API listening on port ${port}`)
});
