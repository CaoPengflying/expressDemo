var Pool = require('./../util/mysqlUtil');
var pool = Pool.Pool;
var obj2arr = require('./../util/obj2arr');

/*
* 订单表的增删改查
* */
function EvaluateDAO(){
    /*
    * 获取菜品的所有评论
    * */
    this.getCommentById = function (foodId, callback) {
        var sql = "SELECT * from evaluate where foodId = " + foodId;
        pool.getConnection(function (err, connection) {
            if(err){
                console.log("数据库连接失败");
                return;
            }
            connection.query(sql, function (error, rows, filed) {
                if(error){
                    console.log('SELECT ERROR ' + error.message);
                    return;
                }
                connection.release();
                console.log("ok",rows);
                callback(rows, error);
                console.log("mysql end connect");
            });
            } );
    };
    /*
    *添加菜品的评论
    * */
    this.addEvaluate = function (evaluate, callback) {
      evaluate.gradeTime = new Date().Format("yyyy-MM-dd HH:mm:ss");

      var evaluateArr = obj2arr(evaluate);
      console.log(evaluateArr);
      var sql = "insert into evaluate(foodId,grade,outline,gradeTime) values(?,?,?,?)";
      pool.getConnection(function (err, connection) {
        if(err){
          console.log('数据库连接失败');
          return;
        }else{
          connection.query(sql,evaluateArr,function (err, rows, fields) {
            if(err) {
              console.log('添加评论失败：' + err.message);
              return;
            }
            callback(rows,err);
          });
        }
      })
    }
  Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "H+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
};

module.exports=EvaluateDAO;
