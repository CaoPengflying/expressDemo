var url = require('url');
var EmployeeDAO = require('./../DAO/EmployeeDAO');
var getNewArr = require('./../util/getNewArr');
var employeeDAO = new EmployeeDAO();
function EmployeeServer(){
    /*
    获取所有员工信息
     */
    this.getAllEmployee = function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        var result = {};
       employeeDAO.getAllEmployee(handleGetAllFood);
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
* 处理登录的逻辑
* */
    this.getEmployee = function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        var params = url.parse(req.url, true).query;
        console.log('参数',params);
        var phone = params.phone;
        var result = {};
        employeeDAO.getEmployeeByPhone(phone, handleGetEmployee);
        /*
        * 处理从数据库中查找的结果
        * */
        function handleGetEmployee(rows) {
            if(rows.length != 0){
                var password = params.password;
                console.log(password);
                console.log(rows);
                if(password == rows[0].password){
                    result.body={
                        code:0,
                        data:rows
                    };
                }else{
                    result.body={
                        code:-1,
                        data:""
                    };
                }
            }else{
                result.body ={
                    code:-2,
                    data:""
                };
            }
            res.write(JSON.stringify(result));
            res.end();
        }
    };
    this.addEmployee = function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        var result = {};
        var params = url.parse(req.url, true).query;
        var employee = {};
        employee.id = params.Id;
        employee.position = params.position;
        employee.name = params.name;
        employee.date = params.date;
        employee.phone = params.phone;
        employee.address = params.address;
        employee.salary = params.salary;
        employee.remark = params.remark;
        employee.password = '666666';
        /*
        * 最好在插入的时候先去数据库中查找是否存在，如果存在就应该返回其他的内容
        * */
        employeeDAO.addEmployee(employee, handleAddEmployee);
        /*
        * 处理在数据库添加员工后逻辑
        * */
        function handleAddEmployee(err,rows) {
            result.body = {
                'code':0,
                'msg':"添加员工成功"
            };
            if(err){
                result.body = {
                    'code':-1,
                    'msg':'添加员工失败'
                };
            }
            // console.log('info',result.data.msg);
            res.write(JSON.stringify(result));
            res.end();
        }

    }
    /*
    * 删除职工信息
    * */
    this.delEmployee = function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        var result = {};
        var params = url.parse(req.url, true).query;
        var employeeId = params.id;

        /*
        * 最好在插入的时候先去数据库中查找是否存在，如果存在就应该返回其他的内容
        * */
        employeeDAO.delEmployee(employeeId, handleDelEmployee);
        /*
        * 处理在数据库添加员工后逻辑
        * */
        function handleDelEmployee(rows,err) {
            result.body = {
                'code':rows.affectedRows,
                'msg':"删除员工成功"
            };
            if(err){
                result.body = {

                    'code':-1,
                    'msg':'删除员工失败'
                };
            }

            res.write(JSON.stringify(result));
            res.end();
        }

    }
    /*
* 修改职工信息
* */
    this.changeEmployee = function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    var result = {};
    var params = url.parse(req.url, true).query;
    var employee = {};
    employee.position = params.position;
    employee.phone = params.phone;
    employee.address = params.address;
    employee.salary = params.salary;
    employee.remark = params.remark;
    employee.id = params.id;
    /*
    * 最好在插入的时候先去数据库中查找是否存在，如果存在就应该返回其他的内容
    * */
    employeeDAO.changeEmployee(employee, handleChangeEmployee);
    /*
    * 处理在数据库添加员工后逻辑
    * */
    function handleChangeEmployee(err,rows) {
      result.body = {
        'code':0,
        'msg':"更新员工成功"
      };
      if(err){
        result.body = {
          'code':-1,
          'msg':'更新员工失败'
        };
      }
      res.write(JSON.stringify(result));
      res.end();
    }

  }
  /*
  修改职工密码
  * */
  this.changePassword = function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    var result = {};
    var params = url.parse(req.url, true).query;
    var employee = {};
    employee.newPassword = params.newPassword;
    employee.id = params.id;
    /*
    * 最好在插入的时候先去数据库中查找是否存在，如果存在就应该返回其他的内容
    * */
    employeeDAO.changePassword(employee, handleChangePassword);
    /*
    * 处理在数据库添加员工后逻辑
    * */
    function handleChangePassword(err,rows) {
      console.log(rows);
      result.body = {
        'code':0,
        'msg':"更新员工成功"
      };
      if(err ){
        result.body = {
          'code':-1,
          'msg':'更新员工失败'
        };
      }
      if(rows.affectedRows == 0){
        result.body = {
          'code':-1,
          'msg':'员工不存在'
        };
      }
      res.write(JSON.stringify(result));
      res.end();
    }

  }
}


/*导出loginServer*/
module.exports = EmployeeServer;
