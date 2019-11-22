const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const client = mysql.createConnection({
    host:'localhost',
    user:'8team',
    password:'gachon654321',
    database:'8team'
});
var OrderListArray = new Array();
var OrderList = new Object();
router.get('/', (req,res)=>{
    if(req.session.count){
        client.query('SELECT * FROM Menu_All_List',(error,results)=>{
            if(error){
                res.send('<h1>'+'Database ERROR!!!'+'</h1>');
            }else{
                results.forEach((item,index)=>{
                    OrderList.Menu_Num=item.Menu_Num;
                    OrderList.Menu_Main=item.Menu_Main;
                    OrderList.Price=item.Price;
                    OrderList.Origin=item.Origin;
                    OrderListArray.push(OrderList);
                });
                var OrderListJSON = JSON.stringify(OrderListArray);
                res.json(OrderListJSON);
            }
        });        
    }else{
        res.send('<h1>'+'페이지 요청 없음'+'</h1>');
    }
});

module.exports = router;