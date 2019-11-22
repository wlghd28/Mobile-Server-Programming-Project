const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyparser = require('body-parser');
const Login = require('./userloginpost');

const client = mysql.createConnection({
    host:'localhost',
    user:'8team',
    password:'gachon654321',
    database:'8team'
});

router.use(bodyparser.urlencoded({ extended: false }));

router.delete('/', (req,res)=>{
    console.log(req.body);
    client.query('SELECT * FROM ORDER_LIST WHERE Order_Num=?',[req.body.OrderNumber],(error,results)=>{
        console.log(results[0]);
        if(error){
            console.log(error);
            res.send('null');
        }else{
            if(results[0]==null){
                res.send('null');
            }else{
                if(results[0].Order_State == 0){
                    client.query('DELETE FROM ORDER_LIST WHERE Order_Num=?',[req.body.OrderNumber],(error)=>{
                        if(error){
                            res.send('null');
                            console.log(error);
                        }else{
                            client.query('UPDATE ACCOUNT SET Money = Money+? WHERE Account_Num=?',[req.body.OrderPrice ,req.body.OrderAccount],(error)=>{
                                if(error){
                                    console.log(error);
                                    res.send('null');
                                }
                            });
                            client.query('UPDATE Sales SET sales_volume = sales_volume - 1 WHERE Menu_Name=?',[req.body.OrderMenu],(error)=>{
                                if(error){
                                    console.log(error);
                                    res.send('null');
                                }
                            });
                            client.query('SELECT * FROM Menu_Info WHERE Menu_Date=?',[req.body.OrderDate],(error,results2)=>{
                                console.log(results2[0]);
                                if(error){
                                    res.send('null');
                                    console.log(error);
                                }else{
                                    if(results2[0]==null){
                                        res.send('null');
                                    }else{
                                        if(results2[0].Flame_Menu == req.body.OrderMenu){
                                            client.query('UPDATE Menu_Info SET Flame_Quantity = Flame_Quantity + 1 WHERE Menu_Date=?',[req.body.OrderDate],(error)=>{
                                                if(error){
                                                    res.send('null');
                                                    console.log(error);
                                                }else{
                                                    res.send('OK');
                                                }
                                            });
                                            
                                        }else if(results2[0].Course1_Menu == req.body.OrderMenu){
                                            client.query('UPDATE Menu_Info SET Course1_Quantity = Course1_Quantity + 1 WHERE Menu_Date=?',[req.body.OrderDate],(error)=>{
                                                if(error){
                                                    res.send('null');
                                                    console.log(error);
                                                }else{
                                                    res.send('OK');
                                                }
                                            });                                               
                                        }else if(results2[0].Course2_Menu == req.body.OrderMenu){
                                            client.query('UPDATE Menu_Info SET Course2_Quantity = Course2_Quantity + 1 WHERE Menu_Date=?',[req.body.OrderDate],(error)=>{
                                                if(error){
                                                    res.send('null');
                                                    console.log(error);
                                                }else{
                                                    res.send('OK');
                                                }
                                            });                                                            
                                        }else if(results2[0].Special_Menu == req.body.OrderMenu){
                                            client.query('UPDATE Menu_Info SET Special_Quantity = Special_Quantity + 1 WHERE Menu_Date=?',[req.body.OrderDate],(error)=>{
                                                if(error){
                                                    res.send('null');
                                                    console.log(error);
                                                }else{
                                                    res.send('OK');
                                                }
                                            });                             
                                        }
                                    }
                                }
                            });                                            
                        }
                    });
                }else{
                    res.send('SOLD');
                }
            }           
        }
    })
});

module.exports = router;