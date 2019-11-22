const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const mysql = require('mysql');


const client = mysql.createConnection({
    host: 'localhost',
    user: '8team',
    password: 'gachon654321',
    database: '8team'
});


router.use(bodyparser.urlencoded({ extended: false }));

router.post('/', (req, res) => {
    client.query('SELECT * FROM USER WHERE UserID=? and PW=?',[req.body.user_id, req.body.user_num],(error,results)=>{
        if(error){
            console.log(error);
            res.send('null');
        }else{
            res.send('OK');
        }
    });
    
});

router.post('/change', (req, res) => {
    client.query('UPDATE USER SET PW=? WHERE UserID=?',[req.body.user_pw, req.body.user_id],(error,results)=>{
        if(error){
            console.log(error);
            res.send('null');
        }else{
            res.send('OK');
        }
    })
});

module.exports = router