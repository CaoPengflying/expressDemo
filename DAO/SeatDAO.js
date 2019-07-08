var Pool = require('./../util/mysqlUtil');

var pool = Pool.Pool;

/*
* 座位表的增删改查
* */
function SeatDAO(){
    this.getSeatType = function(id, callback){
        var sql = "select status from seat where id="+id;
        pool.getConnection(function (err, connection) {
            if(err){
                console.log("连接失败");
                return;
            }
            connection.query(sql,function (error, rows, filed) {
                connection.release();
                console.log("断开连接");
                callback(rows, error);
            });
        })
    }
    this.changeSeatType = function (id, callback) {
        this.getSeatType(id, handleChangeSeatType);
        function handleChangeSeatType(rows, error){
            console.log(rows);
            var status = rows[0].status;
            console.log(status);
            if(status == 0){
             var sql = "update seat set status = 1 where id = " + id;

            }else if(status == 1){
             var sql = "update seat set status = 0 where id = " + id;

            }
             console.log(sql);
             pool.getConnection(function (err, connection) {
                 if(err){
                    console.log("连接失败");
                    return;
                }
                connection.query(sql,function (error, rows, filed) {
                connection.release();
                console.log("断开连接");
                callback(rows, error);
            });
        })
        }
       

    };
    this.getAllSeat = function (callback) {
        var sql = "select * from seat";
        pool.getConnection(function (err, connection) {
            if(err){
                console.log("连接失败");
                return;
            }
            connection.query(sql,function (error, rows, filed) {
                connection.release();
                console.log("断开连接");
                callback(rows, error);
            });
        })
    }
};

module.exports=SeatDAO;
