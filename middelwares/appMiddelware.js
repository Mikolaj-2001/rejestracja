const user = require('../appModel/userModel')
const event = require('../appModel/eventModel')

module.exports = (req, res, next) => {
    const { fullName, event, city } = req.body;

    if (fullName && event && city) {
        res.locals.fullName = fullName;
        res.locals.event = event;
        res.locals.city = city;
        
        return next()
    } else {
        return res.status(400).send('Brak wymaganych danych.');
    }

}