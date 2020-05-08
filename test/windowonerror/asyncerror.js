let a = Math.random()
console.log(a)

async function foo() {
    return new Promise((resolve, reject) => {
        setTimeout(reject, 2000)
    })
}

if( a > 0.5) {
    foo().catch(()=>console.log('handle reject auto'))
} else {
    foo()
}
