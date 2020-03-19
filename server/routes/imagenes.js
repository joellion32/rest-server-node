const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();


// ruta para mostrar la imagen
app.get('/imagen/:tipo/:img', (req, res) => {

let tipo = req.params.tipo;
let img = req.params.img;


let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);

if(fs.existsSync(pathImagen)){
res.sendFile(pathImagen);    
}else{
    let noImagepath = path.resolve(__dirname, `../assets/noimagen.png`);
    res.sendFile(noImagepath);  
}

});




module.exports = app;