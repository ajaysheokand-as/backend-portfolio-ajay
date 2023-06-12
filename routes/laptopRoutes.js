const express = require("express");
const {addLaptop, deleteLaptop, getAllLaptop, getLaptop, updateLaptop} = require('../controllers/laptopController');
const router = express.Router();

router.route("/laptops").post(addLaptop).get(getAllLaptop);
router.route('/:id').delete(deleteLaptop).get(getLaptop).put(updateLaptop);

module.exports = router;