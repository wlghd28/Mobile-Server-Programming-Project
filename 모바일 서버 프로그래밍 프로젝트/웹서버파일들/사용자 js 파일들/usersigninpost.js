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
    console.log('Android에서 회원가입 요청 보냄');
    console.log(req.body);
    client.query('SELECT * FROM USER WHERE UserID = ?', [req.body.user_id], (error, results) => {
        if(error){
            console.log(error);
            res.send('2');
        }else{
            if(results[0]==null){
                client.query('INSERT INTO USER(UserID, PW, Name, User_Num, User_State) values(?,?,?,?,?)',
                [req.body.user_id, req.body.user_pw, req.body.user_name, req.body.user_num, 0],(error)=>{
                    if(error){
                        console.log(error);
                        res.send('2');    
                    }else{
                        res.send('1');
                        console.log('Insertion into DB was Completed!!');
                    }
                });
            }else{
                res.send('2');
            }
        }
    });
});
module.exports = router;