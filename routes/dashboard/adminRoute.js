const express = require("express");
const {
    getAll,
    createOne,
    getOne,
    updateOne,
    deleteOne,
    restoreOne,
} = require("../../controllers/dashboard/adminController");

const router = express.Router();

router.route("/")
    .get(getAll)
    .post(createOne);

router.route("/:id")
    .get(getOne)
    .patch(updateOne)
    .delete(deleteOne)
    .post(restoreOne);


module.exports = router;
