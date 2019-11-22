const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const mysql = require('mysql');
const adress = require('./server').adress;

const client = mysql.createConnection({
    host:'localhost',
    user:'8team',
    password:'gachon654321',
    database:'8team'
});

router.use(bodyparser.urlencoded({extended:false}));

router.put('/', (req,res)=>{
    console.log('Android에서 비밀번호 요청 보냄');
    client.query('UPDATE USER SET PW=? WHERE UserID=?',[req.body.user_newpw, req.body.user_id],(error)=>{
        if(error){
            console.log(error);
            res.send('null');
        }else{
            res.send('1');
        }
    })

});
module.exports = router;