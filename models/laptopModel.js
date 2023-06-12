const mongoose = require("mongoose");
console.log("This is model");
const laptopSchema = mongoose.Schema({
    brand : {
        type: String
    },
    ram : {
        type: Number
    },
    processor: {
        type : String
    },
    hdd: {
        type: Number
    }, 
    ssd: {
        type: Number
    },
    generation: {
        type: Number
    },
    condition:{
        type: String
    },
    price:{
        type: Number
    },
    discount:{
        type: Number
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model("Laptop", laptopSchema);