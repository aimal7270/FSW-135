const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
    
    topic: {
        type: String,
        required: true 
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    imgUrl: {
        type: String,
        // required: true,
        // default: 
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comment: {
        type: String,
        required: false
    }
    
})

module.exports = mongoose.model( "Issue", issueSchema )