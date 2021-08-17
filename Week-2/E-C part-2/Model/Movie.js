const mongoose = require("mongoose")
const moviesSchema = mongoose.Schema

const moviesSchema = new mongoose.Schema({
    title:{
     type: String,
    required: true
    },
    genre:{ 
        type: String,
        required:true
    },
    release_year:{
        type:String,
        required:true,
        min: 1874
    }
})

module.exports = mongoose.model('Movie', moviesSchema)