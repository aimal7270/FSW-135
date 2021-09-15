const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
const PORT = 7500;

// middleware
app.use(express.json())
app.use(morgan('dev'))

// DB connect
mongoose.connect('mongodb://localhost:27017/rockthevotedb',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log('Database is connected')
)

// routes
app.use("/auth", require('./routes/authRouter.js'))
//app.use("/publicIssues", require('./routes/publicIssueRouter.js'))
app.use("/api", expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use("/api/issues", require('./routes/issueRouter.js'))
app.use("/api/comments", require('./routes/commentRouter.js'))
//app.use("api/generalIssues", require('./routes/generalIssuesRouter.js'))

// error handler
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "401 UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

// listen
app.listen(4000,() => {
    console.log("Server running on port 4000")
})