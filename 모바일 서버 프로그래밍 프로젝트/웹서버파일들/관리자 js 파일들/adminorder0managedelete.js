const fs = require('fs');
const express = require('express');
const jade = require('jade');
const router = express.Router();
const bodyparser = require('body-parser');
const methodOverride = require('method-override');
const mysql = require('mysql');
const async = require('async');
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


router.delete('/',(req,res)=>{
    console.log(req.body.menunumber);
    if(req.body.menunumber == null){
        fs.readFile('adminresults.jade','utf8',(error, data)=>{
            if(error){
                res.send('<h1>'+'ERROR!!!'+'</h1>');
            }else{
                const fn = jade.compile(data);
                res.send(fn({
                    ip:adress,
                    title:'주문 삭제',
                    description:'삭제할 주문를 선택해주세요!!',
                    path:'delete_menulist/'
                }));
            }
        });
    }else{
        for(var i=0;i<req.body.menunumber.length;i++){
            async.waterfall([
                function(callback){
                    client.query('SELECT * FROM ORDER_LIST WHERE WHERE Order_Num=?',[req.body.menunumber[i]],(error,results)=>{
                        console.log('Deleted!');
                    });
                    client.query('DELETE FROM ORDER_LIST WHERE WHERE Order_Num=?',[req.body.menunumber[i]],(error)=>{
                        if(error){
                            console.log(error);
                            res.send('<h1>'+'Database ERROR!!!'+'</h1>');
                        }else{
                            console.log('Delete from Database was Completed!!');
                        }
                    });
                    callback(null);
                }
            ], function(error,result){
                if(error){
                    console.log(error);
                }else{
                    console.log('end');
                }
            });
        }
        fs.readFile('adminordermanage.jade','utf8',(error, data)=>{
            if(error){
                res.send('<h1>'+'ERROR!!!'+'</h1>');
            }
            else{
                console.log('jade error');
            }
        });
    }
});

module.exports = router;