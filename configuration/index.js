const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const mongoose = require('mongoose')
const cookieParsing = require('cookie-parser')

mongoose.connect('mongodb://127.0.0.1:27017/Registration')

const Event = require('../appModel/eventModel')

const overAllRouting = require('../appRouting/appRoutes')

const appMiddelware = require('../middelwares/userFullfilment')

app.use(express.static('public'))

app.engine('hbs', hbs.engine({ extname: ".hbs" }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }));
app.use(cookieParsing());
app.use(express.json());

app.use((_req, res, next) => {
    res.locals.formData = {
        fullName: "",
        event: "",
        city: "",
    };
    next()
})

app.get("/mongoose/:id", function (req, res) {
    Event.findById(req.params.id)
        .then((event) => {
            res.locals.formData = {
                fullName: event.fullName,
                event: event.event,
                city: event.city,
            }
            res.render('layouts/mainAppView')
        })
        .catch((err) => {
            console.log("Błąd pobierania danych,",err)
            res.send(err);
        });
})

app.get("/", function (_req, res) {
    res.render("layouts/mainAppView");
});

app.post('/submit', (req, res) => {
    const { name, event, city, } = req.body
    console.log(name, event, city,)

    const newEvent = new Event({
        fullName: name,
        event: event,
        city: city,
    })
    console.log(newEvent)
    newEvent.save()
        .then((savedEvent) => {
            res.redirect(`mongoose/${savedEvent._id}`)
        })
        .catch((err) => {
            console.error("Błąd zapisu do bazy:", err);
            res.send(err);
        });
})

app.use('/mainAppView', appMiddelware, overAllRouting)

const PORT = process.env.PORT || 2600
app.listen(PORT, function () {
    console.log(`Serwer pracuje na porcie ${PORT}`)
})