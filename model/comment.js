/**
 * created by Yuxin Wei on 2019/8/3
 */

var mongoose = require('../core/mongodb');

var CommentSchema = new mongoose.Schema({
        id: { //评论id
            type: String,
            required: true
        },
        body: {  //评论信息
            type: String,
            required: true
        },
        commentBelongs: { //评论主题的id
            type: String,
            required: true
        },
        target: {  // 评论对象，若是主题则默认为'',其余为被评论的作者名字，因为分评论加回复
            name: {
                type: String,
                default:''
            },
            body: {
                type: String,
                default:''
            }
        },
        authorName: {
            type: String,
            required:
                true
        }
        ,
        authorEmail: {
            type: String,
            required:
                true
        }
        ,
        authorWeb: {  // 作者主页
            type: String
        }
        ,
        insertTime: { // 评论时间
            type: String
        }
        ,
        deleteFlag: {   //逻辑删除
            type: Boolean,
            default:
                false
        }
    })
;

var CommentModel = mongoose.model('comment', CommentSchema);

module.exports = CommentModel;