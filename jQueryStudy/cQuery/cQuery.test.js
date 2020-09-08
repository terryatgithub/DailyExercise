//some test code

function foo(e) {
    console.log('cb: e.type: ' + e.type)
}

cQuery('body').on('click', foo)
cQuery('body').off('click', foo)

