const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const mysql = require('mysql');
const adress = require('./server').adress;

const client = mysql.createConnection({
    host: 'localhost',
    user: '8team',
    password: 'gachon654321',
    database: '8team'
});


router.use(bodyparser.urlencoded({ extended: false }));

router.post('/', (req, res) => {
    console.log('Android에서 비밀번호 찾기 요청 보냄');

    var inputData;
    req.on('data', (data) => {
        inputData = JSON.parse(data);
        console.log('POST 데이터 받음');

        client.query('SELECT * FROM USER WHERE UserID = ?', [inputData.user_id], (error, results) => {
            if (error) {
                res.send('<h1>' + 'Database ERROR!!!' + '</h1>');
            } else {
                if (results[0] == null) {

                    if (error) {
                        res.write("2");
                        res.end();
                    } else {
                        res.write("2");
                        res.end();
                    }

                }
                else if (results[0].User_Num == inputData.user_num &&
                    results[0].UserID == inputData.user_id) {

                    if (error) {
                        res.write("2");
                            res.end();
                    } else
                     {
                        console.log('비밀번호 찾았습니다.');
                        console.log(results[0].PW);
                        res.write(results[0].PW);
                        res.end();
                    }

                } else {

                    if (error) {
                        res.write("2");
                        res.end();
                    } else {
                        console.log('비밀번호 찾기 실패.');
                        res.write("2");
                        res.end();

                    }

                }
            }
        });
    });
});
    module.exports = router