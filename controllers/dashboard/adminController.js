const db = require("../../db/models");
const {success} = require("../../utils/responses");
const {signToken} = require("../../utils/Auth.helper");
const Factory = require("../../utils/Factory");

const Admin = db.Admin;

/**
 * @route    GET api/v1/dashboard/users
 * @desc     Get all users
 * @returns  {Array} Array of users
 * @access   Private
 */
module.exports.getAllUsers = Factory.getAll(Admin);


/**
 * @route    POST api/v1/dashboard/users/
 * @desc     Create new user
 * @body {Object} user object - {name, email, password, phone, image}
 * @returns  {Object} user object || null
 * @access   Private
 */

module.exports.createUser = Factory.createOne(Admin)

/**
 * @route    GET api/v1/dashboard/users/:id
 * @desc     Get user by id
 * @param   {Integer} id - user id
 * @returns  {Object} user object || null
 * @access   Private
 */

module.exports.getUser = Factory.getOne(Admin);

/**
 * @route    @route    PATCH api/v1/dashboard/users/:id
 * @desc     Update user by id
 * @param   {Integer} id - user id
 * @body {Object} partial user object - {name, email, phone, image}
 * @returns  {Object} user object
 * @access   Private
 */

module.exports.updateUser = Factory.updateOne(Admin)

/**
 * @route    DELETE api/v1/dashboard/users/:id
 * @param {Integer} id - user id
 * @returns {null} null
 * @access   Private
 */
module.exports.deleteUser = Factory.deleteOne(Admin)

/**
 * @route    POST api/v1/dashboard/users/:id
 * @param {Integer} id - user id
 * @returns {object} user object
 * @access   Private
 */

module.exports.restoreUser = Factory.restoreOne(Admin)


/**
 * @route    POST api/v1/users/signIn
 * @body email
 * @body password
 * @returns {object} user object + token
 * @access   Public
 */
module.exports.signIn = async ({body:{email,password}}, res, next) => {
    try {
        const user = await Admin.findByEmail(email);
        if(!user) return next(new Error("User not found"));
        const isMatch = await user.comparePassword(password);
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

module.exports.protect = async (req, res, next) => {
    try {
        const {authorization} = req.headers;
        if (!authorization.startsWith("Bearer ")) return next(new Error("Invalid token"));
        const token = authorization.split(" ")[1];
        if(!token) return next(new Error("Invalid token"));

        const decoded_token = await Admin.verifyToken(token);
        const user = await Admin.findByPk(decoded_token.id);
        if(!user) return next(new Error("User not found"));
        req.user = user;
        res.status(200).json(success(user));
    } catch (err) {
        next(err);
    }
}
