const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
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
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }

}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);