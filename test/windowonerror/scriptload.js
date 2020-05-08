let script = document.createElement('script')
script.onload = (e) => {
    alert('script load ok')
    console.log({e})
}
script.onerror = errorHandler
script.src="https://webx.coocaa.com/yuanbo/test/error.php"
script.crossOrigin="anonymous"
document.body.appendChild(script)