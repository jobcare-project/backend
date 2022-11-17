"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Jobs", "city", {
      allowNull: false,
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Jobs", "district", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Jobs", "jobRequire", {
      type: Sequelize.TEXT,
    });
    await queryInterface.addColumn("Jobs", "jobDescription", {
      type: Sequelize.TEXT,
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
