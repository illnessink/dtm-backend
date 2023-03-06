const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    userA: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    userB: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
    }],
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);