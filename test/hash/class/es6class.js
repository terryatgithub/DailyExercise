class PersonType {
   constructor(name) {
       this.name = name
   } 

   getName() {
       console.log(this.name)
   }
}

let person = new PersonType('nicolas')
person.getName()

console.log(person instanceof PersonType)
console.log(person instanceof Object)