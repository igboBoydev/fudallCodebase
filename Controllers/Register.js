const db = require('../database/mysqlDb');
const objectives = require('../Objects/objectives');
const bcrypt = require('bcryptjs');
var uuid = require('node-uuid');
const jwt_decode = require('jwt-decode');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const signToken = (user, token) => {

  var token = jwt.sign({
    id: user.id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    mobile: user.mobile,
    balance: parseFloat(user.wallet) + parseFloat(user.withdrawable),
    wallet: parseFloat(user.wallet),
  },
    process.env.SECRET,
    {
      expiresIn: 1800
    }
  );

  var decoded = jwt_decode(token);

  db.Oauth.create(decoded);
  return token;

};

module.exports = {

    Register: async (req, res, next) => {

        const schema = Joi.object().keys({
            email: Joi.string().min(5).required(),
            mobile: Joi.string().min(3).required(),
            firstname: Joi.string().required(),
            referralCode: Joi.string().allow(''),
            lastname: Joi.string().required(),
            password: Joi.string().required()
        }).unknown();
  
        const validate = schema.validate(req.body)

        if (validate.error != null) {
            const errorMessage = validate.error.details.map(i => i.message).join('.');
            return res.status(400).json(
                objectives.Error(errorMessage)
            );
        }

        var checkEmail = await objectives.checkUserEmail(req);
        var checkPhone = await objectives.checkUserPhone(req)

        if (checkEmail) {
            return res.status(400).json(
                objectives.Error("Email already in use!")
            );
        }

        var checkPhone = await objectives.checkUserPhone(req);

        if (checkPhone) {
            return res.status(400).json(objectives.Error("Phone number has already been used!"));
        }

        var code = await objectives.generateOTP();
        var customer_id = await objectives.generateCustomerId();

        const createUser = await db.User.create({
            mobile: req.body.mobile,
            email: req.body.email.toLowerCase().trim(),
            password: bcrypt.hashSync(req.body.password),
            uuid: uuid(),
            otp: code,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            customer_id: customer_id,
            referral_id: req.body.referralCode
        });

        if (createUser) {
            var rand = uuid();

            if (req.body.referralCode) {
                //console.log(1)

                var referralCode = req.body.referralCode.toLowerCase();

                if (referralCode.includes('prov')) {
                    //console.log(2)
                    await objectives.referralCampaign(createUser, referralCode);
                }
                else {
        
                    var referral = await db.User.findOne({ where: { customer_id: referralCode } });

                    if (referral) {

                        var allowed = ['bzingers', 'thisistolu', 'dayworldwide', 'theigbowolf', 'qvwenprho', 'ariellajohnson', 'reddishwine3', 'notjustsalmanpr', 'unclemohamz', 'firstbetawoof', 'davidzeelux', 'zingerlucky'];
                        // try
                        // {
             
                        await db.Referral.create({
                            user_id: referral.id,
                            referred: createUser.id,
                            status: 0,
                            has_bonus: 1,
                            count: 0,
                            amount: 0,
                            code: referralCode,
                            type: allowed.includes(referralCode) ? 'promo' : 'referral'
                        });
                    }
                }

            }

            return res.status(200).json({
                success: {
                    status: "SUCCESS",
                    //message: "Account created successfully. Kindly check your email for OTP to activate your account!",
                    message: "Account created successfully.",
                }
            });
        }
        else {
            res.status(400).json(
                objectives.Error("Error ocurred!")
            )
        }
    },


}