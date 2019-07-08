var SeatDAO = require('./../DAO/SeatDAO');
var url = require('url');
var getNewArr = require('./../util/getNewArr');

var seatDAO = new SeatDAO();
function SeatServer() {
  /*改变座位的状态*/
    this.changeSeatType = function (req, res) {
        var result = {};
        var params = url.parse(req.url, true).query;
        var id = params.id;
        seatDAO.changeSeatType(id, handleChangeSeatType);
        function handleChangeSeatType(rows, err) {
            if(err){
                result.data = {
                    code:-1,
                    msg:"改变座位状态失败"
                };
                res.write(JSON.stringify(result));
                res.end();
                return;
            }
            result.data = {
                code:0,
                msg:"改变座位状态成功"
            };
            res.write(JSON.stringify(result));
            res.end();
        }
    };
    /*
    * 获取所有的座位
    * */
    this.getAllSeat = function (req, res) {
        var result = {};
        seatDAO.getAllSeat(handleGetAllSeat);
        function handleGetAllSeat(rows, err) {
            if(err){
                result.data = {
                    code:-1,
                    msg:"获取所有的座位失败",
                    data:""
                };
                res.write(JSON.stringify(result));
                res.end();
                return;
            }
            var temp = getNewArr(rows);
            result.data = {
                code:0,
                msg:"获取所有座位成功",
                data:temp
            };
            res.write(JSON.stringify(result));
            res.end();
        }

    };
    /*
    * 换座位
    * */
    // this.changeSeat = function (req, res) {
  //     var result = {};
  // }
}

module.exports = SeatServer;
