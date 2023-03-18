const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    displayName: String,
    age: String,
    location: String,
    gender: String,
    interestedIn: String,
    bio: String,
    funFact: String,
    hobbies: [String],
    photo: {
        type: String,
        default: "https://i.imgur.com/56zrFKC.jpg",
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    uid: String,

}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);