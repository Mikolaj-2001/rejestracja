const events = require('../appModel/eventModel')
const user = require('../appModel/userModel')

module.exports = {
    create: (req, res) => {
        const { fullName, event, city } = req.body

        console.log("Dane uzyskane:", { fullName, event, city });

        const newEvent = new events({
            fullName: fullName,
            event: event,
            city: city
        })

        newEvent.save()
            .then((savedEvent) => {
                console.log("Zapisane wydarzenie:", savedEvent);
                res.redirect(`/events`)
            })
            .catch((err) => {
                res.send(err);
            });
    },

    index: function (_req, res) {
        events.find().lean().then(function (allEvents) {
            res.render('mainAppView', {
                allEvents,
            })
        }
        )
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
        console.log(req.params)
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
                res.redirect("/events");
            })
            .catch((err) => {
                res.send(err);
            });
    }
}