const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    createdDateacount:{type: Date, default: Date.now},
    password: String,    
    username:String,
    email: String,
    tokenId:String,
    firstLogin:Boolean,

})

module.exports = mongoose.model('User',User)