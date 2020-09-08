// //初始化数据库
// const model = require('./model')

// model.sync()

// console.log('init db ok')

// process.exit(0)


const model = require('./model');

(async () => {
    //初始化数据库

    await model.sync()

    console.log('init db ok')

    process.exit(0)
})();