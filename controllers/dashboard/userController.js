const db = require("../../db/models");
const {success} = require("../../utils/responses");
const {signToken} = require("../../utils/Auth.helper");
const Factory = require("../../utils/Factory");

const User = db.User;

module.exports.getAll = Factory.getAll(User);

module.exports.createOne = Factory.createOne(User)

module.exports.getOne = Factory.getOne(User);

module.exports.updateOne = Factory.updateOne(User)

module.exports.deleteOne = Factory.deleteOne(User)

module.exports.restoreOne = Factory.restoreOne(User)
