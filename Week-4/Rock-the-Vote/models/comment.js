const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    
newComment: {
    type: String,
    required: true
},
user:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required: true
},

})

module.exports = mongoose.model( "Comment", commentSchema )