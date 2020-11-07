const http = require('http');
const url = require('url');
const port = 3001;
const FORM = require('./write_form');
const DATA = require('./aws');
const API = require('./api');
const express = require('express');
const app=express();

app.use('/',API);
app.use('/delete',API);


// app.get('/',function(req,res){
//     FORM.PageHienThiSP(res);
//     DATA.getAllItem(res);
// })
// app.get('/delete',function(req,res){
//     var maSanPham = req.query.maSanPham;
//     var TenSP = req.query.TenSP;
//     DATA.deleteItem(maSanPham,TenSP,res);
// })
app.listen(port,function(){
    console.log(`Server starting at port ${port} `);
})