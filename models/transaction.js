var Sequelize = require('sequelize');

var Transaction = (sequelize, type) => {
  return sequelize.define('transactions', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: Sequelize.INTEGER,
    amount: Sequelize.FLOAT,
    balance: Sequelize.FLOAT,
    reference: Sequelize.STRING,
    type: Sequelize.STRING,
    method: Sequelize.STRING,
    status: Sequelize.STRING,
    description: Sequelize.STRING,
    category: Sequelize.STRING,
  })
}

module.exports = Transaction;