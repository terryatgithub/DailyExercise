import head from './head.html'
import part1 from './part1.html'
import part2 from './part2.html'
import part3 from './part3.html'
import foot from './foot.html'

console.log(part1)
document.write(
    // head 
    '<div id="deviceready">'
    + part1 
    + part2 
    + part3 
    + '</div>'
    // + foot
)