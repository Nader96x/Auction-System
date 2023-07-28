"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Auction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Auction.init(
        {
            // reference_number: DataTypes.INTEGER,
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isAlphanumeric:{
                      locale: "en-US",
                      min: 3,
                      max: 255,
                      msg: "Name must be at least 3 characters long with only letters and numbers",
                    }
                }
            },
            start_date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    isDate:[true, "Start date must be a valid date"],
                    isAfter:[ new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), "Start date must be at least 24 hours from now"],
                },
            },
            end_date: {
                type: DataTypes.DATE,
                validate: {
                    isDate: true,
                    isAfter: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
                },
            },
            entry_fees: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: [true, "Entry fees must be an integer"],
                },
            },
            status: {
                type: DataTypes.VIRTUAL,
                get() {
                    const currentDate = new Date();
                    if (currentDate > this.end_date) {
                        return "Completed";
                    } else if (currentDate > this.start_date) {
                        return "Ongoing";
                    } else {
                        return "Upcoming";
                    }
                },
            },

            /*items:{
                type: DataTypes.VIRTUAL,
                get(){
                    return this.getItems();
                }
            },
            participants:{
                type: DataTypes.VIRTUAL,
                get(){
                    return this.getParticipants();
                }
            },
            winner:{
                type: DataTypes.VIRTUAL,
                get(){
                    return this.getWinner();
                }
            },*/

        },
        {
            sequelize,
            modelName: "Auction",
            timestamps: true,
            paranoid:true,
        }
    );


    // Static Methods

    // Instance Methods



    return Auction;
};
