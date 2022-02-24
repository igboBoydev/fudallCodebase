var Sequelize = require('sequelize');

var Cards = (sequelize, type) => {
    return sequelize.define('cards', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        holderName: Sequelize.STRING,
        providerName: Sequelize.STRING,
        from: Sequelize.STRING,
        toDate: Sequelize.STRING,
        desc: Sequelize.STRING,
        reference: Sequelize.STRING,
        type: Sequelize.STRING,
        mode: Sequelize.STRING
    });
}

module.exports = Cards;