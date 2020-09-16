class Plug {
    getName(){
        return '港版插头'
    }
}

class Target {
    constructor() {
        this.plug = new Plug()
    }

    getName(){
        return this.plug.getName + ' 适配器转二脚插头'
    }
}

let t = new Target()
t.getName()

// 适配器用来解决两个接口不兼容的情况，不需要改变已有的接口，通过包装一层的方式实现两个接口的正常协作。

