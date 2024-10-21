const mongoose = require ('mongoose')

const productmodel = mongoose.Schema({
    
        id : Number,
        name : String,
        image : String,
        price: Number,      
})
module.exports = mongoose.model('products',productmodel)