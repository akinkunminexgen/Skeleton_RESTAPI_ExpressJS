//use .env file to setup for various connection
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')


const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const AAuth = require('./middleware/authController');
const theAuth = new AAuth();

//engine template to use
app.set('view engine', 'ejs');

// Set views and layout directories
app.set('views', __dirname+'/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

// to load static files directly
app.use(express.static('public'))
// Parse URL-encoded bodies (form submissions)
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))


app.use('/', indexRouter)
app.use(theAuth.authenticateToken)
app.use('/user', userRouter)

app.listen(process.env.PORT || 3000)