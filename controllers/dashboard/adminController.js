const {Admin} = require("../../db/models");
const Factory = require("../../utils/Factory");


module.exports.getAll = Factory.getAll(Admin);

module.exports.createOne = Factory.createOne(Admin)

module.exports.getOne = Factory.getOne(Admin);

module.exports.updateOne = Factory.updateOne(Admin)

module.exports.deleteOne = Factory.deleteOne(Admin)

module.exports.restoreOne = Factory.restoreOne(Admin)

