const express = require("express");
const {
  addplan,
  getplans,
  getPlanDetails,
  getUsersPlan,
  userplans,
  updatevalue,
} = require("../Controllers/planscontrollers");

const router = express.Router();

router.post("/addplan", addplan);
router.get("/plans", getplans);
router.post("/details", getPlanDetails);
router.post("/userplan", getUsersPlan);
router.post("/userplans", userplans);

router.post("/updatevalue", updatevalue);

module.exports = router;
