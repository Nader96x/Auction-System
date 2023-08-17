const express = require("express");
const {
    getAll,
    createOne,
    getOne,
    updateOne,
    deleteOne,
    restoreOne,
} = require("../../controllers/dashboard/adminController");
const {
    validateCreate,
    validateUpdate,
    checkParamsId
} = require("../../controllers/dashboard/validation/admin.validator");
const throwErrorIfSameUser = (req, res, next) => {
    if (req.user.id === req.params.id) {
        return next({
            status: 400,
            message: "You can't delete yourself",
        });
    }
    next();
}

const router = express.Router();

router.route("/")
    .get(getAll)
    .post(validateCreate,createOne);

router.route("/:id")
    .all(checkParamsId)
    .get(getOne)
    .patch(validateUpdate,updateOne)
    .delete(throwErrorIfSameUser, deleteOne)
    .post(restoreOne);


module.exports = router;
