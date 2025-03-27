const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userModel = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        surname: { type: String, required: true, unique: true },
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "event",
        }]
    },
    {
        timestamps: true
    }
)
userModel.pre('save', (next) => {
    const user = this
    if (!user.isModified('fullName') &&
        !user.isModified('event') &&
        !user.isModified('city')
    ) {
        return next()
    }
    next()
})

module.exports = mongoose.model('newUser', userModel)