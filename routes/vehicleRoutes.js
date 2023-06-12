const express = require("express");
const router = express.Router();
const {addVehicle, getVehicle,getAllVehicle, updateVehicle, deleteVehicle} = require("../controllers/vehicleController");
// const { validate } = require("../models/vehicleModel");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route('/').get(getAllVehicle).post(addVehicle);

router.route('/:id').get(getVehicle).put(updateVehicle).delete(deleteVehicle);


module.exports = router;