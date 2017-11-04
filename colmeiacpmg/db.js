var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bdpmmg');
// var userSchema = new mongoose.Schema({
//     pmcode: String,
//     item: String,
//     quant: String,
// }, { collection: 'emprestimos' }
// );
 
// module.exports = { Mongoose: mongoose, UserSchema: userSchema }

var emprestimoSchema = new mongoose.Schema({
    policial: String,
    equipamento: String,
    quantidade: String
}, { collection: 'emprestimocolection' }
);
var devolucaoSchema = new mongoose.Schema({
    policial: String,
    equipamento: String,
    quantidade: String
}, { collection: 'devolucaocolection' }
);
module.exports = { Mongoose: mongoose, emprestimoSchema: emprestimoSchema , devolucaoSchema: devolucaoSchema}