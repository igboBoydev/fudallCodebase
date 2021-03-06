const db  = require('../database/mysqlDb');
const jwt = require('jsonwebtoken');
const bcrypt =  require('bcryptjs');
const objectives = require('../Objects/objectives');
const jwt_decode = require('jwt-decode');
const Joi = require('joi');
const moment = require('moment');
var uuid = require('node-uuid');
 
const signToken = (user, token) => {

  var token = jwt.sign({
    id: user.id,
    email: user.email.trim(),
    firstname: user.firstname,
    lastname: user.lastname,
    mobile: user.mobile,
    balance: parseFloat(user.wallet) + parseFloat(user.withdrawable),
    wallet: parseFloat(user.wallet),
    customer_id: user.customer_id,
  },
    process.env.SECRET,
    {
      expiresIn: 7200
    }
  );

  var decoded = jwt_decode(token);
  db.Oauth.create(decoded);
  return token;
};

module.exports = {
  
    Login: async (req, res, next) => {

        const loginSchema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
        }).unknown();

        const validate = loginSchema.validate(req.body)

        if (validate.error != null) {
            const errorMessage = validate.error.details.map(i => i.message).join('.');

            return res.status(400).json({
                status: 'ERROR',
                code: "01",
                message: errorMessage
            });
        }
  
        var user = await db.User.findOne({ where: { email: req.body.email } });

        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                // if(user.activated == 1)
                // {
                if (user.locked == 1) {
                    return res.status(400).json({
                        status: 'ERROR',
                        code: "01",
                        message: 'Your account has been locked. Kindly contact support!'
                    });
                }


                // //user.last_login
                // await objectives.logUser(user.id, objectives.parseAction(user, 'logged in'), req.body);

                user.last_login = moment().format('YYYY-MM-DD hh:mm:ss');
                await user.save();

                var random = uuid();

                //var amount = 5000;
                //await helpers.promoBonus(user, amount);
                // await helpers.welcomeBonus(user, amount);

                const token = signToken(user, random);
                return res.status(200).json({
                    success: {
                        token: token,
                    }
                });
            }
            else {
                return res.status(400).json({
                    status: 'ERROR',
                    code: "01",
                    message: 'Incorrect Password!'
                });
            }

        }
        else {
            return res.status(400).json({
                status: 'ERROR',
                code: "01",
                message: 'Account does not exist'
            });
        }

    }

}