var Sequelize = require('sequelize');

var PasswordReset = (sequelize, type) => {
  return sequelize.define('password_reset', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: Sequelize.INTEGER,
    token: Sequelize.STRING,
    used: Sequelize.INTEGER,
    expiry_date: Sequelize.STRING,
  })
}

module.exports = PasswordReset;