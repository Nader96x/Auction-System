const express = require("express");
const {
    getAll,
    createOne,
    getOne,
    updateOne,
    deleteOne,
    restoreOne,
} = require("../../controllers/dashboard/adminController");

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
    .post(createOne);

router.route("/:id")
    .get(getOne)
    .patch(updateOne)
    .delete(throwErrorIfSameUser,deleteOne)
    .post(restoreOne);


module.exports = router;
