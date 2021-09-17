const express = require('express')
const issueRouter = express.Router()
const Issue = require("../models/issue.js")

//Get all
issueRouter
  .get('/', (req, res, next) => {
  Issue.find((err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

//Get all by user
  .get('/user/:userId', (req, res, next) => {
  Issue.find({user: req.params.userId},(err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

//Get One

  .get('/:issueId', (req, res, next) => {
  Issue.findOne({_id: req.params.issueId}, (err, issue)=> {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issue)
  })
})

//Post

  .post('/', (req, res, next)=> {
  req.body.user = req.user._id
  req.body.username = req.user.username
  const newIssue = new Issue(req.body)
  newIssue.save((err, savedIssue) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedIssue)
  })
})

//Update

  .put('/:issueId', (req, res, next)=>{
  Issue.findOneAndUpdate(
    {_id: req.params.issueId},
    req.body,
    {new: true},
    (err, updatedIssue)=> {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(updatedIssue)
  })
})

//Delete
.delete('/:issueId', (req, res, next)=> {
    Issue.findOneAndDelete(
      {_id: req.params.issueId},
      (err, deletedItem)=>{
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully deleted ${deletedItem} from database.`)
      }
    )
  })

    module.exports = issueRouter