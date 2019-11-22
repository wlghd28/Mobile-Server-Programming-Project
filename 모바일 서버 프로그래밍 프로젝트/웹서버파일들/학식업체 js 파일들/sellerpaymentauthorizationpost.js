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
router.get('/:page', (req,res)=>{
    var page = req.params.page;
    //console.log(page);
    if(req.session.userid){
        client.query('SELECT * FROM ORDER_LIST WHERE UserID = ? AND Order_State = 0',[req.session.userid],(error,results2)=>{
            if(error){
                res.send('<h1>'+'Database ERROR!!!'+'</h1>');  
            }else{
                fs.readFile('sellerpayment.jade','utf8',(error, data)=>{
                    if(error){
                        res.send('<h1>'+'ERROR!!!'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({
                            ip:adress,
                            data:results2,
                            page:page,
                            page_num:10,
                            leng:Object.keys(results2).length
                        }));
                    }
                });   
            }
        });
    }else{
        res.send('<h1>'+'페이지 요청 없음'+'</h1>');
    }

});

router.post('/:page', (req,res)=>{
    var page = req.params.page;
    client.query('SELECT * FROM USER WHERE UserID=?',[req.body.userid],(error,results1)=>{
        if(error){
            res.send('<h1>'+'Database ERROR!!!'+'</h1>');
        }else{
            if(results1[0]==null){
                fs.readFile('paymentresults.jade','utf8',(error, data)=>{
                    if(error){
                        res.send('<h1>'+'ERROR!!!'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({
                            ip:adress,
                            title:'결제인증 실패',
                            description:'등록된 사용자 정보가 없습니다.',
                            //path:'1/'
                        }));
                    }
                });           
            }else if(results1[0].UserID == req.body.userid && results1[0].PW == req.body.userpassword){
                req.session.userid = req.body.userid;
                client.query('SELECT * FROM ORDER_LIST WHERE UserID = ? AND Order_State = 0',[req.body.userid],(error,results2)=>{
                    if(error){
                        res.send('<h1>'+'Database ERROR!!!'+'</h1>');  
                    }else{
                        fs.readFile('sellerpayment.jade','utf8',(error, data)=>{
                            if(error){
                                res.send('<h1>'+'ERROR!!!'+'</h1>');
                            }else{
                                const fn = jade.compile(data);
                                res.send(fn({
                                    ip:adress,
                                    data:results2,
                                    page:page,
                                    page_num:10,
                                    leng:Object.keys(results2).length,
                                    //path:'1/'
                                }));
                            }
                        });   
                    }
                });             
            }else{
                fs.readFile('paymentresults.jade','utf8',(error, data)=>{
                    if(error){
                        res.send('<h1>'+'ERROR!!!'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({
                            ip:adress,
                            title:'결제인증 실패',
                            description:'사용자 인증에 실패하셨습니다.',
                            //path:'1/'
                        }));
                    }
                });   
            }
        }       
    });
});

module.exports = router;
