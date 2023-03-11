const express = require('express');
const router = express.Router();
// const User = require('../models/User');
const Profile = require('../models/Profile.js');

// home page

// test route

// index
router.get("/", async (req, res) => {
    try {
        res.status(200).json(await Profile.find({}))
    } catch (error) {
        res.status(400).json({ message: "something went wrong" });
    }
});


// create 
router.post("/", async (req, res) => {
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
router.put("/:id", async (req, res) => {
  try {
    res.status(200).json(
      await Profile.findOneAndUpdate({ uid: req.params.id }, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
});

// show
router.get("/:id", async (req, res) => {
    try {
        const profile = await Profile.findOne({ uid: req.params.id })
        console.log(profile)
        res.status(201).send({ profile })
    } catch (error) {
        res.status(400).json({ message: "something went wrong" });
    }
});


module.exports = router;
