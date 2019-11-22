const fs = require('fs');
const express = require('express');
const jade = require('jade');
const router = express.Router();
const bodyparser = require('body-parser');
const mysql = require('mysql');
const moment = require('moment');
const async = require('async');
const adress = require('./server').adress;


const client = mysql.createConnection({
    host:'localhost',
    user:'8team',
    password:'gachon654321',
    database:'8team'
});

router.use(express.static('bootstrap-4.3.1'));
router.use(bodyparser.urlencoded({extended:false}));

var menu = new Array();
var quantity = new Array();

router.post('/', (req,res)=>{
    console.log(req.body);
    for(var i=0;i<req.body.menuname.length;i++){
        menu[i]=req.body.menuname[i];
        quantity[i]=req.body.quantity[i];
        console.log(menu[i]);
        console.log(quantity[i]);
    }
    client.query('SELECT * FROM Menu_All_List WHERE Menu_Main=?',[menu[0]],(error,results1)=>{
        if(error){
            console.log(error);
            res.send('<h1>'+'Database ERROR!!!'+'</h1>');
        }else{
            if(results1[0]==null && menu[0] != '없음'){
                fs.readFile('menuresults.jade','utf8',(error,data)=>{
                    if(error){
                        console.log(error);
                        res.send('<h1>'+'ERROR!!!'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({
                            ip:adress,
                            description:'오늘의 메뉴 등록 실패!\n(입력정보 오류)',
                            path:'upload_menu/'
                        }));
                    }
                });

            }else{
                client.query('SELECT * FROM Menu_All_List WHERE Menu_Main=?',[menu[1]],(error,results2)=>{
                    if(error){
                        console.log(error);
                        res.send('<h1>'+'Database ERROR!!!'+'</h1>');
                    }else{
                        if(results2[0]==null && menu[1] != '없음'){
                            fs.readFile('menuresults.jade','utf8',(error,data)=>{
                                if(error){
                                    console.log(error);
                                    res.send('<h1>'+'ERROR!!!'+'</h1>');
                                }else{
                                    const fn = jade.compile(data);
                                    res.send(fn({
                                        ip:adress,
                                        description:'오늘의 메뉴 등록 실패!\n(입력정보 오류)',
                                        path:'upload_menu/'
                                    }));
                                }
                            });
                        }else{
                            client.query('SELECT * FROM Menu_All_List WHERE Menu_Main=?',[menu[2]],(error,results3)=>{
                                if(error){
                                    console.log(error);
                                    res.send('<h1>'+'Database ERROR!!!'+'</h1>');                                   
                                }else{
                                    if(results3[0]==null && menu[2] != '없음'){
                                        fs.readFile('menuresults.jade','utf8',(error,data)=>{
                                            if(error){
                                                console.log(error);
                                                res.send('<h1>'+'ERROR!!!'+'</h1>');
                                            }else{
                                                const fn = jade.compile(data);
                                                res.send(fn({
                                                    ip:adress,
                                                    description:'오늘의 메뉴 등록 실패!\n(입력정보 오류)',
                                                    path:'upload_menu/'
                                                }));
                                            }
                                        });
                                    }else{
                                        client.query('SELECT * FROM Menu_All_List WHERE Menu_Main=?',[menu[3]],(error,results4)=>{
                                            if(error){
                                                console.log(error);
                                                res.send('<h1>'+'Database ERROR!!!'+'</h1>');
                                            }else{
                                                if(results4[0]==null && menu[3] != '없음'){
                                                    fs.readFile('menuresults.jade','utf8',(error,data)=>{
                                                        if(error){
                                                            console.log(error);
                                                            res.send('<h1>'+'ERROR!!!'+'</h1>');
                                                        }else{
                                                            const fn = jade.compile(data);
                                                            res.send(fn({
                                                                ip:adress,
                                                                description:'오늘의 메뉴 등록 실패!\n(입력정보 오류)',
                                                                path:'upload_menu/'
                                                            }));
                                                        }
                                                    });
                                                }else{
                                                    client.query('INSERT INTO Menu_Info(Menu_Date, Flame_Menu, Course1_Menu, Course2_Menu, Special_Menu, Flame_Origin, Course1_Origin, Course2_Origin, Special_Origin, Flame_Price, Course1_Price, Course2_Price, Special_Price, Flame_Quantity, Course1_Quantity, Course2_Quantity, Special_Quantity) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                                                    [moment().format('YYYY-MM-DD'), menu[0], menu[1], menu[2], menu[3], results1[0].Origin, results2[0].Origin, results3[0].Origin, results4[0].Origin, results1[0].Price, results2[0].Price, results3[0].Price, results4[0].Price, quantity[0], quantity[1], quantity[2], quantity[3]],(error)=>{
                                                        if(error){
                                                            console.log(error);
                                                            res.send('<h1>'+'Database ERROR!!!'+'</h1>');
                                                        }else{
                                                            fs.readFile('menuresults.jade','utf8',(error,data)=>{
                                                                if(error){
                                                                    res.send('<h1>'+'ERROR!!!'+'</h1>');
                                                                }else{
                                                                    const fn = jade.compile(data);
                                                                    res.send(fn({
                                                                        ip:adress,
                                                                        description:'오늘의 메뉴가 등록되었습니다.',
                                                                        path:'upload_menu/',
                                                                        title:'오늘의 메뉴 등록'
                                                                    }));
                                                                }
                                                            });                                                            
                                                        }
                                                    });

                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    })
});

module.exports = router;