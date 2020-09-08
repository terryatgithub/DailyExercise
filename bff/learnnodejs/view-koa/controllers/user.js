const user = require('../model')


//是否需要先sync()
let create = async(ctx, next) => {
    await user.create(ctx, next) 
    next()
}
let delelte = async(ctx, next) => {
    await user.delelte(ctx, next) 
    next()
}
let update = async(ctx, next) => {
    await user.update(ctx, next) 
    next()
}
let retrieve = async(ctx, next) => {
    await user.retrieve(ctx, next) 
    next()
}
module.exports = {
    'GET /create': create,
    'GET /delete': delelte, //todo 需要为post
    'GET /update': update,
    'GET /retrieve': retrieve
}