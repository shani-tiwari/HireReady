const userModel = require("../models/user.model");

/**
 * @description User register controller
 * @route POST /api/auth/register
 * @access Public
 */
async function registerUser(req, res){
    
    try {
        const {name, email, password} = req.body;
        
        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await userModel.create({name, email, password});
        return res.status(201).json({message: "User registered successfully", user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    };

}

module.exports = {registerUser};