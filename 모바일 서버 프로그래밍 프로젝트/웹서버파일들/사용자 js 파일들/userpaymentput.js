const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyparser = require('body-parser');
const moment = require('moment');
const Login = require('./userloginpost');

const client = mysql.createConnection({
    host:'localhost',
    user:'8team',
    password:'gachon654321',
    database:'8team'
});

router.use(bodyparser.urlencoded({ extended: false }));

router.put('/', (req,res)=>{
    //if(req.session.user){
       client.query('SELECT * FROM ACCOUNT WHERE Account_Num=? and Account_PW=? and UserID=?',
       [req.body.paynumber, req.body.paypassword, Login.UserID],(error,results1)=>{
           if(error){
               res.send('null');
           }else{
               if(results1[0]==null){
                   res.send('null');
               }else{
                   if(results1[0].Money < req.body.price){
                       res.send('null');
                   }else{
                       client.query('SELECT * FROM Menu_Info WHERE Menu_Date=?',[moment().format('YYYY-MM-DD')],(error,results2)=>{
                           if(error){
                               res.send('null');
                           }else{
                               if(results2[0]==null){
                                   res.send('null');
                               }else{
                                   if(results2[0].Flame_Menu == req.body.menuname){
                                       if(results2[0].Flame_Quantity > 0){
                                            client.query('UPDATE ACCOUNT SET Money=Money-? WHERE Account_Num=?',[req.body.price,req.body.paynumber],(error)=>{
                                                if(error){
                                                    res.send('null');
                                                }else{
                                                    res.send('OK');
                                                    client.query('INSERT INTO ORDER_LIST(Menu_Name,Price,Date,Order_State,UserID,Account_Num) Values(?,?,?,?,?,?)',
                                                    [req.body.menuname, req.body.price, moment().format('YYYY-MM-DD'), 0, results1[0].UserID, req.body.paynumber],(error)=>{
                                                        if(error){
                                                            console.log(error);
                                                        }         
                                                    });   
                                                    client.query('UPDATE Menu_Info SET Flame_Quantity=Flame_Quantity-1',(error)=>{
                                                        if(error){
                                                            console.log(error);
                                                        }
                                                    });
                                                    client.query('UPDATE Sales SET sales_volume = sales_volume+1 where Menu_Name=?',
                                                    [req.body.menuname],(error)=>{
                                                        if(error){
                                                            console.log(error);
                                                        }
                                                    });
                                                                                     
                                                }
                                            });
                                            
                                       }else{
                                           res.send('SOLD OUT');
                                       }

                                   }else if(results2[0].Course1_Menu == req.body.menuname){
                                       if(results2[0].Course1_Quantity > 0){
                                            client.query('UPDATE ACCOUNT SET Money=Money-? WHERE Account_Num=?',[req.body.price, req.body.paynumber],(error)=>{
                                                if(error){
                                                    res.send('null');
                                                }else{
                                                    res.send('OK');
                                                    client.query('INSERT INTO ORDER_LIST(Menu_Name,Price,Date,Order_State,UserID,Account_Num) Values(?,?,?,?,?,?)',
                                                    [req.body.menuname, req.body.price, moment().format('YYYY-MM-DD'), 0, results1[0].UserID, req.body.paynumber],(error)=>{
                                                        if(error){
                                                            console.log(error);
                                                        }         
                                                    });  
                                                    client.query('UPDATE Menu_Info SET Course1_Quantity=Course1_Quantity-1',(error)=>{
                                                        if(error){
                                                            console.log(error);
                                                        }
                                                    });
                                                    client.query('UPDATE Sales SET sales_volume = sales_volume+1 where Menu_Name=?',
                                                    [req.body.menuname],(error)=>{
                                                        if(error){
                                                            console.log(error);
                                                        }
                                                    });
                                                }
                                            });                                           
                                        }else{
                                            res.send('SOLD OUT');
                                        }             
                                    }else if(results2[0].Course2_Menu == req.body.menuname){
                                        if(results2[0].Course2_Quantity > 0){
                                            client.query('UPDATE ACCOUNT SET Money=Money-? WHERE Account_Num=?',[req.body.price, req.body.paynumber],(error)=>{
                                                if(error){
                                                    res.send('null');
                                                }else{
                                                    res.send('OK');
                                                    client.query('INSERT INTO ORDER_LIST(Menu_Name,Price,Date,Order_State,UserID,Account_Num) Values(?,?,?,?,?,?)',
                                                    [req.body.menuname, req.body.price, moment().format('YYYY-MM-DD'), 0, results1[0].UserID, req.body.paynumber],(error)=>{
                                                        if(error){
                                                            console.log(error);
                                                        }         
                                                    }); 
                                                    client.query('UPDATE Menu_Info SET Course2_Quantity=Course2_Quantity-1',(error)=>{
                                                        if(error){
                                                            console.log(error);
                                                        }
                                                    });
                                                    client.query('UPDATE Sales SET sales_volume = sales_volume+1 where Menu_Name=?',
                                                    [req.body.menuname],(error)=>{
                                                        if(error){
                                                            console.log(error);
                                                        }
                                                    }); 
                                                }
                                            });
                                           
                                        }else{
                                            res.send('SOLD OUT');
                                        }                                         
                                    }else if(results2[0].Special_Menu == req.body.menuname){
                                        if(results2[0].Special_Quantity > 0){
                                            client.query('UPDATE ACCOUNT SET Money=Money-? WHERE Account_Num=?',[req.body.price, req.body.paynumber],(error)=>{
                                                if(error){
                                                    res.send('null');
                                                }else{
                                                    res.send('OK');
                                                    client.query('INSERT INTO ORDER_LIST(Menu_Name,Price,Date,Order_State,UserID,Account_Num) Values(?,?,?,?,?,?)',
                                                    [req.body.menuname, req.body.price, moment().format('YYYY-MM-DD'), 0, results1[0].UserID, req.body.paynumber],(error)=>{
                                                        if(error){
                                                            console.log(error);
                                                        }         
                                                    }); 
                                                    client.query('UPDATE Menu_Info SET Special_Quantity=Special_Quantity-1',(error)=>{
                                                        if(error){
                                                            console.log(error);
                                                        }
                                                    }); 
                                                    client.query('UPDATE Sales SET sales_volume = sales_volume+1 where Menu_Name=?',
                                                    [req.body.menuname],(error)=>{
                                                        if(error){
                                                            console.log(error);
                                                        }
                                                    });    
                                                }
                                            });
                                                                                
                                        }else{
                                            res.send('SOLD OUT');
                                        }                                
                                   }
                               }
                           }
                       });                                              
                   }
               }
           }
       })
    //}else{
    //    res.send('null');
    //}
});

module.exports = router;