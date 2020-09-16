function *foo(x) {
    let y = 2 * (yield (x+1))
    let z = yield(y/3)
    console.log(x,y,z);
    return (x + y + z)
}

let it = foo(5)
console.log(it.next(1));
console.log(it.next(12));
console.log(it.next(13));
