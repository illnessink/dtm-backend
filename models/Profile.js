const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    displayName: String,
    age: String,
    location: String,
    gender: String,
    interestedIn: String,
    bio: String,
    funFact: String,
    hobbies: [String],
    photo: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);