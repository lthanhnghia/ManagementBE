const express = require("express");
const router = express.Router();
const {getAll,createStudent,findPhoneOTP,confirmOtps} = require('../Controllers/index')




router.get("/",getAll);
router.post("/",createStudent)
router.get("/:phone",findPhoneOTP)
router.get("/:phone/:otp", confirmOtps);
module.exports = router;