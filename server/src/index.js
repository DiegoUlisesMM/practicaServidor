const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

require('dotenv').config()

//Crear constante routes note
const noteRoutes = require('./routes/note')

//Crear constante que ejecuta express
const app = express()
app.use(cors());

//Costante  que especifica el puerto
const port = process.env.PORT || 3000

//middleware
app.use(express.json())
app.use('/api', noteRoutes)
// Rutas



//Ruta de home con la respuesta
app.get('/', (req, res) => {
    res.send('Hola mundo')
})
//Conección con mongoose
mongoose.connect(process.env.MONGODB_URI
).then(() => console.log('Conectado a la base de datos Atlas'))
    .catch((error) => console.error(error))
//Inicializar el servidor
app.listen(port, () => {
    console.log(` Servidor escuchando en el puerto ${port}`)
})


