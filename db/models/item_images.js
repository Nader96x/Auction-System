"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item_images.belongsTo(models.Item, {
        foreignKey: "id",
      });
      //   Item hasMany Item_images
      models.Item.hasMany(this, {
        foreignKey: "item_id",
      });
    }
  }

  Item_images.init(
    {
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: [true, "Item ID must be an integer"],
        }
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: [true, "Image must be a valid URL"],
        }
      },

    },
    {
      sequelize,
      modelName: "Item_images",
        timestamps: true,
        paranoid:true,
    }
  );
  return Item_images;
};
