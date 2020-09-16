const xhr = new XMLHttpRequest()
const uri = '/index.php'
function reqListner() {
    console.log(this.responseText);
}
xhr.open('POST', uri, true)
xhr.addEventListener('load', reqListner)
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200) {
        console.log('xhr send ok');
        console.log(xhr.responseText);
    }
}
xhr.send()

// 处理二进制数据
xhr.open('get', uri)
// 以二进制字符串形式检索未处理的数据
xhr.overrideMimeType('text/plain; charset=x-user-defined')

xhr.onload = function(e) {
    let arraybuffer = xhr.response 
}
xhr.open('get', uri)
xhr.responseType = 'arraybuffer'
xhr.send()
