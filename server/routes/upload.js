const express = require('express');
const fileUpload = require('express-fileupload');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const fs = require('fs');
const path = require('path');
const app = express();


// default options
app.use(fileUpload());


app.put('/upload/:tipo/:id', function(req, res) {

// variables 
let tipo = req.params.tipo;
let id = req.params.id;



if (!req.files || Object.keys(req.files).length === 0) {
    return res.json({
        ok: false,
        message: 'No se ha seleccionado ningun archivo'
    });
  }

 // validar tipos para que vallan a la carpeta especifica
let tiposValidos = ['productos', 'usuarios'];

if(tiposValidos.indexOf(tipo) < 0){
    return res.status(400).json({
      ok: false,
      message: 'los tipos permitidos son ' + tiposValidos.join(', '),
      tipo: tipo
    });
}


 // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
 let sampleFile  = req.files.archivo;
 let extensionArchivo = sampleFile.name.split('.');
 let extesion = extensionArchivo[extensionArchivo.length -1];


 // extensiones permitidas
 let extensionesValidas = ['jpg', 'png', 'gif', 'jpeg'];

  if(extensionesValidas.indexOf(extesion) < 0){
      return res.status(400).json({
        ok: false,
        message: 'las extensiones permitidas son ' + extensionesValidas.join(', '),
        ext: extesion
      });
  }


 // cambiar nombre al archivo
  let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extesion}`;


 // Use the mv() method to place the file somewhere on your server
 sampleFile.mv(`uploads/${tipo}/${nombreArchivo}`, function(err) {
    if (err)
      return res.status(500).json({
        ok: false,
        err  
      });

      // imagen cargada
      if(tipo === 'usuarios'){
        imagenUsuario(id, res, nombreArchivo);
      }else{
        imagenProducto(id, res, nombreArchivo);
      }
      
  });
});

// funcion para grabar la imagen del usuario
function imagenUsuario(id, res, nombreArchivo){
Usuario.findById(id, (err, usuarioDB) => {
if(err){
res.status(500).json({
ok: false,
err
});  
}

if(!usuarioDB){
  borrarArchivo(usuarioDB.img, 'usuarios');
  return res.status(400).json({
    ok: false,
    message: 'el usuario no existe'
    }); 
}

// borrar imagenes duplicadas
borrarArchivo(usuarioDB.img, 'usuarios');

usuarioDB.img = nombreArchivo;
usuarioDB.save((err, usuarioGuardado) => {
res.json({
ok: true, 
usuario: usuarioGuardado,
img: nombreArchivo
});
});
});
}  // cierre de la function 

function imagenProducto(id, res, nombreArchivo){
Producto.findById(id, (err, productoDB) => {
if(err){
return res.status(500).json({
ok: false,
err
});  
}

if(!productoDB){
  borrarArchivo(productoDB.img, 'productos');
  return res.status(400).json({
    ok: false,
    message: 'el producto no existe'
    }); 
}

// borrar imagenes duplicadas
borrarArchivo(productoDB.img, 'productos');

productoDB.img = nombreArchivo;
productoDB.save((err, productoGuardado) => {
res.json({
ok: true, 
producto: productoGuardado,
});
});
});  
} // cierre de la funcion

function borrarArchivo(nombreImagen, tipo){
// borrar imagen anterior si el usuario elige una nueva
let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
if(fs.existsSync(pathImagen)){
  fs.unlinkSync(pathImagen);
}

}

module.exports = app;