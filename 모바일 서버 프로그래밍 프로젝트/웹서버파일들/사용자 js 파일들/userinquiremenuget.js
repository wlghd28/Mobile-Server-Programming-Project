const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const moment = require('moment');


const client = mysql.createConnection({
    host:'localhost',
    user:'8team',
    password:'gachon654321',
    database:'8team'
});
router.get('/', (req,res)=>{
    console.log('userget excute...');
    //if(req.session.user){
        client.query('SELECT * FROM Menu_Info WHERE Menu_Date=?',[moment().format('YYYY-MM-DD')],(error,results)=>{
            if(error){
                res.send('<h1>'+'Database ERROR!!!'+'</h1>');
            }else{
                if(results[0]==null){
                    res.send("null");
                }else{
                    let menu = [
                        {
                            menuname:results[0].Flame_Menu,
                            origin:results[0].Flame_Origin,
                            price:results[0].Flame_Price
                        },
                        {
                            menuname:results[0].Course1_Menu,
                            origin:results[0].Course1_Origin,
                            price:results[0].Course1_Price
                        },
                        {
                            menuname:results[0].Course2_Menu,
                            origin:results[0].Course2_Origin,
                            price:results[0].Course2_Price
                        },
                        {
                            menuname:results[0].Special_Menu,
                            origin:results[0].Special_Origin,
                            price:results[0].Special_Price
                        }
                    ]
                    res.json(menu);               
                }
            }
        });
   //}else{
   //     res.send('null');
   //}
});

module.exports = router;