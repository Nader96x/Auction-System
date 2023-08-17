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
        // if(!user) return next(new Error(`${Model.name} not found`));
        if(!user) return next(new Error(`mail or password is incorrect1`));
        const isMatch = await user.authenticate(password);
        // if(!isMatch) return next(new Error(`${Model.name}'s password is incorrect`));
        if(!isMatch) return next(new Error(`mail or password is incorrect2`));
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
        const authorization = req.header("authorization");
        if(!authorization) return next(new Error("No authorization header token found"));
        if (!authorization.startsWith("Bearer ")) return next(new Error("Invalid authorization token"));
        const token = authorization.split(" ")[1];
        if(!token) return next(new Error("Invalid authorization token"));
        const decoded_token = verifyToken(token);
        const user = await Model.findByPk(decoded_token.id);
        if(!user) return next(new Error(`this ${Model.name} not found anymore.`));
        req.user = user;
        next();
}


/**
 * @desc    Reset password
 * @route POST /resetPassword
 * @body email - email of user
 * @return {string} message - success
 * @return {string} token - JWT token
 * @access   Public
 * @note     this function is not completed yet
 * @todo     send email with token
 */
module.exports.resetPassword = (Model) => async ({body:{email}}, res, next) => {
        const user = await Model.findByEmail(email);
        if(!user) return next(new Error(`${Model.name} not found`));
        const token = signToken({id:user.id,email:user.email,model:Model.name,expiresAt:Date.now()+3600*3},"3h");
        //send email with token

        if (process.env.NODE_ENV === "development")
            res.status(200).json(success("please check your email to reset your password",{token}));
        else
            res.status(200).json(success("please check your email to reset your password"));

}

/**
 * @desc    Confirm reset password
 * @route POST /confirmResetPassword
 * @body token - token from email
 * @body password - new password
 * @body confirmPassword - confirm new password
 * @return {string} message - success
 * @access   Public
 * @note     this function is not completed yet
 * @todo     send email with token
 * @todo     send email with success message
*/
module.exports.confirmResetPassword = (Model)=>async ({body:{password,confirmPassword,token}}, res, next) => {
        if(password !== confirmPassword) return next(new Error("passwords don't match"));
        const decoded_token = verifyToken(token);
        if(!decoded_token) return next(new Error("invalid token"));
        if(decoded_token.model !== Model.name) return next(new Error("invalid token"));
        if(decoded_token.expiresAt < Date.now()) return next(new Error("token expired"));
        const user = await Model.findByPk(decoded_token.id);
        if(!user || (decoded_token.email && user.email !== decoded_token.email) ) return next(new Error(`this ${Model.name} not found anymore.`));
        user.password = password;
        await user.save();
        res.status(200).json(success("password updated successfully"));
}

/**
 * @desc    Update password
 * @route POST /updatePassword
 * @body password - new password
 * @body confirmPassword - confirm new password
 * @return {string} message - success
 * @access   Private
 * @note     this function is not completed yet
 * @todo     send email with success message
 */
module.exports.updatePassword = async ({body:{password,confirmPassword},user}, res, next) => {
        if(password !== confirmPassword) return next(new Error("passwords don't match"));
        user.password = password;
        await user.save();
        res.status(200).json(success({message:"password updated successfully"}));
}


