const express = require('express');
const router = express.Router();
const passport = require('passport')
require('../config/passport')
const signatureSigner = require('../middlewares/signature');

// import Data

var userFilters = require('../Controllers/UserFilters');

var jwtMiddleWare = passport.authenticate('jwt', { session: false });
const signatureSignerMiddleware = signatureSigner.signatureSignerMiddleware;

var dataParser;

if(process.env.APP != 'local')
{
    dataParser = require('../middleware/decodeJWT').decodeMiddleware;
}
else
{
    dataParser = (req, res, next) => {
        next()
    }
}
//login
router.get('/profile', [jwtMiddleWare, signatureSignerMiddleware], userFilters.getUser);

//get user details
router.get('/user-details', [jwtMiddleWare, signatureSignerMiddleware], userFilters.getUser);

//choose card
router.post('/choose-card', [jwtMiddleWare, signatureSignerMiddleware], userFilters.chooseCards);

//Get all user transaction details
router.get('/all-transactions', [jwtMiddleWare, signatureSignerMiddleware], userFilters.allTransactions);


module.exports = router;