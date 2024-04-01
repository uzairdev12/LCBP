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

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(401).json({ success: false, errorMessage: err.message });
  }
};

module.exports.signup = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;

    const existingUser = await userModel.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        errorMessage: "Username already exists. Please choose a different one.",
      });
    }

    const user = await userModel.create({
      username,
      password,
      name,
    });

    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, errorMessage: err.message });
  }
};
