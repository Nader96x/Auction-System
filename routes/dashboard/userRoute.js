// import get all users controller from controllers\dashboard\userController.js
// import create user controller from controllers\dashboard\userController.js

const express = require("express");
const {
  getAllUsers,
  createUser,
    getUser,
    deleteUser,
    updateUser,
    restoreUser,
    protect
} = require("../../controllers/dashboard/userController");

const router = express.Router();

router.route("/")
    // .all(protect)
    .get(getAllUsers)
    .post(createUser);

router.route("/:id")
    // .all(protect)
    .get(getUser)
    .delete(deleteUser)
    .patch(updateUser)
    . post(restoreUser)
;


module.exports = router;
