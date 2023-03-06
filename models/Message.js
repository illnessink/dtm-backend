const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    body: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);