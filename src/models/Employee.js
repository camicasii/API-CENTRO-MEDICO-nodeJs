 
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Employee = new Schema({    
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

    job:String,
    salary:String,
    contract_date_start:Date,
    
    citas:[{
        type: Schema.Types.ObjectId,
        ref:'Citas'
    },] 
})

module.exports = mongoose.model('Employee',Employee);