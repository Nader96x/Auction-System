const express = require("express");
const {
    getAll,
    createOne,
    getOne,
    updateOne,
    deleteOne,
    restoreOne,
} = require("../../controllers/dashboard/itemController");
const {
    validateCreate,
    validateUpdate,
    checkParamsId
} = require("../../controllers/dashboard/validation/item.validator");


const router = express.Router();

router.route("/")
    // .all(protect)
    .get(getAll)
    .post(validateCreate,createOne);

router.route("/:id")
    // .all(protect)
    .all(checkParamsId)
    .get(getOne)
    .patch(validateUpdate,updateOne)
    .delete(deleteOne)
    .post(restoreOne);


module.exports = router;
