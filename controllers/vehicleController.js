const asyncHandler = require("express-async-handler");
const Vehicle = require("../models/vehicleModel");

//@des Create vehicle
//@route GET /addVehicle
//@access private
const addVehicle = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { vehicleNumber, name, mobileNumber, description } = req.body;
  if (!vehicleNumber) {
    res.status(400);
    throw new Error("Vehicle Number is mandatory");
  } else {
    console.log("Create Vehicle", req.user.id);
    const vehicle = await Vehicle.create({
      user_id: req.user.id,
      vehicleNumber,
      name,
      mobileNumber,
      description,
    });
    res.status(201).json(vehicle);
  }
});

//@des Get All vehicle
//@route POST /addVehicle
//@access private

const getAllVehicle = asyncHandler(async (req, res) => {

  const vehicle = await Vehicle.find({user_id : req.user.id});
  const totalVehicle = vehicle.length;
  console.log("Total Number of Vehicle is =", totalVehicle);
  res.status(200).json({"Total Vehicle=": totalVehicle,"Vehicles":vehicle});
});

//@des Get vehicle by ID
//@route POST /addVehicle
//@access private
const getVehicle = asyncHandler(async (req, res) => {
  // if (req.params.id.length == 24) {
  //   const vehicles = await Vehicle.findById(req.params.id);
  //   if (!vehicles) {
  //     res.status(400);
  //     throw new Error("Vehicle Not Found");
  //   } else res.status(200).json(vehicles);
  // } else {
  //   res.status(400).json({ message: "not found" });
  // }
  console.log("id", req.params.id);
  const vehicle = await Vehicle.find({_id: req.params.id});
  res.status(200).json(vehicle);
});

//@des Update all vehicle
//@route PUT /addVehicle
//@access private
const updateVehicle = asyncHandler(async (req, res) => {
  // console.log("vehicle for update", req.params.id);
  const vehicle = await Vehicle.find({_id : req.params.id});
  console.log("Vehicle found for update",vehicle);
  if(!vehicle){
    res.status(404);
    throw new Error("Vehicle not Found");
  }
  // console.log(vehicle[0].user_id.toHexString(), req.user.id)
  if(vehicle[0].user_id.toHexString() != req.user.id){
    res.status(403);
    throw new Error("You are not authorized to edit this Vehicle");
  }
  console.log("Update Started")
  const updatedVehicle = await Vehicle.findOneAndUpdate(
    {_id: req.params.id},
    req.body,
    {new: true}
  );
  res.status(200).json(updatedVehicle);
});

//@des Delete vehicle
//@route DELETE /addVehicle
//@access private
const deleteVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.find({_id : req.params.id});
  console.log("Vehicle found for Delete",vehicle);
  if(vehicle.length == 0){
    res.status(404);
    throw new Error("Vehicle not Found");
  }
  // if(vehicle[0].user_id.toHexString() != req.user.id){
  //   res.status(403);
  //   throw new Error("You are not authorized to edit this Vehicle");
  // }
 const vehicleDeleted =  await Vehicle.findByIdAndRemove({_id : req.params.id});
  console.log("vehicleDeleted",vehicleDeleted)
  res.status(200).json({ message: "You deleted Vehicle", Vehicle: vehicleDeleted });
});
module.exports = { addVehicle, getVehicle,getAllVehicle, updateVehicle, deleteVehicle };
