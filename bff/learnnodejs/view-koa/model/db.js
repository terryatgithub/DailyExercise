// 如何定义model
const Sequelize = require('sequelize')
const config = require('../config')
const { v4: uuidv4 } = require('uuid')

console.log('init sequelize...', config)

function generateId() {
    return uuidv4()
}

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host, 
    dialect: config.dialect,
    pool: {
        max: 5, 
        min: 0,
        idel: 10000
    }
})

const ID_TYPE = Sequelize.STRING(50)

function defineModel(name, attributes) {
    let attr = {}

    //所有字段默认为NOT NULL，除非显式指定；
    for (let key in attributes) {
        let value = attributes[key]
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false
            attr[key] = value
        } else {
            attr[key] = {
                type: value,
                allowNull: false
            }
        }
    }
    //统一主键，名称必须是id，类型必须是STRING(50)；
    attr.id = {
        type: ID_TYPE,
        primaryKey: true
    }
    //统一timestamp机制，每个Model必须有createdAt、updatedAt和version，分别记录创建时间、修改时间和版本号。其中，createdAt和updatedAt以BIGINT存储时间戳，最大的好处是无需处理时区，排序方便
    attr.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    }
    attr.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    }
    attr.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    }

    console.log('model defined for table: ' + name + '\n' + JSON.stringify(attr, function (k, v) {
        if (k === 'type') {
            for (let key in Sequelize) {
                if (key === 'ABSTRACT' || key === 'NUMBER') {
                    continue;
                }
                let dbType = Sequelize[key];
                if (typeof dbType === 'function') {
                    if (v instanceof dbType) {
                        if (v._length) {
                            return `${dbType.key}(${v._length})`;
                        }
                        return dbType.key;
                    }
                    if (v === dbType) {
                        return dbType.key;
                    }
                }
            }
        }
        return v;
    }, '  '));

    return sequelize.define(name, attr, {
        tableName: name,
        timestamps: false,
        hooks: {
            //主键可以自己指定，也可以由框架自动生成（如果为null或undefined）；
            //version每次修改时自增。
            beforeValidate: function (obj) {
                console.log('beforeValidate: ' + JSON.stringify(obj))
                let now = Date.now()
                if (obj.isNewRecord) {
                    console.log('will create entity...');
                    if (!obj.id) {
                        obj.id = generateId()
                    }
                    obj.createdAt = now
                    obj.updatedAt = now
                    obj.version = 0
                } else {
                    console.log('will update entity...');
                    obj.updatedAt = now
                    obj.version++
                }
            },
            beforeUpdate: function (obj) {
                console.log('beforeUpdate: ' + JSON.stringify(obj))
            }
        }
    })

}


const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN']

var exp = {
    defineModel,
    sync: () => {
        // only allow create ddl in non-production environment:
        if (process.env.NODE_ENV !== 'production') {
            sequelize.sync({ force: true })
        } else {
            throw new Error('Cannot sync() when NODE_ENV is set to "production".')
        }
    }
}

for (let type of TYPES) {
    exp[type] = Sequelize[type]
}

exp.ID = ID_TYPE
exp.generateId = generateId

module.exports = exp