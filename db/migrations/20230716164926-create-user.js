"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            phone: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            image: {
                type: Sequelize.STRING,
            },
            balance: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            pending_balance: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            banned_until: Sequelize.DATE,
            reset_password_token: Sequelize.STRING,
            reset_password_expires: Sequelize.DATE,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Users");
    },
};
