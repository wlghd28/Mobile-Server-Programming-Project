const fs = require('fs');
const express = require('express');
const jade = require('jade');
const router = express.Router();
const adress = require('./server').adress;


router.use(express.static('bootstrap-4.3.1'));

router.get('/', (req,res)=>{
    fs.readFile('sellerfindid.jade','utf8',(error, data)=>{
        if(error){
            res.send('<h1>'+'ERROR!!!'+'</h1>');
        }else{
            const fn = jade.compile(data);
            res.send(fn({ip:adress}));
        }
    });
})

module.exports = router