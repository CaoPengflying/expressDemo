var Pool = require('./../util/mysqlUtil');
var pool = Pool.Pool;
var obj2arr = require('./../util/obj2arr');

/*
* 订单表的增删改查
* */
function OrderDAO(){
    /*
    * 获取所有的订单
    * */
    this.getAllOrder = function (callback) {
        var sql = "SELECT * from orders";
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
* 添加新的订单
* */
    this.addOrder = function (order, callback) {
        console.log("duixiang",order);
        var orderArr = obj2arr(order);
        console.log("要插入的数据",orderArr);
        var sql = "insert into orders(id,orderPeople,seat,remark,outTime,taste,type,total,allfood) values(?,?,?,?,?,?,?,?,?)";
        pool.getConnection(function (err, connection) {
            if(err){
                console.log("数据库连接失败");
                return;
            }
            connection.query(sql, orderArr,function (error, rows, filed) {
                if(error){
                    console.log('插入订单失败 ' + error.message);
                    return;
                }
                connection.release();
                console.log("ok",rows);
                callback(rows, error);
                console.log("数据库断开连接");
            });
        } );
    };
    /*
    *获取当天不同时段的订单
    * */
    this.getCountByDay = function (startDate,endDate,callback) {
      var orderArr = [startDate,endDate];
      console.log("开始日期："+startDate+"结束日期"+endDate);
      var sql = "select DATE_FORMAT(orderTime,'%H') hours,count(id) count from orders  where orderTime BETWEEN ? and ? group by hours;";

      pool.getConnection(function (err, connection) {
        if(err){
          console.log("数据库连接失败");
          return;
        }
        connection.query(sql, orderArr,function (error, rows, filed) {
          if(error){
            console.log('分小时查询订单失败 ' + error.message);
            return;
          }
          connection.release();
          console.log("ok",rows);
          callback(rows, error);
          console.log("数据库断开连接");
        });
      } );
    };
    this.getMoneyByDay = function(startDate,endDate,callback) {
      var orderArr = [startDate,endDate];
      console.log("开始日期："+startDate+"结束日期"+endDate);
      var sql = "select DATE_FORMAT(orderTime,'%H') hours,sum(total) money from orders  where orderTime BETWEEN ? and ? group by hours;";

      pool.getConnection(function (err, connection) {
        if(err){
          console.log("数据库连接失败");
          return;
        }
        connection.query(sql, orderArr,function (error, rows, filed) {
          if(error){
            console.log('分小时查询订单失败 ' + error.message);
            return;
          }
          connection.release();
          console.log("ok",rows);
          callback(rows, error);
          console.log("数据库断开连接");
        });
      } );
  };
    /*
    *改变订单状态
    * */
  this.changeOrderType = function (ordersId,callback) {
    var orderArr = [ordersId];
    var sql = "update orders set type = 0 where id = ?";

    pool.getConnection(function (err, connection) {
      if(err){
        console.log("数据库连接失败");
        return;
      }
      connection.query(sql, orderArr,function (error, rows, filed) {
        if(error){
          console.log('更改订单状态成功' + error.message);
          return;
        }
        connection.release();
        console.log("ok",rows);
        callback(rows, error);
        console.log("数据库断开连接");
      });
    } );
  }
 this.changeOrderDone = function (ordersId,callback) {
    var orderArr = [ordersId];
    var sql = "update orders set done = 0 where id = ?";

    pool.getConnection(function (err, connection) {
      if(err){
        console.log("数据库连接失败");
        return;
      }
      connection.query(sql, orderArr,function (error, rows, filed) {
        if(error){
          console.log('更改订单状态成功' + error.message);
          return;
        }
        connection.release();
        console.log("ok",rows);
        callback(rows, error);
        console.log("数据库断开连接");
      });
    } );
  }
    /*
    *获取当月不同时段的订单
    * */
  function getNextMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
      year2 = parseInt(year2) + 1;
      month2 = 1;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
      day2 = days2;
    }
    if (month2 < 10) {
      month2 = '0' + month2;
    }

    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
  }
  this.getCountByMonth = function (startDate,endDate,callback) {
      var orderArr = [startDate,endDate];
      console.log("开始日期："+startDate+"结束日期"+endDate);
      var sql = "select DATE_FORMAT(orderTime,'%d') month,count(id) count from orders  where orderTime BETWEEN ? and ? group by month";

      pool.getConnection(function (err, connection) {
        if(err){
          console.log("数据库连接失败");
          return;
        }
        connection.query(sql, orderArr,function (error, rows, filed) {
          if(error){
            console.log('分小时查询订单失败 ' + error.message);
            return;
          }
          connection.release();
          console.log("ok",rows);
          callback(rows, error);
          console.log("数据库断开连接");
        });
      } );
    };
  this.getMoneyByMonth = function (startDate, endDate, callback) {
    var orderArr = [startDate,endDate];
    console.log("开始日期："+startDate+"结束日期"+endDate);
    var sql = "select DATE_FORMAT(orderTime,'%d') month,sum(total) money from orders  where orderTime BETWEEN ? and ? group by month";

    pool.getConnection(function (err, connection) {
      if(err){
        console.log("数据库连接失败");
        return;
      }
      connection.query(sql, orderArr,function (error, rows, filed) {
        if(error){
          console.log('分小时查询订单失败 ' + error.message);
          return;
        }
        connection.release();
        console.log("ok",rows);
        callback(rows, error);
        console.log("数据库断开连接");
      });
    } );
  };
    /**
     * 获取当天订单数
     */
    this.getOrderNum = function (callback) {
        var sql = "select count(*) from order where ";
        pool.getConnection(function (err, connection) {
            if(err){
                console.log("数据库连接失败");
                return;
            }
            connection.query(sql,function (error, rows, filed) {
                if(error){
                    console.log('插入订单失败 ' + error.message);
                    return;
                }
                connection.release();
                console.log("ok",rows);
                callback(rows, error);
                console.log("数据库断开连接");
            });
        } );
    };

    /*
    * 通过座位获取订单信息
    * */
    this.getOrderBySeat = function (id, callback) {
        var sql = "select * from orders where seat = " + id +" and type = 1";
        pool.getConnection(function (err, connection) {
            if(err){
                console.log("数据库连接失败");
                return;
            }
            connection.query(sql, function (error, rows, filed) {
                if(error){
                    console.log('通过座位获取订单失败' + error.message);
                    return;
                }
                connection.release();
                console.log("ok",rows);
                callback(rows, error);
                console.log("mysql end connect");
            });
        } );
    }
/*
*获取某个餐品的出售数量
* */
    this.getCountById = function (id, callback) {
        var sql = "select * from orders where allfood like '%"+id+"%'";
        console.log(sql);
        pool.getConnection(function (err, connection) {
            if(err){
                console.log("数据库连接失败");
                return;
            }
            connection.query(sql, function (error, rows, filed) {
                if(error){
                    console.log('获取餐品订单' + error.message);
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
    * 改变订单的座位
    * */
    this.changeOrderSeat = function (id, changeSeat, callback) {
        var sql = "update orders set seat = ? where id = ?";
        var arr = [changeSeat, id];
        pool.getConnection(function(err, connection){
          if(err){
            console.log("数据库连接错误");
            return;
          }
          connection.query(sql, arr, function (error, rows, field) {
            if(error){
              console.log('更改订单座位成功' + error.message);
              return;
            }
            connection.release();
            console.log("ok",rows);
            callback(rows, error);
            console.log("数据库断开连接");
          })
      })
    }
};

module.exports=OrderDAO;
