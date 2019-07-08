var mysql = require('mysql');
//
var Pool = mysql.createPool({
    host:'localhost',//主机地址
    user:'root',//数据库名字
    password:'root',//数据库密码
    database:'aljpos'//选择数据库
});
exports.Pool = Pool;
