var Pool = require('./../util/mysqlUtil');
var obj2arr = require('./../util/obj2arr');
var pool = Pool.Pool;



function EmployeeDAO(){
    this.getAllEmployee = function (callback) {
        var sql = "select * from employee";
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
    this.getEmployeeByPhone=function (phone, callback) {
        var sql = 'select * from employee where phone = ' + phone;
        //和数据库连接池建立连接
        pool.getConnection(function (err, connection) {
            if(err){
                console.log('连接失败');
                return;
            }else{
                connection.query(sql,function (error, row, field) {
                    if(error){
                        console.log('SELECT ERROR ' + error.message);
                        return;
                    }
                    connection.release();
                    console.log("ok",row);
                    callback(row, error);
                    console.log("mysql end connect");
                });
            }
        });
    };
    this.addEmployee=function (employee, callback) {
        var arr = [];//将职工对象的所有属性转化为数组
        for(var k in employee){
            arr.push(employee[k]);
        }
        console.log('employee::',employee);
        //插入用户的sql语句
        var sql = "insert into employee(id,position,name,date,phone,address,salary,remark,password) values (?,?,?,?,?,?,?,?,?)";
        pool.getConnection(function (err, connection) {
            if(err){
                console.log('数据库连接失败');
                return;
            }else{
                connection.query(sql,arr,function (err, rows, fields) {
                    if(err) {
                        console.log('插入用户失败：' + err.message);
                        return;
                    }
                    callback(err,rows);
                });
            }
        })

    };
    /*
    * 更新员工信息
    * */
    this.changeEmployee=function (employee, callback) {
        var arr = [];//将职工对象的所有属性转化为数组
        for(var k in employee){
            arr.push(employee[k]);
        }
        console.log('employee::',employee);
        //插入用户的sql语句
        var sql = "update employee set position=?,phone=?,address=?,salary=?,remark=? where id = "+employee.id;
        pool.getConnection(function (err, connection) {
            if(err){
                console.log('数据库连接失败');
                return;
            }else{
                connection.query(sql,arr,function (err, rows, fields) {
                    if(err) {
                        console.log('更新用户失败：' + err.message);
                        return;
                    }
                    callback(err,rows);
                });
            }
        })

    };
    /*
    修改职工密码
    * */
    this.changePassword = function (employee, callback) {
      var arr = obj2arr(employee);//将职工对象的所有属性转化为数组
      console.log('employee::',employee);
      //插入用户的sql语句
      var sql = "update employee set password=? where id = ?";
      pool.getConnection(function (err, connection) {
        if(err){
          console.log('数据库连接失败');
          return;
        }else{
          connection.query(sql,arr,function (err, rows, fields) {
            if(err) {
              console.log('更新用户失败：' + err.message);
              return;
            }
            callback(err,rows);
          });
        }
      })
    }
    this.delEmployee=function (employeeId, callback) {

        //插入用户的sql语句
        var sql = "delete from employee where id = "+ employeeId;
        console.log(sql);
        pool.getConnection(function (err, connection) {
            if(err){
                console.log('数据库连接失败');
                return;
            }else{
                connection.query(sql,function (err, rows, fields) {
                    if(err) {
                        console.log('删除用户失败：' + err.message);
                        return;
                    }
                    callback(rows,err);
                });
            }
        })

    };
    this.getEmployeeById = function (Id, callback) {
        var sql = 'select * from employee where id = ' + Id;
        //和数据库连接池建立连接
        pool.getConnection(function (err, connection) {
            if(err){
                console.log('连接失败');
                return;
            }else{
                connection.query(sql,function (error, row, field) {
                    if(error){
                        console.log('SELECT ERROR ' + error.message);
                        return;
                    }
                    connection.release();
                    console.log(row);
                    callback(row);
                });
            }
        });
    };
}

module.exports=EmployeeDAO;
