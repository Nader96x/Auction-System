const Joi = require('joi');
const {checkParamsId,validateSchema} = require("../../../utils/ValidateSchema");

const validateCreate = validateSchema(Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }).required().trim(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.ref("password"),
    name: Joi.string().min(3).required(),
    phone: Joi.string().pattern(new RegExp('^01[0125][0-9]{8}$')).required(),
    image: Joi.string().uri().required(),
}));

const validateUpdate = validateSchema(Joi.object({
    email: Joi.string().email().optional(),
    name: Joi.string().min(3).optional(),
    phone: Joi.string().pattern(new RegExp('^01[0125][0-9]{8}$')).optional(),
    image: Joi.string().uri().optional(),
}));


module.exports = {
    validateCreate,
    validateUpdate,
    checkParamsId,
}

