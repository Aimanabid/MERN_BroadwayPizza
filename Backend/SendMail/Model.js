const mongoose = require ('mongoose')

const MailSchema = mongoose.Schema({
    email : String,
})

module.exports = mongoose.model('mails', MailSchema)