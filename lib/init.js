/**
 * created by Yuxin Wei on 2019/7/14
 * 用于初始化表，项目正式启动前需要运行一下，初始化数据库，后期继续优化
 */

const Article = require('../model/article');
const User = require('../model/user');
const Category = require('../model/category');

// 通过 sync 方法同步数据结构
Article.sync({force: true}).then(function (value) {
    return Article.bulkCreate([{
        id: '5b005dc9-5a3f-414a-bb12-6462c9d291a5',
        userId: 'eff4d2c5-ce65-4d68-8e03-8896bf557fbf',
        detailId: 'fe67a116-430d-4d2b-9712-65bf6d8ff6eb',
        title: '山有木兮木有枝,心悦君兮君不知',
        category: '1',
        tag: '杂谈',
        updateTime: '2019-05-09 18:08:00',
        createTime: '2019-05-09 18:08:00',
        likeCount: '239',
        commentCount: '44',
        imgSource: '../static/img/bg.jpg'
    },
        {
            id: '75983b39-07f3-4b08-94e1-fecbdea9103c',
            userId: 'eff4d2c5-ce65-4d68-8e03-8896bf557fbf',
            detailId: 'a1e492df-d54b-43e7-ad39-72031e82c5ac',
            title: '那年的我们正是青春年少时',
            category: '2',
            tag: '青春',
            updateTime: '2019-05-20 23:00:00',
            createTime: '2019-05-20 23:00:00',
            likeCount: '43',
            commentCount: '12',
            imgSource: '../static/img/bg1.jpg'
        }])
});

/**
 * 初始化用户表
 */
User.sync({force: true}).then(function (value) {
    return User.create({
        id: 'eff4d2c5-ce65-4d68-8e03-8896bf557fbf',
        username: 'yxwei',
        password: '123456',
        phone: '13635510292',
        city: '合肥',
        email: 'supreme129@yeah.net'
    })
});

Category.sync({force: true}).then(function (value) {
    return Category.bulkCreate([
        {
            id: '1',
            name: '大前端',
            description: '构建大前端势能，走在全栈的路上',
            updateTime: '2019-07-16 22:15:42',
            createTime: '2019-07-16 22:15:42'
        },
        {
            id: '2',
            name: '时光机器',
            description: '祭奠失去的青春，畅想完美未来',
            updateTime: '2019-07-16 22:15:42',
            createTime: '2019-07-16 22:15:42'
        }
    ])
});
