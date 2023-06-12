const Laptop = require("../models/laptopModel");
const asyncHandler = require("express-async-handler");

// Add Laptop
const addLaptop = asyncHandler(async (req, res) => {
  const {
    brand,
    model,
    ram,
    processor,
    hdd,
    sdd,
    generation,
    condition,
    price,
    discount,
    description,
  } = req.body;
  if (!brand || !ram || !processor || !price) {
    res.status(400);
    throw new Error("Brand Name, RAM, Processor and Price is Mandatory");
  }

  const laptop = await Laptop.create({
    brand,
    model,
    ram,
    processor,
    hdd,
    sdd,
    generation,
    condition,
    price,
    discount,
    description,
  });
  console.log(`Laptop Added Successful ${laptop}`);
  if (laptop) {
    res
      .status(201)
      .json({ _id: laptop.id, brand: laptop.brand, model: laptop.model });
  } else {
    res.status(400);
    throw new Error("Laptop data is not valid");
  }
});

// Fetch all Laptop
const getAllLaptop = asyncHandler(async (req, res) => {
  const laptops = await Laptop.find();
  const totalLaptops = laptops.length;
  console.log("Total Number of Laptops is =", totalLaptops);
  res.status(200).json({ "Total Laptops=": totalLaptops, Laptops: laptops });
});

// Fetch single Laptop
const getLaptop = asyncHandler(async (req, res) => {
  console.log("id", req.params.id);
  const laptop = await Laptop.find({ _id: req.params.id });
  res.status(200).json(laptop);
});

// Update Laptop
const updateLaptop = asyncHandler(async(req, res)=>{
    const laptop = await Laptop.find({ _id: req.params.id });
    console.log("Laptop found for update",laptop);
    if(!laptop){
        res.status(404);
        throw new Error("Laptop not Found");
    }

    const updatedLaptop = await Laptop.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true}
    );
    res.status(200).json({ message: "You Updated the laptop Successfully",updatedLaptop: updatedLaptop});
})

// Delete Laptop
const deleteLaptop = asyncHandler(async (req, res) => {
  const laptop = await Laptop.find({ _id: req.params.id });
  console.log("Laptop found for Delete", laptop);
  if (laptop.length == 0) {
    res.status(404);
    throw new Error("Laptop not Found");
  }
  const laptopDeleted = await Laptop.findByIdAndRemove({ _id: req.params.id });
  console.log("laptopDeleted", laptopDeleted);
  res
    .status(200)
    .json({ message: "Your deleted Laptop", Laptop: laptopDeleted });
});

module.exports = { addLaptop, getAllLaptop, getLaptop, updateLaptop, deleteLaptop };
