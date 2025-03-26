const User = require('../appModel/userModel')


const users = {
    create(req, res) {
        const newUser = new User(req.body);
        newUser
            .save()
            .then(() => {
                res.render('layouts/mainAppView')
            })
            .catch((err) => {
                if (err.code === 11000) {
                    res.render("layouts/mainAppView", {
                        error: true,
                        message: "Użytkownik już istnieje",
                        user: req.body,
                    });
                } else {
                    console.error('Błąd podczas zapisywania użytkownika', err);
                    res.render('error', { message: 'Wystąpił błąd' });
                }
            });
    },
}

module.exports = users