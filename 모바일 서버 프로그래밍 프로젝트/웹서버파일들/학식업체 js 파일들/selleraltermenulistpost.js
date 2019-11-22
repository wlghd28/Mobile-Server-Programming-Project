const fs = require('fs');
const express = require('express');
const jade = require('jade');
const router = express.Router();
const bodyparser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');
const adress = require('./server').adress;

const storage = multer.diskStorage({
    destination: 'bootstrap-4.3.1/site/docs/4.3/assets/img',
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
});
const upload = multer({
    storage: storage
}).single('menupicture1');


const client = mysql.createConnection({
    host:'localhost',
    user:'8team',
    password:'gachon654321',
    database:'8team'
});
router.use(express.static('bootstrap-4.3.1'));
router.use(bodyparser.urlencoded({extended:false}));

router.post('/', upload,(req,res)=>{
    client.query('SELECT * FROM Menu_All_List WHERE Menu_Main=?',[req.body.menu],(error,results)=>{
        if(error){
            console.log(error);
            console.log(req.body.menu);
            res.send('<h1>'+'Database ERROR!!!'+'</h1>');
        }else{
            if(results[0]==null){
                fs.readFile('menuresults.jade','utf8',(error, data)=>{
                    if(error){
                        res.send('<h1>'+'ERROR!!!'+'</h1>');
                    }else{
                        const fn = jade.compile(data);
                        res.send(fn({
                            ip:adress,
                            path:'alter_menulist/',
                            description:'존재하지 않는 메뉴입니다.',
                            title:'메뉴리스트 변경'
                        }));
                    }
                });
            }else{
                client.query('UPDATE Menu_All_List SET Menu_Main=?, Price=?, Origin=? WHERE Menu_Num=?' ,
                [req.body.menuname, req.body.menuprice, req.body.menuorigin, results[0].Menu_Num],(error)=>{
                    if(error){
                        console.log(error);
                        res.send('<h1>'+'Database ERROR!!!'+'</h1>');
                    }else{
                        fs.readFile('menuresults.jade','utf8',(error, data)=>{
                            if(error){
                                res.send('<h1>'+'ERROR!!!'+'</h1>');
                            }else{
                                const fn = jade.compile(data);
                                res.send(fn({
                                    ip:adress,
                                    path:'alter_menulist/',
                                    description:'메뉴가 변경되었습니다.',
                                    title:'메뉴리스트 변경'
                                }));
                            }
                        });
                        fs.rename('bootstrap-4.3.1/site/docs/4.3/assets/img/'+req.file.filename,'bootstrap-4.3.1/site/docs/4.3/assets/img/'+req.body.menuname+'.jpg',(error)=>{
                            if(error){
                                res.send('<h1>'+'ERROR!!!'+'<h1>');
                                console.log(error);
                            }else{
                                console.log('File Renamed!!');
                            }
                        });
                    }
                });
            }
        }
    });
});

module.exports = router;