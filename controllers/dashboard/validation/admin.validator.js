const Joi = require('joi');
const {checkParamsId,validateSchema} = require("../../../utils/ValidateSchema");

const CreateAdmin = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }).required().trim(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.ref("password"),
    name: Joi.string().min(3).required(),
});

const UpdateAdmin = Joi.object({
    email: Joi.string().email().optional(),
    name: Joi.string().min(3).optional(),
});




module.exports = {
    validateCreate: validateSchema(CreateAdmin),
    validateUpdate: validateSchema(UpdateAdmin),
    checkParamsId,
}




