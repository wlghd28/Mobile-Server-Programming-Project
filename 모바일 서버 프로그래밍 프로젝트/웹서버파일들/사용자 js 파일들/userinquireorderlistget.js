const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const Login = require('./userloginpost');

const client = mysql.createConnection({
    host:'localhost',
    user:'8team',
    password:'gachon654321',
    database:'8team'
});

var OrderListArray = new Array();
router.get('/', (req,res)=>{
    //if(req.session.user){
        console.log('userget Excute.....');   
        console.log(Login.UserID);   
        client.query('SELECT * FROM ORDER_LIST WHERE UserID=?',[Login.UserID],(error,results)=>{
            //console.log(results);
            if(error){
                res.send('<h1>'+'Database ERROR!!!'+'</h1>');
            }else{     
                if(results[0]==null){
                    res.send("null");
                }else{
                    results.forEach((item,index)=>{                 
                        OrderListArray.push(item);                 
                    });
                    //console.log(OrderListArray);
                   
                    res.json(OrderListArray);
                    OrderListArray = [];
                }
            }
        });        
    //}else{
    //    res.send('null');
    //}
});

module.exports = router;