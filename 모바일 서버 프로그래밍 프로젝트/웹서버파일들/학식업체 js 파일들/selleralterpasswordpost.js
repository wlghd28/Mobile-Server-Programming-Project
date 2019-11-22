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
    client.query('SELECT * FROM Seller WHERE SellerID = ?',[req.body.sellerid],(error, results)=>{
        if(error){
            res.send('<h1>'+'ERROR!!!'+'</h1>');
        }else{
            //console.log(results[0].SellerID);
            if(results[0]==null){
                fs.readFile('results.jade','utf8',(error, data)=>{
                    if(error){
                        res.send('<h1>'+'ERROR!!!'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({
                            title:'비밀번호 변경 실패',
                            description:'비밀번호 변경에 실패하셨습니다!',
                            ip:adress,
                            path:'postresetPW/'
                        }));
                    }
                });
            }else if(results[0].SellerID==req.body.sellerid && results[0].PW==req.body.sellerpassword&&
                req.body.sellerchangepassword == req.body.sellerconfirmchangepassword){
                client.query('UPDATE Seller SET PW = ? WHERE SellerID = ?',[req.body.sellerchangepassword,req.body.sellerid],(error)=>{
                    if(error){
                        console.log('error!!');
                        res.send('<h1>'+'Database ERROR!!!'+'</h1>');
                    }else{
                        console.log('Update DB was completed!!');
                        fs.readFile('results.jade','utf8',(error, data)=>{
                            if(error){
                                res.send('<h1>'+'ERROR!!!'+'</h1>');
                            }else{
                                const fn = jade.compile(data);
                                res.send(fn({
                                    title:'비밀번호변경 성공',
                                    description:'비밀번호 변경에 성공하셨습니다!',
                                    ip:adress,
                                    path:'postresetPW/'
                                }));
                            }
                        });
                    }
                })
            }else{
                fs.readFile('results.jade','utf8',(error, data)=>{
                    if(error){
                        res.send('<h1>'+'ERROR!!!'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({
                            title:'비밀번호 변경 실패',
                            description:'비밀번호 변경에 실패하셨습니다!',
                            ip:adress,
                            path:'postresetPW/'
                        }));
                    }
                });
            }
        }

    });
})

module.exports = router;