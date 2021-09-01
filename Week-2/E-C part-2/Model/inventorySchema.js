const mongoose = require("mongoose")
const Schema = mongoose.Schema

const inventorySchema = new Schema({
    name:{
     type: String,
    required: true
    },
    brand:{ 
        type: String,
        required:true
    },
    itemType:{
        type:String,
        required:true,
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Inventory', inventorySchema);