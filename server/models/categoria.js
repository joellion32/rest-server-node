const mongoose = require('mongoose');


let Schema = mongoose.Schema;

let CategoriaSchema = new Schema({
descripcion: {
type: String,
required: [true, 'la categoria es necesaria'],
unique: [true, 'ya hay una categoria registrada con este nombre']    
},

usuario: {
    // relacion con la tabla usuario
type: Schema.Types.ObjectId, ref: 'Usuario',
}
});


module.exports = mongoose.model('Categoria', CategoriaSchema);