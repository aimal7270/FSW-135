const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
    
    topic: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    postDate: {
        type: Date,
        default: Date.now()
    },
    likes: {
        type: String,
        required: true,
        default: 0
    },
    dislikes: {
        type: String,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model( "Issue", issueSchema )