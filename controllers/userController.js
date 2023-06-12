const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@des Register a user
//@route POST /users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const {userName, mobileNumber, email, password, address} = req.body;
    if(!userName || !mobileNumber || !password){
        res.status(400);
        throw new Error("User Name, Mobile Number and Password is Mandatory");
    }
    const userAvailable = await User.findOne({mobileNumber})
    if(userAvailable){
        res.status(400);
        throw new Error ("User already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("hashedPassword", hashedPassword)
    const user = await User.create({
        userName,
        mobileNumber,
        password: hashedPassword,
        email,
        address
    })
    console.log(`User Created Successful ${user}`)
    if(user){
        res.status(201).json({_id: user.id, mobileNumber: user.mobileNumber})
    }else{
        res.status(400);
        throw new Error ("User data is not valid");
    }
});

//@des Login a user
//@route POST /users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const {mobileNumber, password} = req.body;
    console.log("This is req.body", req.body, mobileNumber,password);
    if(!mobileNumber || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({mobileNumber});
    // compare password with hashedpassword
    if(user && (await bcrypt.compare(password, user.password))){
        console.log("user Logined", user)
        const accessToken = jwt.sign({
            user:{
                username: user.userName,
                mobileNumber: user.mobileNumber,
                id: user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,
        // {expiresIn: "30m"} 
        )
        res.status(200).json({accessToken})
    }else{
        res.status(401);
        throw new Error("Mobile Number or Password is not valid")
    }
});

//@des current a user
//@route POST /users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});
module.exports = {registerUser, loginUser, currentUser}