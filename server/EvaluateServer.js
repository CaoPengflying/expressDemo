var EvaluateDAO = require('./../DAO/EvaluateDAO');
var url = require('url');
var getNewArr = require('./../util/getNewArr');

var evaluateDAO = new EvaluateDAO();
function EvaluateServer() {
    //获取所有的订单
    this.getAllEvaluate = function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        var params = url.parse(req.url, true).query;
        var result = {};
        var foodId = params.foodId;
        evaluateDAO.getCommentById(foodId, handleGetAllEvaluate);
        function handleGetAllEvaluate(rows, err) {
            if(err){
                result.body = {
                    code:-1,
                    msg:'获取菜品所有的评论失败',
                    data:0
                }
                res.write(JSON.stringify(result));
                res.end();
                return;
            }
            var temp = getNewArr(rows);

            result.body = {
                code:0,
                msg:'获取菜品所有的评论成功',
                data:temp
            };
            res.write(JSON.stringify(result));
            res.end();
        }
    };
    //添加评论
  this.addEvaluate = function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    var params = url.parse(req.url, true).query;
    var result = {};
    var evaluate = {};
    evaluate.foodId = params.foodId;
    evaluate.grade = params.grade;
    evaluate.outline = params.outline;

    evaluateDAO.addEvaluate(evaluate, handleAddEvaluate);
    function handleAddEvaluate(rows, err) {
      if(err || rows.length == 0){
        result.body = {
          code:-1,
          msg:'添加评论失败',
          data:0
        }
        res.write(JSON.stringify(result));
        res.end();
        return;
      }
      var temp = getNewArr(rows);

      result.body = {
        code:0,
        msg:'添加评论成功',
        data:temp
      };
      res.write(JSON.stringify(result));
      res.end();
    }
  };
}

module.exports = EvaluateServer;
