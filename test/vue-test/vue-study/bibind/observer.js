var pub = {
    publish() {
        dep.notify()
    }
}

var sub1 = {
    update() {
        console.log('sub1')
    }
}
var sub2 = {
    update() {
        console.log('sub2')
    }
}
var sub3 = {
    update() {
        console.log('sub3')
    }
}

function Dep() {
    this.subs = [sub1, sub2, sub3]
}
Dep.prototype.notify = function() {
    this.subs.forEach(sub => sub.update())
}
var dep = new Dep()
pub.publish()