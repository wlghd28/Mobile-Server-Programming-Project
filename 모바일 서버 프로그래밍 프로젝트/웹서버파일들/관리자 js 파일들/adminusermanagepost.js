const fs = require('fs');
const express = require('express');
const jade = require('jade');
const router = express.Router();
const bodyparser = require('body-parser');
const mysql = require('mysql');
const adress = require('./server').adress;

const client = mysql.createConnection({
    host: 'localhost',
    user: '8team',
    password:'gachon654321',
    database: '8team'
});
router.use(express.static('bootstrap-4.3.1'));
router.use(bodyparser.urlencoded({extended:false}));

router.post('/', (req,res)=>{
    client.query(
        'UPDATE Seller SET Approve_State = 1 WHERE SellerID=?', [req.body.Seller],
        (error)=>{
            if(error){
                res.send('<h1>'+'Database ERROR!!!'+'</h1>');
            }else{
                console.log('Insertion into DB was completed!');
            }
        }
    );    
});

module.exports = router