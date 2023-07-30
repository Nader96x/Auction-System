const {Router} = require("express");

const {
  signIn
} = require("../../controllers/dashboard/userController");


const router = Router();

router.route("/signin").post(signIn);