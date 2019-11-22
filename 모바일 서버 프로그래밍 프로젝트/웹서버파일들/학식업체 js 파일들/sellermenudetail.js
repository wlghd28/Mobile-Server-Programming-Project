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
    console.log(req.body.Menu_Num);
    client.query('SELECT * FROM Menu_All_List WHERE Menu_Num=?',[req.body.Menu_Num],(error,results)=>{
        if(error){
            res.send('<h1>'+'Database ERROR!!!'+'</h1>');
        }else{
            fs.readFile('sellermenudetail.jade','utf8',(error, data)=>{
                if(error){
                    res.send('<h1>'+'ERROR!!!'+'</h1>');
                }else{
                    const fn = jade.compile(data);
                    res.send(fn({
                        ip:adress,
                        Menu_Name:results[0].Menu_Main,
                        Menu_Origin:results[0].Origin,
                        Menu_Price:results[0].Price,
                        path:'detail/'
                    }));
                }
            });
        }
    });
});

module.exports = router;