const gigmodel = require("../Models/gigmodel");
const planmodel = require("../Models/planmodel");
const valuesmodel = require("../Models/valuesmodel");
const usermodel = require("../Models/usermodel");
const withdrawmodel = require("../Models/withdrawmodel");
const requestmodel = require("../Models/requestmodel");

module.exports.addplan = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    let {
      name,
      price,
      firstChain,
      secondChain,
      thirdChain,
      fourthChain,
      fifthChain,
      boxlimit,
      boxprice,
      boxcooltime,
      amountpkr,
    } = req.body;

    if (
      !name ||
      !price ||
      !firstChain ||
      !secondChain ||
      !thirdChain ||
      !fourthChain ||
      !fifthChain ||
      !boxlimit ||
      !boxprice ||
      !boxcooltime ||
      !amountpkr
    ) {
      throw new Error("All fields are required.");
    }

    const newpkr = Number(amountpkr.split(".")[0]);
    const newPlan = new planmodel({
      name,
      price,
      firstChain,
      secondChain,
      thirdChain,
      fourthChain,
      fifthChain,
      boxlimit,
      boxprice,
      boxcooltime,
      amountpkr: newpkr,
    });

    newPlan.save();

    res.status(200).json({ success: true, plan: newPlan });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

module.exports.getplans = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const { id, admin } = req.body;
    if (!admin) {
      const user = await usermodel.findById(id);
      if (user.banned) {
        return res.status(200).json({ success: true, banned: true });
      }
    }
    const plans = await planmodel.find().sort({ price: 1 });
    res.status(200).json({ success: true, plans });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

module.exports.getPlanDetails = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const { planid, userid } = req.body;

    const plan = await planmodel.findById(planid);
    if (!plan) {
      usermodel.findByIdAndUpdate(
        userid,
        { $set: { planpending: false, plan: null } },
        { new: true }
      );
      throw new Error("Plan not found");
    }
    res.status(200).json({ success: true, plan });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
module.exports.getUsersPlan = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const { userid } = req.body;
    const user = await usermodel.findById(userid);

    if (!user) {
      res.status(200).json({ success: false, message: "User not found" });
      return;
    }
    if (user.banned) {
      res.status(200).json({ success: true, banned: true });
      return;
    }
    if (user.planpending) {
      res.status(200).json({ success: true, planpending: true });
      return;
    }
    const plan = await planmodel.findById(user.plan);
    if (!plan) {
      res.status(200).json({ success: true, plan: null });
      return;
    }
    user.limit = plan.boxlimit;
    res.status(200).json({ success: true, plan, user });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

module.exports.userplans = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const { id: usersid } = req.body;
    const user = await usermodel.findById(usersid);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const plans = await planmodel.find({});

    res.status(200).json({ success: true, plans, user });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
// async function updateUsersPlans() {
//   try {
//     const threeMonthsAgo = new Date();
//     threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

//     console.log(`Date three months ago: ${threeMonthsAgo}`);

//     const oldTransactions = await requestmodel.find({
//       date: { $lt: threeMonthsAgo },
//     });

//     if (oldTransactions.length === 0) {
//       console.log("No transactions older than three months found.");
//       return;
//     }

//     const userIds = [...new Set(oldTransactions.map((tx) => tx.usersid))];

//     const updateResult = await usermodel.updateMany(
//       { _id: { $in: userIds } },
//       { $set: { plan: null } }
//     );

//     const deleteResult = await requestmodel.deleteMany({
//       date: { $lt: threeMonthsAgo },
//     });
//   } catch (error) {
//     console.error("Error updating users plans:", error);
//   }
// }

module.exports.updatevalue = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const pkrValue = parseFloat(req.body.pkrvalue);
    if (isNaN(pkrValue)) {
      return res.status(400).json({
        success: false,
        message: "Invalid pkrvalue format. Please provide a number.",
      });
    }
    const plans = await planmodel.find({});
    plans.forEach(async (plan) => {
      plan.amountpkr = plan.price * pkrValue;
      await plan.save();
    });

    await usermodel.updateMany(
      { todayOpened: { $gt: 0 } },
      { $set: { todayOpened: 0 } }
    );

    // await updateUsersPlans();

    const value = await valuesmodel.findById("66893f2d6a0e97be82e77c03");
    value.planupgradeamount = 0;
    value.newUsers = 0;
    value.planboughtamount = 0;
    await value.save();

    res.status(200).json({ success: true, plans });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

module.exports.updatePlan = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const { planid: id } = req.body;
    const plan = await planmodel.findById(id);
    if (!plan) {
      throw new Error("Plan not found");
    }
    const updatedPlan = await planmodel.findByIdAndUpdate(id, req.body.plan, {
      new: true,
    });
    res.status(200).json({ success: true, plan: updatedPlan });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
module.exports.deletePlan = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const { id } = req.body;
    const plan = await planmodel.findById(id);
    if (!plan) {
      throw new Error("Plan not found");
    }
    await planmodel.findByIdAndDelete(id);
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
