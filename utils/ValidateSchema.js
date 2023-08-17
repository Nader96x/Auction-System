const Joi = require("joi");


const  validateSchema = (schema, property = `body`) =>
     async (req, res, next) => {
        const { error, value } = schema.validate(
            { ...req[property] },
            {
                abortEarly: false,
                // allowUnknown: true,
            }
        );
        // if (process.env.NODE_ENV === "development") console.log(error, value);
        if (error) {
            let errors = {};
            error.details.forEach((detail) => {
                errors[detail.context.key] = detail.message;
            });
            // throw new Error(JSON.stringify(errors));

            errors = Object.values(errors).join(", ").replaceAll('"' , "'");
            // console.log(errors)
            // const errorMessages = error.details.map((detail) => detail.message);
            // console.log(errorMessages);
            // console.log(errors);
            // if (process.env.NODE_ENV === "development") console.log(errors);
            // return next(new ApiError(errors, 422));
            // return res.status(422).json({ status: "fail", error: errors });
            throw new Error(errors);
        }
        next();
    };


module.exports.validateSchema =  validateSchema ;
module.exports.checkParamsId = validateSchema(Joi.object({
    id: Joi.number().required(),
}), "params");