const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    q1: {
        type: Boolean,
        required: true,
    },
    q2: {
        type: Boolean,
        required: true,
    },
    q3: {
        type: Boolean,
        required: true,
    },
    q4: {
        type: Boolean,
        required: true,
    },
    q5: {
        type: Boolean,
        required: true,
    },
    q6: {
        type: Boolean,
        required: true,
    },
    q7: {
        type: Boolean,
        required: true,
    },
    q8: {
        type: Boolean,
        required: true,
    },
    q9: {
        type: Boolean,
        required: true,
    },
    q10: {
        type: Boolean,
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);