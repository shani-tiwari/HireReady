const userModel = require("../models/user.model");
const BlackListModel = require("../models/blacklist.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



/**
 * @name registerUser - controller for user registration
 * @description Register a new User
 * @route POST /api/auth/register
 * @access Public
 */
async function registerUser(req, res){
    
    try {
        const {name, email, password} = req.body;
        
        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const ifExist = await userModel.findOne( {$or: [{email}, {name}]} );
        if(ifExist) return res.status(400).json({message: "User already exists with this email"});

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({name, email, password: hashPassword});

        const token = jwt.sign({id: newUser._id, name: newUser.name}, process.env.JWT_SECRET, {expiresIn: "1d"});   

        res.cookie("token", token);

        return res.status(201).json({
            message: "User registered successfully", 
            newUser:{
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    };

};


/**
 * @name loginUser - controller for user login
 * @description Login a User, expects email and password
 * @route POST /api/auth/login
 * @access Public
 */
async function loginUser(req, res){
    try {
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await userModel.findOne({email}).select("+password");
        if(!user) return res.status(400).json({message: "User not found"});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(400).json({message: "Invalid password"});

        const token = jwt.sign({id: user._id, name: user.name}, process.env.JWT_SECRET, {expiresIn: "1d"});

        res.cookie("token", token);

        return res.status(200).json({message: "User logged in successfully", user:{
            _id: user._id,
            email: user.email,
            name: user.name,
        }});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    };
};


/**
 * @name logoutUser - controller for user logout
 * @description Logout a User - clear cookie, add token to black list
 * @route POST /api/auth/logout
 * @access Public
 */
async function logoutUser(req, res){
    try {
        const token = req.cookies.token;
        if(!token) return res.status(400).json({message: "No token found"});

        // pre-check
        const isTokenBlacklisted = await BlackListModel.findOne({token});
        if(isTokenBlacklisted) return res.status(400).json({message: "Token already blacklisted"});

        // add token to black list
        const blacklistedToken = await BlackListModel.create({token});
        
        // clear cookie
        res.clearCookie("token");

        return res.status(200).json({message: "User logged out successfully", blacklistedToken});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    };
};


/**
 * @name getMe - controller for getting current user details
 * @description Get current logged in user details
 * @route GET /api/auth/get-me
 * @access Private
 */
async function getMe(req, res){
    try {
        // /doesn't need coz middleware were used
        // const token = req.cookies.token;
        // if(!token) return res.status(400).json({message: "No token found"});

        // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // const user = await userModel.findById(decodedToken.id);
        // if(!user) return res.status(400).json({message: "User not found"});

        // return res.status(200).json({message: "User details fetched successfully", user});

        const user = await userModel.findById(req.user.id);
        return res.status(200).json({message: "User details fetched successfully", user});  

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    };
};

module.exports = {registerUser, loginUser, logoutUser, getMe};