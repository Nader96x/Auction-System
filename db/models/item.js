"use strict";
const {Model} = require("sequelize");
const {slugifyModel} = require("sequelize-slugify");
const {ItemImages} = require("./index");
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }

    Item.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    is: /^[a-zA-Z0-9 ]{3,}$/,
                },
            },
            material: DataTypes.STRING,
            color: DataTypes.STRING,
            size: DataTypes.STRING,
            slug: {
                type: DataTypes.STRING,
                unique: true,
            },
            /*images: {
                type: DataTypes.VIRTUAL,
                get() {
                    return this.getDataValue("ItemImages")?.map((image) => {
                        return {
                            id: image.id,
                            image: image.image,
                            item_id: image.item_id,
                            };
                    }) || [];
                }
            }*/

        },
        {
            sequelize,
            modelName: "Item",
            timestamps: true,
            paranoid: true,
            defaultScope: {
                include: 'images',
            },
            getterMethods: {
                timestamp() {
                    return Date.now();
                },
            }
        }
    );

    slugifyModel(Item, {
        source: ["name"],
        slugOptions: {lower: true},
        column: "slug",
        incrementalSeparator: "-",
        unique: true,
        suffixSource: ['timestamp']
    });

    return Item;
};
