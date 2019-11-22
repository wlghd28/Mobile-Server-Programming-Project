const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const mysql = require('mysql');
const adress = require('./server').adress;

const client = mysql.createConnection({
    host: 'localhost',
    user: '8team',
    password: 'gachon654321',
    database: '8team'
});

router.use(bodyparser.urlencoded({ extended: false }));

router.post('/', (req, res) => {
    console.log(req.body);
    client.query('SELECT * FROM USER WHERE Name=? and User_Num=?',[req.body.user_name, req.body.user_num],(error,results)=>{
        if(error){
            console.log(error);
            res.send('2');
        }else{
            if(results[0]==null){
                res.send('2');
            }else{
                res.send(results[0].UserID);
            }
        }
    })
});
module.exports = router