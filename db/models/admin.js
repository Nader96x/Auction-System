"use strict";
const { Model } = require("sequelize");
const useBcrypt = require('sequelize-bcrypt');
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
              is:/^[A-Z ]{3,255}$/i,
          },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is:  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_])[0-9a-zA-Z!@#$%^&*_]{8,}$/
        },

      },
      reset_password_token: DataTypes.STRING,
      reset_password_expires: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Admin",
        timestamps: true,
        paranoid:true,
    }
  );


  // Static methods
  Admin.prototype.findByEmail = async function (email) {
    return await Admin.findOne({ where: { email } });
  }

  useBcrypt(Admin);

  return Admin;
};
