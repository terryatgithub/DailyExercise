class Man {
    constructor(name){
        this.name = name
    }
    sayName() {
        alert(this.name)
    }
}

class Factory{
    static create(name){
        return new Man(name)
    }
}

let m1 = Factory.create('terry')
let m2 = Factory.create('teddy')
m1.sayName()
m2.sayName()