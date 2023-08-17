'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Item_bid_condition extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

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

    Item_bid_condition.init({
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
            }
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: [true, "Start time must be a date"],
                isAfter: [new Date(), "Start time must be after current time"]
            }
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: [true, "Duration must be an integer"],
                min: [10, "Duration must be greater than 10 minutes"],
            },
            set(value) {
                // convert minutes to milliseconds
                this.setDataValue('duration', value * 60 * 1000);
            }

        },
        expected_close_time: {
            type: DataTypes.VIRTUAL,
            get() {
                return new Date(this.start_time.getTime() + this.duration);
            }
        },
        start_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: [true, "Item ID must be an integer"],
                min: [1, "Item ID must be greater than 1"]
            }
        },
        minimum_bidding_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: [true, "Minimum bidding amount must be an integer"],
                min: [1, "Minimum bidding amount must be greater than 1"]
            }
        },
        close_price: {
            type: DataTypes.INTEGER,
            validate: {
                isInt: [true, "Close Price must be an integer"],
                min: [1, "Close Price must be greater than 1"]
            }
        },

    }, {
        sequelize,
        modelName: 'Item_bid_condition',
        timestamps: true,
        paranoid: true,
    });
    return Item_bid_condition;
};