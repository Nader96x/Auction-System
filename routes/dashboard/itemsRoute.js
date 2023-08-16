const express = require("express");
const {
    getAll,
    createOne,
    getOne,
    updateOne,
    deleteOne,
    restoreOne,
} = require("../../controllers/dashboard/itemController");

const router = express.Router();

router.route("/")
    // .all(protect)
    .get(getAll)
    .post(createOne);

router.route("/:id")
    // .all(protect)
    .get(getOne)
    .patch(updateOne)
    .delete(deleteOne)
    .post(restoreOne);


module.exports = router;
