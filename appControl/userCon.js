const user = require('../appModel/userModel');

const users = {
    create(req, res) {
        const { fullName, event, city } = req.body;

        if (!fullName || !event || !city) {
            return res.render('mainAppView', {
                error: true,
                message: 'Wszystkie pola są wymagane',
                user: req.body,
            });
        }
        user.findOne({ fullName, event, city })
            .then((existingUser) => {
                if (existingUser) {
                    return res.render('mainAppView', {
                        error: true,
                        message: 'Użytkownik o tych parametrach już istnieje',
                        user: req.body,
                    });
                }

                const newUser = new user({
                    fullName,
                    event,
                    city,
                });

                return newUser.save();
            })
            .then(() => {
                console.log('AA')
                res.render('mainAppView', {
                    success: true,
                    message: 'Użytkownik został dodany!',
                });
            })
            .catch((err) => {
                console.error('Błąd podczas zapisywania użytkownika', err);
                res.render('error', { message: 'Wystąpił błąd podczas rejestracji formularza' });
            });

    },
};

module.exports = users;
