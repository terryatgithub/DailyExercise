import util from './util.js'

let _log = {
    _formatOutput: function (obj){
        if(obj == null || !util.isObject(obj)) {
            return obj
        }
        let result = `<table><thead><tr><td>#</td><td>key</td><td>value</td></tr></thead>`
        let i = 0
        for(let key in obj) {
            result += `<tr><td>${++i}</td><td>${key}</td><td>${this._formatOutput(obj[key])}</td></tr>`
        }
        result += `</table>`
        return result
    },
    printMsg: function(el, printer, param) {
        let data = printer(param)
        document.getElementById(el).innerHTML = this._formatOutput(data)
    },
}
export default _log