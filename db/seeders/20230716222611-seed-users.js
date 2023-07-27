const { faker } = require('@faker-js/faker');
const {hash} = require("bcrypt")
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const users = []
    for (let i = 0; i < 10; i++) {
        users.push({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: await hash(faker.internet.password(), 10),
            phone: faker.phone.number(),
            image: faker.image.avatar(),
            balance: faker.number.int({min: 100, max:200}),
            pending_balance: faker.number.int({min: 100, max:200}),
            // reset_password_token: faker.string.alphanumeric(10),
            // reset_password_expires: faker.date.future(),
            // createdAt: new Date(),
            // updatedAt: new Date()
        })
    }
    await queryInterface.bulkInsert('Users', users, {})
      console.warn('Seeding users success')
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
        await queryInterface.bulkDelete('Users', null, {})
  }
};
