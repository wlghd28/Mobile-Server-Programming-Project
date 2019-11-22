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

router.post('/', (req, res)=>{
    client.query('SELECT * FROM Seller WHERE SellerID = ?',[req.body.sellerid],(error,results)=>{
        if(error){
            res.send('<h1>'+'Database ERROR!!!'+'</h1>');
        }else{
            if(results[0]==null){
                fs.readFile('results.jade','utf8',(error, data)=>{
                    if(error){
                        res.send('<h1>'+'2.ERROR!!!'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({
                            title:'비밀번호 찾기 실패',
                            description:'등록된 ID정보가 없습니다.',
                            ip:adress,
                            path:'findPW/'
                        }));
                    }
                });
            }
            else if(results[0].Seller_Num==req.body.sellerbusinessnumber&&
                results[0].SellerID==req.body.sellerid){
                fs.readFile('sellerfindpasswordsuccess.jade','utf8',(error, data)=>{
                    if(error){
                        res.send('<h1>'+'1.ERROR!!!'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({
                            id:results[0].SellerID,
                            password:results[0].PW,
                            ip:adress,
                            path:'findPW/'
                        }));
                    }
                });
            }else{
                fs.readFile('results.jade','utf8',(error, data)=>{
                    if(error){
                        res.send('<h1>'+'2.ERROR!!!'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({
                            title:'비밀번호찾기 실패',
                            description:'비밀번호 찾기에 실패하셨습니다!',
                            ip:adress,
                            path:'findPW/'
                        }));
                    }
                });
            }
        }
    });  
});

module.exports = router