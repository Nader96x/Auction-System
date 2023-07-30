const jwt = require("jsonwebtoken");

/**
 * @desc    Sign JWT token
 * @param {object} payload - payload to sign
 * @return {string} token
 */
exports.signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
}

/**
 * @desc    Decode JWT token
 * @param token
 * @return {object} {id: Number,iat: Number,exp: Number}
 */
exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}