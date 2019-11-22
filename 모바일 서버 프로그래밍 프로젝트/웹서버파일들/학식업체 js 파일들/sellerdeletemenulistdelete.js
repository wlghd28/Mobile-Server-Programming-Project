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

router.delete('/', (req,res)=>{
    console.log(req.body.menunumber);
    if(req.body.menunumber == null){
        fs.readFile('menuresults.jade','utf8',(error, data)=>{
            if(error){
                res.send('<h1>'+'ERROR!!!'+'</h1>');
            }else{
                const fn = jade.compile(data);
                res.send(fn({
                    ip:adress,
                    title:'메뉴 삭제',
                    description:'삭제할 메뉴를 선택해주세요!!',
                    path:'delete_menulist/'
                }));
            }
        });
    }else{
        if(typeof(req.body.menunumber)=="string"){
            async.waterfall([
                function(callback){
                    client.query('SELECT * FROM Menu_All_List WHERE Menu_Num=?',[req.body.menunumber],(error,results)=>{
                        //console.log(req.body.menunumber[i]);
                        if(error){
                            console.log(error);
                            res.send('<h1>'+'Database ERROR!!!'+'</h1>');
                        }else{
                            if(results[0]!=null){
                                fs.unlink('bootstrap-4.3.1/site/docs/4.3/assets/img/'+results[0].Menu_Main + '.jpg',(error)=>{
                                    if(error){
                                        res.send('<h1>'+'ERROR!!!'+'<h1>');
                                        console.log(error);
                                    }else{
                                        console.log('File Removed!!');
                                    }
                                });
                            }
                        }
                    });
                    client.query('DELETE FROM Sales WHERE Menu_Num=?',[req.body.menunumber[i]],(error)=>{
                        if(error){
                            console.log(error);
                            res.send('<h1>'+'Database ERROR!!!'+'</h1>');
                        }else{
                            console.log('Delete from Database was Completed!!');
                        }
                    });
                    client.query('DELETE FROM REVIEW WHERE Menu=?',[req.body.menunumber[i]],(error)=>{
                        if(error){
                            console.log(error);
                        }else{
                            console.log('Delete from Database was Completed!!');
                        }
                    })
                    callback(null);
                }, function(callback){
                    client.query('DELETE FROM Menu_All_List WHERE Menu_Num=?',[req.body.menunumber[i]],(error)=>{
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
        }else{
            for(var i=0;i<req.body.menunumber.length;i++){
                async.waterfall([
                    function(callback){
                        client.query('SELECT * FROM Menu_All_List WHERE Menu_Num=?',[req.body.menunumber[i]],(error,results)=>{
                            //console.log(req.body.menunumber[i]);
                            if(error){
                                console.log(error);
                                res.send('<h1>'+'Database ERROR!!!'+'</h1>');
                            }else{
                                if(results[0]!=null){
                                    fs.unlink('bootstrap-4.3.1/site/docs/4.3/assets/img/'+results[0].Menu_Main + '.jpg',(error)=>{
                                        if(error){
                                            res.send('<h1>'+'ERROR!!!'+'<h1>');
                                            console.log(error);
                                        }else{
                                            console.log('File Removed!!');
                                        }
                                    });
                                }
                            }
                        });
                        client.query('DELETE FROM Sales WHERE Menu_Num=?',[req.body.menunumber[i]],(error)=>{
                            if(error){
                                console.log(error);
                                res.send('<h1>'+'Database ERROR!!!'+'</h1>');
                            }else{
                                console.log('Delete from Database was Completed!!');
                            }
                        });
                        client.query('DELETE FROM REVIEW WHERE Menu=?',[req.body.menunumber[i]],(error)=>{
                            if(error){
                                console.log(error);
                            }else{
                                console.log('Delete from Database was Completed!!');
                            }
                        })
                        callback(null);
                    }, function(callback){
                        client.query('DELETE FROM Menu_All_List WHERE Menu_Num=?',[req.body.menunumber[i]],(error)=>{
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
        }
        
        fs.readFile('menuresults.jade','utf8',(error, data)=>{
            if(error){
                res.send('<h1>'+'ERROR!!!'+'</h1>');
            }else{
                const fn = jade.compile(data);
                res.send(fn({
                    ip:adress,
                    title:'메뉴 삭제',
                    description:'메뉴가 삭제되었습니다.',
                    path:'delete_menulist/'
                }));
            }
        });
    }
});

module.exports = router;