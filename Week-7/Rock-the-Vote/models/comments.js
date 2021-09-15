const mongoose = require('mongoose')
const Schema = mongoose.Schema


//Comment Schema
const commentSchema = new Schema({
    commentDate: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    issue: {
        type: Schema.Types.ObjectId,
        ref: "Issue"
    },
    comment: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Comment", commentSchema)