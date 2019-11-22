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
    client.query('SELECT * FROM Admin WHERE AdminID = ?',[req.body.AdminID],(error, results)=>{
        if(error){
            res.send('<h1>'+'ERROR1!'+'</h1>');
        }else{
            console.log(results[0].AdminID);
            if(results[0].AdminID==req.body.AdminID && results[0].PW==req.body.adminpassword&&
                req.body.adminchangepassword == req.body.adminconfirmchangepassword){
                client.query('UPDATE Admin SET PW = ?, Key = ? WHERE AdminID = ?',[req.body.adminchangepassword, req.body.Key, req.body.AdminID],(error)=>{
                    if(error){
                        console.log('error2');
                        res.send('<h1>'+'Database ERROR3!'+'</h1>');
                    }else{
                        console.log('Update DB was completed4!');
                        fs.readFile('adminresults.jade','utf8',(error, data)=>{
                            if(error){
                                res.send('<h1>'+'ERROR5!'+'</h1>');
                            }else{
                                const fn = jade.compile(data);
                                res.send(fn({title:'비밀번호변경 성공',description:'비밀번호 변경에 성공하셨습니다!',ip:adress}));
                            }
                        });
                    }
                })
            }else{
                fs.readFile('adminresults.jade','utf8',(error, data)=>{
                    if(error){
                        res.send('<h1>'+'ERROR6!'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({title:'비밀번호 변경 실패',description:'비밀번호 변경에 실패하셨습니다!',ip:adress}));
                    }
                });
            }
        }

    });
})

module.exports = router;