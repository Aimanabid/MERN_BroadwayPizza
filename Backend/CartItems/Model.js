const mongoose = require ('mongoose')

 const CartItems = mongoose.Schema({
    id : Number,
    name : String,
    image : String ,
    price : String,
    quantity : Number
 })

 module.exports = mongoose.model('cartitems', CartItems)