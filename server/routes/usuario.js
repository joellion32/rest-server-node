const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
// middlewares
const {VerficarToken, Verficar_Admin_Role} = require('../middlewares/auntenticacion')

const app = express();

// pedir usuarios paginados
app.get('/usuario', VerficarToken, (req, res) => {


    let page = req.query.page || 0;
    page = Number(page);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(page)
        .limit(5)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            });
        });
});

// guardar usuario
app.post('/usuario', [VerficarToken, Verficar_Admin_Role], function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });


    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });


    });


});

// actualizar usuario   // midelwares de verificacion
app.put('/usuario/:id', [VerficarToken, Verficar_Admin_Role], function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }



        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })

});

// eliminar usuario 
app.delete('/usuario/:id', [VerficarToken, Verficar_Admin_Role], (req, res) => {
    let id = req.params.id;
    Usuario.findByIdAndDelete(id, (err, usuarioDB) => {
    if(usuarioDB == null){
     return res.status(400).json({
      ok: false,
      message: "usuario no encontrado"
     }); 
    }
    
    res.json({
      ok: true,
      message: "usuario eliminado correctamente"
     });
    });
    });
    



module.exports = app;