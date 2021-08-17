const express = require("express");
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose')

app.use(express.json()) 
app.use(morgan('dev')) 

//Conect DB
mongoose.connect('mongodb://localhost:27017/eStore',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  ()=> console.log("Connected to the DB")
)