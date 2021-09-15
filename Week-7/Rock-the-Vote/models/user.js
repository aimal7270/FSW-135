const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
},
password: {
    type: String,
    required: true
},
memberSince: {
    type: Date,
    default: Date.now
}
})

module.exports = mongoose.model("User", userSchema);