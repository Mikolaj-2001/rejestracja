const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userModel = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        surname: { type: String, required: true, unique: true },
        selectedEvent: { type: String, required: true },
        city: { type: String, required: true },
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }
        ]
    },
    {
        timestamps: true
    }
)
userModel.pre('save', (next) => {
    const user = this
    if (!user.isModified('name') &&
        !user.isModified('surname') &&
        !user.isModified('selectedEvent') &&
        !user.isModified('city')
    ) {
        return next()
    }
    next()
})
userModel.methods.generateAuthToken = () => {
    const token = jwt.sign({ _id: this.id }, "OnwardKey")
    return token
}
module.exports = mongoose.model('newUser', userModel)