var EmployeeDAO = require('../DAO/EmployeeDAO');

var Employee = new EmployeeDAO();

var employee = {
    id:'12345678',
    position:'asdf',
    name:'zhangsan',
    date:'2017-05-05',
    phone:'111',
    address:'hebei',
    salary:1200,
    remark:'asdf',
    password:'123456'
};
Employee.addEmployee(employee,addE);
function addE(rows) {
    console.log(rows);
}

/*var id = 123456;
// var e = Employee.getEmployeeById(id);
Employee.getEmployeeById(id,getE);
function getE(e) {
    console.log(e);
}*/

