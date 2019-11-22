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
router.use(bodyparser.urlencoded({extended:false}));
router.use(express.static('bootstrap-4.3.1'));
router.post('/', (req,res)=>{
    client.query('SELECT * FROM Admin WHERE AdminID = ?',[req.body.AdminID],(error, results)=>{
        if(error){
            res.send('<h1>'+'ERROR1'+'</h1>');
        }else{
            if(results[0] == null && req.body.PW==req.body.PW2){
                client.query('INSERT INTO Admin VALUES (?,?,?)',
                [req.body.AdminID,req.body.PW,req.body.key],(error)=>{
                    if(error){
                        console.log('error2');
                        res.send('<h1>'+'Database ERROR3'+'</h1>');
                    }else{
                        console.log('Insertion into DB was completed!');
                        fs.readFile('adminresults.jade','utf8',(error, data)=>{
                            if(error){
                                res.send('<h1>'+'ERROR4'+'</h1>');
                            }else{
                                const fn = jade.compile(data);
                                res.send(fn({title:'관리자 등록 성공',description:'관리자 등록에 성공하셨습니다.!',ip:adress}));
                            }
                        });   
                        
                    } 
                });
            }else{
                if(results[0] != null)
                {
                    fs.readFile('adminresults.jade','utf8',(error, data)=>{
                        if(error){
                            res.send('<h1>'+'ERROR5'+'</h1>');
                        }else{
                            const fn = jade.compile(data);
                            res.send(fn({title:'관리자 둥록 실패',description:'관리자 등록 실패!!\n중복된ID가 존재합니다.',ip:adress}));
                        }
                    });    
                }else{
                    fs.readFile('adminresults.jade','utf8',(error, data)=>{
                        if(error){
                            res.send('<h1>'+'ERROR6'+'</h1>');
                        }else{
                            const fn = jade.compile(data);
                            res.send(fn({title:'관리자 둥록 실패',description:'관리자 둥록 실패\n입력정보 오류!', ip:adress}));
                        }
                    });    
                }
            }
        }
    });
});

module.exports = router