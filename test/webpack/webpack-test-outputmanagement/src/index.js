import _ from 'lodash';
import doPrint from './print';

import '../style.css';

function component() {
    var element = document.createElement('div')

    element.innerHTML = _.join(['Hello', 'webpack'], ' ')

    var btn = document.createElement('button')
    btn.innerHTML = 'click me and print sth.'
    btn.onclick = doPrint

    element.appendChild(btn)

    return element
}

let element = component()
document.body.appendChild(element)

if(module.hot) {
    module.hot.accept('./print.js', function(){
        console.log('Accepting the updated printMe module!')
        doPrint()

        document.body.removeChild(element)
        element = component()
        document.body.appendChild(element)
    })
}