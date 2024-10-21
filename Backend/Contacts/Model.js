const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    name: String,
    message : String,
})  

module.exports= mongoose.model('contacts', contactSchema)