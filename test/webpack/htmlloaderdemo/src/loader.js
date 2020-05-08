// import loaderUtils from 'loader-utils';
// export default function loader(source) {
//     const options = loaderUtils.getOptions(this)

//     source =  options.name + source
    
//     return `export default ${ JSON.stringify(source) }`
// }

const loaderUtils = require('loader-utils')
module.exports = function loader(source) {
    const options = loaderUtils.getOptions(this)

    source =  options.name + source
    
    return `export default ${ JSON.stringify(source) }`
}

