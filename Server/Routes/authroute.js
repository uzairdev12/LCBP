const express = require("express");
const {
  login,
  signup,
  getDetails,
  getReffers,
  updateProfile,
  getPlanDetails,
  loadChunks,
  openBox,
  openSpin,
  updateUserall,
} = require("../Controllers/authcontrollers");
const { getstats } = require("../Controllers/gigcontroller");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/details", getDetails);
router.post("/getReffers", getReffers);
router.post("/updateprofile", updateProfile);
router.post("/getplan", getPlanDetails);
router.post("/load", loadChunks);
router.post("/openbox", openBox);
router.post("/openspin", openSpin);
router.post("/updateall", updateUserall);
router.get("/getstats", getstats);

module.exports = router;
