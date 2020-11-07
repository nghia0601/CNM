const AWS = require('aws-sdk');
const FORM = require('./write_form');
const express = require('express');
const router = express.Router();
AWS.config.update({
  "region": "us-east-2",
  "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
  "accessKeyId": "", "secretAccessKey": ""
});
let docClient = new AWS.DynamoDB.DocumentClient();
router.get('/',(req,res) => {
    FORM.PageHienThiSP(res);
    let params = {
      TableName: "tbSanPham"
    };
    let scanObject = {};
    docClient.scan(params, (err, data) => {
      if (err) {
        scanObject.err = err;
      } else {
        scanObject.data = data;
      }
      FORM.writeItemTable(scanObject, res);
    });
  });

router.get('/delete',(req,res)=>{
    var maSanPham = req.query.maSanPham;
    var TenSP = req.query.TenSP;
    let params = {
      TableName: 'tbSanPham',
      Key:{
        "maSanPham": String(maSanPham),
        "TenSP": String(TenSP)
      }
    };
  
    docClient.delete(params, (err, data) => {
      if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        res.writeHead(302, {'Location': '/'});
      }
      res.end();
    });
  })
  module.exports = router;