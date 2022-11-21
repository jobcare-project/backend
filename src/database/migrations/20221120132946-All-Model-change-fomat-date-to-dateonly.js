"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Jobs", "createdAt", {
      allowNull: false,
      type: Sequelize.DATEONLY,
    });
    await queryInterface.changeColumn("Jobs", "updatedAt", {
      allowNull: false,
      type: Sequelize.DATEONLY,
    });

    await queryInterface.changeColumn("Applicants", "createdAt", {
      allowNull: false,
      type: Sequelize.DATEONLY,
    });
    await queryInterface.changeColumn("Applicants", "updatedAt", {
      allowNull: false,
      type: Sequelize.DATEONLY,
    });

    await queryInterface.changeColumn("Assesses", "createdAt", {
      allowNull: false,
      type: Sequelize.DATEONLY,
    });
    await queryInterface.changeColumn("Assesses", "updatedAt", {
      allowNull: false,
      type: Sequelize.DATEONLY,
    });

    await queryInterface.changeColumn("RegisteredTrials", "createdAt", {
      allowNull: false,
      type: Sequelize.DATEONLY,
    });
    await queryInterface.changeColumn("RegisteredTrials", "updatedAt", {
      allowNull: false,
      type: Sequelize.DATEONLY,
    });

    await queryInterface.changeColumn("Users", "createdAt", {
      allowNull: false,
      type: Sequelize.DATEONLY,
    });
    await queryInterface.changeColumn("Users", "updatedAt", {
      allowNull: false,
      type: Sequelize.DATEONLY,
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
