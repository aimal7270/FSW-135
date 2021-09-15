const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Issue Schema
const issueSchema = new Schema({
    title: {
        type: String,
        lowercase: true,
        required: true
    },
    postDate: {
        type: Date, 
        default: Date.now
    },
    description: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    usersVoted: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"    
        }
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})


// Upvotes and Downvotes
issueSchema.methods.addUpvote = function(){
    const issue = this.toObject()
    let upvotes = upvotes + 1
    return upvotes
}

issueSchema.methods.addDownvote = function(){
    const issue = this.toObject()
    let downvotes = downvotes + 1
    return downvotes
}