const {deleteImage} = require("../utils/cloudinary-multer");
function isJSONString(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (error) {
        return false;
    }
}
module.exports._500 = async (err, req, res, next) => {
    // if (err?.keyPattern?.email) err.message = "Email already exists";
    console.log(err);
    if (err.name === "ValidationError") {
        // console.log("ValidationError");
        err.message = {};
        Object.values(err.errors).forEach((e) => {
            err.message[e.path] = e.message;
        });
        err.statusCode = 422;
        err.message=Object.values(err.message).join(", ").replaceAll('"' , "'");

    } else if (err.name === "CastError") {
        // console.log("CastError");
        err.message = `Invalid ${err.path}: ${err.value}`;
        err.statusCode = 422;
    } else if (err.name === 'SequelizeValidationError') {
        err.message = {}; // Create an object to hold validation error messages
        err.errors.forEach((e) => {
            err.message[e.path] = e.message; // Store validation error messages by field name
        });
        err.message=Object.values(err.message).join(", ").replaceAll('"' , "'");

        err.statusCode = 422; // Unprocessable Entity
    } else if (err.name === 'SequelizeDatabaseError') {
        err.message = `Database error: ${err.message}`;
        err.statusCode = 500; // Internal Server Error
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        err.message = {}; // Create an object to hold unique constraint error messages
        err.errors.forEach((e) => {
            err.message[e.path] = `'${e.path}' already exists`;
        });
        err.message=Object.values(err.message).join(", ").replaceAll('"' , "'");
        err.statusCode = 422; // Unprocessable Entity
    } else if (err.name === "TokenExpiredError") {
        err.message = "Session has expired, Please Login Again";
        err.statusCode = 401;
    } else if (err.name === "JsonWebTokenError") {
        err.message = "Authentication Error, Please Login Again";
        err.statusCode = 401;
    } else if(isJSONString(err.message)) {
        err.message = JSON.parse(err.message);
        err.statusCode = 422;
    }else {
        console.log("err");
    }

    const statusCode = err.statusCode || 500;
    res
        .status(statusCode)
        .json({status: "fail", error: err.message, stack: err.stack});
    if(req.file)
        await deleteImage(req.file.path);
    if(req.files)
        await Promise.all(req.files.map(file=>deleteImage(file.path)));
};

module.exports._404 = (req, res, next) => {
    res.status(404).json({status: "fail", error: "Page not found."});
};
