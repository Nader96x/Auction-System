const jwt = require("jsonwebtoken");

/**
 * @desc    Sign JWT token
 * @param {object} payload - payload to sign
 * @param {string} expiresIn - expire time {default: process.env.JWT_EXPIRE
 * @return {string} token
 */
exports.signToken = (payload, expiresIn = process.env.JWT_EXPIRE) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn});
}

/**
 * @desc    Decode JWT token
 * @param   {string} token - token to decode
 * @return {object} {id: Number,iat: Number,exp: Number}
 */
exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}