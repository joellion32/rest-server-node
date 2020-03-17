require('../config/config');
const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');


const app = express();
   
// para login de usuario
app.post('/login', (req, res) => {
let body =  req.body;

Usuario.findOne({email: body.email}, (err, UsuarioDB) => {
// para el error    
if(err){
res.status(500).json({
ok: false,
err
});    
}

// si no se encuentra el usuario
if(!UsuarioDB){
return res.status(400).json({
ok: false,
message: '(email) o contraseña incorrectos'    
});
}

if(!bcrypt.compareSync(body.password, UsuarioDB.password)){
return res.status(400).json({
ok: false,
message: 'email o (contraseña) incorrectos'    
});
}

// generar token
let token = jwt.sign({
    usuario:  UsuarioDB
  }, process.env.SEED, { expiresIn: process.env.CADUCIDAD});

// si todo sale bien
res.json({
ok: true,
Usuario: UsuarioDB,    
token: token
});

}); // cierre del find
}); // cierre de el request

// login google
app.post('/google', (req, res) => {
let token = req.body.idtoken;


res.json({
token
});
})

module.exports = app;