import {odd} from './odd.js'

export var counter = 0

export function even(n) {
    counter++
    console.log('even: ', n);
    return n === 0 || odd(n-1) 
}