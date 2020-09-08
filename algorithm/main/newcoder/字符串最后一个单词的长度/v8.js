//js v8 
while(a = readline()) {
    let idx = a.lastIndexOf(' ')
    let word = a.slice(idx === -1 ? 0 : idx+1)
    print(word.length)
}