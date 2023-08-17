const Joi = require('joi');
const {checkParamsId,validateSchema} = require("../../../utils/ValidateSchema");

const validateCreate = validateSchema(Joi.object({
    name: Joi.string().min(3).required(),
    material: Joi.string().min(3),
    color: Joi.string().min(3),
    size: Joi.string().min(3),
    images: Joi.array().items(Joi.string().uri()).min(1).required(),
}));

const validateUpdate = validateSchema(Joi.object({
    name: Joi.string().min(3).optional(),
    material: Joi.string().min(3).optional(),
    color: Joi.string().min(3).optional(),
    size: Joi.string().min(3).optional(),
    images: Joi.array().items(Joi.string().uri()).min(1).optional(),
}));


module.exports = {
    validateCreate,
    validateUpdate,
    checkParamsId,
}