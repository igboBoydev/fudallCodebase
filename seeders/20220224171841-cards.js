'use strict';
var uuid = require('node-uuid');
let moment = require('moment');
let currentMonth = new Date().getMonth() + 1;
let currentYear = new Date().getFullYear().toString().slice(2,4)
let newYear = new Date().getFullYear() + 4;
let calc = newYear.toString().slice(2,4);


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('cards', [
      {
        holderName: "",
        providerName: "Fundall ",
        from: `${currentMonth}/${currentYear}`,
        toDate: `${currentMonth}/${calc}`,
        desc: "Fundall Lifestyle Card",
        reference: uuid(),
        type: 'VISA',
        mode: "credit"
      },
      {
        holderName: "",
        providerName: "Fundall ",
        from: `${currentMonth}/${currentYear}`,
        toDate: `${currentMonth}/${calc}`,
        desc: "Rave Dollar Card",
        reference: uuid(),
        type: 'VERVE',
        mode: "credit"
      },
      {
        holderName: "",
        providerName: "Fundall ",
        from: `${currentMonth}/${currentYear}`,
        toDate: `${currentMonth}/${calc}`,
        desc: "Bitcoin Wallet Card",
        reference: uuid(),
        type: 'VERVE',
        mode: "credit"
      },
      {
        holderName: "",
        providerName: "Fundall ",
        from: `${currentMonth}/${currentYear}`,
        toDate: `${currentMonth}/${calc}`,
        desc: "Tourism Card",
        reference: uuid(),
        type: 'MASTERCARD',
        mode: "credit"
      },
      {
        holderName: "",
        providerName: "Fundall ",
        from: `${currentMonth}/${currentYear}`,
        toDate: `${currentMonth}/${calc}`,
        desc: "Insurance Card",
        reference: uuid(),
        type: 'VISA',
        mode: "credit"
      },
      {
        holderName: "",
        providerName: "Fundall ",
        from: `${currentMonth}/${currentYear}`,
        toDate: `${currentMonth}/${calc}`,
        desc: "School fees Card",
        reference: uuid(),
        type: 'VERVE',
        mode: "credit"
      },
      {
        holderName: "",
        providerName: "Fundall ",
        from: `${currentMonth}/${currentYear}`,
        toDate: `${currentMonth}/${calc}`,
        desc: "Honey Moon Card",
        reference: uuid(),
        type: 'MASTERCARD',
        mode: "credit"
      },
      
    ], {});

  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('cards', null, {});
  }
};



// 1. impliment user profile  --- deposite, transfer
// 2. 







