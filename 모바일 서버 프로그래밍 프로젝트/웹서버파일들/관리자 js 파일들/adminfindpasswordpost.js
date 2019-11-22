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
    client.query('SELECT * FROM Admin WHERE AdminID = ?',[req.body.AdminID],(error,results)=>{
        if(error){
            res.send('<h1>'+'Database ERROR1'+'</h1>');
        }else{
            if(results[0]==null){
                fs.readFile('adminresults.jade','utf8',(error, data)=>{
                    if(error){
                        res.send('<h1>'+'2.ERROR'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({title:'비밀번호 찾기 실패',description:'등록된 ID정보가 없습니다.',ip:adress}));
                    }
                });
            }
            else if(results[0].AdminID==req.body.AdminID){
                fs.readFile('adminfindpasswordsuccess.jade','utf8',(error, data)=>{
                    if(error){
                        res.send('<h1>'+'1.ERROR'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({id:results[0].AdminID, Key:results[0].Key, ip:adress}));
                    }
                });
            }else{
                fs.readFile('adminresults.jade','utf8',(error, data)=>{
                    if(error){
                        res.send('<h1>'+'2.ERROR'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({title:'비밀번호찾기 실패',description:'비밀번호 찾기에 실패하셨습니다!',ip:adress}));
                    }
                });
            }
        }
    });   
});

module.exports = router