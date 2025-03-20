const User = require('../appModel/userModel')

const users = {
    create(req, res) {
        const newUser = User(req.body);
        newUser
            .save()
            .then(() => {
                if (created) {
                    const token = user.generateAuthToken(user)
                    res.cookie('NewToken', token)
                    res.redirect("/mainAppView");
                } else{
                    res.render('layouts/mainAppView'),{
                        error : true,
                        message:"Token nie mógł zostać przypisany",
                    }
                    return
                }
            })
            .catch((err) => {
                if (err.code) {
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