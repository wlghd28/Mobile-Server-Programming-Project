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

router.delete('/', (req, res) => {
    client.query('DELETE FROM ORDER_LIST WHERE UserID=?',[req.body.user_id],(error)=>{
        if(error){
            console.log(error);
            res.send('2');
        }else{
            client.query('DELETE FROM REVIEW WHERE UserID=?',[req.body.user_id],(error)=>{
                if(error){
                    console.log(error);
                    res.send('2');
                }else{
                    console.log('Delete From DB was Completed!!');
                    client.query('SELECT * FROM USER WHERE UserID = ?', [req.body.user_id], (error, results) => {
                        if (error) {
                       console.log(error);
                       res.send('2');
                        } else {
                            if (results[0] == null) {       
                                res.send('2');
                            } else if (results[0].UserID == req.body.user_id &&
                                results[0].PW == req.body.user_pw &&
                                results[0].User_Num == req.body.user_num) {
                                client.query('DELETE FROM USER WHERE UserID =?', [req.body.user_id], (error) => {                     
                                    console.log('Delete from DB was completed!');
                                    res.send('1');            
                                });
                            }else {       
                                res.send('2');     
                            }
                        }        
                    });
                }
            });      
        }
    })           
});
module.exports = router;