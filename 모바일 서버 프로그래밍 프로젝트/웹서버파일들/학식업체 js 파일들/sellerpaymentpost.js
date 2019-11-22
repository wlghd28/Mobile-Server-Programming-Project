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


router.post('/', (req,res)=>{
    if(req.body.ordernumber == null){
        fs.readFile('paymentresults.jade','utf8',(error, data)=>{
            if(error){
                res.send('<h1>'+'ERROR!!!'+'</h1>');
            }else{
                const fn = jade.compile(data);
                res.send(fn({
                    ip:adress,
                    title:'결제인증 실패',
                    description:'메뉴를 선택해주세요!!',
                    path:'ordernum/'
                }));
            }
        });
    }else{
        console.log(typeof(req.body.ordernumber));
        console.log(req.body.ordernumber);
        if(typeof(req.body.ordernumber)=="string"){
            client.query('UPDATE ORDER_LIST SET Order_State=1 WHERE Order_Num=?',[req.body.ordernumber],(error)=>{
                if(error){
                    res.send('<h1>'+'Database ERROR!!!'+'</h1>');
                }else{
                    console.log('Uqdate set Database was Completed!!');
                }
            });
        }else{
            for(var i=0;i<req.body.ordernumber.length;i++){
        
                client.query('UPDATE ORDER_LIST SET Order_State=1 WHERE Order_Num=?',[req.body.ordernumber[i]],(error)=>{
                    if(error){
                        res.send('<h1>'+'Database ERROR!!!'+'</h1>');
                    }else{
                        console.log('Uqdate set Database was Completed!!');
                    }
                });
            }

        } 
        fs.readFile('paymentresults.jade','utf8',(error, data)=>{
            if(error){
                res.send('<h1>'+'ERROR!!!'+'</h1>');
            }else{
                const fn = jade.compile(data);
                res.send(fn({
                    ip:adress,
                    title:'결제인증 성공',
                    description:'결제인증에 성공하셨습니다.',
                    path:'ordernum/'
                }));
            }
        });
        
    }
});

module.exports = router;
