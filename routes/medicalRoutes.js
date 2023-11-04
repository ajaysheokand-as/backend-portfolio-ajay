const express = require("express");
const router = express.Router();
const {
  addCategory,
  fetchAllCategory,
  deleteCategory,
  addTest,
  fetchTestData,
  deleteTest,
} = require("../controllers/labController");

router
  .route("/category")
  .post(addCategory)
  .get(fetchAllCategory)
  .delete(deleteCategory);

router.route("/test").post(addTest).get(fetchTestData).delete(deleteTest);

module.exports = router;
