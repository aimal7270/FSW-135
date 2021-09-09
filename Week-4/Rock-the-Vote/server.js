const express = require('express');
const app = express()
require('dotenv').config()
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressJwt = require('express-jwt');

// MIDDLEWARE
app.use(express.json());
app.use(morgan('dev'));

// MONGODB & MONGOOSE
mongoose.connect('mongodb://localhost:27017/rockthevotedb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log("Connected to the DB")
)

// ROUTES
app.use('/auth', require('./routes/authRouter'))
app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['H256'] })) 
app.use('/api/user', require('./routes/userRouter.js'))
app.use('/api/issue', require('./routes/issueRouter'))
app.use('/api/comment', require('./routes/commentRouter.js'))



// ERROR HANDLING
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "Unauthorized Error"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

// SERVER PORT
app.listen(9000, () => {
    console.log('Server is running on Port 9000')
})