const fs = require('fs');
const express = require('express');
const jade = require('jade');
const router = express.Router();
const bodyparser = require('body-parser');
const mysql = require('mysql');
const adress = require('./server').adress;

const client = mysql.createConnection({
    host: 'localhost',
    user: '8team',
    password:'gachon654321',
    database: '8team'
});
router.use(express.static('bootstrap-4.3.1'));
router.use(bodyparser.urlencoded({extended:false}));

router.post('/', (req,res)=>{
    client.query('SELECT * FROM Seller WHERE SellerID = ?',[req.body.sellerid],(error, results)=>{
        if(error){
            res.send('<h1>'+'ERROR!!!'+'</h1>');
        }else{
            if(results[0] == null && req.body.sellerpassword==req.body.sellerconfirmpassword){
                client.query('INSERT INTO Seller (SellerID, PW, Seller_Num, Approve_State, Secession_State) VALUES(?,?,?,?,?)',
                [req.body.sellerid,req.body.sellerpassword,req.body.sellerbusinessnumber,0,0],(error)=>{
                    if(error){
                        console.log('error!!!');
                        res.send('<h1>'+'Database ERROR!!!'+'</h1>');
                    }else{
                        console.log('Insertion into DB was completed!');
                        fs.readFile('results.jade','utf8',(error, data)=>{
                            if(error){
                                res.send('<h1>'+'ERROR!!!'+'</h1>');
                            }else{
                                const fn = jade.compile(data);
                                res.send(fn({
                                    title:'회원가입 성공',
                                    description:'회원가입에 성공하셨습니다.!',
                                    ip:adress,
                                    path:'registeSeller/'
                                }));
                            }
                        });   
                        
                    }
                });
            }else{
                if(results[0] != null)
                {
                    fs.readFile('results.jade','utf8',(error, data)=>{
                        if(error){
                            res.send('<h1>'+'ERROR!!!'+'</h1>');
                        }else{
                            const fn = jade.compile(data);
                            res.send(fn({
                                title:'회원가입 실패',
                                description:'회원가입 실패!!\n중복된ID가 존재합니다.',
                                ip:adress,
                                path:'registeSeller/'
                            }));
                        }
                    });    
                }else{
                    fs.readFile('results.jade','utf8',(error, data)=>{
                        if(error){
                            res.send('<h1>'+'ERROR!!!'+'</h1>');
                        }else{
                            const fn = jade.compile(data);
                            res.send(fn({
                                title:'회원가입 실패',
                                description:'회원가입 실패\n입력정보 오류!',
                                ip:adress,
                                path:'registeSeller/'
                                }));
                        }
                    });    
                }
            }
        }
    });
});

module.exports = router