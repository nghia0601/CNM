var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "", "secretAccessKey": ""
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "tbSanPham",
    KeySchema: [       
        { AttributeName: "maSanPham", KeyType: "HASH"}, 
        { AttributeName: "TenSP", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [       
        { AttributeName: "maSanPham", AttributeType: "S" },
        { AttributeName: "TenSP", AttributeType: "S" },
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

 var docClient = new AWS.DynamoDB.DocumentClient();

var AllSanPham = JSON.parse(fs.readFileSync('LoadData.json', 'utf8'));
AllSanPham.forEach(function(sanPham) {
    var paramsput = {
        TableName: "tbSanPham",
        Item: {
            "maSanPham":sanPham.maSanPham,
            "TenSP":sanPham.TenSP,
            "SoLuong":sanPham.SoLuong
        }
    };

    docClient.put(paramsput, function(err, data) {
       if (err) {
           console.error("khong the them San Pham", sanPham.TenSP, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", sanPham.TenSP);
       }
    });
});