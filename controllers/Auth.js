const {signToken,verifyToken} = require("../utils/Auth.helper");
const {success} = require("../utils/responses");
const {Admin} = require("../db/models");




/**
 * @desc    Log in user and get token
 * @route POST /login
 * @body email - email of user
 * @body password - password of user
 * @return {string} message - success
 * @return {object} data - {id,name,email,createdAt}
 * @return {string} token - JWT token
 * @access   Public
 */
module.exports.logIn = (Model) => async ({body:{email,password}}, res, next) => {
        const user = await Model.findByEmail(email);
        if(!user) return next(new Error(`${Model.name} not found`));
        const isMatch = await user.authenticate(password);
        if(!isMatch) return next(new Error(`${Model.name}'s password is incorrect`));
        delete user.dataValues.password;
        const token = signToken({id:user.id});
        res.status(200).json(success(user,{token}));
}


/**
 * @desc    Protect route and get user from token
 * @headers {string} authorization - Bearer token
 * @returns {object} user object on req.user
 * @access   Private
 */
module.exports.protect = (Model)=>async (req, res, next) => {
    console.log("protect")
        const authorization = req.header("authorization");
        if(!authorization) return next(new Error("No authorization header token found"));
        if (!authorization.startsWith("Bearer ")) return next(new Error("Invalid authorization token"));
        const token = authorization.split(" ")[1];
        if(!token) return next(new Error("Invalid authorization token"));
        const decoded_token = verifyToken(token);
        const user = await Model.findByPk(decoded_token.id);
        if(!user) return next(new Error(`${Model.name} not found`));
        req.user = user;
        next();
}
