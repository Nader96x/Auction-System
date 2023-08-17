const Joi = require('joi');
const {checkParamsId,validateSchema} = require("../../../utils/ValidateSchema");

const validateCreate = validateSchema(Joi.object({
    name: Joi.string().min(3).required(),
    start_date: Joi.date().required(),
    entry_fees: Joi.number().integer().required(),
}));

const validateUpdate = validateSchema(Joi.object({
    name: Joi.string().min(3).optional(),
    start_date: Joi.date().optional(),
    entry_fees: Joi.number().integer().optional(),
}));


module.exports = {
    validateCreate,
    validateUpdate,
    checkParamsId,
}

