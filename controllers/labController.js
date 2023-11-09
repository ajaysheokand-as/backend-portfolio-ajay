const tests = require("../models/medical/testModel.js");
const categories = require("../models/medical/categoryModel.js");
// const category = require("../models/categoryModel.js");

// for add category
module.exports.addCategory = async (req, res) => {
  const categoryData = await categories.create(req.body);

  if (categoryData) {
    res.status(201).send({
      status: "success",
      message: "Category added Successfully",
      data: categoryData,
    });
  } else {
    res.status(504).send({
      status: "Error",
      error: error.message,
    });
  }
};

// get all Category
module.exports.fetchAllCategory = async (req, res) => {
  const allCategory = await categories.find();
  if (allCategory) {
    res.status(200).send({
      status: "success",
      data: allCategory,
    });
  } else {
    res.status(505).send({
      status: "Error",
      error: error.message,
    });
  }
};

//delete category data
module.exports.deleteCategory = async (req, res) => {
  console.log("This is req.params.id", req.params);
  const data = await categories.findByIdAndDelete(req.params.id);

  if (data) {
    return res.status(408).json({ error: "User not found" });
  }

  res.json({ message: "Data deleted successfully", data: data });
};

// For adding Test details
module.exports.addTest = async (req, res) => {
  console.log(req.body, "req----- Add Test");

  const data = await tests.create(req.body);
  if (data) {
    res.status(200).send({
      status: "success",
      message: "Test added Successfully",
      data: data,
    });
  } else {
    res.status(500).send({
      status: "Error",
      error: error.message,
    });
  }
};

// Get all test Data
module.exports.fetchTestData = async (req, res) => {
  console.log("Fetching Test Data");
  const data = await tests.find();
  if (data) {
    res.status(200).send({
      status: "success",
      data: data,
    });
  } else {
    res.status(505).send({
      status: "Error",
      error: error.message,
    });
  }
};

// for delete data--users
module.exports.deleteTest = async (req, res) => {
  console.log("This is req.params.id", req.query.id);
  const data = await tests.findByIdAndDelete(req.query.id);

  if (data) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ message: "Data deleted successfully", user: data });
};
