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

router.post('/',upload,(req,res)=>{
    console.log(req.file);
    client.query('SELECT * FROM Menu_All_List WHERE Menu_Main=?',[req.body.menu],(error,results)=>{
        if(results[0] != null){
            fs.readFile('menuresults.jade','utf8',(error, data)=>{
                if(error){
                    res.send('<h1>'+'ERROR!!!'+'</h1>');
                }else{
                    const fn = jade.compile(data);
                    res.send(fn({
                        ip:adress,
                        path:'insert_menulist/',
                        description:'이미 존재하는 메뉴 입니다.',
                        title:'메뉴리스트 추가'
                    }));
                }
            });              
        }else{
            client.query('INSERT INTO Menu_All_List(Menu_Main, Price, Origin) VALUES(?,?,?)',
            [req.body.menu, req.body.menuprice, req.body.menuorigin],(error)=>{
                if(error){
                    res.send('<h1>'+'Database ERROR!!!'+'</h1>');
                    console.log(error);
                }else{
                    client.query('INSERT INTO Sales(Menu_Name, sales_volume) VALUES(?,?)',[req.body.menu,0],(error)=>{
                        if(error){
                            console.log(error);
                            res.send('<h1>'+'Database ERROR!!!'+'</h1>');
                        }else{
                            console.log('Insertion into DB was completed!');
                            fs.readFile('menuresults.jade','utf8',(error, data)=>{
                                if(error){
                                    res.send('<h1>'+'ERROR!!!'+'</h1>');
                                    console.log(error);
                                }else{
                                    const fn = jade.compile(data);
                                    res.send(fn({
                                        ip:adress,
                                        path:'insert_menulist/',
                                        description:'메뉴리스트 추가 성공!',
                                        title:'메뉴리스트 추가'
                                    }));
                                }
                            });
                            fs.rename('bootstrap-4.3.1/site/docs/4.3/assets/img/'+req.file.filename,'bootstrap-4.3.1/site/docs/4.3/assets/img/'+req.body.menu+'.jpg',(error)=>{
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
            });
        }  
    });       
});

module.exports = router;