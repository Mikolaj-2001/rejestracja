const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Registration')

const events = require('../appModel/eventModel')
const generalRouting = require('../appRouting/appRouting')
const appMiddelware = require('../middelwares/appMiddelware')

app.engine('hbs', hbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '../views/layouts'),
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../views'))

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (_req, res) {
    res.render("mainAppView", {
        layout: false,
        fullName: "",
        event: "",
        city: "",
    });
})

app.post('/submit', (req, res) => {
    const { fullName, event, city } = req.body

    console.log("Dane uzyskane:", { fullName, event, city });

    const newEvent = new events({
        fullName: fullName,
        event: event,
        city: city
    })

    newEvent.save()
        .then((savedEvent) => {
            console.log("Zapisane wydarzenie:", savedEvent);
            res.redirect(`/mongoose/${savedEvent._id}`)
        })
        .catch((err) => {
            res.send(err);
        });
})

app.get("/mongoose/:id", function (req, res) {
    events.findById(req.params.id)
        .then((event) => {
            res.render('mainAppView', {
                fullName: event.fullName,
                event: event.event,
                city: event.city,
            })
        })
        .catch((err) => {
            res.send(err);
        });
})

app.use('/mainAppView', appMiddelware, generalRouting)

const PORT = process.env.PORT || 2600
app.listen(PORT, function () {
    console.log(`Serwer pracuje na porcie ${PORT}`)
})