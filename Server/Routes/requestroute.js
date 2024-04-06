const express = require("express");
const {
  addreq,
  getrequests,
  deleteRequest,
} = require("../Controllers/requestcontrollers");

const router = express.Router();

router.post("/addreq", addreq);
router.get("/get", getrequests);
router.post("/delete", deleteRequest);

module.exports = router;
