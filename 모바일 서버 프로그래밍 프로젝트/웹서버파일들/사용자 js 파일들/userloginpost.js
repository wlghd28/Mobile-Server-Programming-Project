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
    client.query('SELECT * FROM USER WHERE UserID=? and PW=?',[req.body.user_id, req.body.user_pw],(error,results)=>{
        if(error){
            console.log(error);
            res.send('2');
        }else{
            if(results[0]==null){
                res.send('2');
            }else{
                module.exports.UserID = req.body.user_id;
                res.send('1');
            }
        }
    });
});
module.exports = router;