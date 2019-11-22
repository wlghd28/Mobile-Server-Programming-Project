const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const mysql = require('mysql');
const moment = require('moment');
const Login = require('./userloginpost');

const client = mysql.createConnection({
    host: 'localhost',
    user: '8team',
    password:'gachon654321',
    database: '8team'
});
router.use(bodyparser.urlencoded({extended:false}));

router.post('/', (req,res)=>{
    console.log(req.body);
    console.log(Login.UserID);
    client.query('INSERT INTO REVIEW(UserID, Date, Menu, reviewText, score) VALUES(?, ?, ?, ?, ?)',
    [Login.UserID, moment().format('YYYY-MM-DD'), req.body.menunum, req.body.reviewText,req.body.score],(error)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Insertion into DB was completed!!');
            res.send('OK');
        }
    })
    
});

module.exports = router