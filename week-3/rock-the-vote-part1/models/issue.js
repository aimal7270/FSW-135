const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const issueSchema = new Schema({
    issuetype: {
        type: String,
        required: true
    },
    issuedescription: {
        type: String,

    }
})

module.exports = mongoose.model("Issue", issueSchema);
