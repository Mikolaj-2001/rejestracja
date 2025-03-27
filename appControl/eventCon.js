const events = require('../appModel/eventModel')
const user = require('../appModel/userModel')

module.exports = {
    index: (req, res) => {
        const findIdentifiers = req.query.authorId ? { author: req.query.authorId } : {};

        events.find(findIdentifiers)
            .populate('author')
            .lean()
            .then((events) => {
                res.render('layouts/mainAppView', { events: events })
            })
            .catch((err) => {
                res.send(err.message);
            });
    },
    post: (req, res) => {
        events.findById(req.params.id)
            .populate('author')
            .lean()
            .then((events) => {
                res.render('layouts/mainAppView', events)
            })
            .catch((err) => {
                res.send(err);
            });
    },

    create: (req, res) => {
        const newEvent = new event({ ...req.body, author: res.locals.userId })
        newEvent.save()

        user.updateOne(
            { _id: res.locals.userId },
            { $push: { events: newEvent._id } }
        ).catch((err) => {
            res.send(err)
        })
        res.redirect('/mainAppView')
    },

    update: (req, res) => {
        event.findByIdAndUpdate(req.params.id, req.body)
            .then((event) => {
                res.redirect("/mainAppView/" + event._id);
            })
            .catch((err) => {
                res.send(err);
            });
    },

    delete: (req, res) => {
        event.findByIdAndDelete(req.params.id)
            .then(() => {
                user.updateOne(
                    { _id: res.locals.userId },
                    { $pull: { events: req.params.id } }
                ).catch((err) => {
                    res.send(err);
                });

                res.redirect("/mainAppView");
            })
            .catch((err) => {
                res.send(err);
            });
    }
}