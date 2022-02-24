'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('oauth', {
      no: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      iat: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      exp: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updatedAt: {
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: 'TIMESTAMP'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oauth');
  }
};



















