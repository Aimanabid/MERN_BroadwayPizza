const mongoose = require('mongoose')

const FormSchema= mongoose.Schema(
    {
        email: String,
        phone: String,
        password : String,
        isOnline: { type: Boolean, default: false },
        role: { type: String, default: 'user' }, 
    }
)

module.exports= mongoose.model('registrations',FormSchema)