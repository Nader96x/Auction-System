"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsTo(models.User);
      models.User.hasMany(this, {
        foreignKey: "user_id",
      });

      this.belongsTo(models.Item);
      models.Item.hasMany(this, {
        foreignKey: "item_id",
      });

      this.belongsTo(models.Auction);
      models.Auction.hasMany(this, {
        foreignKey: "auction_id",
      });
    }
  }

  Bid.init(
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt: [true, "Amount must be an integer"],
          min: [0, "Amount must be greater than 0"]
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: [true, "User ID must be an integer"],
          min: [0, "User ID must be greater than 0"]
        }
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: [true, "Item ID must be an integer"],
            min: [0, "Item ID must be greater than 0"]
        }
      },
      auction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: [true, "Auction ID must be an integer"],
            min: [0, "Auction ID must be greater than 0"]
        }
      },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Bid",
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true,
    }
  );
  return Bid;
};
