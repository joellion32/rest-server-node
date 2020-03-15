require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/usuario')
const login = require('./routes/login')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// rutas

app.use(router);
app.use(login);



mongoose.connect(process.env.URLDB, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});



app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});