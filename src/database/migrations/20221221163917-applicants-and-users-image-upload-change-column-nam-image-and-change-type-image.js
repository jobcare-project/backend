"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "imageId", {
      allowNull: true,
      type: Sequelize.STRING(2083),
    });
    await queryInterface.changeColumn("Applicants", "imageId", {
      allowNull: true,
      type: Sequelize.STRING(2083),
    });
    await queryInterface.renameColumn("Users", "imageId", "imageUrl");
    await queryInterface.renameColumn("Applicants", "imageId", "imageUrl");
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
