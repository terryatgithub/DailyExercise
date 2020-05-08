$(function(){
    const IMG_PATH = 'https://webx.coocaa.com/yuanbo/test/littleironman.jpg'
    function insertImg() {
        let img = new Image()
        img.onload = function(e) {
            console.log('load: ' + {e})
        }
        img.onerror = function(err) {
            console.error('error: ' + {err})
        }
        img.className = 'lazyload'
        img.alt = 'ironman img'
        img.setAttribute('data-original', IMG_PATH)
        document.body.appendChild(img)
    }

    for(let i = 0; i < 100; i++) {
        insertImg()
    }

    $('img.lazyload').lazyload()
})