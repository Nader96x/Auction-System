"use strict";
const { Model } = require("sequelize");
const {slugifyModel} = require("sequelize-slugify");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }

  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z ]{3,}$/,
        },
      },
      material:DataTypes.STRING,
      color: DataTypes.STRING,
      size: DataTypes.STRING,
      slug: {
            type: DataTypes.STRING,
            unique: true,
        },
    },
    {
      sequelize,
      modelName: "Item",
        timestamps: true,
        paranoid:true,
        getterMethods: {
            timestamp() {
                return Date.now();
            },
        }
    }
  );

    slugifyModel(Item, {
        source: ["name"],
        slugOptions: { lower: true },
        column: "slug",
        incrementalSeparator: "-",
        unique: true,
        suffixSource: ['timestamp']
    });

  return Item;
};
