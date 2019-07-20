/**
 * created by Yuxin Wei on 2019/7/17
 * 博客详情
 */
var mongoose = require('../core/mongodb');
var moment = require('moment');

var BlogSchema = new mongoose.Schema({
        articleId: {  //博客id
            type: String,
            required: true
        },
        blogDetail: {
            type: String,
            required: true
        },
        deleteFlag: {   //逻辑删除
            type: Boolean,
            default: 0
        },
        insertTime: { // 插入时间
            type: Date,
            default: Date.now,
            get: function (time) {
                return moment(time).format('YYYY-MM-DD')
            }
        }
    })
;

var BlogDetail = mongoose.model('BlogDetail', BlogSchema);

module.exports = BlogDetail;