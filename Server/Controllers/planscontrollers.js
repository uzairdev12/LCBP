const planmodel = require("../Models/planmodel");

module.exports.addplan = (req, res) => {
  try {
    let {
      name,
      price,
      firstChain,
      secondChain,
      thirdChain,
      fourthChain,
      fifthChain,
      boxlimit,
      boxprice1,
      boxprice2,
      boxprice3,
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
      !boxprice1 ||
      !boxprice2 ||
      !boxprice3 ||
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
      boxprice1,
      boxprice2,
      boxprice3,
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
    const plans = await planmodel.find();
    res.status(200).json({ success: true, plans });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

module.exports.getPlanDetails = async (req, res) => {
  try {
    const { planid } = req.body;
    const plan = await planmodel.findById(planid);
    if (!plan) {
      throw new Error("Plan not found");
    }
    res.status(200).json({ success: true, plan });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
