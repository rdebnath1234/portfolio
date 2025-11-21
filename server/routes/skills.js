const express = require("express");
const router = express.Router();
const skills = require("../data/skills.json");

router.get("/", (req, res) => res.json(skills));
module.exports = router;
