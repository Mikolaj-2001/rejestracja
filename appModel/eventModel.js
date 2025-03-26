const mongoose = require('mongoose')

const Event = new mongoose.Schema(
    {
        fullName: String,
        event: String,
        city: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "newUser"
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Event", Event)