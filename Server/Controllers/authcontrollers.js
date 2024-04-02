const userModel = require("../Models/usermodel");
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
                });
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
      });
      res.status(201).json({ success: true, user });
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
// module.exports.getReffersDetais = async (req, res, next) => {
//   try {
//     let { username } = req.body;

//     const refferUsers = await userModel.find(
//       { reffer: username },
//       { name: 1, username: 1 }
//     );
//     const chaintwoUsers = await userModel.find(
//       { chaintwo: username },
//       { name: 1, username: 1 }
//     );
//     const chainthreeUsers = await userModel.find(
//       { chainthree: username },
//       { name: 1, username: 1 }
//     );
//     const chainfourUsers = await userModel.find(
//       { chainfour: username },
//       { name: 1, username: 1 }
//     );
//     const chainfiveUsers = await userModel.find(
//       { chainfive: username },
//       { name: 1, username: 1 }
//     );

//     res.status(200).json({
//       success: true,
//       reffers: refferUsers,
//       chaintwo: chaintwoUsers,
//       chainthree: chainthreeUsers,
//       chainfour: chainfourUsers,
//       chainfive: chainfiveUsers,
//     });
//   } catch (e) {
//     res.status(400).json({ success: false, message: e.message });
//   }
// };

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
