const fs = require('fs');
const express = require('express');
const jade = require('jade');
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
router.use(express.static('bootstrap-4.3.1'));
router.use(bodyparser.urlencoded({extended:false}));

router.get('/',(req,res)=>{
    if(req.session.count){
        fs.readFile('sellermain.jade','utf8',(error, data)=>{
            if(error){
                res.send('<h1>'+'ERROR!!!'+'</h1>');
            }else{
                const fn = jade.compile(data);
                res.send(fn({ip:adress}));
            }
        });
    }else{
        res.send('<h1>'+'페이지 요청 없음'+'</h1>');
    }
});

router.post('/', (req,res)=>{
    client.query('SELECT * FROM Seller WHERE SellerID = ?',[req.body.sellerid],(error, results)=>{
        if(error){
            res.send('<h1>'+'ERROR!!!'+'</h1>');
        }else{      
            if(results[0] == null){
                fs.readFile('results.jade','utf8',(error, data)=>{
                    if(error){
                        res.send('<h1>'+'ERROR!!!'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({
                            title:'로그인 실패',
                            description:'로그인에 실패하셨습니다.\n(ID 정보가 없습니다.)',
                            ip:adress,
                            path:'main/'
                        }));
                    }
                });
            }      
            else if(results[0].SellerID==req.body.sellerid && results[0].PW==req.body.sellerpassword){
                fs.readFile('sellermain.jade','utf8',(error, data)=>{
                    if(error){
                        res.send('<h1>'+'ERROR!!!'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({ip:adress}));
                    }
                });
                req.session.count = req.body.sellerid;
            }else{
                fs.readFile('results.jade','utf8',(error, data)=>{
                    if(error){
                        res.send('<h1>'+'ERROR!!!'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({
                            title:'로그인 실패',
                             description:'로그인에 실패하셨습니다.\n(비밀번호 입력 오류)',
                             ip:adress,
                             path:'main/'
                            }));
                    }
                });
            }
        }

    });
});

module.exports = router;