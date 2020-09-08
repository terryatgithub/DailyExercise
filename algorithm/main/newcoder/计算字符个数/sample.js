let line = readline()
let key = readline()
let count = 0
line = line.toLowerCase()
key = key.toLowerCase()

for(let i = 0; i < line.length; i++) {
    if(line[i] === key) count ++ 
}
console.log(count);