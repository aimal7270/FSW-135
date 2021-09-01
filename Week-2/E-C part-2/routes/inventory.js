const express = require('express')
const storeRouter = express.Router()
const Inventory = require('../Model/inventorySchema')

// Get All
storeRouter.get("/", (req, res, next) => {
  Inventory.find((err, inventory) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(inventory)
  }
)})


// Post One
storeRouter.post("/", (req, res, next) => {
  const newItem = new Inventory(req.body)
  newItem.save((err, savedItem)=>{
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedItem)
  })
})


// Get One
storeRouter.get("/:inventoryId", (req, res, next) => {
  Inventory.findOne({_id: req.params.inventoryId}, (err, foundItem) => {
    if(err){ 
      res.status(500)
      return next(err)
    }
    return res.status(200).send(foundItem)
})
})




// Delete One
storeRouter.delete("/:inventoryId", (req, res, next) => {
  Inventory.findOneAndDelete(
    {_id: req.params.inventoryId}, (err, deletedItem) => {
    if(err){ 
      res.status(500)
      return next(err)
    }
    return res.status(200).send(`Successfully deleted item ${deletedItem.name} from the database`)
  })
})
 

// Update One
storeRouter.put("/:inventoryId", (req, res, next) => {
  Inventory.findOneAndUpdate({_id: req.params.inventoryId}, req.body, {new: true}, (err, updatedItem) =>{
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(updatedItem)
  })
})


module.exports = storeRouter