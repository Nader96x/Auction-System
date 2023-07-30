const db = require("../../db/models");
const Factory = require("../../utils/Factory")


const Auction = db.Auction;

module.exports.getAllItems = Factory.getAll(Auction);

module.exports.createItem = Factory.createOne(Auction)

module.exports.getItem = Factory.getOne(Auction);

module.exports.updateItem = Factory.updateOne(Auction)

module.exports.deleteItem = Factory.deleteOne(Auction)

module.exports.restoreItem = Factory.restoreOne(Auction)