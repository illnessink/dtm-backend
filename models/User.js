const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    profile: {
        type: profileSchema,
    },
    quiz: {
        type: quizSchema,
    },
    matches: [ObjectId],
    uid: String,

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);