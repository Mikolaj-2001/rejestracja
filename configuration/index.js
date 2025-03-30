const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Registration')

const events = require('../appModel/eventModel')
const eventsRouting = require('../appRouting/eventsRouting')
const appMiddelware = require('../middelwares/appMiddelware')

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.engine('hbs', hbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '../views/layouts'),
    helpers: {
        plusOne: function (value) {
            return value + 1;
        }
    }
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

app.use('/events', eventsRouting)

const PORT = process.env.PORT || 2600
app.listen(PORT, function () {
    console.log(`Serwer pracuje na porcie ${PORT}`)
})