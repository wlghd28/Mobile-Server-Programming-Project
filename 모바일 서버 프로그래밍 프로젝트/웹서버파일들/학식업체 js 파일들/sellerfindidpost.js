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
    client.query('SELECT * FROM Seller WHERE Seller_Num = ?',[req.body.sellerbusinessnumber],(error,results)=>{
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
                            title:'ID찾기 실패',
                            description:'등록된 ID정보가 없습니다.',
                            ip:adress,
                            path:'findID/'
                        }));
                    }
                });
            }
            else if(results[0].Seller_Num==req.body.sellerbusinessnumber){
                fs.readFile('sellerfindidsuccess.jade','utf8',(error, data)=>{
                    if(error){
                        res.send('<h1>'+'1.ERROR!!!'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({
                            id:results[0].SellerID,
                            ip:adress,
                            path:'findID/'
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
                            title:'ID찾기 실패',
                            description:'ID찾기에 실패하셨습니다.!',
                            ip:adress,
                            path:'findID/'
                        }));
                    }
                });

            }
        }
    });  
});

module.exports = router