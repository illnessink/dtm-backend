const express = require('express');
const router = express.Router();
// const User = require('../models/User');
const Profile = require('../models/Profile.js');

// home page

// test route

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
router.post("/profiles", async (req, res) => {
    try {
      req.body.uid = req.user.uid;
      const profile = await Profile.create(req.body);
      res.status(201).send({ profile });
    } catch (error) {
      res.status(400).json({ message: "something went wrong" });
    }
  });

// delete


// update


// show
router.get("/profiles/:id", async (req, res) => {
    try {
        const profile = await Profile.findOne({ uid: req.paramas.id })
        res.status(201).send({ profile })
    } catch (error) {
        res.status(400).json({ message: "something went wrong" });
    }
});


module.exports = router;
