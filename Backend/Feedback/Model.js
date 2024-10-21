const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema({
    message : String,
})  

module.exports= mongoose.model('feedbacks', feedbackSchema)