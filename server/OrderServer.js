var OrderDAO = require('./../DAO/OrderDAO');
var url = require('url');
var getNewArr = require('./../util/getNewArr');

var orderDAO = new OrderDAO();
function OrderServer() {
    //获取所有的订单
    this.getAllOrder = function (req, res) {
        var result = {};
        orderDAO.getAllOrder(handleGetAllOrder);
        function handleGetAllOrder(rows, err) {
            if(err){
                result.body = {
                    code:-1,
                    msg:'获取所有订单失败',
                    data:''
                }
                res.write(JSON.stringify(result));
                res.end();
                return;
            }
            var temp = getNewArr(rows);
            result.body = {
                code:0,
                msg:'获取所有订单成功',
                data:temp
            };
            res.write(JSON.stringify(result));
            res.end();
        }
    };
    //添加新的订单
    this.addOrder = function (req, res) {
        var date = new Date().toLocaleString();
        var random = Math.floor(Math.random()*1000)
        var id = date.substring(0,4)+date.substring(5,7)+date.substring(8,10)+random;
        var result = {};
        var order = {};
        var params = url.parse(req.url, true).query;
        order.id = id;
        order.orderPeople = params.orderPeople;
        order.seat = params.seat;
        order.remark = params.remark;
        order.outTime = params.outTime;
        order.taste  = params.taste;
        order.type = params.type;
        order.total = params.total;
        order.allfood = params.allfood;
        orderDAO.addOrder(order, handleAddOrder);
        function handleAddOrder(rows, err) {
            if(err){
                result.body ={
                    code:-1,
                    msg:"添加订单失败"
                };
                res.write(JSON.stringify(result));
                res.end();
                return;
            }
            result.body = {
                code:0,
                msg:"添加订单成功"
            };
            res.write(JSON.stringify(result));
            res.end();

        }
    };
    //通过桌子的号码获取未结账的订单
    this.getOrderBySeat= function(req, res){
        var params = url.parse(req.url, true).query;
        var result = {};
        var id = params.id;
        orderDAO.getOrderBySeat(id, handleGetOrderBySeat);
        function handleGetOrderBySeat(rows, err) {
            if(err){
                result.body = {
                    code:-1,
                    msg:"获取订单失败",
                    data:""
                };
                res.write(JSON.stringify(result));
                res.end();
                return;
            }
            var temp = getNewArr(rows);
            result.body = {
                code:0,
                msg:"成功获取订单",
                data:temp
            };
            res.write(JSON.stringify(result));
            res.end();
        }
    };
    //通过餐品id获取该餐品出售的数量
    this.getCountById = function (req, res) {
        var params = url.parse(req.url, true).query;
        var result = {};
        var id = params.id;
        orderDAO.getCountById(id, handleGetCountById);
        function handleGetCountById(rows, err) {
            if(err){
                result.body = {
                    code:-1,
                    msg:"获取订单失败",
                    data:0
                };
                res.write(JSON.stringify(result));
                res.end();
                return;
            }
            var temp = getNewArr(rows);
            var sum = 0;
            for (var i=0; i<temp.length; i++){
                var foodStr = temp[i].allfood;
                var foodArr = foodStr.split(",");
                for(var j=0; j<foodArr.length; j++){
                    if(foodArr[j] == id){
                        sum ++;
                    }
                }
            }
            result.body = {
                code:0,
                msg:"成功获取订单",
                data:sum
            };
            res.write(JSON.stringify(result));
            res.end();
        }
    };
    //获取当天不同时间段的订单个数
    this.getCountByDay = function (req, res) {
      var result = {};
      var params = url.parse(req.url, true).query;
      var startDate = params.startDate;
      var endDate = params.endDate;
        orderDAO.getCountByDay(startDate,endDate,handleGetCountByDay);
        function handleGetCountByDay(rows ,err) {
          var temp = getNewArr(rows);
          var arr = [];
          for(var i=0; i<12; i++){
            arr.push(0);
          }
          for(var i=0; i<temp.length; i++){
            arr[temp[i].hours-8] = temp[i].count;
          }
          result.body = {
            code:0,
            msg:"成功获取订单",
            data:arr
          };
          if(err){
            result.body = {
              code:-1,
              msg:"获取订单失败",
              data:""
            };
          }
          res.write(JSON.stringify(result));
          res.end();
        }

    };
    //获取当月不同时间段的订单个数
    this.getCountByMonth = function (req, res) {
    var params = url.parse(req.url, true).query;
    var result = {};
    var startDate = params.startDate;
    var endDate = params.endDate;
    orderDAO.getCountByMonth(startDate,endDate,handleGetCountByMonth);
    function handleGetCountByMonth(rows ,err) {
      var temp = getNewArr(rows);
      var arr = [];
      for(var i=0; i<31; i++){
        arr.push(0);
      }
      for(var i=0; i<temp.length; i++){
        arr[temp[i].month-1] = temp[i].count;
      }
      result.body = {
        code:0,
        msg:"成功获取订单",
        data:arr
      };
      if(err){
        result.body = {
          code:-1,
          msg:"获取订单失败",
          data:""
        };
      }
      res.write(JSON.stringify(result));
      res.end();
    }

  };
    //改变订单出餐状态
    this.changeOrderDone = function (req, res) {
      var params = url.parse(req.url, true).query;
      var result = {};
      var ordersId = params.ordersId;
      orderDAO.changeOrderDone(ordersId,handleChangeOrderDone);
      function handleChangeOrderDone(rows ,err) {
        result.body = {
          code:0,
          msg:"修改订单成功",
        };
        if(err){
          result.body = {
            code:-1,
            msg:"获取订单失败",
          };
        }
        if(rows.changedRows == 0){
          result.body = {
            code:-1,
            msg:"该订单不存在",
          };
        }
        res.write(JSON.stringify(result));
        res.end();
      }
    };
     //改变订单状态
    this.changeOrderType = function (req, res) {
      var params = url.parse(req.url, true).query;
      var result = {};
      var ordersId = params.ordersId;
      orderDAO.changeOrderType(ordersId,handleChangeOrderType);
      function handleChangeOrderType(rows ,err) {
        result.body = {
          code:0,
          msg:"修改订单成功",
        };
        if(err){
          result.body = {
            code:-1,
            msg:"获取订单失败",
          };
        }
        if(rows.changedRows == 0){
          result.body = {
            code:-1,
            msg:"该订单不存在",
          };
        }
        res.write(JSON.stringify(result));
        res.end();
      }
    };
    //修改订单的座位
    this.changeOrderSeat = function (req, res) {
        var params = url.parse(req.url, true).query;
        var result = {};
        var id = params.id;
        var changeSeat = params.changeSeat;
        orderDAO.changeOrderSeat(id, changeSeat, handleChangeOrderSeat);
        function handleChangeOrderSeat(rows, err) {
          result.body = {
            code:0,
            msg:"修改座位成功",
          };
          if(err){
            result.body = {
              code:-1,
              msg:"获取座位失败",
            };
          }
          if(rows.changedRows == 0){
            result.body = {
              code:-1,
              msg:"该订单不存在",
            };
          }
          res.write(JSON.stringify(result));
          res.end();
        }

    };
    //统计一段时间中每天的收入
    this.getMoneyByDay = function (req, res) {
      var result = {};
      var params = url.parse(req.url, true).query;
      var startDate = params.startDate;
      var endDate = params.endDate;
      orderDAO.getMoneyByDay(startDate,endDate,handleGetMoneyByDay);
      function handleGetMoneyByDay(rows ,err) {
        var temp = getNewArr(rows);
        var arr = [];
        for(var i=0; i<12; i++){
          arr.push(0);
        }
        for(var i=0; i<temp.length; i++){
          arr[temp[i].hours-8] = temp[i].money;
        }
        result.body = {
          code:0,
          msg:"成功获取订单",
          data:arr
        };
        if(err){
          result.body = {
            code:-1,
            msg:"获取订单失败",
            data:""
          };
        }
        res.write(JSON.stringify(result));
        res.end();
      }
    };
    this.getMoneyByMonth = function (req, res) {
      var result = {};
      var params = url.parse(req.url, true).query;
      var startDate = params.startDate;
      var endDate = params.endDate;
      orderDAO.getMoneyByDay(startDate,endDate,handleGetMoneyByMonth);
      function handleGetMoneyByMonth(rows ,err) {
        var temp = getNewArr(rows);
        var arr = [];
        for(var i=0; i<12; i++){
          arr.push(0);
        }
        for(var i=0; i<temp.length; i++){
          arr[temp[i].hours-8] = temp[i].money;
        }
        result.body = {
          code:0,
          msg:"成功获取订单",
          data:arr
        };
        if(err){
          result.body = {
            code:-1,
            msg:"获取订单失败",
            data:""
          };
        }
        res.write(JSON.stringify(result));
        res.end();
      }
    };

}

module.exports = OrderServer;
