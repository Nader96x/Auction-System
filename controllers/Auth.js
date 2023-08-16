const {signToken} = require("../utils/Auth.helper");
const {success} = require("../utils/responses");





/**
 * @route    POST api/v1/users/signIn
 * @body email
 * @body password
 * @returns {object} user object + token
 * @access   Public
 */
module.exports.signIn = (Model) => async ({body:{email,password}}, res, next) => {
    try {
        const user = await Model.findByEmail(email);
        if(!user) return next(new Error("User not found"));
        const isMatch = await user.authenticate(password);
        if(!isMatch) return next(new Error("Password is incorrect"));
        const token = signToken({id:user.id});
        res.status(200).json(success(user,{token}));
    } catch (err) {
        next(err);
    }
}


/**
 * @desc    Protect route and get user from token
 * @headers {string} authorization - Bearer token
 * @returns {object} user object on req.user
 * @access   Private
 */
module.exports.protect = (Model)=>async (req, res, next) => {
    try {
        const {authorization} = req.headers;
        if (!authorization.startsWith("Bearer ")) return next(new Error("Invalid token"));
        const token = authorization.split(" ")[1];
        if(!token) return next(new Error("Invalid token"));

        const decoded_token = await Model.verifyToken(token);
        const user = await Model.findByPk(decoded_token.id);
        if(!user) return next(new Error("User not found"));
        req.user = user;
        res.status(200).json(success(user));
    } catch (err) {
        next(err);
    }
}
