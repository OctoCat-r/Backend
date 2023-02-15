const express = require("express");
const mailController = require("../controllers/mailController");
const cors = require("cors");
const router = express.Router();

// router.post("/sendMail",cors(), mailController,);
router.post("/sendmail", mailController);

module.exports = router;