function callback(mutationlist, observer) {
    mutationlist.forEach(element => {
        console.log(element.type);
    });
}
const observer = new MutationObserver(callback)

var targetNode = document.getElementById('test')
var options = {
    childList: true,
    attributes: true,
    subtree: true
}
observer.observe(targetNode, options)


        function add() {
            const p = document.createElement('p')
            p.id = 'testImg'
            p.innerHTML = 'this is a p' + Math.random()
            test.appendChild(p)

            testImg.alt='backupalt'
        }
        function remove() {
            test.removeChild(test.childNodes[0])
        }