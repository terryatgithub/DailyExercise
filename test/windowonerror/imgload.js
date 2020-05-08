let img = new Image()
img.onload = (evt) => {
    // alert('img load ok')
    console.log({evt})
}
document.body.appendChild(img)
img.onerror = errorHandler
img.src = 'https://webx.coocaa.com/yuanbo/test/ironman.jpg1'


img = new Image()
img.onload = (evt) => {
    // alert('img load ok')
    console.log({evt})
}
document.body.appendChild(img)
img.onerror = errorHandler
img.src = 'https://webx.coocaa.com/yuanbo/test/littleironman.jpg1'