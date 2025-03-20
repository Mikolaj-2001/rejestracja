const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const mongoose = require('mongoose')
const cookieParsing = require('cookie-parser')

mongoose.connect('mongodb://127.0.0.1:27017/Registration')

const Post = require('../appModel/postModel')

const overAllRouting = require('../appRouting/appRoutes')

const appMiddelware = require('../middelwares/userFullfilment')

app.use(express.static('public'))

app.engine('hbs', hbs.engine({ extname: ".hbs" }))
app.set('view engine', 'hbs')

app.use('/mainAppView',overAllRouting)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 2600
app.listen(PORT, function(){
    console.log(`Serwer pracuje na porcie ${PORT}`)
})