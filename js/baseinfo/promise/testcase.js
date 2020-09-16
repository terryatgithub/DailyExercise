let p = Promise.resolve()

p.then(() => {
    console.log('then0 sync');
})

p.then(() => {
    setTimeout(() => {
        console.log('then1 timeout');
    }, 0)
})

p.then(() => {
    console.log('then2 sync');
})