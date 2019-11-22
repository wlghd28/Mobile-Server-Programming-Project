const fs = require('fs');
const express = require('express');
const jade = require('jade');
const router = express.Router();
const methodOverride = require('method-override');
const mysql = require('mysql');
const moment = require('moment');
const adress = require('./server').adress;

const client = mysql.createConnection({
    host:'localhost',
    user:'8team',
    password:'gachon654321',
    database:'8team'
});
router.use(methodOverride('_method'));
router.use(express.static('bootstrap-4.3.1'));

router.delete('/', (req,res)=>{
    client.query('DELETE FROM Menu_Info WHERE Menu_Date=?',[moment().format('YYYY-MM-DD')],(error,results)=>{

        if(error){
            res.send('<h1>'+'Database ERROR!!!'+'</h1>');
        }else{
            fs.readFile('menuresults.jade','utf8',(error, data)=>{
                if(error){
                    res.send('<h1>'+'ERROR!!!'+'</h1>');
                }else{
                    const fn = jade.compile(data);
                    res.send(fn({
                        ip:adress,
                        path:'delete_menu/',
                        description:'오늘의 메뉴 삭제 성공!',
                        title:'오늘의 메뉴 삭제'
                    }));
                }
            });
        }


    });
    
});

module.exports = router;