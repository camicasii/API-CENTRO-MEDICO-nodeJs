const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Cita = new Schema({    
    createdDate:{type: Date, default: Date.now},
    Updatecount:[{type:Date}],
    date:Date,
    symptom:String,
    attended:Boolean,
    price:Number,
    refPay:String,
    refFile:String,
    delete:{type: Boolean, default: false},
    doctor:[{
        type: Schema.Types.ObjectId,
        ref:'Patient'
    }],    

    patient:[{
        type: Schema.Types.ObjectId,
        ref:'Patient'
    },
    {
        type: Schema.Types.ObjectId,
        ref:'Employee'
    }]
})


module.exports = mongoose.model('Cita',Cita);