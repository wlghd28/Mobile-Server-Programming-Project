const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const client = mysql.createConnection({
    host:'localhost',
    user:'8team',
    password:'gachon654321',
    database:'8team'
});
var MenuListArray = new Array();
router.get('/', (req,res)=>{
    console.log(req.session);
    //if(req.session.user){
        console.log('userget Excute.....');      
        client.query('SELECT * FROM Menu_All_List',(error,results)=>{
            //console.log(results);
            if(error){
                res.send('null');
            }else{              
                results.forEach((item,index)=>{ 
                    if(index != 0){                
                        MenuListArray.push(item);
                    }                 
                });             
                res.json(MenuListArray);
                MenuListArray = [];
            }
        });        
    //}else{
    //    res.send('null');
    //}
});

module.exports = router;