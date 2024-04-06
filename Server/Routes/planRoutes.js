const express = require("express");
const {
  addplan,
  getplans,
  getPlanDetails,
} = require("../Controllers/planscontrollers");

const router = express.Router();

router.post("/addplan", addplan);
router.get("/plans", getplans);
router.post("/details", getPlanDetails);

module.exports = router;
