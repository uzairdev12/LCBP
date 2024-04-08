const transactionsmodel = require("../Models/transactionsmodel");
const usermodel = require("../Models/usermodel");
const withdrawmodel = require("../Models/withdrawmodel");

module.exports.withdraw = async (req, res, next) => {
  try {
    const {
      userid,
      balance,
      AccountPlatform,
      accountName,
      accountnum,
      amount,
      username,
    } = req.body;

    console.log(req.body);
    if (
      !userid ||
      !balance ||
      !amount ||
      !accountnum ||
      !accountName ||
      !AccountPlatform ||
      !username
    ) {
      res.status(400).json({ success: false, message: "Invalid request" });
      return;
    }
    const withdraw = await withdrawmodel.create({
      userid,
      userbalance: balance,
      AccountPlatform,
      accountName,
      accountnum,
      amount,
      username,
    });
    res.status(200).json({
      success: true,
      withdraw,
      message: "Your withdrawal request was sent",
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

module.exports.getwithdrawals = async (req, res) => {
  try {
    const withdrawals = await withdrawmodel
      .find({ status: "pending" })
      .sort({ _id: -1 })
      .lean()
      .exec();
    if (!withdrawals) {
      res.status(500).json({ success: true, withdrawals: [] });
      return;
    }
    res.status(200).json({ success: true, withdrawals });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

module.exports.accept = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({ success: false, message: "Invalid request" });
      return;
    }

    const withdraw = await withdrawmodel.findById(id);
    if (!withdraw) {
      throw new Error("Withdrawal request not found");
    }
    const user = await usermodel.findById(withdraw.userid);

    if (!user) {
      throw new Error("User not found");
    }
    if (user.balance < withdraw.amount) {
      withdrawmodel.findByIdAndDelete(id);
      res
        .status(200)
        .json({ success: true, message: "Withdrawal request accepted" });
    }
    user.balance = user.balance - withdraw.amount;
    user.withdrawn = (user.withdrawn || 0) + withdraw.amount;
    withdraw.status = "accepted";

    await user.save();
    await withdraw.save();

    transactionsmodel.create({
      type: "withdraw",
      amount: withdraw.amount,
      from: "Admin",
      to: user.username,
    });

    res
      .status(200)
      .json({ success: true, message: "Withdrawal request accepted" });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
module.exports.reject = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    if (!id) {
      res.status(400).json({ success: false, message: "Invalid request" });
      return;
    }
    await withdrawmodel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Withdrawal request rejected" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ success: false, message: e.message });
  }
};
