const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const moment = require('moment');

const client = mysql.createConnection({
    host:'localhost',
    user:'8team',
    password:'gachon654321',
    database:'8team'
});
var MenuNumber = new Array();
var Menu = new Array();
var Origin = new Array();
var Price = new Array();


router.get('/', (req,res)=>{
    console.log('userget excute...');
    client.query('SELECT * FROM REVIEW where menu = ?', [inputdata.menu], (error,results)=>{
        if(error){
            res.send('<h1>'+'Database ERROR!!!'+'</h1>');
        }else{
            if(results[0]==null){
                res.send(null);
            }else{
                let menu = [
                    {
                        Review_num:result[0].Review_num,
                        UserID:result[0].UserID,
                        Date:result[0].Date,
                        Menu:results[0].Menu,
                        reviewText:results[0].reviewText,
                        score:results[0].score
                    }
                    
                ]
                res.json(menu);
            }
        }
    });   
});

module.exports = router;