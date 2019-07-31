/**
 * created by Yuxin Wei on 2019/7/31
 * 每日一言
 */

var mongoose = require('../core/mongodb');

var DailySchema = new mongoose.Schema({
        id: {
            type: String,
            required: true
        },
        body: {
            type: String,
            detail: '',
            required: true
        },
        author: {
            type: String,
            default: 'eff4d2c5-ce65-4d68-8e03-8896bf557fbf',
            required: true
        },
        comments: [{body: String, date: Date}],
        insert_time: { // 插入时间
            type: String
        },
        like_count: {
            type: Number,
            default: 0
        },
        delete_flag: {   //逻辑删除
            type: Boolean,
            default: false
        }
    })
;

var DailyModel = mongoose.model('dailyrecord', DailySchema);

module.exports = DailyModel;