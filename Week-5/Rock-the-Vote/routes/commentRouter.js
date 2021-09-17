const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment')

//Get All By Issue Id
commentRouter
  .get('/issues/:issueId', (req, res, next) => {
  Comment.find({issueId: req.params.issueId}, (err, comment) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comment)
  })
})

//Get All By User
  .get('/user/:userId', (req, res, next) => {
    Comment.find({user: req.params.userId}, (err, comment)=> {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(comment)
    })
})

//Get All
  .get('/', (req, res, next) => {
  Comment.find( (err, comment) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comment)
  })
})

//Post

  .post('/:issue', (req, res, next)=> {
  req.body.user = req.user._id
  req.body.username = req.user.username
  req.body.issueId = req.params.issue
  const newComment = new Comment(req.body)
  newComment.save((err, savedComment) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedComment)
  })
})

//Add Upvote
  .put('/upvotes/:commentId', (req, res, next) => {
  Comment.findOneAndUpdate(
    {_id: req.params.commentId},
    {$inc: {upvotes: 1}},
    {new: true},
    (err, updatedComment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(updatedComment)
    }
  )
})

//Add Downvote
  .put('/downvotes/:commentId', (req, res, next) => {
  Comment.findOneAndUpdate(
    {_id: req.params.commentId},
    {$inc: {downvotes: 1}},
    {new: true},
    (err, updatedComment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(updatedComment)
    }
  )
})

//Update
.put('/:commentId', (req, res, next) => {
  Comment.findOneAndUpdate(
      { _id: req.params.commentID }, 
      req.body, 
      { new: true }, 
      (err, updatedComment) => {
          if(err) {
              res.status(500);
              return next(err);
          }
          return res.status(201).send(updatedComment);
      }
  )
})

//Delete
  .delete('/:commentId', (req, res, next)=> {
  Comment.findOneAndDelete(
    {_id: req.params.commentId},
    (err, deletedItem)=>{
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted comment from database.`)
    }
  )
})

module.exports = commentRouter