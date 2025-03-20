const User = require('../appModel/userModel')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.cookies['NewToken']
    if (token) {
        try {
            const verified = jwt.verify(token, "OnwardKey")
            User.findById(verified._id).then((user) => {
                res.locals.userId = user._id
                res.locals.userName = user.name
                next()
            })

        } catch {
            res.redirect('layouts/mainAppView')
        }
    } else{
        res.render('layouts/mainAppView')
    }
}

