const db = require("../../db/models");
const {success} = require("../../utils/responses");
const Factory = require("../../utils/Factory")


const Bid = db.Bid;

module.exports.getAllItems = Factory.getAll(Bid);

module.exports.createItem = Factory.createOne(Bid)

// module.exports.getItem = Factory.getOne(Bid);
//
// module.exports.updateItem = Factory.updateOne(Item)
//
// module.exports.deleteItem = Factory.deleteOne(Item)
//
// module.exports.restoreItem = Factory.restoreOne(Item)