const Event = require('../appModel/eventModel')
const User = require('../appModel/userModel')

const event = {
    index(req, res) {
        const findIdentifiers = req.query.authorId ? { author: req.query.authorId } : {};

        Event.find(findIdentifiers)
            .populate('author')
            .lean()
            .then((events) => {
                res.render('layouts/mainAppView', { events: events })
            })
            .catch((err) => {
                res.send(err.message);
            });
    },
    post(req, res) {
        Event.findById(req.params.id)
            .populate('author')
            .lean()
            .then((event) => {
                res.render('layouts/mainAppView', event)
            })
            .catch((err) => {
                res.send(err);
            });
    },
    create(req, res) {
        const newEvent = new Event({ ...req.body, author: res.locals.userId })
        newEvent.save()

        User.updateOne(
            { _id: res.locals.userId },
            { $push: { events: newEvent._id } }
        ).catch((err) => {
            res.send(err)
        })
        res.redirect('/mainAppView')
    },
    update(req, res) {
        Event.findByIdAndUpdate(req.params.id, req.body)
            .then((event) => {
                if (!event) {
                    return res.status(404).send('Nie odnaleziono wydarzenia');
                }
                for (let key in req.body) {
                    if (req.body[key] !== undefined && req.body[key] !== null) {
                        event[key] = req.body[key];
                    }
                }
                return event.save();
            })
            .then((event) => {
                res.redirect('/mainAppView/' + event._id)
            })
            .catch((err) => {
                res.send(err)
            })
    },
    delete(req, res) {
        Event.findByIdAndDelete(req.params.id)
            .then(() => {
                User.updateOne(
                    { _id: res.locals.userId },
                    { $pull: { events: req.params.id } }
                ).catch((err) => {
                    res.send(err);
                });
                User.findById(res.locals.userId)
                    .then((user) => {
                        if (user) {
                            res.locals.fullName = user.name;
                            res.locals.event = user.event;
                            res.locals.city = user.city;
                        }
                        res.redirect("/mainAppView");
                    })
                    .catch((err) => {
                        res.send(err);
                    });

            })
            .catch((err) => {
                res.send(err);
            });
    },

}
module.exports = event