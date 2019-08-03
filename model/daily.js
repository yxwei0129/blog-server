/**
 * created by Yuxin Wei on 2019/7/31
 * 每日一言
 */

var mongoose = require('../core/mongodb');

var DailySchema = new mongoose.Schema({
        dailyId: {
            type: String,
            required: true
        },
        dailyBody: {
            type: String,
            detail: '',
            required: true
        },
        author: {
            type: String,
            default: 'eff4d2c5-ce65-4d68-8e03-8896bf557fbf',
            required: true
        },
        insertTime: { // 插入时间
            type: String
        },
        likeCount: {  //主题的点赞数量
            type: Number,
            default: 0
        },
        commentCount: {
            type: Number,
            default: 0
        },
        deleteFlag: {   //逻辑删除
            type: Boolean,
            default: false
        }
    })
;

var DailyModel = mongoose.model('daily_record', DailySchema);

module.exports = DailyModel;