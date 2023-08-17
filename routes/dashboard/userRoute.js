// import get all users controller from controllers\dashboard\userController.js
// import create user controller from controllers\dashboard\userController.js

const express = require("express");
const {
    getAll,
    createOne,
    getOne,
    updateOne,
    deleteOne,
    restoreOne
} = require("../../controllers/dashboard/userController");
const {single} = require("../../utils/cloudinary-multer");
const {
    validateCreate,
    validateUpdate,
    checkParamsId,
} = require("../../controllers/dashboard/validation/user.validator");

const router = express.Router();

router.route("/")
    // .all(protect)
    /**
     * @route    GET api/v1/dashboard/users
     * @desc     Get all users
     * @returns  {Array} Array of users
     * @access   Private
     */
    .get(getAll)
    .post(single("image"),validateCreate,createOne);

router.route("/:id")
    // .all(protect)
    .all(checkParamsId)
    .get(getOne)
    .delete(deleteOne)
    .patch(single("image"),validateUpdate,updateOne)
    .post(restoreOne)
;


module.exports = router;
