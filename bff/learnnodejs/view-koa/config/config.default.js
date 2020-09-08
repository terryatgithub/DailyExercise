


var config = {
    dialect: 'mysql',
    database: 'nodejs',//todo 为什么这里不行 unknown database 'nodejs'
    username: 'www', //todo 为什么权限不行
    password: 'www',
    host: 'localhost',
    port: 3306
}; 

  config = {
    dialect: 'mysql',
    database: 'test', 
    username: 'root',
    password: 'root',
    host: 'localhost',
    port: 3306
};

//Q: Table 'test.users' doesn't exist

module.exports = config;
