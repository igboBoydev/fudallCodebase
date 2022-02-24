const db = require('../database/mysqlDb');
const objectives = require('../Objects/objectives');
const bcrypt =  require('bcryptjs');
const Joi = require('joi');
var uuid = require('node-uuid');
const moment = require('moment');
const { Op } = require('sequelize');
const axios = require('axios');
require('dotenv').config();

module.exports = {
    getUser: async (req, res, next) => {
        let user = await db.User.findOne({ where: { customer_id: req.user.customer_id } });
        let cards;
        let totalExpense = [];
        let totalIncome = [];

        if (user.card_reference != null) {
            cards = await db.Card.findOne({ where: { reference: user.card_reference } });
        }

        let transactions = await db.Transaction.findAll({ where: { user_id: user.id } });

        

        if (transactions) {

            for (trans of transactions) {
                if (trans.type == 'credit') {
                    totalIncome.push(trans.amount)
                }

                if (trans.type == 'debit') {
                    totalExpense.push(trans.amount)
                }
            }

            const income = totalIncome?.reduce((total, money) => {
                total += parseInt(money)
                return total;
            }, 0);

            const expense = totalExpense?.reduce((total, money) => {
                total += parseInt(money)
                return total;
            }, 0);

            return res.status(200).json({
                success: true,
                User: user,
                transactions,
                cardData: cards,
                TotalIcome: income,
                totalExpense: expense
            })
        }

        return res.status(200).json({
            success: true,
            transactions: [],
            User: user,
            cardData: cards,
        });

    },

    allCards: async (req, res, next) => {
        let cards = await db.Card.findAll();

        return res.status(200).json({
            cards
        })
    },

    allTransactions: async (req, res, next) => {
        let user_id = req.user.id;

        let transaction = await db.Transaction.findAll({ where: { user_id: user_id } });

        let startDate = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')
        let endDate = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');

        let data = await db.Transaction.findAll({
            where: {
                user_id: user_id,
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        let income = [];
        let totalIncome = [];
        let totalExpense = [];
        let expenditure = [];

        if (transaction) {

            for (trans of transaction) {
                if (trans.type == 'credit') {
                    totalIncome.push(trans.amount)
                }

                if (trans.type == 'debit') {
                    totalExpense.push(trans.amount)
                }
            }

            if (data) {

                for (dat of data) {
                    if (dat.type == 'credit') {
                        income.push(dat.amount)
                    }

                    if (dat.type == 'debit') {
                        expenditure.push(dat.amount);
                    }

                }


                const totalIncome = income?.reduce((total, money) => {
                    total += parseInt(money)
                    return total;
                }, 0);

                const expense = expenditure?.reduce((total, money) => {
                    total += parseInt(money)
                    return total;
                }, 0);


                return res.status(200).json({
                    transaction,
                    overalIncome: totalIncome,
                    overallExpense: totalExpense,
                    totalMonthlyIncome: totalIncome,
                    totalMonthlyExpense: expense
                })
            }

    

            return res.status(200).json({
                transaction,
            });
        }

        return res.status(400).json(objectives.Error('No transactions recorded yet'))

    },


    chooseCards: async (req, res, next) => {
        const schema = Joi.object().keys({
            reference: Joi.string().required(),
        }).unknown();
  
        const validate = schema.validate(req.body)

        if (validate.error != null) {
            const errorMessage = validate.error.details.map(i => i.message).join('.');
            return res.status(400).json(
                objectives.Error(errorMessage)
            );
        }

        let user = await db.User.findOne({ where: { customer_id: req.user.customer_id } });
        let card = await db.Card.findOne({ where: { reference: req.body.reference } });

        if (card) {

            user.card_reference = req.body.reference;
            user.card_requested = 1;
            await user.save();

            return res.status(200).json(objectives.Success('Card request successful welcome to tomorrow'));
        }

        return res.status(200).json(objectives.Success('Card does not exist'));
    }
}