"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Auctions", {
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
      start_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      end_date: Sequelize.DATE,
      entry_fees: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },{
        paranoid:true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Auctions");
  },
};
