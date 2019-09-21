
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Update = new Schema({
    createdDateacount:{type: Date, default: Date.now},
    update:{type:Schema.Types.Mixed}    
})

module.exports = mongoose.model('Update',Update)