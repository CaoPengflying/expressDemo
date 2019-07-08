var Pool = require('./../util/mysqlUtil');
var pool = Pool.Pool;
var obj2arr = require('./../util/obj2arr');

/*
* 食物表的增删改查
* */
function FoodDAO(){
    this.getAllFood = function (callback) {
        var sql = "select * from food";
        pool.getConnection(function (err, connection) {
            if(err){
                console.log('连接失败');
                return;
            }else{
                connection.query(sql,function (error, rows, field) {
                    if(error){
                        console.log('SELECT ERROR ' + error.message);
                        return;
                    }
                    connection.release();
                    console.log("ok",rows);
                    callback(rows, error);
                    console.log("mysql end connect");
                });
            }
        })
    };
    this.getFoodById = function (id, callback) {
      var sql = "select * from food where id = "+ id;
      pool.getConnection(function (err, connection) {
        if(err){
          console.log('连接失败');
          return;
        }else{
          connection.query(sql,function (error, rows, field) {
            if(error){
              console.log('SELECT ERROR ' + error.message);
              return;
            }
            connection.release();
            console.log("ok",rows);
            callback(rows, error);
            console.log("mysql end connect");
          });
        }
      })
    };
    this.getFoodsByIds = function (Ids,callback) {
        var sql = "select * from food where id in (" + Ids + ")";
        pool.getConnection(function (err, connection) {
            if(err){
                console.log('连接失败',err);
                return;
            }else{
                connection.query(sql,function (error, rows, field) {
                    if(error){
                        console.log('SELECT ERROR ' + error.message);
                        return;
                    }
                    connection.release();
                    console.log("获取订单中餐品列表成功",rows);
                    callback(rows, error);
                    console.log("mysql end connect");
                });
            }

        })
    }
    this.addFood = function (food, callback) {
        var foodArr = obj2arr(food);
        console.log(foodArr);
        var sql = "insert into food(pic,discounts,name,price,type,Ename,have) values(?,?,?,?,?,?,?)";
        pool.getConnection(function (err, connection) {
            if(err){
                console.log('数据库连接失败');
                return;
            }else{
                connection.query(sql,foodArr,function (err, rows, fields) {
                    if(err) {
                        console.log('添加食物失败：' + err.message);
                        return;
                    }
                    callback(rows,err);
                });
            }
        })
    }
    this.changeFoodType = function (foodId, callback) {
      this.getFoodById(foodId, handleChangeFoodType);
      function handleChangeFoodType(rows, err) {
          if(err){
            console.log("数据库连接失败");
            return;
          }
          var have = rows[0].have;
          if(have == 0){
            var sql = "update food set have = 1 where id = " + foodId;
          }else if(have == 1){
            var sql = "update food set have = 0 where id = " + foodId;
          }

        pool.getConnection(function (err, connection) {
          if(err){
            console.log("数据库连接失败");
            return;
          }
          connection.query(sql, function (error, rows, filed) {
            if(error){
              console.log('更改食物状态成功' + error.message);
              return;
            }
            connection.release();
            console.log("ok",rows);
            callback(rows, error);
            console.log("数据库断开连接");
          });
        } );
      }
      }

};

module.exports=FoodDAO;
