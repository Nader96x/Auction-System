'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        const changes = {
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            deletedAt: Sequelize.DATE,
        };
        // 1st get all tables names
        let tables = await queryInterface.showAllTables();
        tables = tables.filter(name => name !== "SequelizeMeta")
        // console.log(tables)
        // 2nd apply this for each table
        tables.forEach(table => {
                // console.log(table)
                Object.keys(changes).forEach(change => {
                        // console.log(change)
                        queryInterface.addColumn(table, change, changes[change])
                    }
                )
            }
        )


    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};
