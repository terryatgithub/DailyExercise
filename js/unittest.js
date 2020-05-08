let dataObjSimple = {
    a: 0 ,
    b: {
        c: 0
    }
}
let dataObjComplex = {
    undef: undefined,
    nu: null,
    num: 123,
    str: 'abcde',
    b: true,
    d: new Date(),
    re: /\d{1,}/g,
    foo: function() {console.log('test function: this: ' + JSON.stringify(this))},
    obj: {
        undef: undefined,
        nu: null,
        num: 123,
        str: 'abcde',
        b: true,
        d: new Date(),
        re: /\d{1,}/g,
        foo: function() {console.log(arguments)},
    }
}
export default {
    data: dataObjComplex,
    data1: dataObjSimple,
}