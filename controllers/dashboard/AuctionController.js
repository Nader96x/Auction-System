const {Auction} = require("../../db/models");
const Factory = require("../../utils/Factory")


module.exports.getAll = Factory.getAll(Auction);

module.exports.createOne = Factory.createOne(Auction)

module.exports.getOne = Factory.getOne(Auction);

module.exports.updateOne = Factory.updateOne(Auction)

module.exports.deleteOne = Factory.deleteOne(Auction)

module.exports.restoreOne = Factory.restoreOne(Auction)