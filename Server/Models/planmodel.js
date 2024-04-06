const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "Name is required."],
  },
  price: {
    type: "number",
    required: [true, "Price is required."],
  },
  firstChain: {
    type: "string",
    required: [true, "First chain is required."],
  },
  secondChain: {
    type: "string",
    required: [true, "Second chain is required."],
  },
  thirdChain: {
    type: "string",
    required: [true, "Third chain is required."],
  },
  fourthChain: {
    type: "string",
    required: [true, "Fourth chain is required."],
  },
  fifthChain: {
    type: "string",
    required: [true, "Fifth chain is required."],
  },
  boxlimit: {
    type: "number",
    required: [true, "Box limit is required."],
  },
  boxprice1: {
    type: "number",
    required: [true, "Box price 1 is required."],
  },
  boxprice2: {
    type: "number",
    required: [true, "Box price 2 is required."],
  },
  boxprice3: {
    type: "number",
    required: [true, "Box price 3 is required."],
  },
  boxcooltime: {
    type: "number",
    required: [true, "Box cool time is required."],
  },
  amountpkr: {
    type: "number",
    required: [true, "Amount in PKR is required."],
  },
  proof: {
    type: "string",
    required: [true, "Proof is required."],
  },
});

module.exports = mongoose.model("plans", planSchema);
