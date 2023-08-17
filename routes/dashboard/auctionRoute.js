const express = require("express");
const {
    getAll,
    createOne,
    getOne,
    updateOne,
    deleteOne,
    restoreOne,
} = require("../../controllers/dashboard/AuctionController");
const {
    validateCreate,
    validateUpdate,
    checkParamsId
} = require("../../controllers/dashboard/validation/auction.validator");

const router = express.Router();

router.route("/")
    .get(getAll)
    .post(validateCreate,createOne);

router.route("/:id")
    .all(checkParamsId)
    .get(getOne)
    .patch(validateUpdate,updateOne)
    .delete(deleteOne)
    .post(restoreOne);


module.exports = router;
