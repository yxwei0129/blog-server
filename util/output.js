/**
 * created by Yuxin Wei on 2019/7/15
 * 统一处理json
 */

var Json = {
    success: function (res) {
        return {
            status: 200,
            data: res,
            message: '操作成功!'
        }
    },
    error: function (res) {
        return {
            status: -1,
            data: res,
            message: '操作失败!'
        }
    }
};

module.exports = Json;