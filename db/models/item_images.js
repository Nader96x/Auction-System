"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ItemImages extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Item, {
                foreignKey: "id",
            });
            models.Item.hasMany(this, {
                foreignKey: "item_id",
                as: "images"
            });
        }
    }

    ItemImages.init(
        {
            item_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: true,
                }
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isUrl: true,
                }
            },

        },
        {
            sequelize,
            modelName: "ItemImages",
            tableName: "Item_images",
            defaultScope: {
                attributes: {exclude: ["deletedAt", 'updatedAt', 'createdAt']},
            },
            timestamps: true,
            paranoid: true,
            hooks: {
                afterDestroy(instance, options) {
                    if (options.force) {
                        console.log(instance);
                    }
                }
            }
        }
    );
    return ItemImages;
};
