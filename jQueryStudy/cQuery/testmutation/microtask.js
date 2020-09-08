function cb() {
    console.log('cb');
}

var observer = new MutationObserver(cb)

var counter = 0
var targetNode = document.createTextNode(String(counter))

var options = {
    characterData: true
}
observer.observe(targetNode, options)

function add() {
    setTimeout(() => {
        targetNode.data = String(++counter % 2)
    }, 1000)
}