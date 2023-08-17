"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Transactions", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                allowNull: false,
                foreignKey: true,
                references: {
                    model: "Users",
                    key: "id",
                },
                type: Sequelize.INTEGER,
            },
            amount: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            method: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.ENUM("success", "failed", "pending"),
                defaultValue: "pending",
            },

        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Transactions");
    },
};
