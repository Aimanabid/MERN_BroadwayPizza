const mongoose = require('mongoose')

const cateringSchema = mongoose.Schema({
    name : String,
    phone : Number,
    email : String,
    persons : Number,
    date : Date,
    message : String
})
module.exports = mongoose.model('caterings', cateringSchema)