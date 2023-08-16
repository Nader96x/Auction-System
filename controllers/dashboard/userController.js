const {User} = require("../../db/models");
const Factory = require("../../utils/Factory");


module.exports.getAll = Factory.getAll(User);

module.exports.createOne = Factory.createOne(User)

module.exports.getOne = Factory.getOne(User);

module.exports.updateOne = Factory.updateOne(User)

module.exports.deleteOne = Factory.deleteOne(User)

module.exports.restoreOne = Factory.restoreOne(User)
