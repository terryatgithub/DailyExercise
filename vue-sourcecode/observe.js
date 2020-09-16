
let data = {
    name: 'terry'
}
observe(data)

data.name
data.name = 'haha'
data.name
data.name = {
    fname: 'terry',
    lname: 'yuan'
}
data.name.fname

function observe(obj) {
    if(typeof obj !== 'object' || obj === null){
        return 
    }
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}


function defineReactive(obj, key, val) {
    observe(val)
    Object.defineProperty(obj, key , {
        enumerable: true,
        configurable: true,
        get: function() {
            console.log(`get ${key}: ${val}`);
            return val
        },
        set: function(newVal) {
            console.log(`set ${key} to ${newVal}`);
            if(newVal !== val){
                observe(newVal)
                val = newVal
            }
        }
    })
}