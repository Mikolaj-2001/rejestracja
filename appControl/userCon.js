const user = require('../appModel/userModel');

const users = {
    create(req, res) {
        const { fullName, event, city } = req.body;

        if (!fullName || !event || !city) {
            return res.render('layouts/mainAppView', {
                error: true,
                message: 'Wszystkie pola są wymagane',
                user: req.body,
            });
        }

        user.findOne({fullName,event,city}, (err, existingUser) => {
            if (err) {
                console.error('Błąd podczas weryfikacji obecnego zasobu danych', err);
                return res.render('error', { message: 'Wystąpił błąd' });
            }

            if (existingUser) {
                return res.render('layouts/mainAppView', {
                    error: true,
                    message: 'Użytkownik o tych parametrach już istnieje',
                    user: req.body,
                });
            }
            const newUser = new user({
                fulName,
                event,
                city,
            });

            newUser.save((err) => {
                if (err) {
                    console.error('Błąd podczas zapisywania użytkownika', err);
                    return res.render('error', { message: 'Wystąpił błąd podczas rejestracji formularza' });
                }
                res.render('layouts/mainAppView', {
                    success: true,
                    message: 'Użytkownik został dodany!',
                });
            });
        });
    },
};

module.exports = users;
