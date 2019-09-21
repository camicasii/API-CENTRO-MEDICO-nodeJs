
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    password: String,    
    username:String,
    createdDateacount:{type: Date, default: Date.now},
})

module.exports = mongoose.model('User',User)