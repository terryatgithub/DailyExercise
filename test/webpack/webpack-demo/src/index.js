import _ from 'lodash'
import './style.css'
import Icon from './ironman.jpg'
import { cube } from './math'

function component() {
    // let element = document.createElement('div');

    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    // element.classList.add('hello')
    
    // let img = new Image()
    // img.src = Icon
    // element.appendChild(img)

    let element = document.createElement('pre')
    element.innerHTML = [
      'hello, webpack',
      '5 cubed is equal to ' + cube(5)
    ].join('\n\n')
    return element;
  }
  
  document.body.appendChild(component());