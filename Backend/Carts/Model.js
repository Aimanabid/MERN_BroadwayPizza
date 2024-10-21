const mongoose = require ('mongoose')

const CartSchema = mongoose.Schema({
    city : String, 
    phoneNo : Number,
})
module.exports = mongoose.model('carts', CartSchema)