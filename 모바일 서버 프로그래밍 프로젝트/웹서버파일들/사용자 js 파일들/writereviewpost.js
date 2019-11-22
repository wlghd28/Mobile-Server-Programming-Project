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
    console.log('Android에서 리뷰 등록 요청 보냄');

    var inputData;
    req.on('data', (data) => {
        inputData = JSON.parse(data);
        console.log('POST 데이터 받음');

        client.query('INSERT INTO REVIEW ( , UserID, Date, Menu, reviewText, score) VALUES(?,?,?,?,?)',
        [inputData.UserID, inputData.Date, inputData.Menu, inputData.reviewText, inputData.score], (error) => {

            if (error) {
                res.write("2");
                res.end();
            } else {
                console.log('Insertion into DB was completed!');
                res.write("1");
                res.end();
            }
        });
    });
});

module.exports = router;