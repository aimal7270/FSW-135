const mongoose = require("mongoose")
const inventorySchema = mongoose.Schema

const inventorySchema = new mongoose.Schema({
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

module.exports = mongoose.model('Inventory', inventorySchema)