const express = require('express');
const app = express()

const morgan = require('morgan');
const mongoose = require('mongoose');



// MIDDLEWARE
app.use(express.json());
app.use(morgan('dev'));


// MONGODB & MONGOOSE
mongoose.connect('mongodb://localhost:27017/rockthevote-db',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
},
() => console.log('Connected to the Database!'))


// ROUTES
app.use('/auth', require('./routes/authRouter'))
app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] })) 
app.use('/api/issue', require('./routes/issueRouter'))
app.use('/api/comment', require('./routes/commentRouter.js.js.js'))

// ERROR HANDLING
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

// SERVER PORT
app.listen(7000, () => {
    console.log('Server is running on Port 7000')
})
