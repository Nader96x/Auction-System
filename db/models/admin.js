"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Admin.init(
    {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              isAlphanumeric: [true, "Name must be only letters and numbers"],
              min:[3, "Name must be at least 3 characters long with only letters and numbers"],
              max:[255, "Name must be at most 255 characters long with only letters and numbers"],
          },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: [true, "Email must be a valid email address"],
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: [ /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "Password must be at least 8 characters long with at least one number, one lowercase and one uppercase letter"]
        },
        async set(value) {
          this.setDataValue("password", await bcrypt.hash(value, 10));
        },
      },
      reset_password_token: DataTypes.STRING,
      reset_password_expires: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Admin",
        createdAt:"created_at",
        updatedAt:"updated_at",
      // timestamps: true,
        paranoid:true,
    }
  );

  // Static methods
  Admin.prototype.findByEmail = async function (email) {
    return await Admin.findOne({ where: { email } });
  }

  // Instance methods
  Admin.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  }

  return Admin;
};
