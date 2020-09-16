let debug = {hello: 'world'}
let blob = new Blob([JSON.stringify(debug, null, 2)], {type: 'application/json'})

