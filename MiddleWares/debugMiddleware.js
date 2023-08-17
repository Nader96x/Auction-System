module.exports = (req, res, next) => {
    console.log("Request Body:", req.body);
    console.log("Request Params:", req.params);
    console.log("Request Query:", req.query);
    console.log("Request Files:", req.files);
    console.log("Request File:", req.file);
    next();
}