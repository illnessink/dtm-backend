const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    q1: {
        type: String,
    },
    q2: {
        type: String,
    },
    q3: {
        type: String,
    },
    q4: {
        type: String,
    },
    q5: {
        type: String,
    },
    q6: {
        type: String,
    },
    q7: {
        type: String,
    },
    q8: {
        type: String,
    },    
    q9: {
        type: String,
    },
    q10: {
        type: String,
    },

}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);