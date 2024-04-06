const express = require("express");
const {
  login,
  signup,
  getDetails,
  getReffers,
  updateProfile,
  getPlanDetails,
} = require("../Controllers/authcontrollers");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/details", getDetails);
router.post("/getReffers", getReffers);
router.post("/updateprofile", updateProfile);
router.post("/getplan", getPlanDetails);

module.exports = router;
