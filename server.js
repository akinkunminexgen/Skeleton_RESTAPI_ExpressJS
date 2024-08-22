//use .env file to setup for various connection
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const expressLayouts = require('express-ejs-layouts');


const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')

//engine template to use
app.set('view engine', 'ejs');

app.set('views', __dirname+'views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

// to load static files directly
app.use(express.static('public'))

app.use('/', indexRouter)
app.use('/user', userRouter)

app.listen(process.env.PORT || 3000)