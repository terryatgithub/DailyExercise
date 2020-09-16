import {even} from './even.js'

export var counter = 0

export function odd(n) {
    counter++
    console.log('odd: ', n);
    return n!==0 && even(n-1)
}