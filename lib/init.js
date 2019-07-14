/**
 * created by Yuxin Wei on 2019/7/14
 * 用于初始化表，项目正式启动前需要运行一下，初始化数据库，后期继续优化
 */

const Article = require('../model/article');
const User = require('../model/user');

// 通过 sync 方法同步数据结构
Article.sync({force: true}).then(function (value) {
    return Article.bulkCreate([{
        id: '5b005dc9-5a3f-414a-bb12-6462c9d291a5',
        user_id: 'eff4d2c5-ce65-4d68-8e03-8896bf557fbf',
        title: '山有木兮木有枝,心悦君兮君不知',
        category: '杂谈',
        user_name: 'yxwei',
        update_time: '2019-05-09 18:08:00',
        create_time: '2019-05-09 18:08:00',
        like_count: '239',
        comment_count: '44',
        img_source: '../static/img/bg.jpg'
    },
        {
            id: '75983b39-07f3-4b08-94e1-fecbdea9103c',
            user_id: 'eff4d2c5-ce65-4d68-8e03-8896bf557fbf',
            title: '那年的我们正是青春年少时',
            category: '杂谈',
            user_name: 'yxwei',
            update_time: '2019-05-20 23:00:00',
            create_time: '2019-05-20 23:00:00',
            like_count: '43',
            comment_count: '12',
            img_source: '../static/img/bg1.jpg'
        }])
})
;
User.sync({force: true}).then(function (value) {
    return User.create({
        id: 'eff4d2c5-ce65-4d68-8e03-8896bf557fbf',
        username: 'yxwei',
        password: '123456'
    })
})