var Sequelize = require('sequelize');

var Referrals = (sequelize, type) => {
  return sequelize.define('referrals', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: Sequelize.STRING,
    refered: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
    has_bonus: Sequelize.INTEGER,
    count: Sequelize.INTEGER,
    amount: Sequelize.FLOAT,
    code: Sequelize.STRING,
    type: Sequelize.STRING,
  })
}

module.exports = Referrals;