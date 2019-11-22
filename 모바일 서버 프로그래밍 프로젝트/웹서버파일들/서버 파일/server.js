const express = require('express');
const server = express();
const session = require('express-session');
const adress = '192.9.44.53';
module.exports.adress = adress;

server.use(session({
    secret: 'key for security',
    resave: false,
    saveUninitialized: true
}));

const servermain = require('./servermain');
const sellerloginget = require('./sellerloginget');
const sellerloginpost = require('./sellerloginpost');
const sellersigninget = require('./sellersigninget');
const sellersigninpost = require('./sellersigninpost');
const sellersignoutget = require('./sellersignoutget');
const sellersignoutdelete = require('./sellersignoutdelete');
const sellerfindidget = require('./sellerfindidget');
const sellerfindidpost = require('./sellerfindidpost');
const sellerfindpasswordget = require('./sellerfindpasswordget');
const sellerfindpasswordpost = require('./sellerfindpasswordpost');
const selleralterpasswordget = require('./selleralterpasswordget');
const selleralterpasswordpost = require('./selleralterpasswordpost');
const sellermenumanage = require('./sellermenumanage');
const sellermenuuploadget = require('./sellermenuuploadget');
const sellermenuuploadpost =require('./sellermenuuploadpost');
const sellermenuupdateget = require('./sellermenuupdateget');
const sellermenuupdatepost = require('./sellermenuupdatepost');
const sellermenudelete = require('./sellermenudelete');
const sellerinquiremenuofdate = require('./sellerinquiremenuofdate');
const sellerinquireallmenulist = require('./sellerinquireallmenulist');
const sellerinsertmenulistget= require('./sellerinsertmenulistget');
const sellerinsertmenulistpost= require('./sellerinsertmenulistpost');
const sellerdeletemenulistget= require('./sellerdeletemenulistget');
const sellerdeletemenulistdelete= require('./sellerdeletemenulistdelete');
const selleraltermenulistget= require('./selleraltermenulistget');
const selleraltermenulistpost= require('./selleraltermenulistpost');
const sellerinquiretakeofmenu = require('./sellerinquiretakeofmenu');
const sellerpaymentauthorizationget = require('./sellerpaymentauthorizationget');
const sellerpaymentauthorizationpost = require('./sellerpaymentauthorizationpost');
const sellermenudetail = require('./sellermenudetail');
const sellertodaymenudetail = require('./sellertodaymenudetail');
const sellerpaymentpost = require('./sellerpaymentpost');

const userinquiremenuget = require('./userinquiremenuget');
const userinquireorderlistget = require('./userinquireorderlistget');
const usersigninpost = require('./usersigninpost');
const usersignoutdelete = require('./usersignoutdelete');
const userloginpost = require('./userloginpost');
const userfindidpost = require('./userfindidpost');
const userfindpasswordpost = require('./userfindpasswordpost');
const useralterpasswordpost = require('./useralterpasswordpost');
const userinquiremenupictureget = require('./userinquiremenupictureget');
const userinquireallmenulistget = require('./userinquireallmenulistget');
const userinquirereviewlistget = require('./userInquirereviewlistget');
const userwritereviewpost = require('./userwritereviewpost');
const userpaymentput = require('./userpaymentput');
const userrefunddelete = require('./userrefunddelete');


const adminloginget = require('./adminloginget');
const adminloginpost = require('./adminloginpost');
const adminsigninget = require('./adminsigninget');
const adminsigninpost = require('./adminsigninpost');
const adminfindpasswordget = require('./adminfindpasswordget');
const adminfindpasswordpost = require('./adminfindpasswordpost');
const adminalterpasswordget = require('./adminalterpasswordget');
const adminalterpasswordpost = require('./adminalterpasswordpost');
const adminusermanageget = require('./adminusermanageget');
const adminsearchuserget = require('./adminsearchuserget');
const adminorder0manageget = require('./adminorder0manageget');
const adminorder1manageget = require('./adminorder1manageget');
const adminorder2manageget = require('./adminorder2manageget');
const adminordermanageget = require('./adminordermanageget');
const adminsearchmenuget = require('./adminsearchmenuget');
const adminsearchtodaymenuget = require('./adminsearchtodaymenuget');
const adminsearchmenuinfoget = require('./adminsearchmenuinfoget');
const adminsearchsalesget = require('./adminsearchsalesget');
const adminusermanagepost =require('./adminusermanagepost');
const adminsearchappuserget = require('./adminsearchappuserget');

const askreviewget = require('./askreviewget');
//const writereviewpost = require('./writereviewpost');

const ordermenuget = require('./ordermenuget');
const ordermenupost = require('./ordermenupost');

server.use('/',servermain);
server.use('/user/logIn/sellerid',sellerloginget);
server.use('/seller/main',sellerloginpost);
server.use('/user/signIn/sellerid', sellersigninget);
server.use('/signIn/registeSeller', sellersigninpost);
server.use('/seller/request/secession', sellersignoutget);
server.use('/seller/secession/userid', sellersignoutdelete);
server.use('/user/findID/sellerid', sellerfindidget);
server.use('/seller/findID', sellerfindidpost);
server.use('/user/findPW/sellerid', sellerfindpasswordget);
server.use('/seller/findPW', sellerfindpasswordpost);
server.use('/seller/resetPW', selleralterpasswordget);
server.use('/seller/postresetPW',selleralterpasswordpost);
server.use('/menu/manage_page', sellermenumanage);
server.use('/menu/upload_page',sellermenuuploadget);
server.use('/menu/upload_menu', sellermenuuploadpost);
server.use('/menu/reupload_page', sellermenuupdateget);
server.use('/menu/alter_menu/', sellermenuupdatepost);
server.use('/menu/delete_menu', sellermenudelete);
server.use('/menu/datelist_page', sellerinquiremenuofdate);
server.use('/menu/allmenu_page', sellerinquireallmenulist);
server.use('/menu/insert_page', sellerinsertmenulistget);
server.use('/menu/insert_menulist', sellerinsertmenulistpost);
server.use('/menu/delete_page', sellerdeletemenulistget);
server.use('/menu/delete_menulist', sellerdeletemenulistdelete);
server.use('/menu/alter_page', selleraltermenulistget);
server.use('/menu/alter_menulist', selleraltermenulistpost);
server.use('/order/data_page', sellerinquiretakeofmenu);
server.use('/order/search/userid',sellerpaymentauthorizationget);
server.use('/order/certification/usernum',sellerpaymentauthorizationpost);
server.use('/menu/detail',sellermenudetail);
server.use('/order/certification/ordernum', sellerpaymentpost);
server.use('/todaymenu/detail',sellertodaymenudetail);


server.use('/menu/search',userinquiremenuget);
server.use('/order/search',userinquireorderlistget);
server.use('/signIn/register',usersigninpost);
server.use('/user/secession',usersignoutdelete);
server.use('/user/logIn',userloginpost);
server.use('/user/findID',userfindidpost);
server.use('/user/findPW',userfindpasswordpost);
server.use('/user/resetPW',useralterpasswordpost);
server.use('/menu/picture',userinquiremenupictureget);
server.use('/menu/list',userinquireallmenulistget);
server.use('/user/review',userinquirereviewlistget);
server.use('/user/writereview', userwritereviewpost);
server.use('/user/payment',userpaymentput);
server.use('/user/refund',userrefunddelete);

server.use('/admin/logIn/adminid',adminloginget);
server.use('/admin/main',adminloginpost);
server.use('/admin/signIn/adminid', adminsigninget);
server.use('/signIn/registeadmin', adminsigninpost);
server.use('/admin/findPW/adminid', adminfindpasswordget);
server.use('/admin/findPW', adminfindpasswordpost);
server.use('/admin/resetPW', adminalterpasswordget);
server.use('/admin/postresetPW',adminalterpasswordpost);
server.use('/admin/userpage', adminusermanageget)
server.use('/admin/searchuser', adminsearchuserget);
server.use('/admin/ordermanage', adminordermanageget);
server.use('/admin/order0manage', adminorder0manageget);
server.use('/admin/order1manage', adminorder1manageget);
server.use('/admin/order2manage', adminorder2manageget);
server.use('/admin/searchmenu',adminsearchmenuget);
server.use('/admin/searchtodaymenu',adminsearchtodaymenuget);
server.use('/admin/searchmenuinfo',adminsearchmenuinfoget);
server.use('/admin/searchsales',adminsearchsalesget);
server.use('/admin/usermanagepost', adminusermanagepost);
server.use('/admin/searchappuser', adminsearchappuserget);

server.use('/askreview', askreviewget);
//server.use('/writereview', writereviewpost);

server.use('/ordermenuget',ordermenuget);
server.use('/ordermenupost',ordermenupost);


server.listen(65008,()=>{
    console.log('Server http://localhost:65008');
});