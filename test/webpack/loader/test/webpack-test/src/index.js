import _ from 'lodash';
import '../style.css';
import Icon from '../images/ironman.jpg';
import Data from '../data/data.xml';

function component() {
    var element = document.createElement('div')

    element.innerHTML = _.join(['Hello', 'webpack'], ' ')
    element.classList.add('hello')

    var img = new Image()
    img.src = Icon
    element.appendChild(img)

    var p = document.createElement('p')
    p.innerText = JSON.stringify(Data);
    element.appendChild(p)

    return element
}

document.body.appendChild(component())

