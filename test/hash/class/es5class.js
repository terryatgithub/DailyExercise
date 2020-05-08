function PersonType(name) {
    this.name = name
}

PersonType.prototype.getName = function() {
    console.log(`name: ${this.name}`)
    return this.name
}

let person = new PersonType('terry')
person.getName()

console.log(person instanceof PersonType)
console.log(person instanceof Object)
