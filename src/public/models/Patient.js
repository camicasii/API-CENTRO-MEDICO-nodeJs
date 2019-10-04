 
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Patient = new Schema({    
    Updatecount:[{type:Date}],
    user: [{
        type: Schema.Types.ObjectId,
        ref:'User'
    }],
    firstName: String,
    lastName: String,
    age:String,
    genero:String,
    dni:String,
    email: String,
    phone:Number,
    direction: String,
    citas:[{
        type: Schema.Types.ObjectId,
        ref:'Citas'
    }], 
})

module.exports = mongoose.model('Patient',Patient);