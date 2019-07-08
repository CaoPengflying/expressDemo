var express = require('express');
var url = require('url');
var EmployeeServer = require('./server/EmployeeServer');
var FoodServer = require('./server/FoodServer');
var OrderServer = require('./server/OrderServer');
var SeatServer = require('./server/SeatServer');
var EvaluateServer = require('./server/EvaluateServer');
var port = process.env.PORT || 3001;
var app = express();

app.listen(port);

console.log('server start port:'+port);
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }
    else {
        next();
    }
});
app.get('/',function (req, res) {
    res.write('hello world');
    res.end();
});
/*员工的入口*/
app.get('/employeeServer',function (req, res) {
    let employeeServer = new EmployeeServer();
    var params = url.parse(req.url, true).query;
    var method = params.method;
    switch (method){
        case 'getAllEmployee':
            employeeServer.getAllEmployee(req,res);
            break;
        case 'getEmployee':
            employeeServer.getEmployee(req, res);
            break;
        case 'addEmployee':
            employeeServer.addEmployee(req, res);
            break;
        case 'changeEmployee':
            employeeServer.changeEmployee(req, res);
            break;
        case 'delEmployee':
            employeeServer.delEmployee(req, res);
            break;
      case 'changePassword':
            employeeServer.changePassword(req, res);
            break;
    }
});
/*食物入口
* */
app.get('/foodServer',function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    var foodServer = new FoodServer();
    var params = url.parse(req.url, true).query;
    var method = params.method;
    switch (method){
        case 'getAllFood':
            foodServer.getAllFood(req, res);
            break;
        case 'getOrderFood':
            foodServer.getOrderFood(req, res);
            break;
        case 'addFood':
            foodServer.addFood(req, res);
            break;
        case 'changeFoodType':
            foodServer.changeFoodType(req, res);
    }
});
//订单的入口
app.get('/orderServer', function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    var orderServer = new OrderServer();
    var params = url.parse(req.url, true).query;
    switch (params.method) {
        case 'getAllOrder':
                orderServer.getAllOrder(req, res);
                break;
        case 'addOrder':
                orderServer.addOrder(req, res);
                break;
        case 'getOrderBySeat':
                orderServer.getOrderBySeat(req, res);
                break;
        case 'getCountById':
                orderServer.getCountById(req, res);
                break;
        case 'getCountByDay':
                orderServer.getCountByDay(req, res);
                break;
        case  'getCountByMonth':
                orderServer.getCountByMonth(req, res);
                break;
        case 'changeOrderType':
                orderServer.changeOrderType(req, res);
                break;
        case 'changeOrderDone':
                orderServer.changeOrderDone(req, res);
                break;
        case 'changeOrderSeat':
                orderServer.changeOrderSeat(req, res);
                break;
        case 'getMoneyByDay':
                orderServer.getMoneyByDay(req, res);
                break;
        case 'getMoneyByMonth':
                orderServer.getMoneyByMonth(req, res);
                break;
    }
});
//桌子的入口
app.get('/seatServer', function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
  var params = url.parse(req.url, true).query;
    var seatSever = new SeatServer();
    switch (params.method){
        case 'changeSeatType':
            seatSever.changeSeatType(req, res);
            break;
        case 'getAllSeat':
            seatSever.getAllSeat(req, res);
            break;
        // case 'changeSeat':
        //     seatSever.changeSeat(req, res);
        //     break;
    }
});
//评论的入口
app.get('/evaluateServer', function (req, res) {
    var params = url.parse(req.url, true).query;
    var evaluateServer = new EvaluateServer();
    switch (params.method){
        case 'getAllEvaluate':
            evaluateServer.getAllEvaluate(req, res);
            break;
      case 'addEvaluate':
            evaluateServer.addEvaluate(req, res);
            break;

    }
});
