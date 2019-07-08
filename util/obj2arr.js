function obj2arr(obj) {
    var arr = [];//将职工对象的所有属性转化为数组
    for(var k in obj){
        arr.push(obj[k]);
    }
    return arr;
}

module.exports = obj2arr;