const express = require('express');
const router = express.Router();
const Message = require('../models/Message.js');

// create message
router.post("/" , async(req, res) => {
    try {
        const { from, to, message } = req.body;
        const newMessage = Message.create({
            message: message,
            chatUsers: [from, to],
            sender: from,
        })
        console.log(newMessage)
        return res.status(200).json(newMessage);   
    } catch (error) {
        return res.status(400).json({ message: "something went wrong"})
    }
})

// get message
router.get("/:user1Id/:user2Id" , async(req, res) => {
    try {
        const from = req.params.user1Id;
        const to = req.params.user2Id;
        const newMessage = await Message.find({
            chatUsers: {
                $all: [from,to],
            }
        }).sort({updatedAt:1});

        const allMessages = newMessage.map((msg) => {
            return {
                myself: msg.sender.toString() === from,
                message: msg.message
            }
        }) 
        console.log(newMessage);
        return res.status(200).json(await allMessages);

    } catch (error) {
        return res.status(400).json({ message: "something went wrong"})
    }
})


module.exports = router;