const gigModel = require("../Models/gigmodel");
const usermodel = require("../Models/usermodel");

const validateInput = (body) => {
  const requiredFields = [
    "title",
    "description",
    "name",
    "about",
    "from",
    "time",
    "gender",
    "age",
    "experience",
    "field",
    "email",
    "number",
    "price",
    "imageurl",
    "byname",
    "byid",
  ];

  for (const field of requiredFields) {
    if (!body[field]) {
      return `${field} is required.`;
    }
  }

  return null; // Input is valid
};

module.exports.addgig = async (req, res) => {
  try {
    const validationError = validateInput(req.body);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const newGig = await gigModel.create(req.body);

    res.status(200).json({
      success: true,
      data: newGig,
    });
  } catch (e) {
    console.error("Error adding gig:", e);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports.loadChunks = async (req, res) => {
  try {
    const { skip } = req.body;

    const gigs = await gigModel
      .find()
      .skip(skip)
      .limit(10)
      .select("-__v")
      .lean();

    res.status(200).json({
      success: true,
      message: "Chunks loaded successfully.",
      data: gigs,
    });
  } catch (e) {
    console.error("Error loading chunks:", e);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports.getusersgigs = async (req, res) => {
  try {
    const { id } = req.body;
    if (typeof id !== "string" || id.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }

    const gigs = await gigModel.find({ byid: id }, { __v: 0 }).lean().exec();
    if (!gigs) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    return res.status(200).json({
      success: true,
      gigs: gigs.length > 0 ? gigs : null,
    });
  } catch (e) {
    console.error(`Error getting user gigs:`, e);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
module.exports.getgigdetails = async (req, res) => {
  try {
    const { gigid } = req.body;

    if (typeof gigid !== "string" || gigid.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }

    const gig = await gigModel
      .findOne({ _id: gigid }, { _id: 0, __v: 0 })
      .lean()
      .exec();

    if (!gig) {
      return res

        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    return res.status(200).json({ success: true, gig });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports.editgig = async (req, res) => {
  try {
    const { id, data } = req.body;

    const gig = await gigModel.findById(id);

    if (!gig) {
      return res.status(404).json({ success: false, message: "Gig not found" });
    }
    Object.assign(gig, data);

    await gig.save();
    return res.status(200).json({ success: true, gig });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
module.exports.deletegig = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }

    await gigModel.deleteOne({ _id: id }).lean().exec();
    return res.status(200).json({ success: true });
  } catch (e) {
    console.error(`Error deleting gig:`, e);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
