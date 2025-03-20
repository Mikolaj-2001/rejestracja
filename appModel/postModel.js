const mongoose = require('mongoose')

const Post = new mongoose.Schema(
    {
        fullName: String,
        selectedEvent: String, required: true,
        city: String, required: true,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "newUser"
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Post", Post)