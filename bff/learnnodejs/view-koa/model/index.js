const model = require('./model')

let Pet = model.Pet,
    User = model.User;

const fn_create = async (ctx, next) => {
    let dog = await User.create({
        name: 'Gaffey',
        gender: false,
        email: 'adf@1234.com',
        password: 'asdf',
        birth: '2007-07-07'
    })
    console.log(`created: ${JSON.stringify(dog)}`)
}

const fn_retrieve = async (ctx, next) => {
    let pets = await User.findAll({
        where: {
            name: 'Gaffey'
        }
    })
    console.log(`find ${pets.length} pets:`)
    for(let p of pets) {
        console.log(JSON.stringify(p))
    }
    return pets //todo 能这样处理吗
}

const fn_update = async (ctx, next) => {
    let pets = await fn_retrieve() //todo
    pets.forEach(async p => {
        p.gender = true
        p.updatedAt = Date.now()
        p.version++
        await p.save()    
    })
}

const fn_delete = async (ctx, next) => {
    let pets = await fn_retrieve() //todo
    pets.forEach(async p => {
        p.gender = true
        p.updatedAt = Date.now()
        p.version++
        await p.destroy()    
    })
}

module.exports = {
    create: fn_create,
    delelte: fn_delete,
    retrieve: fn_retrieve,
    update: fn_update
}