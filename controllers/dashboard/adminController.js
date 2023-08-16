const db = require("../../db/models");
const {success} = require("../../utils/responses");
const {signToken} = require("../../utils/Auth.helper");
const Factory = require("../../utils/Factory");

const Admin = db.Admin;


module.exports.getAll = Factory.getAll(Admin);

module.exports.createOne = Factory.createOne(Admin)

module.exports.getOne = Factory.getOne(Admin);

module.exports.updateOne = Factory.updateOne(Admin)

module.exports.deleteOne = Factory.deleteOne(Admin)

module.exports.restoreOne = Factory.restoreOne(Admin)

