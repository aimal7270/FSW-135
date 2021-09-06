const express = require('express')
const authRouter = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// GET ALL  *READ - Find All*
authRouter.get("/:userId", (req, res, next) => {
  User.find((err, allUsers) => {
      if(err) {
          res.status(500)
          return next(err)
      }
      return res.status(200).send(allUsers)
  });
})

// GET ONE      *READ - Find One*
authRouter.get("/:userId", (req, res, next) => {
  User.findOne((err, oneUser) => {
      if(err) {
          res.status(500)
          return next(err)
      }
      return res.status(200).send(oneUser)
  });
})

// POST ONE    *CREATE*
authRouter.post("/:userId", (req, res, next) => {
  const newUser = new Auth(req.body)
  newUser.save((err, savedUser) => {
      if(err) {
          res.status(500)
          return next(err)
      }
      return res.status(201).send(savedUser)
  });
})

// UPDATE ONE    *UPDATE*
authRouter.put("/:userId", (req, res, next) => {
  User.findOneAndUpdate(
      {_id: req.params.userId}, 
      req.body, 
      {new: true}, 
      (err, updatedUser) => {
          if(err) {
              res.status(500)
              return next(err)
          }
          return res.status(201).send(updatedUser)
      }
  );
})

//DELETE ONE   *DELETE*
authRouter.delete("/:userId", (req, res, next) => {
  User.findOneAndDelete({_id: req.params.userId}, (err, deletedUser) => {
      if(err) {
          res.status(500)
          return next(err)
      }
      return res.status(200).send(`Successfully deleted ${deletedUser.username} from the database!`)
  });
})

// sign up and login.



module.exports = authRouter;