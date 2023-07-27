"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Item_bid_conditions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      item_id: {
        allowNull: false,
        references: {
          model: "Items",
          key: "id",
        },
        type: Sequelize.INTEGER,
      },
      auction_id: {
        allowNull: false,
        references: {
          model: "Auctions",
          key: "id",
        },
        type: Sequelize.INTEGER,
      },
      start_time: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      duration: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      start_amount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      minimum_bidding_amount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      close_price: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },{
        paranoid:true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Item_bid_conditions");
  },
};
