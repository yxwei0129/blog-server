/**
 * created by Yuxin Wei on 2019/7/17
 * 博客详情
 */
var mongoose = require('../core/mongodb');

var BlogSchema = new mongoose.Schema({
    id: String,
    name: String,
    html: String
});
module.exports = BlogSchema;