const {Router} = require("express");
const authRouter = Router();


/**
 * @description Register a new user
 * @route POST /api/auth/register
 * @access Public   
 */
authRouter.post("/register"); 


/**
 * @description Login a user
 * @route POST /api/auth/login
 * @access Public
 */
authRouter.post("/login");




module.exports = authRouter;