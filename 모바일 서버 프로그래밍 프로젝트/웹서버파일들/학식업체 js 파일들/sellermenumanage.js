const fs = require('fs');
const express = require('express');
const jade = require('jade');
const router = express.Router();
const mysql = require('mysql');
const moment = require('moment');
const adress = require('./server').adress;

const client = mysql.createConnection({
    host:'localhost',
    user:'8team',
    password:'gachon654321',
    database:'8team'
});

router.use(express.static('bootstrap-4.3.1'));
router.get('/', (req,res)=>{
    if(req.session.count){
        client.query('SELECT * FROM Menu_Info WHERE Menu_Date=?',[moment().format('YYYY-MM-DD')],(error,results)=>{
            if(error){

            }else{
                if(results[0]==null){
                    fs.readFile('menuresults.jade','utf8',(error, data)=>{
                        if(error){
                            res.send('<h1>'+'ERROR!!!'+'</h1>');
                        }else{
                            const fn = jade.compile(data);
                            res.send(fn({
                                ip:adress,
                                description:'등록된 정보가 없습니다.'
                            }));
                        }
                    });
                }else{
                    fs.readFile('sellermenumanage.jade','utf8',(error,data)=>{
                        if(error){
                            res.send('<h1>'+'ERROR!!!'+'</h1>');
                        }else{
                            const fn = jade.compile(data);
                            res.send(fn({
                                menuA:results[0].Flame_Menu,
                                menuB:results[0].Course1_Menu,
                                menuC:results[0].Course2_Menu,
                                menuD:results[0].Special_Menu,
                                originA:results[0].Flame_Origin,
                                originB:results[0].Course1_Origin,
                                originC:results[0].Course2_Origin,
                                originD:results[0].Special_Origin,
                                priceA:results[0].Flame_Price,
                                priceB:results[0].Course1_Price,
                                priceC:results[0].Course2_Price,
                                priceD:results[0].Special_Price,
                                quantityA:results[0].Flame_Quantity,
                                quantityB:results[0].Course1_Quantity,
                                quantityC:results[0].Course2_Quantity,
                                quantityD:results[0].Special_Quantity,
                                ip:adress                               
                            }));
                        }
                    });
                }
            }
        });
    }else{
        res.send('<h1>'+'페이지 요청 없음'+'</h1>');
    }
});

module.exports = router;