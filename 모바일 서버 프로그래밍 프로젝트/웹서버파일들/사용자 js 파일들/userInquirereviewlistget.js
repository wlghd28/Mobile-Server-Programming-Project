const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const client = mysql.createConnection({
    host:'localhost',
    user:'8team',
    password:'gachon654321',
    database:'8team'
});
var ReviewListArray = new Array();
router.get('/:menunum', (req,res)=>{
    //if(req.session.user){
        var menunum = req.params.menunum;
        console.log('userget Excute.....');      
        client.query('SELECT * FROM REVIEW WHERE Menu=?',[menunum],(error,results)=>{
            console.log(results);
            if(error){
                res.send('<h1>'+'Database ERROR!!!'+'</h1>');
            }else{     
                if(results[0]==null){
                    res.send("null");
                }else{
                    results.forEach((item,index)=>{                                  
                        ReviewListArray.push(item);               
                    });             
                    res.json(ReviewListArray);
                    ReviewListArray = [];
                }         
            }
        });        
    //}else{
    //    res.send('null');
    //}
});

module.exports = router;