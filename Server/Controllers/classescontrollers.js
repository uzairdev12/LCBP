const classesModel = require("../Models/classesModel");
const usermodel = require("../Models/usermodel");

module.exports.createClass = async (req, res) => {
  try {
    const { name } = req.body;
    const newClass = new classesModel({ name });
    const saveClass = await newClass.save();
    res.status(200).json({ saveClass, message: "Class created successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.addlink = async (req, res) => {
  try {
    const { id, link } = req.body;
    const classes = await classesModel.findById(id);
    classes.link = link;
    classes.live = true;
    const saveClass = await classes.save();
    res.status(200).json({ saveClass, message: "Class Started successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.deactivate = async (req, res) => {
  try {
    const { id } = req.body;
    const classes = await classesModel.findById(id);
    classes.live = false;
    const saveClass = await classes.save();
    res.status(200).json({ saveClass, message: "Class ended successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getclasses = async (req, res) => {
  try {
    const classes = await classesModel.find();
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getClass = async (req, res) => {
  try {
    const { id } = req.body;
    const classdetails = await classesModel.findById(id);
    res.status(200).json({ classdetails });
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.joinclass = async (req, res) => {
  try {
    const { userid, classname } = req.body;
    const user = await usermodel.findById(userid);
    user.classJoined = classname;
    await user.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.getstudents = async (req, res) => {
  try {
    const students = await usermodel.find(
      { classJoined: { $exists: true, $ne: "none" } },
      { username: 1, classJoined: 1, _id: 0 } // Include only username and classJoined, exclude _id
    );
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.finestudents = async (req, res) => {
  try {
    const { students } = req.body;
    const allStudents = await usermodel.find({});
    for (const student of allStudents) {
      if (!students.some((s) => s.username === student.username)) {
        const updatedBalance = student.balance - student.balance * 0.05;
        student.balance = updatedBalance;
      }
      student.classJoined = "none";
      console.log(student.balance);
      await student.save();
    }
    res
      .status(200)
      .json({ success: true, message: "Students updated successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
