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

app.use('/mainAppView', overAllRouting)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParsing());
app.use(express.json());

app.get("/mongoose/:id", function (req, res) {
    Post.findById(req.params.id)
        .then((post) => {
            res.render('mainAppView', {
                fullName: post.fullName,
                selectedEvent: post.selectedEvent,
                city: post.city,
                displaytitle: true,
            })
        })
        .catch((err) => {
            res.send(err);
        });
})

app.get("/", function (_req, res) {
    res.render("mainAppView", {
        fullName: "",
        selectedEvent: "",
        city: "",
        displayTitle: true,
    });
})

app.post('/sumbit', (req, res) => {
    const { name, surname, selectedEvent, city } = req.body

    const newPost = new Post({
        fullName: fullName,
        selectedEvent: selectedEvent,
        city: city
    })
    newPost.save()
        .then((savedPost) => {
            res.redirect(`mongoose/${savedPost._id}`)
        })
        .catch((err) => {
            res.send(err);
        });
})

app.use('/mainAppView', appMiddelware, overAllRouting)

const PORT = process.env.PORT || 2600
app.listen(PORT, function () {
    console.log(`Serwer pracuje na porcie ${PORT}`)
})