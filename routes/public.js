const express = require('express');
const router = express.Router();
const passport = require('passport')
require('../config/passport')
//const decodeJWT = require('../middleware/decodeJWT');
const signaturesMiddlware = require('../middlewares/signature');
require('dotenv').config();

//Middleware
//const dataParser = decodeJWT.decodeMiddleware;
const signatureSignerMiddleware = signaturesMiddlware.signatureSignerMiddleware


var dataParser;

if(process.env.APP != 'local')
{
    dataParser = require('../middlewares/JWTdecoder').decodeMiddleware;
}
else
{
    dataParser = (req, res, next) => {
        next()
    }
}


//import controller
var RegisterCtrl = require('../controllers/Register');
var LoginCtrl = require('../controllers/Login');
var userData = require('../Controllers/UserFilters');
// //var WebHook = require('../controllers/WebHook');
// var Encoder = require('../controllers/EncoderCtrl');
// var HomeCtrl = require('../controllers/HomeCtrl');

//Routes
router.post('/login', [signatureSignerMiddleware, dataParser], LoginCtrl.Login);
router.post('/register', [signatureSignerMiddleware, dataParser], RegisterCtrl.Register);

//all cards
router.get('/all-cards', [signatureSignerMiddleware, dataParser], userData.allCards);


module.exports = router;