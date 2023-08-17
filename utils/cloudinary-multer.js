const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "DEV",
    },
});

const assignOnBody = (field)=>(req, res, next) => {
    if(req.file)
        req.body[field] = req.file.path;
    if(req.files)
        req.body[field] = req.files.map(file=>file.path);
    next();
}

module.exports.single = (field)=>[multer({ storage: storage }).single(field),assignOnBody(field)];
module.exports.array = (field,maxCount)=>[multer({ storage: storage }).array(field,maxCount),assignOnBody(field)];
module.exports.fields = (fields)=>[multer({ storage: storage }).fields(fields),assignOnBody(fields)];

module.exports.deleteImage = async (url)=> await cloudinary.uploader.destroy(url);
