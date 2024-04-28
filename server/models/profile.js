const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    birthday: { type: String, required: true },
    height: { type: String, required: true },
    weight: { type: String, required: true },
    position: { type: String, required: true },
    /*strength1: { type: String, required: false },
    strength2: { type: String, required: false },
    strength3: { type: String, required: false },*/
    description: { type: String, required: false },
    creator: { type: String, required: true }

})

module.exports = mongoose.model('Profile', profileSchema)