const User = require('../appModel/userModel')

module.exports = (req, res, next) => {
    const userData = req.body

    if (!userData) {
        return res.render('layouts/mainAppView');
    }

    try {
        const verified = verify(userData);

        User.findById(verified._id)
            .then((user) => {
                if (!user) {
                    return res.render('layouts/mainAppView', {
                        error: true,
                        message: 'Taki użytkownik nie istnieje.',
                        fullName: userData.name,
                        event: userData.event,
                        city: userData.city,
                    });
                }
                res.locals.userId = user._id;
                res.locals.fullName = userData.name;
                res.locals.event = userData.event;
                res.locals.city = userData.city;
                next();
            })
            .catch((err) => {
                console.error('Błąd podczas wyszukiwania użytkownika:', err);
                return res.render('layouts/mainAppView', {
                    error: true,
                    message: 'Błąd podczas wyszukiwania użytkownika.',
                });
            });

    } catch (err) {
        console.error('Błąd weryfikacji danych:', err);
        return res.render('layouts/mainAppView', {
            error: true,
            message: 'Nieprawidłowe dane użytkownika.',
        });
    }
}

