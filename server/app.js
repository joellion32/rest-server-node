require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/usuario')
const login = require('./routes/login')
const categoria = require('./routes/categorias')
const productos = require('./routes/productos')
const upload = require('./routes/upload')
const imagenes = require('./routes/imagenes')
const path = require('path');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// rutas

app.use(router);
app.use(login);
app.use(categoria);
app.use(productos);
app.use(upload);
app.use(imagenes);


// usar archivos estaticos
app.use(express.static(path.resolve(__dirname ,'../public')));

mongoose.connect(process.env.URLDB, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});



app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});