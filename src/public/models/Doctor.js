 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Doctor = new Schema({    
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

    university: String,
    License:String,
    specialty:String,

    job:String,
    salary:String,
    contract_date_start:Date,

    patient:[{
        type: Schema.Types.ObjectId,
        ref:'Cita'
    }], 
})

module.exports = mongoose.model('Doctor',Doctor);