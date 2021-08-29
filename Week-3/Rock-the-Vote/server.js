const express = require("express");
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()


app.use(express.json()) 
app.use(morgan('dev')) 

//Conect DB
mongoose.connect('mongodb://localhost:27017/Rock-the-Vote',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  ()=> console.log("Connected to the DB")
)

app.use("/auth", require("./routes/authRouter.js"))
app.use("/comments", require("./routes/commentRouter.js"))
app.use("/issues", require("./routes/issueRouter.js"))
app.use("/users", require("./routes/userRouter.js"))

app.use((err, req, res, next) => {
  console.log(err)
    return res.send({errMsg: err.message})
})

app.listen(9000, () => { 
    console.log("The App is listening on port 9000")
});