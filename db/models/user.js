"use strict";
const {Model} = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    User.init(
        {
            name: {
                type: DataTypes.STRING,
                validate: {
                    is: {
                        //     at least 3 characters long with only letters and spaces
                        args: [/^[a-zA-Z ]{3,}$/],
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                validate: {
                    is: {
                        // args: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/],
                    },
                },
                async set(value) {
                    this.setDataValue("password", await bcrypt.hash(value, 10));
                },
            },
            phone: {
                type: DataTypes.STRING,
                validate: {
                    is: {
                        args: [/^01[0125][0-9]{8}$/],
                    },
                },
            },
            image: DataTypes.STRING,
            balance: DataTypes.INTEGER,
            pending_balance: DataTypes.INTEGER,
            banned_until: DataTypes.DATE,
            reset_password_token: DataTypes.STRING,
            reset_password_expires: DataTypes.DATE,

        },
        {
            sequelize,
            modelName: "User",
            timestamps: true,
            paranoid:true,
        }
    );

    // Static methods
    User.prototype.findByEmail = async function (email) {
        return await User.findOne({ where: { email } });
    }

    // Instance methods
    User.checkPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    }

    return User;
};
