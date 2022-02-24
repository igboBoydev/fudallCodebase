var Sequelize = require('sequelize');

var User = (sequelize, type) => {
  return sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    uuid: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    wallet: Sequelize.DOUBLE,
    bonus: Sequelize.DOUBLE,
    // bonus_withdrawable: Sequelize.DOUBLE,
    withdrawable: Sequelize.DOUBLE,
    customer_id: Sequelize.INTEGER,
    // client_id: Sequelize.STRING,
    password: Sequelize.STRING,
    pin: Sequelize.STRING,
    gender: Sequelize.STRING,
    email: Sequelize.STRING,
    mobile: Sequelize.STRING,
    bvn: Sequelize.STRING,
    dob: Sequelize.STRING,
    otp: Sequelize.STRING,
    // activated: Sequelize.INTEGER,
    // bank_status: Sequelize.INTEGER,
    locked: Sequelize.INTEGER,
    profile_status: Sequelize.INTEGER,
    kyc_status: Sequelize.INTEGER,
    id_type: Sequelize.STRING,
    id_number: Sequelize.STRING,
    id_url: Sequelize.STRING,
    reference_id: Sequelize.STRING,
    card_requested: Sequelize.INTEGER,
    card_delivered: Sequelize.INTEGER,
    last_login: Sequelize.STRING,
    card_reference: Sequelize.STRING,
    referral_id: Sequelize.STRING,                                                                                                                                                                                                                        
  })
}

module.exports = User;