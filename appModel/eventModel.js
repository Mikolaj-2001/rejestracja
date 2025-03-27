const mongoose = require('mongoose')

const event = new mongoose.Schema(
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

module.exports = mongoose.model("event", event)