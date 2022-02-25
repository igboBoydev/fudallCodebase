const request = require('request');
const db  = require('../database/mysqlDb');
const axios = require('axios');
const JSEncrypt = require('node-jsencrypt');
require('dotenv').config();

const Error = message => {
    var error = {
        "error": {
            "status": "ERROR",
            "message": message
        }
    }

    return error;
}

const Success = message => {
    var success = {
        "success": {
            "status": "SUCCESS",
            "message": message
        }
    }

    return success;
}

const Sms = async function (mobile, message){

    var sender = "N-Alert"; // or Lotgrand
    var live_key = "TLRC23xSoBslkto91dEuOASTKbjMVb1IWIkw5WSpk4FDTPQaO4ccWfzU6rygFP";
    var url = "https://termii.com/sapp/sms/api";
    
    var data = {
        "to": mobile,
        "from":sender,
        "sms": message,
        "type":"plain",
        "api_key":live_key,
        "channel":"generic"
    };

    var options = {
        'method': 'POST',
        'url': 'https://termii.com/api/sms/send',
        'headers': {
            'Content-Type': ['application/json']
        },
        
        body: JSON.stringify(data)
    };
    request(options, function (error, response) { 
        if (error) throw new Error(error);
        //console.log(response.body);
        return response.body;
    });
}

const checkUserPhone = async function checkUserMobile(req, res) {
    return await db.User.findOne({ 
        where: {
        mobile: req.body.mobile }
    });
}

const checkUserEmail = async function createUserMail(req) {
    return await db.User.findOne({ 
        where: {
        email: req.body.email }
    });
}

const checkUserToken = async function checkToken(token) {
    return await db.Oauth.findOne({ 
        where: {
        token: token }
    });
}

const checkUserTransaction = async function checkTransaction(reference) {
    return await db.Transaction.findOne({ 
        where: {
        reference: reference }
    });
}


const generateOTP = async function generateOTP()
{
    return Math.floor(100000 + Math.random() * 900000);
    //return seq = (Math.floor(Math.random() * 1000000) + 1000000).toString().substring(1);
}

const timestamp = async  => {
    return Date.now()/1000 | 0;
}

const logActivity = async (user, msg) => {
    await db.AuditLog.create({  
        user_id: user.id,
        description: msg,
        type: "user"
    });
}

const authCheck = async function generateOTP(req) {
    if(req.user)
    {
        return true;
    }

    return false;
}

function generateString(length)
{
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   var charactersLength = characters.length;

   for ( var i = 0; i < length; i++ ) 
   {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

const generateCustomerId = async function generateCustomerId()
{
    //77 100 000
    var user = await db.User.findOne({ 
        order: [['id', "DESC"]],
        //limit: 1
    });

    var customerId = Number(user.customer_id) + 1;
    return customerId;
}

function generateClientId(length)
{
   var result           = '';
   var characters       = '123456789123456789123456789';
   var charactersLength = characters.length;

   for ( var i = 0; i < length; i++ ) 
   {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }

   return result;
}

function getDay(n)
{
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    if (n == 0) {
        return 'sunday'
    } else {
        return days[n - 1];
    }
}
    

function xmlParser(paymentLogId, status, message)
{
    let obj = {
        'PaymentNotificationResponse': {
          'Payments': {
            'Payment': {
              'PaymentLogId': paymentLogId,
              'Status': status,
              'StatusMessage':message
            }
          }
        }
    };

    const xml2js = require('xml2js');
    var builder = new xml2js.Builder({renderOpts: { 'pretty': true, 'indent': ' ', 'newline': '\n', allowEmpty: true }});
    var xml = builder.buildObject(obj);
    return xml;
}

function nameCheck(names, bankname)
{
    var num = 0;

    for (const element of bankname) 
    {
        //var value = element.replace(/\s/g, '');
        var value = element.trim();
        value = value.replace(",", '');
        
        if(names.includes(value)) {
            num = num + 1;
        }
    }

    return num;
}

function jsEncrypt(data, key)
{
    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(key);
    var encrypted = jsEncrypt.encrypt(data);
    return encrypted;
}



module.exports = {
    authCheck,
    Error, 
    Sms, 
    Success,
    checkUserEmail,
    checkUserPhone, 
    checkUserToken, 
    generateOTP,
    checkUserTransaction,
    timestamp,
    generateString,
    generateClientId,
    xmlParser,
    nameCheck,
    jsEncrypt,
    getDay
};