const user = require('../appModel/userModel')

module.exports = (req, res, next) => {
    const { mainHardDrive } = req.body

    if (mainHardDrive) {
        res.locals.userId = req.user._id
        res.locals.fullName = req.body.fullName
        res.locals.event = req.body.event
        res.locals.city = req.body.city

        return next()
    } else {
        return res.status(400).send('Brak wymaganych danych.');
    }
} 