const jwt = require('jsonwebtoken');


// ============================
//  Verficar token
// ============================


let VerficarToken = (req, res, next) => {
let token = req.get('token');

// para verificar si el token es valido
jwt.verify(token, process.env.SEED, (err, decoded) => {

if(err){
return res.status(401).json({
ok: false,
err
});    
}

req.usuario = decoded.usuario;

next();
});


};


// ============================
//  Verficar admin role
// ============================

let Verficar_Admin_Role = (req, res, next) => {
let usuario =  req.usuario;

if(usuario.role === 'ADMIN_ROLE'){
 next();
}else{
return res.json({
ok: false,
message: "el usuario no es administrador"
});   
}
    
}

module.exports = {
VerficarToken,
Verficar_Admin_Role    
}