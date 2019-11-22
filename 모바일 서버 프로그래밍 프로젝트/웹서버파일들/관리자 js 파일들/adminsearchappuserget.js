const fs = require('fs');
const express = require('express');
const jade = require('jade');
const router = express.Router();
const mysql = require('mysql');
const adress = require('./server').adress;

const client = mysql.createConnection({
    host:'localhost',
    user:'8team',
    password:'gachon654321',
    database:'8team'
});

router.use(express.static('bootstrap-4.3.1'));
router.get('/',(req,res)=>{
    if(req.session.count){
        client.query('SELECT * FROM USER',(error, results)=>{
            if(error){
                res.send('<h1>' + 'Database ERROR!!!'+'</h1>');
            }else{
                fs.readFile('adminsearchappuser.jade','utf8',(error, data)=>{
                    if(error){
                        res.send('<h1>'+'ERROR!!!'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({
                            ip:adress,
                            data:results   
                        }));
                    }
                });
            }
        })
    }else{
        res.send('<h1>'+'페이지 요청 없음'+'</h1>');
    }
});

module.exports = router