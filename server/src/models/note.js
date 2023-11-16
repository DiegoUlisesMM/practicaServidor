const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // dueDate: {
    //     type: Date,  
    //     default: null  
    // },
    // priority: {
    //     type: String,
    //     required: true
    // },
    // estado: {
    //     type: String,
    //     required: true
    // }

})
module.exports = mongoose.model('Note', noteSchema)