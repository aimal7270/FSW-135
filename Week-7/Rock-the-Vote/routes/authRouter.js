const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

// SignUp
authRouter.post("/signup", (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(403)
            return next(new Error("Username Already Exists"))
        }
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(201).send({ token, user: savedUser.withoutPassword() })
        })
    })
})

// Login
authRouter.post("/login", (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }

        if(!user){
            res.status(403)
            return next(new Error("Incorrect Login Credentials"))
        }
        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err){
                res.status(403)
                return next(new Error("Incorrect Login Credentials"))
            }

            if(!isMatch){
                res.status(403)
                return next(new Error("Incorrect Login Credentials"))
            }

            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(200).send({ token, user: user.withoutPassword() })    
        })
    })
})
// GET ALL
authRouter.get("/", (req, res, next) => {
    User.find((err, users) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(users)
    })
})

// GET
authRouter.route("/:username")
.get((req, res, next) => {
    User.findOne({username: req.params.username},
        {username, memberSince},
        (err, user) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(user)
        })
})

// UPDATE
.put((req, res, next) => {
    User.findOneAndUpdate({username: req.params.username, user: req.user._id },
        req.body,
        {new: true},
        (err, updatedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedUser)
        })
})

// DELETE
.delete((req, res, next) => {
    User.findOneAndDelete({username: req.params.username, user: req.user._id },
        (err, deletedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`${deletedUser.username} has been deleted`)
        })
})

module.exports = authRouter