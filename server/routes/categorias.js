const express = require('express')
const app = express()
const {VerficarToken} = require('../middlewares/auntenticacion');
const Categoria = require('../models/categoria')

// Mostrar todas las categorias
app.get('/categorias', (req, res) => {
Categoria.find({})
.sort('descripcion')
.populate('usuario', 'nombre email')
.exec((err, categoriasDB) =>{
if(err){
return res.status(400).json({
ok: false,
err
});    
}else{
res.json({
ok: true,
categorias: categoriasDB
});    
}
});
});


// mostrar categoria por ID
app.get('/categoria/:id', (req, res) => {
let id = req.params.id;
Categoria.findById(id, (err, categoriaDB) => {
if(err){
return res.status(400).json({
ok: false,
err,
message: 'la categoria no existe'
});  
}else{
 res.json({
    ok: true,
    categoria: categoriaDB,
 });   
}
});
});


// guardar categorias
app.post('/categorias', [VerficarToken], function (req, res) {
let body = req.body;
categorias = new Categoria({
descripcion: body.descripcion,
usuario: req.usuario._id
});

// guardar categoria
categorias.save((err, categoriaDB) => {
if(err){
return res.status(400).json({
ok: false,
err
});    
}

res.json({
ok: true,
categoria: categoriaDB    
})
});
});


// actualizar categoria
app.put('/categorias/:id', [VerficarToken], function (req, res) {
let id = req.params.id;
let body = req.body;

Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {
if(err){
return res.status(400).json({
ok: true,
err
});    
}else{
res.json({
ok: true,
categoria: categoriaDB
});    
}
});
});


// eliminar categoria
app.delete('/categoria/:id', [VerficarToken] ,(req, res) => {
let id = req.params.id;
Categoria.findByIdAndDelete(id, (err, categoriaDB) => {
if(categoriaDB == null){
return res.status(400).json({
ok: false,
message: 'categoria no encontrada'
});    
}

res.json({
ok: true,
message: 'categoria eliminada correctamente'
});
});
})

module.exports = app;
