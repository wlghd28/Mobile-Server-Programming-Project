const fs = require('fs');
const express = require('express');
const jade = require('jade');
const router = express.Router();
const bodyparser = require('body-parser');
const mysql = require('mysql');
const methodOverride = require('method-override');
const adress = require('./server').adress;

const client = mysql.createConnection({
    host:'localhost',
    user:'8team',
    password:'gachon654321',
    database:'8team'
});
router.use(methodOverride('_method'));
router.use(express.static('bootstrap-4.3.1'));
router.use(bodyparser.urlencoded({extended:false}));
router.delete('/', (req,res)=>{
    client.query('SELECT * FROM Seller WHERE SellerID = ?',[req.body.sellerid], (error, results)=>{
        if(error){
            res.send('<h1>'+'ERROR!!!'+'</h1>');
        }else{
            if(results[0]==null){
                fs.readFile('results.jade','utf8',(error, data)=>{
                    if(error){
                        res.send('<h1>'+'ERROR!!!'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({
                            ip:adress,
                            title:'회원탈퇴 실패',
                            description:'입력정보를 다시확인해주세요.',
                            path:'secession/'
                        }));
                    }
                });
            }else if(results[0].SellerID==req.body.sellerid&&
                results[0].PW==req.body.sellerpassword&&
                results[0].Seller_Num==req.body.sellerbusinessnumber){
                    client.query('DELETE FROM Seller WHERE SellerID = ?',[results[0].SellerID],(error)=>{
                        if(error){
                            console.log('error!!!');
                            res.send('<h1>'+'Database ERROR!!!'+'</h1>');
                        }else{
                            console.log('Delete from DB was completed!');
                            fs.readFile('results.jade','utf8',(error, data)=>{
                                if(error){
                                    res.send('<h1>'+'ERROR!!!'+'</h1>');
                                }else{
                                    const fn = jade.compile(data);
                                    res.send(fn({
                                        title:'회원탙퇴 성공',
                                        description:'회원탈퇴에 성공하셨습니다!.',
                                        ip:adress,
                                        path:'secession/'
                                    }));
                                }
                            });
                        }
                    });
            }else{
                fs.readFile('results.jade','utf8',(error, data)=>{
                    if(error){
                        res.send('<h1>'+'ERROR!!!'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({
                            ip:adress,
                            title:'회원탈퇴 실패',
                            description:'입력정보를 다시확인해주세요.',
                            path:'secession/'
                        }));
                    }
                });
            }
        }

    });
});

module.exports = router;