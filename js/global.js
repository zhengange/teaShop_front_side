// var domain_name="http://localhost:8088/api/";//本地
var domain_name="http://www.mugdiy.com/webservice/api/";//生产

// 获取通过GET请求传递来的参数
function getQueryString() {
    var resObj = {},
        name, value;

    var str = window.location.href;
    var num = str.indexOf("?");
    str = str.substr(num + 1);

    var arr = str.split('&');

    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf('=');
        if (num > 0) {
            name = arr[i].substr(0, num);
            value = arr[i].substr(num + 1);
            resObj[name] = value;
        }
    }
    return resObj;
};

function isEmpty(data) {
    if (data == undefined || data == '' || data.length == 0) {
        return true;
    }
    return false;
}