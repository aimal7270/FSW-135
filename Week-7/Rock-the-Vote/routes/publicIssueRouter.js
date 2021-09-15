const express = require('express')
const publicIssueRouter = express.Router()
const Issue = require('../models/issue.js')
const Comment = require('../models/comment.js')

// GET ALL by issues
publicIssueRouter.get("/", (req, res, next) => {
        Issue.find((err, issues) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(issues)
        })
        .sort({'upvotes': 'descending'})
        .populate('user', 'username')
    })

// GET ALL issue comments
publicIssueRouter.get("/comments/:issueId", (req, res, next) => {
    Comment.find({ issue: req.params.issueId }, (err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
    .populate('user', 'username')
})
    
module.exports = publicIssueRouter