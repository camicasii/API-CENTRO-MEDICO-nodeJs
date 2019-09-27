const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Sessions = new Schema({    
    _id:String,
    expires:String,
    session:{}
})

module.exports = mongoose.model('Sessions',Sessions);