const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comments')


// GET ALL
commentRouter.route("/")
    .get((req, res, next) => {
        Comment.find((err, comments) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(comments)
        })
    })

// POST
    .post((req, res, next) => {
        req.body.user = req.user._id
        const newComment = new Comment(req.body)
        newComment.save((err, savedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedComment)
        })
    })

// GET ALL BY USER
commentRouter.get("/user", (req, res, next) => {
    Comment.find({ user: req.user._id }, (err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

// GET ALL by issue
commentRouter.get("/issue", (req, res, next) => {
    Comment.find({ issue: req.params.issue._id }, (err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

// DELETE ONE
commentRouter.route("/:commentId")
    .delete((req, res, next) => {
        Comment.findOneAndDelete({ _id: req.params.commentId, user: req.user._id},
            (err, deletedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted Comment: ${deletedComment.postTitle}`)
        })
    })

// UPDATE ONE
    .put((req, res, next) => {
        Comment.findOneAndUpdate({ _id: req.params.issueId, user: req.user._id },
            req.body,
            { new: true },
            (err, updatedComment) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(updatedComment)
        })
    })

module.exports = commentRouter