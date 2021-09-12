const express = require('express')
const authRouter = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// // GET ALL  *READ - Find All*
// authRouter.get("/:userId", (req, res, next) => {
//   User.find((err, allUsers) => {
//       if(err) {
//           res.status(500)
//           return next(err)
//       }
//       return res.status(200).send(allUsers)
//   });
// })

// // GET ONE      *READ - Find One*
// authRouter.get("/:userId", (req, res, next) => {
//   User.findOne((err, oneUser) => {
//       if(err) {
//           res.status(500)
//           return next(err)
//       }
//       return res.status(200).send(oneUser)
//   });
// })

// // POST ONE    *CREATE*
// authRouter.post("/:userId", (req, res, next) => {
//   const newUser = new Auth(req.body)
//   newUser.save((err, savedUser) => {
//       if(err) {
//           res.status(500)
//           return next(err)
//       }
//       return res.status(201).send(savedUser)
//   });
// })

// // UPDATE ONE    *UPDATE*
// authRouter.put("/:userId", (req, res, next) => {
//   User.findOneAndUpdate(
//       {_id: req.params.userId}, 
//       req.body, 
//       {new: true}, 
//       (err, updatedUser) => {
//           if(err) {
//               res.status(500)
//               return next(err)
//           }
//           return res.status(201).send(updatedUser)
//       }
//   );
// })

// //DELETE ONE   *DELETE*
// authRouter.delete("/:userId", (req, res, next) => {
//   User.findOneAndDelete({_id: req.params.userId}, (err, deletedUser) => {
//       if(err) {
//           res.status(500)
//           return next(err)
//       }
//       return res.status(200).send(`Successfully deleted ${deletedUser.username} from the database!`)
//   });
// })

// sign up
authRouter.post("/signup", (req, res, next) =>{
    console.log(req.body)
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if (err){
            res.status(500)
            return next(err)
        }
        if(user) {
            res.status(403)
            return next(new Error('User Already Exists'))
        }
        const newUser = new User(req.body)
        newUser.save((err, saveUser) =>{
            if(err){
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(saveUser.toObject(), process.env.SECRET)
            return res.status(201).send({token, saveUser })
        })
    })
})

//login
authRouter.post("/login", (req, res, next) => {
    console.log('req.body.username: ', req.body.username)
    User.findOne({ username: req.body.username }, (err, user) => {
    //User.findOne({ username: "Akhan1" }, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        console.log(req.body.password)
        console.log('user: ', user)
        if(!user || req.body.password !== user.password){
            res.status(403)
            return next(new Error('Invalid Credentials'))
        }
        const token = jwt.sign(user.toObject(), process.env.SECRET)
        return res.status(200).send({token, user})
    })
})



module.exports = authRouter;
