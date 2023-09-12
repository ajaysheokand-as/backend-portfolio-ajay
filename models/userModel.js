const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please add the user"]
    },
    email: {
        type: String,
        required: false,
        lowercase: true
    },
    photo: {
        type: String,
        required: false
    },
    mobileNumber:{
        type: String,
        required: [true, "Please Enter Mobile Number"],
        unique: [true, "This Mobile Number already Exist"]
    },
    password:{
        type: String,
        require: [true, "Please Enter the password"]
    },
    passwordConfirm:{
        type: String,
        require: false
    },
    address: {
        type: String,
        required: false
    },
    image: {
        type: Object,
        require: false
    },
    adminType: {
        type: Object,
        require: false
    }
},
{
    timestamps: true,
})

module.exports= mongoose.model("User", userSchema);