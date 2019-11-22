const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const fs = require('fs');

const client = mysql.createConnection({
    host:'localhost',
    user:'8team',
    password:'gachon654321',
    database:'8team'
});
router.get('/:menuname', (req,res)=>{
    console.log('userget excute...');
    //if(req.session.user){
        var menuname = req.params.menuname
        client.query('SELECT * FROM Menu_All_List WHERE Menu_Main=?',[menuname],(error,results)=>{
            if(error){
                res.send(null)
            }else{
                fs.readFile('bootstrap-4.3.1/site/docs/4.3/assets/img/'+results[0].Menu_Main+'.jpg',(error,data)=>{
                    if(error){
                        res.send(null);
                    }else{
                        res.send(data);
                    } 
                });

            }         
        });
   //}else{
   //     res.send('null');
   //}
});

module.exports = router;