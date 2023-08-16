"use strict";
const {Model} = require("sequelize");
const useBcrypt = require("sequelize-bcrypt");
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

            },
            phone: {
                type: DataTypes.STRING,
                validate: {
                    is: {
                        args: [/^01[0125][0-9]{8}$/],
                    },
                },
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isUrl: [true, "Invalid URL"],
                }
            },
            balance: {
                type: DataTypes.INTEGER,
                defaultValue: 0,

            },
            pending_balance: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            banned_until: DataTypes.DATE,
            reset_password_token: {
                type: DataTypes.STRING,
                exclude: true,
            },
            reset_password_expires:{
                type: DataTypes.DATE,
                exclude: true,
            },
            is_active:{
                type:DataTypes.VIRTUAL,
                get(){
                    return !(this.banned_until > new Date());
                }
            }

        },
        {
            sequelize,
            modelName: "User",
            timestamps: true,
            paranoid:true,
            defaultScope:{
                attributes:{
                    exclude:['password','updatedAt','deletedAt',"reset_password_token","reset_password_expires"]
                }
            },
            scopes:{
                secure:{
                    attributes:{
                        exclude:['password','updatedAt','deletedAt',"reset_password_token","reset_password_expires"]
                    }
                },
                withPassword:{
                    attributes:{
                        include:['password']
                    }
                },
                withResetPasswordToken:{
                    attributes:{
                        include:['reset_password_token','reset_password_expires']
                    }
                },
                withTimestamps:{
                    attributes:{
                        include:['createdAt','updatedAt','deletedAt']
                    }
                }
            }
        }
    );

    // Static methods
    User.findByEmail = async function (email) {
        return await User.findOne({ where: { email } });
    }

    // Instance methods

    useBcrypt(User);
    return User;
};
