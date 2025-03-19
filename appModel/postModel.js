const mongoose = require('mongoose')

const Post = new mongoose.Schema(
    {
        title: String,
        content: String,
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "newUser"
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Post",Post)