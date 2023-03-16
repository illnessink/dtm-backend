const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz.js');

// index
router.get("/", async (req, res) => {
    try {
        res.status(200).json(await Quiz.find({}));
    } catch (error) {
        console.log(error) // <--- 
        res.status(400).json({ message: "something went wrong" });
    }
});


// create 
router.post("/:id", async (req, res) => {
    try {
      req.body.uid = req.params.id;
      const quiz = await Quiz.create(req.body);
      res.status(201).send({ quiz });
        console.log(req.body)
    } catch (error) {
      res.status(400).json({ message: "something went wrong" });
    }
  });


module.exports = router;