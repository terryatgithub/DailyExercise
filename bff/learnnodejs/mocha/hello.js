module.exports = function(...rest) {
    let sum = 0
    for (let n of rest) {
        sum += n
    }
    return sum
}