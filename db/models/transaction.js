"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // belongs to user

      this.belongsTo(models.User);
      models.User.hasMany(Transaction, {
        foreignKey: "user_id",
      });
    }
  }

  Transaction.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
          validate: {
                isInt: [true, "Amount must be an integer"],
                min: [0, "Amount must be greater than 0"]
          }
      },
      method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("success", "failed", "pending"),
        defaultValue: "pending",
      },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Transaction",
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true,
    }
  );
  return Transaction;
};
