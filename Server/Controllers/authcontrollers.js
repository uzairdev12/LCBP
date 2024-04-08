const userModel = require("../Models/usermodel");
const planmodel = require("../Models/planmodel");
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    if (password !== user.password) {
      throw new Error("Invalid email or password");
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

module.exports.signup = async (req, res, next) => {
  try {
    const { name, username, email, phone, password, reffer, balance } =
      req.body;
    console.log(balance);

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await userModel.findOne({ phone });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Phone number already exists. Please choose a different one.",
      });
    } else {
      const existingUser = await userModel.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already exists. Please choose a different one.",
        });
      } else {
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "Username already exists. Please choose a different one.",
          });
        }
      }
    }
    if (reffer) {
      const refferUser = await userModel.findOne({ username: reffer });
      if (!refferUser) {
        return res.status(400).json({
          success: false,
          message: "Invalid reffer",
        });
      } else {
        const chaintwouser = await userModel.findOne({
          username: refferUser.reffer,
        });
        if (!chaintwouser) {
          const user = await userModel.create({
            username,
            password,
            phone,
            name,
            reffer,
            email,
            balance,
          });
          res.status(201).json({ success: true, user });
        } else {
          const chainthreeuser = await userModel.findOne({
            username: chaintwouser.reffer,
          });
          if (!chainthreeuser) {
            const user = await userModel.create({
              username,
              password,
              phone,
              name,
              reffer,
              chaintwo: chaintwouser.username,
              email,
              balance,
            });
            res.status(201).json({ success: true, user });
          } else {
            const chainfouruser = await userModel.findOne({
              username: chainthreeuser.reffer,
            });
            if (!chainfouruser) {
              const user = await userModel.create({
                username,
                password,
                phone,
                name,
                reffer,
                chaintwo: chaintwouser.username,
                chainthree: chainthreeuser.username,
                email,
                balance,
              });
              res.status(201).json({ success: true, user });
            } else {
              const chainfiveuser = await userModel.findOne({
                username: chainfouruser.reffer,
              });
              if (!chainfiveuser) {
                const user = await userModel.create({
                  username,
                  password,
                  phone,
                  name,
                  reffer,
                  chaintwo: chaintwouser.username,
                  chainthree: chainthreeuser.username,
                  chainfour: chainfouruser.username,
                  email,
                  balance,
                });
                res.status(201).json({ success: true, user });
              } else {
                const user = await userModel.create({
                  username,
                  password,
                  phone,
                  name,
                  reffer,
                  chaintwo: chaintwouser.username,
                  chainthree: chainthreeuser.username,
                  chainfour: chainfouruser.username,
                  chainfive: chainfiveuser.username,
                  email,
                  balance,
                });
                res.status(201).json({ success: true, user });
              }
            }
          }
        }
      }
    } else {
      const user = await userModel.create({
        username,
        password,
        phone,
        name,
        reffer,
        email,
        balance,
      });
      res.status(200).json({ success: true, user });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports.getDetails = async (req, res, next) => {
  try {
    let { userID } = req.body;

    const user = await userModel.findOne({ _id: userID });

    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({ success: true, user });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
module.exports.getReffers = async (req, res, next) => {
  try {
    let { username } = req.body;
    if (!username) {
      throw new Error("Username not found");
    }

    const refferCount = await userModel.countDocuments({ reffer: username });
    const chaintwoCount = await userModel.countDocuments({
      chaintwo: username,
    });
    const chainthreeCount = await userModel.countDocuments({
      chainthree: username,
    });
    const chainfourCount = await userModel.countDocuments({
      chainfour: username,
    });
    const chainfiveCount = await userModel.countDocuments({
      chainfive: username,
    });

    res.status(200).json({
      success: true,
      referrs: refferCount,
      chaintwo: chaintwoCount,
      chainthree: chainthreeCount,
      chainfour: chainfourCount,
      chainfive: chainfiveCount,
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
module.exports.updateProfile = async (req, res) => {
  const { id, name, email, number: phone, imageurl, password } = req.body;

  try {
    let userToUpdate = await userModel.findById(id);

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found." });
    }

    if (name !== "") {
      userToUpdate.name = name;
    }
    if (email !== "") {
      userToUpdate.email = email;
    }
    if (phone !== "") {
      userToUpdate.phone = phone;
    }
    if (password !== "" && password !== null && password !== undefined) {
      userToUpdate.password = password;
    }
    if (imageurl !== "" && imageurl !== null && imageurl !== undefined) {
      userToUpdate.imageurl = imageurl;
    }

    const updatedUser = await userToUpdate.save();

    res.status(200).json({
      message: "User profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.getPlanDetails = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await userModel.findById(id);

    if (!user) {
      throw new Error("User not found");
    }
    if (user.plan) {
      const plan = await planmodel.findById(user.plan);
      if (plan) {
        return res.status(200).json({ success: true, plan: user.plan });
      } else {
        await userModel.findByIdAndUpdate(
          id,
          { $set: { planpending: false, plan: null } },
          { new: true }
        );
        return res.status(200).json({ success: true, plan: null });
      }
    } else {
    }
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
module.exports.loadChunks = async (req, res) => {
  try {
    const { skip } = req.body;
    console.log(skip);

    const users = await userModel.find({}).limit(20).skip(skip).lean().exec();
    res.status(200).json({ success: true, data: users });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
module.exports.openBox = async (req, res) => {
  try {
    const { userid } = req.body;
    const user = await userModel.findById(userid);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { cooltime, lastOpenedBox, prize, todayOpened, limit } = user;

    const now = new Date();

    if (todayOpened >= limit) {
      return res.status(400).json({
        success: false,
        message: "Daily limit reached. Please come back tomorrow.",
      });
    }

    const timeDifference = new Date(now) - new Date(lastOpenedBox);

    if (timeDifference < cooltime * 60 * 1000) {
      const remainingTime = Math.ceil(
        (cooltime * 60 * 1000 - timeDifference) / 1000
      );
      return res.status(200).json({
        success: true,
        timeRemaining: true,
        RemainingTime: remainingTime,
      });
    }

    user.lastOpenedBox = new Date(now);
    user.todayOpened++;
    user.balance = (user.balance || 0) + prize;
    user.earnedbyspinandbox = (user.earnedbyspinandbox || 0) + prize;
    await user.save();

    res.status(200).json({
      success: true,
      message: `You won ${prize} pkr from box.`,
      prize,
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
module.exports.openSpin = async (req, res) => {
  try {
    const { userid } = req.body;
    const user = await userModel.findById(userid);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { lastOpenedSpin } = user;
    const cooltime = 1;

    const now = new Date();

    const timeDifference = new Date(now) - new Date(lastOpenedSpin);

    if (timeDifference < cooltime * 60 * 1000) {
      const remainingTime = Math.ceil(
        (cooltime * 60 * 1000 - timeDifference) / 1000
      );
      return res.status(200).json({
        success: true,
        timeRemaining: true,
        timeMessage: `Try again after ${formatTime(remainingTime)}`,
      });
    }

    const prizes = [0.05, 0.1, 0.15];
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    user.lastOpenedSpin = new Date(now);
    console.log(user.earnedbyspinandbox, prize);
    user.earnedbyspinandbox = (user.earnedbyspinandbox || 0) + prize;
    console.log(user.earnedbyspinandbox);
    user.balance = (user.balance || 0) + prize;

    await user.save();
    res.status(200).json({
      success: true,
      message: `You won ${prize} pkr from Spin.`,
      prize,
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
function formatTime(seconds) {
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""}`;
  } else {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes < 60) {
      return `${minutes} minute${
        minutes !== 1 ? "s" : ""
      } and ${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} hour${
        hours !== 1 ? "s" : ""
      } ${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`;
    }
  }
}

module.exports.updateUserall = async (req, res) => {
  try {
    const { id, name, email, phone, password, plan, balance } = req.body;

    const user = await userModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    name ? (user.name = name) : null;
    email ? (user.email = email) : null;
    phone ? (user.phone = phone) : null;
    password ? (user.password = password) : null;
    balance ? (user.balance = balance) : null;

    if (plan && plan !== user.plan) {
      const planobj = await planmodel.findById(plan);
      if (!plan) {
        return res
          .status(404)
          .json({ success: false, message: "Plan not found" });
      }
      user.plan = plan;
      user.planpending = false;
      user.prize = planobj.boxprice;
      user.cooltime = planobj.boxcooltime;
      user.limit = planobj.boxlimit;
    }

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
  }
};
