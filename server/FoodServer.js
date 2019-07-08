var FoodDAO = require('./../DAO/FoodDAO');
var url = require('url');
var getNewArr = require('./../util/getNewArr');

var foodDAO = new FoodDAO();
function FoodServer() {
    /*获取所有的食品
    * */
    this.getAllFood = function (req, res) {

        var result = {};
       foodDAO.getAllFood(handleGetAllFood);

       function handleGetAllFood(rows, err) {
           if(err){
                result.body = {
                    'code':-1,
                    'msg':"获取失败"
                };
                res.write(JSON.stringify(result));
                res.end();
                return;
           }
           var temp = getNewArr(rows);
           result.body = temp;
           result.code = 0;
           result.msg = "获取所有的餐品成功";
           res.write(JSON.stringify(result));
           res.end();
       }
    };
    /*
    * 获取某个订单中的餐品
    * */
    this.getOrderFood = function (req, res) {
        var result ={};
        var params = url.parse(req.url, true).query;
        var foodIds = params.allfood;
        foodDAO.getFoodsByIds(foodIds,handleGetFoodsByIds);
        function handleGetFoodsByIds(rows, err) {
            if(err){
                console.log("获取失败");
                result.data = {
                    code : -1,
                    msg:"获取失败",
                    allfood:[]
                }
                res.write(JSON.stringify(result));
                res.end();
                return;
            }
            var temp = getNewArr(rows);
            result.data = {
                code:0,
                msg:"获取成功",
                allfood:temp
            };
            res.write(JSON.stringify(result));
            res.end();
        }

    };

    /*
    * 添加新的餐品
    * */
    this.addFood = function (req, res) {
        var result = {};
        var params = url.parse(req.url, true).query;
        var food = {};
        food.pic = params.pic;
        food.discounts = params.discounts;
        food.name = params.name;
        food.price = params.price;
        food.type = params.type;
        food.Ename = params.Ename;
        food.have = 1;
        foodDAO.addFood(food, handleAddFood);
        function handleAddFood(rows, err) {
            if(err){
                result.body = {
                    code:-1,
                    msg:'添加餐品失败'
                };
                res.write(JSON.stringify(result));
                res.end();
                return;
            }
            result.body = {
                code:0,
                msg:'添加餐品成功'
            };
            res.write(JSON.stringify(result));
            res.end();
        }
    };
    /*
    * 修改餐品的状态
    * */
    this.changeFoodType = function (req, res) {
      var result ={};
      var params = url.parse(req.url, true).query;
      var foodId = params.id;
      foodDAO.changeFoodType(foodId,handleChangeFoodType);
      function handleChangeFoodType(rows, err) {
        if(err){
          result.data = {
            code:-1,
            msg:"改变食物状态失败"
          };
          res.write(JSON.stringify(result));
          res.end();
          return;
        }
        result.data = {
          code:0,
          msg:"改变食物状态成功"
        };
        res.write(JSON.stringify(result));
        res.end();
      }
    }
}

module.exports = FoodServer;
