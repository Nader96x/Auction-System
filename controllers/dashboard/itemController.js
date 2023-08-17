const {Item, ItemImages} = require("../../db/models");
const Factory = require("../../utils/Factory")


module.exports.getAll = Factory.getAll(Item);

module.exports.createOne = Factory.createOne(Item)

module.exports.getOne = Factory.getOne(Item);

module.exports.updateOne = Factory.updateOne(Item)

module.exports.deleteOne = Factory.deleteOne(Item)

module.exports.restoreOne = Factory.restoreOne(Item)

module.exports.getAllItemImages = Factory.getAll(ItemImages);

module.exports.createItemImages = Factory.createOne(ItemImages)

module.exports.getItemImages = Factory.getOne(ItemImages);

module.exports.updateItemImages = Factory.updateOne(ItemImages)

module.exports.deleteItemImages = Factory.deleteOne(ItemImages)

module.exports.restoreItemImages = Factory.restoreOne(ItemImages)


