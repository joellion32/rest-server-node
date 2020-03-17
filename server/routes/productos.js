const express = require('express');
const Producto = require('../models/producto');
const {VerficarToken} = require('../middlewares/auntenticacion')
const app = express();

// pedir productos
app.get('/productos', (req, res) => {
let page = req.query.page || 0;
page = Number(page);

Producto.find({})
.populate('categoria', 'descripcion')
.populate('usuario', 'nombre email')
.skip(page)
.limit(5)
.exec((err, productoDB) => {
if(err){
return res.status(400).json({
ok: false,
err
});  
}
res.json({
ok: true,
productos: productoDB
});
});
});


// obtener producto por ID
app.get('/productos/:id', (req, res) => {
let id = req.params.id;
Producto.findById(id)
.populate('usuario', 'nombre email')
.populate('categoria', 'descripcion')
.exec((err, productoDB) =>{
if(err){
return res.status(400).json({
ok: false,
err,
message: 'el producto no existe'
});  
}else{
res.json({
ok: true,
producto: productoDB
});
}
})
});

//guardar producto
app.post('/productos', [VerficarToken] ,function (req, res) {
let body = req.body;

producto = new Producto({
  nombre: body.nombre,
  precioUni: body.precioUni,
  descripcion: body.descripcion,
  disponible: body.disponible,
  categoria:  body.categoria,
  usuario: req.usuario._id
});

producto.save((err, productoDB) => {
if(err){
return res.status(400).json({
ok: false, 
err
});  
}else{
res.json({
ok: true,
producto: productoDB,
message: 'producto guardado correctamente'
});
}
});

}); 


// actualizar producto
app.put('/productos/:id', [VerficarToken], (req, res) => {
let id = req.params.id;
let body = req.body;

Producto.findByIdAndUpdate(id, body ,{ new: true, runValidators: true }, (err, productoDB) => {
if(err){
return res.status(400).json({
ok: false,
err
});  
}else{
 res.json({
  ok: true,
  producto: productoDB,
  message: 'producto actualizado correctamente'
 }); 
}
});
});


// eliminar producto
app.delete('/productos/:id', [VerficarToken] ,(req, res) => {
id = req.params.id;
Producto.findByIdAndDelete(id, (err, productoDB) => {
if(productoDB == null){
return res.status(400).json({
ok: false,
err,
message: 'el producto no existe'
});  
}else{
res.json({
ok: true,
producto: productoDB,
message: 'producto eliminado correctamente'
});  
}
});
})


// buscar productos
app.get('/productos/buscar/:termino', [VerficarToken], (req, res) => {
let termino = req.params.termino;

// crear expresion regular para buscar por palabras
let regex = new RegExp(termino, 'i');

Producto.find({nombre: regex})
.populate('categoria', 'descripcion')
.exec((err, productoDB) =>{
if(err){
return res.status.json({
ok: false,
err
});  
}else{
res.json({
ok: true,
productoDB
});  
}
});
});

module.exports = app;