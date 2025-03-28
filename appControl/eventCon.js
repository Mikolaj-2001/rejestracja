const events = require('../appModel/eventModel')
const user = require('../appModel/userModel')

module.exports = {
    index: (req, res) => {
        const findIdentifiers = req.query.authorId ? { author: req.query.authorId } : {};

        events.find(findIdentifiers)
            .populate('author')
            .lean()
            .then((events) => {
                res.render('mainAppView', { events: events })
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
                res.render('mainAppView', events)
            })
            .catch((err) => {
                res.send(err);
            });
    },

    create: async (req, res) => {
        const newEvent = new event({ ...req.body, author: res.locals.userId })
        await newEvent.save()

        await user.updateOne(
            { _id: res.locals.userId },
            { $push: { events: newEvent._id } }
        ).catch((err) => {
            res.send(err)
        })
        res.redirect('/mainAppView')
    },

    update: (req, res) => {
        events.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((event) => {
                if (!event) {
                    return res.sent('Nie znaleziono nowego wydarzenia')
                }
                res.redirect("/mainAppView/" + event._id);
            })
            .catch((err) => {
                res.send(err);
            });
    },

    delete: (req, res) => {
        events.findByIdAndDelete(req.params.id)
            .then((deletedEvent) => {
                if (!deletedEvent) {
                    return res.send("Nie znaleziono wydarzenia do usunięcia.");
                }

                return user.updateOne(
                    { _id: res.locals.userId },
                    { $pull: { events: req.params.id } }
                );
            })
            .then(() => {
                res.redirect("/mainAppView");
            })
            .catch((err) => {
                res.send(err);
            });
    }
}