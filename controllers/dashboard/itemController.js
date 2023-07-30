const db = require("../../db/models");
const {success} = require("../../utils/responses");
const Factory = require("../../utils/Factory")


const Item = db.Item;
const ItemImages = db.Item_images;

module.exports.getAllItems = Factory.getAll(Item);

module.exports.createItem = Factory.createOne(Item)

module.exports.getItem = Factory.getOne(Item);

module.exports.updateItem = Factory.updateOne(Item)

module.exports.deleteItem = Factory.deleteOne(Item)

module.exports.restoreItem = Factory.restoreOne(Item)

module.exports.getAllItemImages = Factory.getAll(ItemImages);

module.exports.createItemImages = Factory.createOne(ItemImages)

module.exports.getItemImages = Factory.getOne(ItemImages);

module.exports.updateItemImages = Factory.updateOne(ItemImages)

module.exports.deleteItemImages = Factory.deleteOne(ItemImages)

module.exports.restoreItemImages = Factory.restoreOne(ItemImages)


