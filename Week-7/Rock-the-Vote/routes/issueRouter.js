const express = require('express')
const issueRouter = express.Router()
const user = require('../models/user.js')



// GET ALL
issueRouter.route("/")
    .get((req, res, next) => {
        Issue.find((err, issues) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(issues)
        })
        .populate('user', 'username')
        .exec()
    })

// POST
    .post((req, res, next) => {
        req.body.user = req.user._id
        const newIssue = new Issue(req.body)
        newIssue.save((err, savedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(`New Issue has been added`)
        })
    })

// GET ALL by user
issueRouter.get("/user", (req, res, next) => {
    Issue.find({ user: req.user._id }, (err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
    .sort({'postDate': 'descending'})
    .populate('user', 'username')
    .exec()
})

// GET ALL Users 
issueRouter.get("/user/:userId", (req, res, next) => {
    Issue.find({ user: req.userId }, (err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
    .sort({'postDate': 'descending'})
    .populate('user', 'username')
    .exec()
})

// GET ONE BY ID
issueRouter.route("/:issueId")
    .get((req, res, next) => {
        Issue.findOne({ _id: req.params.issueId}, 
            (err, issue) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                if(!issue){
                    res.status(403)
                    return next(new Error(`${req.params.issueId} is not found`))
                }
                issue.user = user
                return res.status(200).send(foundIssue)
            })
        .populate('user', 'username')
        .exec()
    })

// DELETE ONE BY ID
    .delete((req, res, next) => {
        Issue.findOneAndDelete({ _id: req.params.issueId, user: req.user._id},
            (err, deletedIssue) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                if(!issue){
                    res.status(403)
                    return next(new Error(`${req.params.issueId} is not found`))
                }
                return res.status(200).send(`${deletedIssue.name} has been deleted`)
            })
        .populate('user', 'username')
        .exec()
    })

// UPDATE ONE BY ID
    .put((req, res, next) => {
        Issue.findOneAndUpdate({ _id: req.params.issueId},
            req.body,
            { new: true },
            (err, updatedIssue) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                if(!issue){
                    res.status(403)
                    return next(new Error(`${req.params.issueId} is found`))
                }    
                return res.status(200).send(updatedIssue)
            })
        .populate('user', 'username')
        .exec()    
    })

// Add Likes by ID
    issueRouter.put("/upvote/:issueId", 
        (req, res, next) => {
            Issue.findOneAndUpdate({ _id: req.params.issueId},
            { $inc: {upvotes: 1}, $push: {usersVoted: {user: req.user._id}} },
            { new: true },
            (err, updatedIssue) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(updatedIssue)
            })
            .populate('user', 'username')
            .exec()    
        })

// ADD Dislike by ID
        issueRouter.put("/downvote/:issueId", 
        (req, res, next) => {
            Issue.findOneAndUpdate({ _id: req.params.issueId},
            { $inc: {downvotes: 1}, $push: {usersVoted: {user: req.user._id}} },
            { new: true },
            (err, updatedIssue) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(updatedIssue)
            })
            .populate('user', 'username')
            .exec()    
        })

module.exports = issueRouter