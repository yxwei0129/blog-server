/**
 * created by Yuxin Wei on 2019/7/15
 * 统一处理json
 */

var Json = {
    success: function (status, data, message) {
        return {
            status: status || 200,
            data: data,
            message: message || '操作成功!'
        }
    },
    error: function (status, data, message) {
        return {
            status: status || -1,
            data: data,
            message: message || '操作失败!'
        }
    }
};

module.exports = Json;