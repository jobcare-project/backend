"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Images", "data", {
      type: Sequelize.BLOB("long"),
    });
    await queryInterface.changeColumn("Images", "type", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("Images", "name", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
