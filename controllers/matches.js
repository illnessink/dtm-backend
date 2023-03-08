const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Profile = require('../models/Profile');

// home page

// index
// router.get("/matches", async (req, res) => {
//     try {
//         res.status(200).json(await User.find({ uid: req.user.uid }, (err, foundUser) => {
//             res.status(200).json(await Profile.find({matches}))
//         }))
//     } catch (error) {
//         res.status(400).json({ message: "something went wrong" });
//     }
// });


// create 


// delete


// update


// show

module.exports = router;
