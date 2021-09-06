const express = require('express')
const userRouter = express.Router()
const User = require("../models/user.js")

//Get all
userRouter.get('/', (req, res, next) => {
    User.find((err, users) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(users)
    })
  })

  //Get one
  userRouter.get('/:userId', (req, res, next) => {
      User.findById(req.params.userId, (err, user) =>{
          if(err){
              res.status(500)
              return next(err)
          }
          return res.status(201).send(user)
      })
  })

  //Post
  userRouter.post("/", (req, res, next) => {
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
        if(err){
            res.status(500)
            return next (err)
        }
        return res.status(201).send(savedUser)
    })
})


//Delete
userRouter.delete("/:userId", (req, res, next) => {
    User.findOneAndDelete(
        {_id: req.params.userId},
        (err, deletedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted: ${deletedUser.user} from the database.`)
        }
        )
    })

    //update
    userRouter.put("/:userId", (req, res, next) => {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            req.body,
            {new:true},
            (err, updatedUser) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(updatedUser)
            }
        )
    })
    
    module.exports = userRouter