const requestmodel = require("../Models/requestmodel");
const userModel = require("../Models/usermodel");

module.exports.addreq = async (req, res) => {
  try {
    const {
      usersname,
      usersemail,
      usersimageurl,
      planname,
      planid,
      planprice,
      usersid,
      proof,
      accountnum,
      method,
      transactionid,
    } = req.body;
    console.log("Request recieved", req.body);
    if (
      !usersname ||
      !usersemail ||
      !usersimageurl ||
      !planname ||
      !planid ||
      !planprice ||
      !usersid ||
      !proof ||
      !accountnum ||
      !method ||
      !transactionid
    ) {
      res.status(400).json({ success: false, message: "Invalid request" });
    }

    const existingRequest = await requestmodel.findOne({ transactionid });
    if (existingRequest) {
      res
        .status(400)
        .json({ success: false, message: "Request already exists" });
    }

    const newreq = await requestmodel.create({
      usersname,
      usersid,
      usersemail,
      usersimageurl,
      planname,
      planprice,
      proof,
      pending: true,
      accountnum,
      method,
      transactionid,
    });
    const user = await userModel.findById(usersid);
    if (!user) {
      res.status(400).json({ success: false, message: "User not found" });
    }
    user.plan = planid;
    user.planpending = true;
    await user.save();
    res.status(200).json({
      success: true,
      data: newreq,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.getrequests = async (req, res) => {
  try {
    let requests = await requestmodel.find({ pending: true }).lean().exec();
    if (!requests) {
      throw new Error("Requests not found");
    }
    res.status(200).json({ success: true, data: requests });
  } catch (e) {
    console.error(e);
    if (e instanceof TypeError) {
      res
        .status(500)
        .json({ success: false, message: "Null pointer reference" });
    } else {
      res.status(400).json({ success: false, message: e.message });
    }
  }
};
module.exports.deleteRequest = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }
    await requestmodel.deleteOne({ _id: id }).lean().exec();
    await userModel
      .findOneAndUpdate(
        { _id: req.body.userid },
        { $set: { planpending: false, plan: null } },
        { new: true }
      )
      .lean()
      .exec();
    return res.status(200).json({ success: true });
  } catch (e) {
    console.error(`Error deleting request:`, e);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
