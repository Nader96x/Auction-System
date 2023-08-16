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
    .post(createOne);

router.route("/:id")
    // .all(protect)
    .get(getOne)
    .delete(deleteOne)
    .patch(updateOne)
    . post(restoreOne)
;


module.exports = router;
